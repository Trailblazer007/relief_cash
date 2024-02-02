import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthLayout } from "@/features/auth";
import CustomInput from "@/components/custom-input";
import { useState } from "react";
import { PasswordEye } from "@/components/password-eye";
import { Button } from "@/components/ui/button";
import { MoonLoader } from "react-spinners";
import Head from "next/head";
import { createAccount } from "@/services/create-account";
import { toast } from "sonner";
import { useRouter } from "next/router";

const Schema = Yup.object().shape({
  firstName: Yup.string().min(3).max(50).required("First Name is required"),
  lastName: Yup.string().min(3).max(50).required("Last Name is required"),
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
  const router = useRouter();
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      await createAccount(values)
        .then((results) => {
          toast.success(results.message);
          router.push(`/auth/signin?callbackUrl=${router.query.callbackUrl}`);
        })
        .catch((err) => {
          toast.error(err.message ?? "Uh oh! Something went wrong.");
        });
    },
  });

  return (
    <>
      <Head>
        <title>Register | Auth</title>
      </Head>
      <AuthLayout>
        <form
          onSubmit={handleSubmit}
          className="w-[85%] lg:w-[70%] space-y-5 flex flex-col mt-12"
        >
          <div className="grid grid-cols-2 gap-5">
            <CustomInput
              label="First name"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              readOnly={isSubmitting}
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.firstName && values.firstName.length > 0
                  ? errors.firstName
                  : undefined
              }
            />
            <CustomInput
              label="Last name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              readOnly={isSubmitting}
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.lastName && values.lastName.length > 0
                  ? errors.lastName
                  : undefined
              }
            />
          </div>

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
    </>
  );
}
