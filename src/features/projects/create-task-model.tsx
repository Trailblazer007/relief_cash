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
import { useLocalStorage } from "usehooks-ts";
import { useParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { v4 } from "uuid";

const Schema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  content: Yup.string().required("Content is Required"),
  user: Yup.string().required(),
  dueDate: Yup.date().required(),
});

type SchemaType = Yup.InferType<typeof Schema>;

type Props = {
  isOpen: boolean;
  projectId: string;
  onClose: () => void;
  members: MemberType[];
};
export const CreateTaskModel = (props: Props) => {
  const { isOpen, onClose, members } = props;

  const params = useParams<{ projectId: string }>();

  const router = useRouter();

  const { data: sessionData } = useSession();

  const [items, setItems] = useLocalStorage<
    {
      id: string;
      name: string;
      content: string;
      users: string[];
      dueDate: Date;
    }[]
  >(`tasks-${params?.projectId}`, []);

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
      content: "",
      user: "",
      dueDate: new Date(),
    },
    validationSchema: Schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      if (!sessionData) return;

      setItems([...items, { ...values, users: [values.user], id: v4() }]);

      onClose();

      // router.reload();
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
            label="Task name"
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

          <div className="space-y-2">
            <label
              htmlFor="user"
              className="block text-base font-semibold leading-6 text-black dark:text-white"
            >
              Assign User
            </label>
            <Select
              value={values.user}
              disabled={isSubmitting}
              onValueChange={(value) => setFieldValue("user", value)}
            >
              <SelectTrigger className="w-full h-10 ">
                <SelectValue placeholder="Select member" />
              </SelectTrigger>
              <SelectContent>
                {members.map((member, index) => (
                  <SelectItem key={index} value={member.email}>
                    {member.lastName + " " + member.firstName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="date"
              className="block text-base font-semibold leading-6 text-black dark:text-white"
            >
              Due date
            </label>

            <DatePicker
              value={values.dueDate}
              onChange={(value) => setFieldValue("dueDate", value)}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="emails"
              className="block text-base font-semibold leading-6 text-black dark:text-white"
            >
              Description
            </label>
            <Textarea
              name="content"
              autoComplete="content"
              required
              value={values.content}
              rows={4}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
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
