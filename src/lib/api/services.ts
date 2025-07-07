import { ENDPOINTS } from "@/utils/endpoints";
import { axiosInstancePublic } from "@/lib/apiCaller";

export const loginApiCall = async (payload: any) => {
  try {
    const response = await axiosInstancePublic.post(ENDPOINTS.loginApi, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginVerifyOtpApiCall = async (payload: any) => {
  try {
    const response = await axiosInstancePublic.post(ENDPOINTS.loginVerifyOtpApi, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

