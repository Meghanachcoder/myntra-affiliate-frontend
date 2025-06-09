
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/layouts/AuthLayout';
import InputField from '@/components/forms/InputField';
import { useToast } from '@/components/ui/use-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const Signup = () => {
  const [searchParams] = useSearchParams();
  const affiliateId = searchParams.get('affiliateId') || 'MYNTRA123';
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [formData, setFormData] = useState({
    affiliateId,
    mobile: '',
    otp: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.otp) {
      newErrors.otp = 'OTP is required';
    } else if (formData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateDetails()) {
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
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateOtp()) {
      setIsLoading(true);
      // Simulate API call to verify OTP
      setTimeout(() => {
        setIsLoading(false);
        console.log('Form submitted:', formData);
        toast({
          title: "Account created",
          description: "Your affiliate account has been created successfully.",
        });
        // Redirect to KYC page
        navigate('/kyc', { state: { mobile: formData.mobile } });
      }, 1000);
    }
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
        title="Verify Your Phone Number" 
        subtitle="Enter the 6-digit code sent to your phone"
      >
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">
              Code sent to: <span className="font-medium">{formData.mobile}</span>
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={formData.otp}
                onChange={(value) => setFormData(prev => ({ ...prev, otp: value }))}
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
            {isLoading ? 'Verifying...' : 'Verify & Create Account'}
          </Button>
          
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => setStep('details')}
            className="w-full"
          >
            Back to Details
          </Button>
        </form>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Create your affiliate account" 
      subtitle="Sign up to start earning with Myntra"
    >
      <form onSubmit={handleSendOtp} className="space-y-4">
        <InputField 
          label="Affiliate ID" 
          name="affiliateId" 
          value={formData.affiliateId} 
          onChange={handleChange}
          disabled
          className="bg-gray-50"
        />
        
        <InputField 
          label="Mobile Number" 
          name="mobile" 
          type="tel"
          placeholder="10-digit mobile number" 
          value={formData.mobile} 
          onChange={handleChange}
          error={errors.mobile}
          maxLength={10}
        />
        
        <Button type="submit" className="w-full bg-myntra-purple hover:bg-myntra-dark" disabled={isLoading}>
          {isLoading ? 'Sending OTP...' : 'Send OTP & Continue'}
        </Button>
        
        <p className="text-center text-sm text-gray-500 mt-4">
          By signing up, you agree to our{" "}
          <a href="#" className="text-myntra-purple hover:underline">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-myntra-purple hover:underline">
            Privacy Policy
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
