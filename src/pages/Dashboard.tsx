import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Import our new components
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardTabContent from '@/components/dashboard/DashboardTabContent';
import AllInvoicesTab from '@/components/dashboard/AllInvoicesTab';
import KycDetailsTab from '@/components/dashboard/KycDetailsTab';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  
  // Mock data
  const kycStatus = {
    status: 'Pending', // Could be 'Pending', 'Verified', 'Rejected'
    date: '15 May, 2025',
    requestDate: '15 May, 2025',
    requestData: {
      submittedOn: '15 May, 2025',
      idType: 'PAN',
      idNumber: 'ABCDE1234F',
      bankAccount: '•••••••789',
      ifscCode: 'SBIN0001234',
      accountHolder: 'John Doe'
    }
  };
  
  const payoutInfo = {
    netPayout: '₹12,450',
    lastPayout: '₹3,200',
    lastPayoutDate: '28 April, 2025'
  };
  
  // Expanded sample invoices data with more entries
  const invoices = [
    {
      id: 'INV-001',
      date: '15 May, 2025',
      amount: '₹2,500',
      status: 'Paid',
      referenceNumber: 'REF123456789'
    },
    {
      id: 'INV-002',
      date: '10 May, 2025',
      amount: '₹1,800',
      status: 'Initiated',
      referenceNumber: 'REF987654321'
    },
    {
      id: 'INV-003',
      date: '5 May, 2025',
      amount: '₹3,200',
      status: 'Paid',
      referenceNumber: 'REF456789123'
    },
    {
      id: 'INV-004',
      date: '28 April, 2025',
      amount: '₹1,950',
      status: 'Payment Due',
      referenceNumber: null
    },
    {
      id: 'INV-005',
      date: '25 April, 2025',
      amount: '₹2,750',
      status: 'Paid',
      referenceNumber: 'REF321654987'
    },
    {
      id: 'INV-006',
      date: '20 April, 2025',
      amount: '₹4,100',
      status: 'Paid',
      referenceNumber: 'REF789123456'
    },
    {
      id: 'INV-007',
      date: '18 April, 2025',
      amount: '₹2,300',
      status: 'Initiated',
      referenceNumber: 'REF654321987'
    },
    {
      id: 'INV-008',
      date: '15 April, 2025',
      amount: '₹1,650',
      status: 'Payment Due',
      referenceNumber: null
    },
    {
      id: 'INV-009',
      date: '12 April, 2025',
      amount: '₹3,800',
      status: 'Paid',
      referenceNumber: 'REF147258369'
    },
    {
      id: 'INV-010',
      date: '8 April, 2025',
      amount: '₹2,900',
      status: 'Paid',
      referenceNumber: 'REF963852741'
    },
    {
      id: 'INV-011',
      date: '5 April, 2025',
      amount: '₹1,200',
      status: 'Initiated',
      referenceNumber: 'REF852741963'
    },
    {
      id: 'INV-012',
      date: '2 April, 2025',
      amount: '₹2,450',
      status: 'Payment Due',
      referenceNumber: null
    },
    {
      id: 'INV-013',
      date: '28 March, 2025',
      amount: '₹3,600',
      status: 'Paid',
      referenceNumber: 'REF741852963'
    },
    {
      id: 'INV-014',
      date: '25 March, 2025',
      amount: '₹1,750',
      status: 'Paid',
      referenceNumber: 'REF369741852'
    },
    {
      id: 'INV-015',
      date: '22 March, 2025',
      amount: '₹2,200',
      status: 'Initiated',
      referenceNumber: 'REF258963147'
    },
    {
      id: 'INV-016',
      date: '18 March, 2025',
      amount: '₹4,500',
      status: 'Paid',
      referenceNumber: 'REF159357486'
    },
    {
      id: 'INV-017',
      date: '15 March, 2025',
      amount: '₹1,900',
      status: 'Payment Due',
      referenceNumber: null
    },
    {
      id: 'INV-018',
      date: '12 March, 2025',
      amount: '₹3,100',
      status: 'Paid',
      referenceNumber: 'REF753951486'
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
      <DashboardHeader 
        affiliateId="MYNTRA123"
        onLogout={handleLogout}
      />
      
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
              kycStatus={kycStatus}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
