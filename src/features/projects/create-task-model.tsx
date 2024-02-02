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
});

type SchemaType = Yup.InferType<typeof Schema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export const CreateTaskModel = (props: Props) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={() => !isSubmitting && onClose()}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-scroll ">
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
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
