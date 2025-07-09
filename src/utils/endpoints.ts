
export const ENDPOINTS = {
  signupApi: `/auth/signup`,
  signupVerifyOtpApi: `/auth/verify-otp`,
  loginApi: `/auth/login/send-otp`,
  loginVerifyOtpApi: `/auth/login/verify-otp`,
  kycSubmit: `/kyc/submit`,
  kycStatus: `/kyc/status`,
  dashboard: `/dashboard`,
  invoices: `/dashboard/invoices`,
  adminAffiliates: '/admin/affiliates',
  getAffiliateById: (id: string) => `/admin/affiliates/${id}`,
  updateKycStatus: (id: string) => `/admin/affiliates/${id}/kyc`,
  downloadInvoice: (id: string) => `/invoice/${id}/download`,
  processPayout: `/admin/affiliates/payout`, 
};
