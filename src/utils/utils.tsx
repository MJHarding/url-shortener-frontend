import axios from "axios";

export const getErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || err.message || "An error occurred";
  } else if (err instanceof Error) {
    return err.message;
  }
  return "An unexpected error occurred";
};