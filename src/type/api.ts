/**
 * API Types
 *
 * Types for API requests and responses.
 **/

// Response Helper Type - All API responses follow this same format

export type ApiResponse<DataT> = {
  statusCode: number;
  message: string;
  result: DataT;
};

export type ErrorResponse<DataT> = ApiResponse<DataT> & {
  __type: "Error";
};
