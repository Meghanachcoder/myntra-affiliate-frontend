import { useMutation, useQuery } from "@tanstack/react-query";

// import { signupApiCall, verifyOtpApiCall, loginApiCall, loginVerifyOtpApiCall, submitKycApiCall, getKycStatusApiCall, getDashboardApiCall, getInvoicesApiCall } from "./services";


import {signupApiCall, verifyOtpApiCall, loginApiCall, loginVerifyOtpApiCall ,submitKycApiCall, getKycStatusApiCall,getDashboardApiCall,getInvoicesApiCall,getAdminAffiliatesApiCall,getAffiliateByIdApiCall,updateKycStatusApiCall,processPaymentApiCall} from "./services";


export function useSignupMutation(options?: any) {
  return useMutation<any, Error, any>({
    mutationKey: ['signup'],
    mutationFn: async (payload: any) => {
      const response = await signupApiCall(payload);
      return response?.data;
    },
    ...options,
  });
}

export function useVerifyOtpMutation(options?: any) {
  return useMutation<any, Error, any>({
    mutationKey: ['verifySignupOtp'],
    mutationFn: async (payload: any) => {
      const response = await verifyOtpApiCall(payload);
      return response?.data;
    },
    ...options,
  });
}

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


export function useSubmitKycMutation(options?: any) {
  return useMutation<any, Error, any>({
    mutationKey: ['submitKyc'],
    mutationFn: async (payload: any) => {
      const response = await submitKycApiCall(payload);
      return response?.data;
    },
    ...options,
  });
}

export function useGetKycStatusQuery(options?: any) {
  return useQuery<any, Error>({
    queryKey: ['getKycStatus'],
    queryFn: async () => {
      const response = await getKycStatusApiCall();
      return response?.data;
    },
    ...options,
  });
}

export function useGetDashboardQuery() {
  return useQuery<any, Error>({
    queryKey: ['getDashboard'],
    queryFn: async () => {
      const res = await getDashboardApiCall(); 
      return res?.data;
    },
  });
}



export function useGetInvoicesQuery(options: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  status?: string;
  enabled?: boolean;
}) {
  const {
    page = 1,
    limit = 10,
    sortBy = "created_at",
    sortOrder = "DESC",
    status = "paid",
    enabled = true,
  } = options;

  return useQuery({
    queryKey: ["getInvoices", page, limit, sortBy, sortOrder, status],
    queryFn: async () => {
      const res = await getInvoicesApiCall({ page, limit, sortBy, sortOrder, status });
      return res?.data?.result; 
    },
    enabled,
  });
}


export function useGetAllAdminAffiliatesQuery({
  page = 1,
  limit = 10,
  sortBy = 'created_at',
  sortOrder = 'ASC',
  search = '',
  enabled = true,
}) {
  return useQuery({
    queryKey: ['getAllAdminAffiliates', page, limit, sortBy, sortOrder, search],
    queryFn: async () => {
      const res = await getAdminAffiliatesApiCall({ page, limit, sortBy, sortOrder, search });
      return res?.data;
    },
    enabled,
  });
}


export function useGetAffiliateByIdQuery(id: string) {
  return useQuery({
    queryKey: ['getAffiliateById', id],
    queryFn: async () => {
      const res = await getAffiliateByIdApiCall(id);
      return {
  ...res?.data?.result,
  kyc: {
    ...res?.data?.result.kyc,
    accountNumber: res?.data?.result.kyc?.account_number,
    accountName: res?.data?.result.kyc?.account_name,
    
  },
};
    },
    enabled: !!id, 
  });
}

export function useUpdateKycStatusMutation(options?: any) {
  return useMutation({
    mutationKey: ['updateKycStatus'],
    mutationFn: async (payload: { id: string; status: string }) => {
      const res = await updateKycStatusApiCall(payload);
      return res?.data;
    },
    ...options,
  });
}



export function useProcessPaymentMutation(options?: any) {
  return useMutation<any, Error, string>({
    mutationKey: ['processAffiliatePayment'],
    mutationFn: async (affiliateId: string) => {
      const response = await processPaymentApiCall(affiliateId);
      return response?.data;
    },
    ...options,
  });
}
