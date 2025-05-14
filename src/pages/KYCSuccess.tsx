
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import AuthLayout from '@/components/layouts/AuthLayout';

const KYCSuccess = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // In a real application, this would navigate to the dashboard
    navigate('/');
  };

  return (
    <AuthLayout 
      title="KYC Submitted Successfully" 
      subtitle="Your details are being verified"
    >
      <div className="text-center py-6">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Thank you for submitting your KYC details
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          We are reviewing your information. This typically takes 1-2 business days.
          You will receive an update via SMS once the verification is complete.
        </p>
        <Button 
          onClick={handleContinue} 
          className="w-full bg-myntra-purple hover:bg-myntra-dark"
        >
          Continue to Dashboard
        </Button>
      </div>
    </AuthLayout>
  );
};

export default KYCSuccess;
