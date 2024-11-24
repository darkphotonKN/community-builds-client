"use client";
import { isErrorResponse, postRequest } from "@/lib/api/requestHelpers";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Button from "../Button";
import { ApiResponse, ErrorResponse } from "@/type/api";
import { SignInResponse } from "@/type/member.types";
import HeaderTwo from "../Layout/Text/HeaderTwo";

type Values = {
  password: string;
  email: string;
};

function LoginForm() {
  const [res, setRes] = useState<ApiResponse<SignInResponse> | null>();

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("The email field is required."),
    password: Yup.string()
      .min(6, "Password needs to be longer.")
      .required("The password field is required."),
  });

  useEffect(() => {
    if (res?.statusCode === 200) {
      // store access token then re-direct
      if (isErrorResponse(res)) return;
      localStorage.setItem("access", "TODO");
    }
  }, [res]);

  const renderResults = (
    res: ApiResponse<SignInResponse> | null | undefined,
  ) => {
    /* handle error case first for narrowing */
    if (isErrorResponse(res)) {
      if (res.statusCode === 401) {
        return <div className="text-red-600">{res.message}</div>;
      } else if (res.statusCode === 500 || res.statusCode === 400) {
        return (
          <div className="text-red-600">
            Something went wrong with your request, please check your connection
            or contact support.
          </div>
        );
      }
    } else if (res?.result && res?.statusCode === 200) {
      return (
        <div className="text-green-600">You have successfully logged in.</div>
      );
    }
    return <div></div>;
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>,
      ) => {
        const res = await postRequest<SignInResponse>("/member/signin", values);

        console.log("signin res:", res);

        if (isErrorResponse(res)) {
          console.log("Error", res.message);
          setRes(res);

          return;
        }

        setRes(res);
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col justify-center">
          <HeaderTwo>Login</HeaderTwo>

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
          <div className="mt-3">{renderResults(res)}</div>

          {/* Submit Button */}
          <Button width={500} height={400} text="Submit" />
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
