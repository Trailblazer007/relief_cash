import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as Yup from "yup";
import { useFormik } from "formik";
import CustomInput from "@/components/custom-input";
import { IoRemoveCircleOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProject } from "@/services/create-projects";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { MoonLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { sendInvite } from "@/services/send-invite";

const Schema = Yup.object().shape({
  members: Yup.array()
    .of(
      Yup.object({
        email: Yup.string().required(),
        role: Yup.string()
          .oneOf(["employee", "employer"] as const)
          .required()
          .nonNullable(),
      }).required()
    )
    .required(),
});

type SchemaType = Yup.InferType<typeof Schema>;

type Props = {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
};
export const InviteMemberModel = (props: Props) => {
  const { isOpen, onClose, projectId } = props;

  const router = useRouter();

  const { data: sessionData } = useSession();

  const {
    handleSubmit,
    handleBlur,
    setFieldValue,
    values,
    errors,
    isValid,
    isSubmitting,
  } = useFormik<SchemaType>({
    initialValues: {
      members: [{ email: "", role: "employee" }],
    },
    validationSchema: Schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      if (!sessionData) return;
      await sendInvite({
        ...values,
        token: sessionData.user.accessToken,
        projectId,
      })
        .then((results) => {
          toast.success(results.message);
          router.reload();
        })
        .catch((err) => {
          toast.error(err.message ?? "Uh oh! Something went wrong.");
        });
    },
  });

  const updatedEmail = (index: number, value: string) => {
    let members = [...values.members];

    members[index].email = value;

    setFieldValue("members", members);
  };

  const updatedRole = (index: number, value: "employee" | "employer") => {
    let members = [...values.members];

    members[index].role = value;

    setFieldValue("members", members);
  };

  const removeEmail = (index: number) => {
    let members = [...values.members];

    members.splice(index, 1);

    setFieldValue("members", members);
  };

  const membersError = errors?.members
    ? (errors.members as SchemaType["members"])
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={() => !isSubmitting && onClose()}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-scroll ">
        <DialogHeader>
          <DialogTitle>Invite members</DialogTitle>
          <DialogDescription>
            Fill the fields. Click save when you&lsquo;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="">
            <div className="my-2 space-y-3">
              {values.members.map((item, index) => (
                <div key={index} className="flex items-center gap-2 w-full">
                  <CustomInput
                    type="email"
                    autoComplete="name"
                    required
                    value={item.email}
                    onChange={(e) => updatedEmail(index, e.target.value)}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    classes={{ root: "w-full " }}
                    showErrorMessage={false}
                    error={
                      membersError.length > 0 &&
                      membersError[index] &&
                      membersError[index].email.length > 0
                        ? membersError[index].email
                        : undefined
                    }
                  />

                  <Select
                    value={item.role}
                    disabled={isSubmitting}
                    onValueChange={(value) =>
                      updatedRole(index, value as "employee" | "employer")
                    }
                  >
                    <SelectTrigger className="w-[120px] h-10 ">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="employer">Employer</SelectItem>
                    </SelectContent>
                  </Select>

                  {values.members.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeEmail(index)}
                      disabled={isSubmitting}
                      className="h-10 w-[40px] shrink-0 rounded-md border-[1.5px] border-slate-200 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                      <IoRemoveCircleOutline size={25} />
                    </button>
                  ) : null}
                </div>
              ))}
            </div>

            <Button
              type="button"
              onClick={() =>
                setFieldValue("members", [
                  ...values.members,
                  { email: "", role: "employee" },
                ])
              }
              className="border-[1.5px] mt-2 border-slate-200 bg-transparent hover:bg-transparent text-black hover:text-black w-full"
            >
              {" "}
              Add more members
            </Button>
          </div>

          <div className="">
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="mt-3"
            >
              Save
              <MoonLoader
                size={20}
                color="white"
                className="ml-2 text-white"
                loading={isSubmitting}
              />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
