
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Check, Clock, FileText, Edit, AlertTriangle, TrendingUp } from 'lucide-react';
import MyntraLogo from '@/components/MyntraLogo';

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
    pending: '₹12,500',
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
  
  const handleEditKyc = () => {
    toast({
      title: "Edit KYC",
      description: "You will be redirected to update your KYC details.",
    });
    navigate('/kyc');
  };
  
  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice Download",
      description: `Invoice ${invoiceId} download started.`,
    });
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Verified') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <Check className="w-3 h-3 mr-1" /> Verified
        </span>
      );
    } else if (status === 'Pending') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" /> Pending
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <AlertTriangle className="w-3 h-3 mr-1" /> Rejected
        </span>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <MyntraLogo className="h-8 w-auto mr-3" />
            <h1 className="text-xl font-bold text-gray-900">Affiliate Dashboard</h1>
          </div>
          <div>
            <span className="text-sm text-gray-600 mr-2">Affiliate ID:</span>
            <span className="font-medium">MYNTRA123</span>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white shadow-sm rounded-md">
            <TabsTrigger value="home">Dashboard</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="kyc">KYC Details</TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab */}
          <TabsContent value="home" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* KYC Status Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">KYC Status</h2>
                    {getStatusBadge(kycStatus.status)}
                  </div>
                  <p className="text-sm text-gray-500">
                    Last updated: {kycStatus.date}
                  </p>
                </CardContent>
              </Card>
              
              {/* Payout Pending Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-1">
                    <Clock className="w-5 h-5 mr-2 text-yellow-500" />
                    <h2 className="text-lg font-medium">Payout Pending</h2>
                  </div>
                  <p className="text-3xl font-bold text-myntra-purple">{payoutInfo.pending}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Expected by 30 May, 2025
                  </p>
                </CardContent>
              </Card>
              
              {/* Net Payout Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-1">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                    <h2 className="text-lg font-medium">Net Payout Till Date</h2>
                  </div>
                  <p className="text-3xl font-bold text-myntra-purple">{payoutInfo.netPayout}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Last payout: {payoutInfo.lastPayout} on {payoutInfo.lastPayoutDate}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Invoices */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Recent Invoices</h2>
                  <Button variant="outline" onClick={() => setActiveTab('invoices')}>
                    View All
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.slice(0, 3).map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>
                          {invoice.status === 'Paid' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {invoice.status}
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              {invoice.status}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleDownloadInvoice(invoice.id)}
                            className="flex items-center"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">All Invoices</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>
                          {invoice.status === 'Paid' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {invoice.status}
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              {invoice.status}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleDownloadInvoice(invoice.id)}
                            className="flex items-center"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* KYC Details Tab */}
          <TabsContent value="kyc">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">KYC Details</h2>
                  <Button 
                    onClick={handleEditKyc}
                    className="flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Details
                  </Button>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        If edited, verification will be required and payouts will be paused till verification is complete.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">ID Type</h3>
                    <p className="text-base">{kycDetails.idType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">{kycDetails.idType} Number</h3>
                    <p className="text-base">{kycDetails.idValue}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Bank Account Number</h3>
                    <p className="text-base">{kycDetails.accountNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">IFSC Code</h3>
                    <p className="text-base">{kycDetails.ifsc}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Account Holder Name</h3>
                    <p className="text-base">{kycDetails.accountName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
