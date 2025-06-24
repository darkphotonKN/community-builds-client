"use client";
import { isErrorResponse, postRequest } from "@/lib/api/requestHelpers";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Button from "../Button";
import { ApiResponse, ErrorResponse } from "@/type/api";
import { SignInResponse } from "@/type/member.types";
import HeaderTwo from "../Layout/Text/HeaderTwo";
import { useRouter } from "next/navigation";

type Values = {
  password: string;
  email: string;
};

function LoginForm() {
  const router = useRouter();
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
      console.log("res:", res);

      // store access token then re-direct
      if (isErrorResponse(res)) return;
      localStorage.setItem("access", res.result.access_token);
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
        router.push("/");
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col justify-center w-[400px] p-8 rounded-lg shadow-customBlockShadow hover:shadow-customBlockShadowHover transition-all">
          <div className="text-center mb-8">
            <HeaderTwo>Welcome Back, Exile</HeaderTwo>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-customTxtContent mb-2 text-sm"
              >
                Email
              </label>
              <Field
                className="w-full bg-customBg border border-customSecondary text-customTxtContent rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-customSecondary focus:border-transparent transition-all"
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
              />
              {errors.email && touched.email ? (
                <div className="mt-2 text-red-600 text-sm">{errors.email}</div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-customTxtContent mb-2 text-sm"
              >
                Password
              </label>
              <Field
                className="w-full bg-customBg border border-customSecondary text-customTxtContent rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-customSecondary focus:border-transparent transition-all"
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
              />
              {errors.password && touched.password ? (
                <div className="mt-2 text-red-600 text-sm">
                  {errors.password}
                </div>
              ) : null}
            </div>

            {/* Sign Up Results */}
            <div className="mt-4">{renderResults(res)}</div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <Button width={200} text="Enter the Realm" />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
