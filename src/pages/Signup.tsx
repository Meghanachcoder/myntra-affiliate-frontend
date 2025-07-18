import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Formik, Form } from "formik";

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import InputField from '@/components/forms/InputField';
import AuthLayout from '@/components/layouts/AuthLayout';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { FormError } from '@/components/stack/stack';

import { signupSchema, signupOtpSchema } from '@/schema/common';
import { useSignupMutation, useVerifyOtpMutation } from '@/lib/api/commonApi';
import { logHelper, setUserDetails } from '@/utils/utils';

const TAG = "Signup:";

const Signup = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const affiliateId = searchParams.get('affiliateId') || 'AFF321';

  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: signup } = useSignupMutation();
  const { mutate: verifyOtp } = useVerifyOtpMutation();

  const phoneInitialValues = { mobileNumber: '' };
  const otpInitialValues = { otp: '' };

  const handleSendOtp = async (values: any) => {

    setIsLoading(true);

    const payload = {
      mobile: values.mobileNumber,
      affiliateId: affiliateId
    };

    signup(payload, {
      onSuccess: (res: any) => {
        if (!res?.success) {
          if (res?.msg?.toLowerCase().includes('already')) {
            toast({ title: 'Already Registered', description: 'Redirecting to login...' });
            navigate('/login');
          } else {
            toast({ title: 'Signup Failed', description: res?.msg || 'Something went wrong', variant: 'destructive' });
          }
          return;
        }

        toast({ title: res?.msg || 'OTP sent successfully' });
        setMobileNumber(values.mobileNumber);
        setStep('otp');
      },
      onError: (err: any) => {
        toast({
          title: 'Signup Error',
          description: err?.response?.data?.message || 'Something went wrong',
          variant: 'destructive',
        });
      },
      onSettled: () => {
        setIsLoading(false);
      }
    });
  };

  const handleVerifyOtp = async (values: any) => {

    setIsLoading(true);

    const payload = {
      mobile: mobileNumber,
      otp: values.otp
    };

    verifyOtp(payload, {
      onSuccess: async (res: any) => {

        logHelper(TAG, ' =======> handleVerifyOtp ', res);

        if (!res?.result?.accessToken) {
          toast({ title: 'Verification Failed', description: res?.msg || 'Invalid OTP', variant: 'destructive' });
          return;
        }

        const userDetails = {
          user: res?.result?.user,
          accessToken: res?.result?.accessToken,
          refreshToken: res?.result?.refreshToken
        };

        setUserDetails(userDetails);
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast({ title: 'Account Created', description: 'Your affiliate account has been verified.' });

        navigate('/kyc');

      },
      onError: (err: any) => {
        logHelper(TAG, ' =======> handleVerifyOtp ', err);
        toast({ title: 'OTP Verification Failed', description: err?.response?.data?.msg || 'Something went wrong', variant: 'destructive' });
      },
      onSettled: () => {
        setIsLoading(false);
      }
    });
  };

  if (step === 'otp') {
    return (
      <AuthLayout
        title="Verify OTP"
        subtitle="Enter the 6-digit code sent to your phone"
      >
        <Formik
          initialValues={otpInitialValues}
          validationSchema={signupOtpSchema}
          onSubmit={handleVerifyOtp}
        >
          {({ values, errors, touched, setFieldValue, handleBlur }) => (
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
                {isLoading ? 'Verifying...' : 'Verify & Create Account'}
              </Button>
            </Form>
          )}
        </Formik>

        <Button
          type="button"
          variant="ghost"
          onClick={() => setStep('details')}
          className="w-full mt-4"
        >
          Back to Phone Number
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create Your Affiliate Account"
      subtitle="Sign up to start earning with Myntra"
    >
      <Formik
        initialValues={phoneInitialValues}
        validationSchema={signupSchema}
        onSubmit={handleSendOtp}
      >
        {({ values, errors, touched, setFieldValue, handleBlur }) => (
          <Form>

            <InputField
              label="Affiliate ID"
              name="affiliateId"
              value={affiliateId}
              disabled
              className="bg-gray-100"
            />

            <InputField
              label="Mobile Number"
              name="mobileNumber"
              type="tel"
              placeholder="10-digit mobile number"
              value={values.mobileNumber}
              onChange={(e: any) => setFieldValue('mobileNumber', e.target.value)}
              onBlur={(e: any) => handleBlur(e)}
              maxLength={10}
            />
            {errors.mobileNumber && <FormError errors={errors.mobileNumber} />}
            <Button
              type="submit"
              className="w-full bg-myntra-purple hover:bg-myntra-dark mt-2"
              disabled={isLoading}
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP & Continue'}
            </Button>

            <p className="text-center text-sm text-gray-500 mt-4">
              By signing up, you agree to our{' '}
              <a href="#" className="text-myntra-purple hover:underline">Terms & Conditions</a>{' '}
              and{' '}
              <a href="#" className="text-myntra-purple hover:underline">Privacy Policy</a>
            </p>


            <a href="/login">
              <p className="text-xs text-gray-500 text-center mt-2 underline">
                Already have an account? Login
              </p>
            </a>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Signup;
