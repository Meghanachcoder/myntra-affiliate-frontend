
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/layouts/AuthLayout';
import InputField from '@/components/forms/InputField';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [searchParams] = useSearchParams();
  const affiliateId = searchParams.get('affiliateId') || '';
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    affiliateId,
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      toast({
        title: "Account created",
        description: "Your affiliate account has been created successfully.",
      });
      // Redirect to KYC page - pass the mobile number as part of the state
      navigate('/kyc', { state: { mobile: formData.mobile } });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  return (
    <AuthLayout 
      title="Create your affiliate account" 
      subtitle="Sign up to start earning with Myntra"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
        
        <div className="relative">
          <InputField 
            label="Create Password" 
            name="password" 
            type={showPassword ? "text" : "password"}
            placeholder="Minimum 8 characters" 
            value={formData.password} 
            onChange={handleChange}
            error={errors.password}
          />
          <button 
            type="button"
            className="absolute right-3 top-8 text-gray-500"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        
        <div className="relative">
          <InputField 
            label="Confirm Password" 
            name="confirmPassword" 
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter your password" 
            value={formData.confirmPassword} 
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          <button 
            type="button"
            className="absolute right-3 top-8 text-gray-500"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        
        <Button type="submit" className="w-full bg-myntra-purple hover:bg-myntra-dark">
          Sign Up & Continue
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
