import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import InputField from '@/components/forms/InputField';
import AuthLayout from '@/components/layouts/AuthLayout';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { z } from 'zod';
import {
  useLoginMutation,
  useLoginVerifyOtpMutation,
} from '@/lib/api/commonApi';

const phoneSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const { mutate: sendOtp } = useLoginMutation();
  const { mutate: verifyOtp } = useLoginVerifyOtpMutation();

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneData, setPhoneData] = useState({ phone: '' });
  const [otpData, setOtpData] = useState({ otp: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validatePhone = (): boolean => {
    try {
      phoneSchema.parse(phoneData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const validateOtp = (): boolean => {
    try {
      otpSchema.parse(otpData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPhoneData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone()) return;

    setIsLoading(true);
    try {
      await sendOtp(phoneData.phone);
      toast({
        title: "OTP Sent",
        description: "Check your phone for the admin login code.",
      });
      setStep('otp');
    } catch (error: any) {
      toast({
        title: "Failed to Send OTP",
        description: error?.data?.msg || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateOtp()) return;

    setIsLoading(true);
    try {
      const response: any = await verifyOtp({
        mobile: phoneData.phone,
        otp: otpData.otp,
      });

      if (response?.result?.token) {
        localStorage.setItem('admin_token', response.result.token);
        // You can also store `refreshToken` or `admin` info if needed
      }

      toast({
        title: "Login Successful",
        description: response?.msg || "Welcome to the admin dashboard",
      });

      navigate('/admin/dashboard');
    } catch (error: any) {
      toast({
        title: "OTP Verification Failed",
        description: error?.data?.msg || "Invalid OTP or mobile number.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!phoneData.phone) {
      toast({
        title: "Missing Phone Number",
        description: "Please enter your phone number first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await sendOtp(phoneData.phone);
      toast({
        title: "OTP Resent",
        description: "A new code has been sent to your admin number.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to Resend OTP",
        description: error?.data?.msg || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'otp') {
    return (
      <AuthLayout
        title="Verify Admin OTP"
        subtitle="Enter the 6-digit code sent to your mobile"
      >
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Enter OTP</label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otpData.otp}
                onChange={(value) => setOtpData({ otp: value })}
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
            {errors.otp && (
              <p className="text-sm text-red-600">{errors.otp}</p>
            )}
          </div>

          <div className="text-center">
            <Button
              type="button"
              variant="ghost"
              onClick={handleResendOtp}
              className="text-sm text-myntra-purple hover:underline"
            >
              Didn't receive code? Resend OTP
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-myntra-purple hover:bg-myntra-dark"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify & Login'}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep('phone')}
            className="w-full"
          >
            Back to Phone Number
          </Button>
        </form>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Admin Login"
      subtitle="Login to access the admin dashboard"
    >
      <form onSubmit={handleSendOtp} className="space-y-4">
        <InputField
          label="Mobile Number"
          type="tel"
          name="phone"
          id="phone"
          placeholder="Enter your admin mobile number"
          value={phoneData.phone}
          onChange={handlePhoneChange}
          error={errors.phone}
          required
        />

        <Button
          type="submit"
          className="w-full bg-myntra-purple hover:bg-myntra-dark"
          disabled={isLoading}
        >
          {isLoading ? 'Sending OTP...' : 'Send OTP'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default AdminLogin;
