import { isErrorResponse, postRequest } from "@/lib/api/requestHelpers";
import { ApiResponse, ErrorResponse } from "@/type/api";
import { CreateBuildResponse } from "@/type/build.types";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import * as Yup from "yup";

type Values = {
  name: string;
};

function CreateBuildForm() {
  const [res, setRes] = useState<ApiResponse<CreateBuildResponse> | null>();
  const [err, setErr] = useState<ErrorResponse<CreateBuildResponse> | null>();

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name needs to be at least 2 characters long.")
      .max(50, "Name can't be longer than 2 characters long.")
      .required("The name field is required."),
  });

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validationSchema={schema}
      onSubmit={async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>,
      ) => {
        const res = await postRequest<CreateBuildResponse>(
          "/member/signup",
          values,
        );
        console.log("res:", res);

        if (isErrorResponse(res)) {
          console.log("Error when submitting:", res.message);
          setErr(res);
          return;
        }

        setRes(res);
      }}
    >
      <Form>
        <Field
          className="w-[280px] bg-transparent text-center text-customHeaderTwo text-2xl border-b border-customSecondary pb-1"
          placeholder="Name Your Build"
        />
      </Form>
    </Formik>
  );
}

export default CreateBuildForm;
