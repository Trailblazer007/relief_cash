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

const Schema = Yup.object().shape({
  members: Yup.array()
    .of(
      Yup.object({
        email: Yup.string().required(),
        salary: Yup.string().required(),
      }).required()
    )
    .required(),
});

type SchemaType = Yup.InferType<typeof Schema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  members: MemberType[];
};
export const CreatePayrollModel = (props: Props) => {
  const { isOpen, onClose, members } = props;

  const router = useRouter();

  const { data: sessionData } = useSession();

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    errors,
    isValid,
    isSubmitting,
  } = useFormik<SchemaType>({
    initialValues: {
      members: [{ email: "", salary: "" }],
    },
    validationSchema: Schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      if (!sessionData) return;
      //   await createProject({ ...values, token: sessionData.user.accessToken })
      //     .then((results) => {
      //       toast.success(results.message);
      //       router.reload();
      //     })
      //     .catch((err) => {
      //       toast.error(err.message ?? "Uh oh! Something went wrong.");
      //     });
    },
  });

  const updatedEmail = (index: number, value: string) => {
    let members = [...values.members];

    members[index].email = value;

    setFieldValue("members", members);
  };

  const updatedSalary = (index: number, value: string) => {
    let members = [...values.members];

    members[index].salary = value;

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
          <DialogTitle>Create Payrolls</DialogTitle>
          <DialogDescription>
            Fill the fields. Click save when you&lsquo;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="">
            <div className="my-2 space-y-3">
              {values.members.map((item, index) => (
                <div key={index} className="flex items-center gap-2 w-full">
                  <Select
                    value={item.email}
                    disabled={isSubmitting}
                    onValueChange={(value) => updatedEmail(index, value)}
                  >
                    <SelectTrigger className="w-full h-10 ">
                      <SelectValue placeholder="Select member" />
                    </SelectTrigger>
                    <SelectContent>
                      {members.map((member) => (
                        <SelectItem key={index} value={member.email}>
                          {member.lastName + " " + member.firstName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <CustomInput
                    type="text"
                    autoComplete="name"
                    required
                    value={item.salary}
                    onChange={(e) => updatedSalary(index, e.target.value)}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    classes={{ root: "w-full " }}
                    showErrorMessage={false}
                    error={
                      membersError.length > 0 &&
                      membersError[index] &&
                      membersError[index].salary.length > 0
                        ? membersError[index].salary
                        : undefined
                    }
                  />

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

            {members.length !== values.members.length && (
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
            )}
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
