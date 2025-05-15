
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthLayout from '@/components/layouts/AuthLayout';
import InputField from '@/components/forms/InputField';
import { useToast } from '@/components/ui/use-toast';

interface LocationState {
  mobile?: string;
}

const KYC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const state = location.state as LocationState || {};
  
  const [activeTab, setActiveTab] = useState('pan');
  const [formData, setFormData] = useState({
    pan: '',
    gstin: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifsc: '',
    accountName: '',
    mobile: state.mobile || '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    
    // Always validate PAN regardless of active tab - PAN is required
    if (!formData.pan) {
      newErrors.pan = 'PAN is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      newErrors.pan = 'Please enter a valid PAN';
    }
    
    // GSTIN is now optional, only validate format if provided
    if (formData.gstin && !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(formData.gstin)) {
      newErrors.gstin = 'Please enter a valid GSTIN';
    }
    
    // Validate bank account details
    if (!formData.accountNumber) {
      newErrors.accountNumber = 'Account number is required';
    } else if (!/^\d{9,18}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = 'Please enter a valid account number (9-18 digits)';
    }
    
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = 'Account numbers do not match';
    }
    
    if (!formData.ifsc) {
      newErrors.ifsc = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc)) {
      newErrors.ifsc = 'Please enter a valid IFSC code';
    }
    
    if (!formData.accountName) {
      newErrors.accountName = 'Account holder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('KYC submitted:', formData);
      toast({
        title: "KYC Submitted",
        description: "Your KYC details have been submitted successfully.",
      });
      // Redirect to dashboard page instead of KYC success
      navigate('/dashboard');
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Clear any errors related to the previous tab
    const newErrors = { ...errors };
    if (value === 'pan') {
      delete newErrors.gstin;
    }
    setErrors(newErrors);
  };

  return (
    <AuthLayout 
      title="KYC Verification" 
      subtitle="Complete your KYC to start receiving payments"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField 
          label="PAN Number (Required)" 
          name="pan" 
          placeholder="ABCDE1234F" 
          value={formData.pan} 
          onChange={handleChange}
          error={errors.pan}
          className="mb-4"
          maxLength={10}
          autoComplete="off"
        />
        
        <InputField 
          label="GSTIN (Optional)" 
          name="gstin" 
          placeholder="22AAAAA0000A1Z5" 
          value={formData.gstin} 
          onChange={handleChange}
          error={errors.gstin}
          className="mb-4"
          maxLength={15}
          autoComplete="off"
        />
        
        <div className="form-divider">
          <div className="form-divider-line"></div>
          <span className="form-divider-text">Bank Account Details</span>
          <div className="form-divider-line"></div>
        </div>
        
        <InputField 
          label="Account Number" 
          name="accountNumber" 
          type="password"
          placeholder="Enter your account number" 
          value={formData.accountNumber} 
          onChange={handleChange}
          error={errors.accountNumber}
          autoComplete="off"
        />
        
        <InputField 
          label="Confirm Account Number" 
          name="confirmAccountNumber" 
          placeholder="Re-enter your account number" 
          value={formData.confirmAccountNumber} 
          onChange={handleChange}
          error={errors.confirmAccountNumber}
          autoComplete="off"
        />
        
        <InputField 
          label="IFSC Code" 
          name="ifsc" 
          placeholder="e.g. SBIN0000123" 
          value={formData.ifsc} 
          onChange={handleChange}
          error={errors.ifsc}
          autoComplete="off"
        />
        
        <InputField 
          label="Account Holder Name" 
          name="accountName" 
          placeholder="Name as per bank records" 
          value={formData.accountName} 
          onChange={handleChange}
          error={errors.accountName}
        />
        
        <Button type="submit" className="w-full bg-myntra-purple hover:bg-myntra-dark">
          Submit KYC Details
        </Button>
      </form>
    </AuthLayout>
  );
};

export default KYC;
