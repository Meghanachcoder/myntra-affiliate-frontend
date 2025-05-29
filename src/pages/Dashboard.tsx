import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Import our new components
import DashboardTabContent from '@/components/dashboard/DashboardTabContent';
import AllInvoicesTab from '@/components/dashboard/AllInvoicesTab';
import KycDetailsTab from '@/components/dashboard/KycDetailsTab';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  
  // Mock data
  const kycStatus = {
    status: 'Verified', // Could be 'Pending', 'Verified', 'Rejected'
    date: '15 May, 2025'
  };
  
  const payoutInfo = {
    netPayout: '₹47,800',
    lastPayout: '₹8,200',
    lastPayoutDate: '10 May, 2025'
  };
  
  const invoices = [
    { 
      id: 'INV001', 
      date: '10 May, 2025', 
      amount: '₹8,200', 
      status: 'Paid' 
    },
    { 
      id: 'INV002', 
      date: '05 May, 2025', 
      amount: '₹9,600', 
      status: 'Paid' 
    },
    { 
      id: 'INV003', 
      date: '28 Apr, 2025', 
      amount: '₹12,500', 
      status: 'Processing' 
    },
    { 
      id: 'INV004', 
      date: '15 Apr, 2025', 
      amount: '₹17,500', 
      status: 'Paid' 
    }
  ];
  
  const kycDetails = {
    idType: 'PAN',
    idValue: 'ABCDE1234F',
    accountNumber: '•••••••789',
    ifsc: 'SBIN0001234',
    accountName: 'John Doe'
  };
  
  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice Download",
      description: `Invoice ${invoiceId} download started.`,
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

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 sm:space-y-8">
          <TabsList className="bg-white shadow-sm rounded-md w-full grid grid-cols-3 h-auto p-1">
            <TabsTrigger value="home" className="text-sm sm:text-base py-2 px-2 sm:px-3">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="invoices" className="text-sm sm:text-base py-2 px-2 sm:px-3">
              Invoices
            </TabsTrigger>
            <TabsTrigger value="kyc" className="text-sm sm:text-base py-2 px-2 sm:px-3">
              KYC Details
            </TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab */}
          <TabsContent value="home">
            <DashboardTabContent
              kycStatus={kycStatus}
              payoutInfo={payoutInfo}
              invoices={invoices}
              onViewAllInvoices={() => setActiveTab('invoices')}
              onDownloadInvoice={handleDownloadInvoice}
            />
          </TabsContent>
          
          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <AllInvoicesTab 
              invoices={invoices} 
              onDownload={handleDownloadInvoice} 
            />
          </TabsContent>
          
          {/* KYC Details Tab */}
          <TabsContent value="kyc">
            <KycDetailsTab 
              kycDetails={kycDetails} 
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
