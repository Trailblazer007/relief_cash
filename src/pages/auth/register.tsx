import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthLayout } from "@/features/auth";
import CustomInput from "@/components/custom-input";
import { useState } from "react";
import { PasswordEye } from "@/components/password-eye";
import { Button } from "@/components/ui/button";
import { MoonLoader } from "react-spinners";

const Schema = Yup.object().shape({
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

type SchemaType = Yup.InferType<typeof Schema>;

export default function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isValid,
    isSubmitting,
  } = useFormik<SchemaType>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: async (values) => {},
  });

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="w-[85%] lg:w-[70%] space-y-5 flex flex-col mt-12"
      >
        <CustomInput
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            errors.email && values.email.length > 0 ? errors.email : undefined
          }
        />
        <CustomInput
          label="Password"
          name="password"
          type={isVisible ? "text" : "password"}
          required
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            errors.password && values.password.length > 0
              ? errors.password
              : undefined
          }
          endIcon={
            <PasswordEye
              isVisible={isVisible}
              onClick={() => setIsVisible(!isVisible)}
            />
          }
        />

        <div>
          <Button
            disabled={!isValid || isSubmitting}
            type="submit"
            className="w-full mt-5"
          >
            Create an Account
            <MoonLoader
              size={20}
              color="white"
              className="ml-2 text-white"
              loading={isSubmitting}
            />
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
