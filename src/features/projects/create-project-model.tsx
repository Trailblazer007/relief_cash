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
  name: Yup.string().required("Name is Required"),
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
  isOpen: boolean;
  onClose: () => void;
};
export const CreateProjectModel = (props: Props) => {
  const { isOpen, onClose } = props;

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
      name: "",
      members: [{ email: "", role: "employee" }],
    },
    validationSchema: Schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      if (!sessionData) return;
      await createProject({ ...values, token: sessionData.user.accessToken })
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

  return (
    <Dialog open={isOpen} onOpenChange={() => !isSubmitting && onClose()}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-scroll ">
        <DialogHeader>
          <DialogTitle>Create a project</DialogTitle>
          <DialogDescription>
            Fill the fields. Click save when you&lsquo;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <CustomInput
            label="Project name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            error={
              errors.name && values.name.length > 0 ? errors.name : undefined
            }
          />

          <div className="">
            <label
              htmlFor="emails"
              className="block text-base font-semibold leading-6 text-black dark:text-white"
            >
              Invite members
            </label>

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
              Add new members
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
