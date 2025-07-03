
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import InputField from '@/components/forms/InputField';
import AuthLayout from '@/components/layouts/AuthLayout';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { z } from 'zod';

const phoneSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type PhoneFormData = z.infer<typeof phoneSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const affiliateId = searchParams.get('affiliateId') || '';
  
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneData, setPhoneData] = useState<PhoneFormData>({ phone: '' });
  const [otpData, setOtpData] = useState<OtpFormData>({ otp: '' });
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

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone()) return;

    setIsLoading(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code",
      });
      setStep('otp');
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateOtp()) return;

    setIsLoading(true);
    
    // Simulate API call to verify OTP
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome back to your Myntra Affiliate account",
      });
      
      navigate('/dashboard');
    }, 1000);
  };

  const handleResendOtp = () => {
    toast({
      title: "OTP Resent",
      description: "A new verification code has been sent to your phone",
    });
  };

  if (step === 'otp') {
    return (
      <AuthLayout 
        title="Verify OTP" 
        subtitle="Enter the 6-digit code sent to your phone"
      >
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Enter OTP
            </label>
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
      title="Login to Your Account" 
      subtitle="Access your Myntra Affiliate dashboard"
    >
      <form onSubmit={handleSendOtp} className="space-y-4">
        <InputField
          label="Phone Number"
          type="tel"
          name="phone"
          id="phone"
          placeholder="Enter your phone number"
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
        
        {affiliateId && (
          <p className="text-xs text-gray-500 text-center">
            Affiliate ID: {affiliateId}
          </p>
        )}
      </form>
    </AuthLayout>
  );
};

export default Login;
