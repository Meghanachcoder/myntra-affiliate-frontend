
import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import InputField from '@/components/forms/InputField';
import AuthLayout from '@/components/layouts/AuthLayout';
import { z } from 'zod';

const loginSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const affiliateId = searchParams.get('affiliateId') || '';
  
  const [formData, setFormData] = useState<LoginFormData>({
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof LoginFormData, string>> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof LoginFormData;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real application, this would make an API call to authenticate
      // For now, we'll just simulate a successful login
      localStorage.setItem('isAuthenticated', 'true');
      
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome back to your Myntra Affiliate account",
      });
      
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <AuthLayout 
      title="Login to Your Account" 
      subtitle="Access your Myntra Affiliate dashboard"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Phone Number"
          type="tel"
          name="phone"
          id="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />
        
        <InputField
          label="Password"
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />
        
        <div className="flex justify-end">
          <Link to="/signup" className="text-sm text-myntra-purple hover:underline">
            Don't have an account? Sign up
          </Link>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-myntra-purple hover:bg-myntra-dark"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
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
