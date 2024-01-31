import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthLayout } from "@/features/auth";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#\$%^&*()_+{}":;<>,.?~\[\]]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});

export default function Signin() {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isValid,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      // await signIn("credentials", { redirect: false, ...values }).then(
      //   ({ ok, error }: any) => {
      //     if (ok) {
      //       toast.success("Successfully logged in");
      //       router.replace(callbackUrl ?? "/dashboard");
      //     } else {
      //       toast.error(error ?? "Uh oh! Something went wrong.");
      //     }
      //   }
      // );
    },
  });
  return (
    <AuthLayout>
      <h1 className="text-5xl font-bold">
        Whereas recognition of the inherent dignity
      </h1>
    </AuthLayout>
  );
}
