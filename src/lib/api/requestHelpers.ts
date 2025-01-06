import axios from "axios";
import axiosInstance from ".";
import { getToken } from "../auth/jwt";
import { ApiResponse, ErrorResponse } from "@/type/api";

type RequestOptions = {
  auth?: boolean;
};

export async function getRequest<T, K extends Record<string, any> = any>(
  endpoint: string,
  params?: K,
  options?: RequestOptions,
): Promise<ApiResponse<T> | null | ErrorResponse<T>> {
  try {
    const { auth } = options ?? {};

    let headers = {};
    if (auth) {
      const token = getToken("access");
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }
    const response = await axiosInstance.get<ApiResponse<T>>(endpoint, {
      params: params,
      headers,
    });

    return response?.data;
  } catch (err) {
    return handleAxiosError(err);
  }
}

export async function postRequest<T, K = any>(
  endpoint: string,
  payload: K,
  auth?: boolean,
): Promise<ApiResponse<T> | null | ErrorResponse<T>> {
  try {
    let headers = {};
    if (auth) {
      const token = getToken("access");
      headers = { ...headers, Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzQ1MjY4MjYsImlhdCI6MTczNDUyMzIyNiwic3ViIjoiZjFjM2M2YTQtYzA0MC00Y2Y2LTllMjAtMzBlYWZjMzM5NTYwIiwidG9rZW5UeXBlIjoiYWNjZXNzIn0.6_mF-cvzG4qZ-oWBLzg717FiZ16MQP_YaT_BN7BkTWQ` };
    }

    const response = await axiosInstance.post<ApiResponse<T>>(
      endpoint,
      payload,
      {
        headers,
      },
    );

    return response?.data;
  } catch (err) {
    return handleAxiosError(err);
  }
}

export async function patchRequest<T, K = any>(
  endpoint: string,
  payload: K,
  auth?: boolean,
): Promise<ApiResponse<T> | null | ErrorResponse<T>> {
  try {
    let headers = {};
    if (auth) {
      const token = getToken("access");
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }

    const response = await axiosInstance.patch<ApiResponse<T>>(
      endpoint,
      payload,
      {
        headers,
      },
    );

    return response?.data;
  } catch (err) {
    return handleAxiosError(err);
  }
}

export async function deleteRequest<T>(
  endpoint: string,
  auth?: boolean,
): Promise<ApiResponse<T> | null | ErrorResponse<T>> {
  try {
    let headers = {};
    if (auth) {
      const token = getToken("access");
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }

    const response = await axiosInstance.delete<ApiResponse<T>>(endpoint, {
      headers,
    });

    return response?.data;
  } catch (err) {
    return handleAxiosError(err);
  }
}

/**
 * Verifies that an error is a axios error before structuring the response.
 **/

function handleAxiosError<T>(err: unknown): ErrorResponse<T> {
  console.error("Error:", err);
  if (axios.isAxiosError(err)) {
    return {
      __type: "Error",
      statusCode: err?.response?.data?.statusCode || 400,
      message: err?.response?.data?.message || err.message,
      result: err?.response?.data?.result || null,
    };
  }
  return {
    __type: "Error",
    statusCode: 500,
    message: "Unknown error occured.",
    result: null as T,
  };
}

// custom type guard narrowing
export function isErrorResponse<T>(res: any): res is ErrorResponse<T> {
  return res && (res as ErrorResponse<T>).__type === "Error";
}
