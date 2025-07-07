import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { LogOut, ChevronLeft } from 'lucide-react';
import MyntraLogo from '@/components/MyntraLogo';
import AffiliateDetailsHeader from '@/components/admin/AffiliateDetailsHeader';
import AffiliateKycTab from '@/components/admin/AffiliateKycTab';
import AffiliatePaymentsTab from '@/components/admin/AffiliatePaymentsTab';
import AffiliateInvoicesTab from '@/components/admin/AffiliateInvoicesTab';
import {
  useGetAffiliateByIdQuery,
  useUpdateKycStatusMutation
} from '@/lib/api/adminApi';

const AdminAffiliateDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('kyc');

  const { data: affiliate, isLoading } = useGetAffiliateByIdQuery(id ?? '');
  const [updateKycStatus] = useUpdateKycStatusMutation();

  if (isLoading || !affiliate) {
    return <div className="p-4">Loading...</div>;
  }

  const handleVerifyKyc = async (isApproved: boolean) => {
    const newStatus = isApproved ? 'Verified' : 'Rejected';
    try {
      await updateKycStatus({ id: affiliate.id, status: newStatus }).unwrap();

      toast({
        title: `KYC ${newStatus}`,
        description: `KYC for affiliate ${affiliate.id} has been ${newStatus.toLowerCase()}.`,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update KYC status.',
        variant: 'destructive',
      });
    }
  };

  const handleProcessPayment = () => {
    toast({
      title: "Payment Processed",
      description: `Payment of ${affiliate.currentPayment.amount} for affiliate ${affiliate.id} has been initiated.`,
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice ${invoiceId} has been downloaded.`,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  const handleBackToList = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <MyntraLogo className="h-8 w-auto mr-3" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-red-600 self-end sm:self-auto"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Button
          variant="ghost"
          onClick={handleBackToList}
          className="flex items-center mb-4 sm:mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Affiliates List
        </Button>

        <AffiliateDetailsHeader affiliate={affiliate} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6 sm:mt-8">
          <TabsList className="bg-white shadow-sm rounded-md w-full sm:w-auto grid grid-cols-3 sm:flex">
            <TabsTrigger value="kyc" className="text-xs sm:text-sm">KYC Details</TabsTrigger>
            <TabsTrigger value="payments" className="text-xs sm:text-sm">Payment Details</TabsTrigger>
            <TabsTrigger value="invoices" className="text-xs sm:text-sm">Invoices</TabsTrigger>
          </TabsList>

          <TabsContent value="kyc">
            <AffiliateKycTab
              kycDetails={affiliate.kycDetails}
              kycStatus={affiliate.kycStatus}
              onVerify={handleVerifyKyc}
            />
          </TabsContent>

          <TabsContent value="payments">
            <AffiliatePaymentsTab
              currentPayment={affiliate.currentPayment}
              onProcessPayment={handleProcessPayment}
            />
          </TabsContent>

          <TabsContent value="invoices">
            <AffiliateInvoicesTab
              invoices={affiliate.invoices}
              onDownloadInvoice={handleDownloadInvoice}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminAffiliateDetails;
