import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Search, Check, Clock, AlertTriangle, UserCheck, ExternalLink } from 'lucide-react';
import MyntraLogo from '@/components/MyntraLogo';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for affiliates - removed pendingPayout
  const affiliates = [
    {
      id: 'MYNTRA123',
      name: 'John Doe',
      phone: '+91 9876543210',
      kycStatus: 'Verified',
      netPayout: '₹47,800',
      lastUpdated: '15 May, 2025'
    },
    {
      id: 'MYNTRA456',
      name: 'Jane Smith',
      phone: '+91 9876543211',
      kycStatus: 'Pending',
      netPayout: '₹32,400',
      lastUpdated: '12 May, 2025'
    },
    {
      id: 'MYNTRA789',
      name: 'David Johnson',
      phone: '+91 9876543212',
      kycStatus: 'Rejected',
      netPayout: '₹15,600',
      lastUpdated: '10 May, 2025'
    },
    {
      id: 'MYNTRA321',
      name: 'Sarah Williams',
      phone: '+91 9876543213',
      kycStatus: 'Verified',
      netPayout: '₹89,200',
      lastUpdated: '14 May, 2025'
    },
    {
      id: 'MYNTRA654',
      name: 'Michael Brown',
      phone: '+91 9876543214',
      kycStatus: 'Verified',
      netPayout: '₹61,300',
      lastUpdated: '11 May, 2025'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  const handleViewAffiliate = (affiliateId: string) => {
    navigate(`/admin/affiliate/${affiliateId}`);
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

  const filteredAffiliates = affiliates.filter(affiliate => 
    affiliate.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    affiliate.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <MyntraLogo className="h-8 w-auto mr-3" />
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-red-600"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-6 w-6 text-myntra-purple" />
                <h2 className="text-xl font-semibold">Affiliate Management</h2>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search affiliates..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Affiliate ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>KYC Status</TableHead>
                    <TableHead>Net Payout Till Date</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAffiliates.map((affiliate) => (
                    <TableRow key={affiliate.id}>
                      <TableCell className="font-medium">{affiliate.id}</TableCell>
                      <TableCell>{affiliate.name}</TableCell>
                      <TableCell>{affiliate.phone}</TableCell>
                      <TableCell>{getStatusBadge(affiliate.kycStatus)}</TableCell>
                      <TableCell>{affiliate.netPayout}</TableCell>
                      <TableCell>{affiliate.lastUpdated}</TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleViewAffiliate(affiliate.id)}
                          className="flex items-center"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredAffiliates.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                        No affiliates found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
