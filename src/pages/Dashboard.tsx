import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardTabContent from '@/components/dashboard/DashboardTabContent';
import AllInvoicesTab from '@/components/dashboard/AllInvoicesTab';
import KycDetailsTab from '@/components/dashboard/KycDetailsTab';

import { useGetDashboardQuery } from '@/lib/api/dashboardApi';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('home');

  
  const mobile = localStorage.getItem('user_mobile') || '';

  const { data, isLoading, error } = useGetDashboardQuery(mobile);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Failed to load dashboard',
        description: 'Please try again later or contact support.',
        variant: 'destructive',
      });
    }
  }, [error]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_mobile');
    navigate('/login');
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: 'Invoice Download',
      description: `Invoice ${invoiceId} download started.`,
    });
  };

  if (isLoading || !data) return <p className="text-center py-8">Loading dashboard...</p>;

  const { affiliateId, kycStatus, payout_info, invoices } = data.result;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader affiliateId={affiliateId} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 sm:space-y-8">
          <TabsList className="bg-white shadow-sm rounded-md w-full grid grid-cols-3 h-auto p-1">
            <TabsTrigger value="home" className="text-base sm:text-lg py-2 px-2 sm:px-3">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="invoices" className="text-base sm:text-lg py-2 px-2 sm:px-3">
              Invoices
            </TabsTrigger>
            <TabsTrigger value="kyc" className="text-base sm:text-lg py-2 px-2 sm:px-3">
              KYC Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <DashboardTabContent
              kycStatus={{
                status: kycStatus.status,
                requestDate: new Date(kycStatus.request_date).toLocaleDateString(),
                requestData: {
                  submittedOn: new Date(kycStatus.last_updated).toLocaleDateString(),
                  idType: kycStatus.submitted_info.id_type,
                  idNumber: kycStatus.submitted_info.id_number,
                  bankAccount: kycStatus.submitted_info.bank_account,
                  ifscCode: kycStatus.submitted_info.ifsc_code,
                  accountHolder: kycStatus.submitted_info.account_holder,
                },
              }}
              payoutInfo={{
                netPayout: `₹${payout_info.net_payout}`,
                lastPayout: `₹${payout_info.last_payout}`,
                lastPayoutDate: '', 
              }}
              invoices={invoices}
              onViewAllInvoices={() => setActiveTab('invoices')}
              onDownloadInvoice={handleDownloadInvoice}
            />
          </TabsContent>

          <TabsContent value="invoices">
            <AllInvoicesTab invoices={invoices} onDownload={handleDownloadInvoice} />
          </TabsContent>

          <TabsContent value="kyc">
            <KycDetailsTab
              kycDetails={{
                idType: kycStatus.submitted_info.id_type,
                idValue: kycStatus.submitted_info.id_number,
                accountNumber: kycStatus.submitted_info.bank_account,
                ifsc: kycStatus.submitted_info.ifsc_code,
                accountName: kycStatus.submitted_info.account_holder,
              }}
              kycStatus={{
                status: kycStatus.status,
                date: new Date(kycStatus.last_updated).toLocaleDateString(),
                requestDate: new Date(kycStatus.request_date).toLocaleDateString(),
                requestData: {},
              }}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
