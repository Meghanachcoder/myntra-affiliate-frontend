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
  useUpdateKycStatusMutation,
  useProcessPaymentMutation,
} from '@/lib/api/commonApi';
import { downloadInvoiceApiCall } from '@/lib/api/services'; 
const AdminAffiliateDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('kyc');

  const { data: affiliate, isLoading, refetch } = useGetAffiliateByIdQuery(id ?? '');
  const updateKycMutation = useUpdateKycStatusMutation();
  const processPaymentMutation = useProcessPaymentMutation();

  if (isLoading || !affiliate) {
    return <div className="p-4">Loading...</div>;
  }

  const handleVerifyKyc = async (isApproved: boolean) => {
    const newStatus = isApproved ? 'Verified' : 'Rejected';
    try {
      await updateKycMutation.mutateAsync({
        id: affiliate.affiliateId, 
        status: newStatus.toLowerCase(),
        reason: isApproved ? '' : 'KYC rejected by admin', 
});

      await refetch(); // refresh updated status

      toast({
        title: `KYC ${newStatus}`,
        description: `KYC for affiliate ${affiliate.affiliateId} has been ${newStatus.toLowerCase()}.`,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update KYC status.',
        variant: 'destructive',
      });
    }
  };

  const handleProcessPayment = async () => {
    try {
      const res = await processPaymentMutation.mutateAsync(affiliate.id);
      await refetch(); // refresh affiliate after payout

      toast({
        title: 'Payout Successful',
        description: `₹${affiliate.currentPayment.amount} paid. Razorpay Ref ID: ${res?.razorpayPayoutId || 'N/A'}`,
      });
    } catch (err) {
      toast({
        title: 'Payout Failed',
        description: 'Could not initiate affiliate payout.',
        variant: 'destructive',
      });
    }
  };

  const handleDownloadInvoice = async (invoiceId: string) => {
    try {
      const response = await downloadInvoiceApiCall(invoiceId);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: 'Invoice Downloaded',
        description: `Invoice ${invoiceId} has been downloaded.`,
      });
    } catch {
      toast({
        title: 'Download Failed',
        description: 'Unable to download the invoice.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/login');
  };

  const handleBackToList = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
     
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
            kycDetails={affiliate.kyc}
            kycStatus={affiliate.kyc?.status}
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
