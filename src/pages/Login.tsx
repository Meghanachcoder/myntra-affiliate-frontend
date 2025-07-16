import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Formik, Form } from "formik";

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import InputField from '@/components/forms/InputField';
import AuthLayout from '@/components/layouts/AuthLayout';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { FormError } from '@/components/stack/stack';

import { mobileNumberSchema, otpSchema } from '@/schema/common';
import { logHelper, setUserDetails } from '@/utils/utils';
import { useLoginMutation, useLoginVerifyOtpMutation } from '@/lib/api/commonApi';

const TAG: string = 'Login: ';
const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { mutate: loginSendOtp } = useLoginMutation({ enabled: false });
  const { mutate: loginVerifyOtp } = useLoginVerifyOtpMutation({ enabled: false });

  const affiliateId = searchParams.get('affiliateId') || '';

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [otpFormKey, setOtpFormKey] = useState(0); 
  const [mobile, setMobile] = useState(''); 

  const otpInitialValues = { otp: '' };
  const phoneInitialValues = { mobileNumber: '' };

  const handleSendOtp = async (values: any) => {
    logHelper(TAG, " ===> handleSendOtp", values);
    setIsLoading(true);

    try {
      const formData = { mobile: values.mobileNumber.toString() };

      loginSendOtp(formData, {
        onSuccess: (res: any) => {
          logHelper(TAG, " ===> res", res);

          if (res?.status !== 200 || res?.success !== true) {
            toast({
              title: "Failed to Send OTP",
              description: res?.msg || "Something went wrong",
              variant: "destructive"
            });
          } else {
            toast({ title: res?.msg, variant: "default" });
            setOtpFormKey(prev => prev + 1);
            setMobile(values.mobileNumber); 
            setStep('otp');
          }
        },
        onError: (err: any) => {
          logHelper(TAG, " ===> err", err);
          toast({
            title: "Failed to Send OTP",
            description: err?.response?.data?.msg || "Something went wrong",
            variant: "destructive"
          });
        }
      });
    } catch (error: any) {
      logHelper(TAG, " ===> API Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (values: any) => {
    logHelper(TAG, " ===> handleVerifyOtp", values);
    setIsLoading(true);

    try {
      const formData = {
        mobile: mobile.toString().trim(),
        otp: values.otp.toString().trim()
      };

      loginVerifyOtp(formData, {
        onSuccess: async (res: any) => {
          logHelper(TAG, " ===> res", res);

          const user = res?.result?.user;

          if (res?.status === 403 && res?.result?.requireKyc) {
            toast({ title: 'KYC Not Completed', description: res?.msg || 'Redirecting to KYC...' });

            const userDetails = {
              user,
              accessToken: res?.result?.accessToken,
              refreshToken: res?.result?.refreshToken
            };

            setUserDetails(userDetails);
            setTimeout(() => {
              navigate('/kyc', { state: { mobile: user?.mobile } });
            }, 100);
            return;
          }

          if (res?.status !== 200 || res?.success !== true) {
            toast({
              title: "Failed to Verify OTP",
              description: res?.msg || "Something went wrong",
              variant: "destructive"
            });
            return;
          }

          toast({ title: res?.msg || "Login Successful", variant: "default" });

          const userDetails = {
            user,
            accessToken: res?.result?.accessToken,
            refreshToken: res?.result?.refreshToken,
            is_admin: res?.result?.is_admin || false,
          };

          setUserDetails(userDetails);
          logHelper(TAG, " ===> i ran till here ", userDetails);
          await new Promise(resolve => setTimeout(resolve, 2000));
          navigate(res?.result?.is_admin ? '/admin' : '/dashboard');
        },
        onError: (err: any) => {
          logHelper(TAG, " ===> err", err);

          const status = err?.response?.status;
          const msg = err?.response?.data?.msg;
          const result = err?.response?.data?.result;

          if (status === 403 && result?.requireKyc) {
            toast({
              title: 'KYC Not Completed',
              description: msg || 'Redirecting to KYC...'
            });

            const userDetails = {
              user: result?.user,
              accessToken: result?.accessToken,
              refreshToken: result?.refreshToken
            };

            setUserDetails(userDetails);
            navigate('/kyc', { state: { mobile: result?.user?.mobile } });
            return;
          }

          toast({
            title: "Failed to Verify OTP",
            description: msg || "Something went wrong",
            variant: "destructive"
          });
        }
      });

    } catch (error: any) {
      logHelper(TAG, " ===> API Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'otp') {
    return (
      <AuthLayout
        title="Verify OTP"
        subtitle="Enter the 6-digit code sent to your phone"
      >
        <Formik
          key={otpFormKey}
          initialValues={otpInitialValues}
          validationSchema={otpSchema}
          onSubmit={handleVerifyOtp}
        >
          {({ values, errors, setFieldValue }) => (
            <Form>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Enter OTP</label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={values.otp}
                    onChange={(value) => setFieldValue('otp', value)}
                    name="otp"
                    id="otp"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {errors.otp && <FormError errors={errors.otp} />}
              </div>

              <Button
                type="submit"
                className="w-full bg-myntra-purple hover:bg-myntra-dark mt-2"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify & Login'}
              </Button>
            </Form>
          )}
        </Formik>

        <Button
          type="button"
          variant="ghost"
          onClick={() => setStep('phone')}
          className="w-full"
        >
          Back to Phone Number
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Login to Your Account"
      subtitle="Access your Myntra Affiliate dashboard"
    >
      <Formik
        initialValues={{ mobileNumber: mobile || '' }}
        validationSchema={mobileNumberSchema}
        onSubmit={handleSendOtp}
      >
        {({ values, errors, setFieldValue }) => (
          <Form>
            <InputField
              label="Phone Number"
              type="tel"
              name="mobileNumber"
              id="mobileNumber"
              placeholder="Enter your phone number"
              value={values.mobileNumber}
              onChange={(e: any) => {
                setFieldValue('mobileNumber', e.target.value);
                setMobile(e.target.value);
              }}
              className="!mb-0"
            />
            {errors.mobileNumber && <FormError errors={errors.mobileNumber} />}

            <Button
              type="submit"
              className="w-full bg-myntra-purple hover:bg-myntra-dark mt-2"
              disabled={isLoading}
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;
