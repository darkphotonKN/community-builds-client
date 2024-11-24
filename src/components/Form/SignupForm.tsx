import { isErrorResponse, postRequest } from "@/lib/api/requestHelpers";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Button from "../Button";
import { ApiResponse, ErrorResponse } from "@/type/api";
import HeaderTwo from "../Layout/Text/HeaderTwo";
import { SignInResponse } from "@/type/member.types";

type Values = {
  name: string;
  password: string;
  email: string;
};

function SignupForm() {
  const [res, setRes] = useState<ApiResponse<SignInResponse> | null>();
  const [err, setErr] = useState<ErrorResponse<SignInResponse> | null>();

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name needs to be at least 2 characters long.")
      .max(50, "Name can't be longer than 2 characters long.")
      .required("The name field is required."),
    email: Yup.string()
      .email("Invalid email")
      .required("The email field is required."),
    password: Yup.string()
      .min(6, "Password needs to be longer.")
      .required("The password field is required."),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>,
      ) => {
        const res = await postRequest<SignInResponse>("/member/signup", values);
        console.log("res:", res);

        if (isErrorResponse(res)) {
          console.log("Error when submitting:", res.message);
          setErr(res);
          return;
        }

        setRes(res);
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col justify-center">
          <HeaderTwo>Register</HeaderTwo>
          <label htmlFor="name" className="mt-8 mb-2">
            Full Name
          </label>
          <Field
            className="border border-black px-2 py-1 rounded"
            id="name"
            name="name"
            placeholder="Enter Name"
          />

          {errors.name && touched.name ? (
            <div className="mt-2 text-red-600">{errors.name}</div>
          ) : null}

          <label htmlFor="email" className="my-2">
            Email
          </label>
          <Field
            className="border border-black px-2 py-1 rounded"
            id="email"
            name="email"
            placeholder="Enter Email"
            type="email"
          />

          {errors.email && touched.email ? (
            <div className="mt-2 text-red-600">{errors.email}</div>
          ) : null}

          <label htmlFor="password" className="my-2">
            Password
          </label>
          <Field
            className="border border-black px-2 py-1 rounded"
            id="password"
            name="password"
            placeholder="Enter Password"
            type="password"
          />

          {errors.password && touched.password ? (
            <div className="mt-2 text-red-600">{errors.password}</div>
          ) : null}

          {/* Sign Up Results */}
          <div className="mt-3">
            {res?.statusCode === 201 ? (
              <div className="text-green-600">
                Your account has been successfully created. Please check your
                email.
              </div>
            ) : err?.statusCode === 400 ? (
              <div className="text-red-600">{err?.message}</div>
            ) : err?.statusCode === 500 ? (
              <div className="text-red-600">
                Something went wrong with your request.
              </div>
            ) : (
              ""
            )}
          </div>

          {/* Submit Button */}
          <Button width={500} height={400} text="Submit" />
        </Form>
      )}
    </Formik>
  );
}

export default SignupForm;
