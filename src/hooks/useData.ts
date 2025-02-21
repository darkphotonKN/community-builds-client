import { getRequest, isErrorResponse } from "@/lib/api/requestHelpers";
import { ApiResponse } from "@/type/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

type ResError = {
  errorMessage?: unknown;
  errorCode?: number;
  errorType?: string;
};

/*
 * Helper for http requests and saving the data in a react state together with life cycle.
 */
export default function useData<ResT, DepT>(
  endpoint: string,
  dependencies?: DepT[],
  auth?: boolean,
) {
  const [response, setResponse] = useState<ApiResponse<ResT> | null>();
  const [error, setError] = useState<ResError | null>();

  useEffect(() => {
    getData();
  }, [...(dependencies ?? [])]);

  async function getData() {
    console.log("incoming auth:", auth);
    const res = await getRequest<ResT>(endpoint, null, { auth });

    if (!res) return;

    if (isErrorResponse(res)) {
      if (res instanceof AxiosError) {
        setError({
          errorMessage: res.response?.data, // error message
          errorCode: res.response?.status, // error code
          errorType: res.code,
        });
      }
      console.error(res);
      return;
    }

    setResponse(res);
  }

  return { response, error };
}
