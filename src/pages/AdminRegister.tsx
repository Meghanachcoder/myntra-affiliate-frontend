import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import InputField from '@/components/forms/InputField';
import AuthLayout from '@/components/layouts/AuthLayout';

// Define validation schema using Zod
const adminSchema = z.object({
  first_name: z.string().nonempty('First name is required'),
  last_name: z.string().nonempty('Last name is required'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
});

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    try {
      adminSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach(error => {
          const field = error.path[0] as string;
          newErrors[field] = error.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        toast({
          title: 'Registration Failed',
          description: data.msg || 'Something went wrong',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'OTP Sent',
        description: data.msg || 'Please check your phone for the OTP.',
      });

      // Navigate to OTP page (optional)
      navigate('/admin/verify-otp', { state: { mobile: formData.mobile } });

    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to register admin. Try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Admin Registration"
      subtitle="Register to access the admin panel"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          error={errors.first_name}
        />
        <InputField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          error={errors.last_name}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          label="Mobile Number"
          name="mobile"
          type="tel"
          placeholder="10-digit mobile number"
          value={formData.mobile}
          onChange={handleChange}
          error={errors.mobile}
        />

        <Button 
          type="submit"
          className="w-full bg-myntra-purple hover:bg-myntra-dark"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register & Send OTP'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default AdminRegister;
