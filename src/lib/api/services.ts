import { ENDPOINTS } from "@/utils/endpoints";
import { axiosInstancePublic ,axiosInstancePrivate} from "@/lib/apiCaller";


export const signupApiCall = async (payload: any) => {
  try {
    const response = await axiosInstancePublic.post(ENDPOINTS.signupApi, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyOtpApiCall = async (payload: any) => {
  try {
    const response = await axiosInstancePublic.post(ENDPOINTS.signupVerifyOtpApi, payload);
    return response;
  } catch (error) {
    throw error;
  }
};


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

export const submitKycApiCall = async (payload: any) => {
  try {
    const response = await axiosInstancePrivate.post(ENDPOINTS.kycSubmit, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getKycStatusApiCall = async () => {
  try {
    const response = await axiosInstancePrivate.get(ENDPOINTS.kycStatus);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDashboardApiCall = async (mobile: string) => {
  try {
     const url = `${ENDPOINTS.dashboard}/${mobile}`;
  const response = await axiosInstancePrivate.get(url);
  return response;
  } catch (error) {
    throw error;
  }
};

export const getInvoicesApiCall = async (params: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  status?: string;
}) => {
  try {
    const queryParams = new URLSearchParams({
      sortBy: params.sortBy || "created_at",
      sortOrder: params.sortOrder || "DESC",
      page: params.page?.toString() || "1",
      limit: params.limit?.toString() || "10",
      status: params.status || "paid",
    });

    const response = await axiosInstancePrivate.get(
      `${ENDPOINTS.invoices}?${queryParams.toString()}`
    );

    return response;
  } catch (error) {
    throw error;
  }
};



export const downloadInvoiceApiCall = async (invoiceId: string) => {
  try {
    const response = await axiosInstancePrivate.get(`/invoice/${invoiceId}/download`, {
      responseType: 'blob', 
    });
    return response;
  } catch (error) {
    throw error;
  }
};
