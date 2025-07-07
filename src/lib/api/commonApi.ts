import { useMutation } from "@tanstack/react-query";

import { loginApiCall, loginVerifyOtpApiCall } from "./services";

export function useLoginMutation(options?: any) {
  return useMutation<any, Error, any>({
    mutationKey: ["login"],
    mutationFn: async (payload: any) => {
      try {
        const response = await loginApiCall(payload);
        return response?.data;
      } catch (error) {
        throw error;
      }
    },
    ...options,
  });
}


export function useLoginVerifyOtpMutation(options?: any) {
  return useMutation<any, Error, any>({
    mutationKey: ["loginVerifyOtp"],
    mutationFn: async (payload: any) => {
      try {
        const response = await loginVerifyOtpApiCall(payload);
        return response?.data;
      } catch (error) {
        throw error;
      }
    },
    ...options,
  });
}
