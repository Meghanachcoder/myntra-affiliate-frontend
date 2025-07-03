import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Search, Check, Clock, AlertTriangle, UserCheck, ExternalLink } from 'lucide-react';
import MyntraLogo from '@/components/MyntraLogo';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Expanded mock data for affiliates
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
    },
    {
      id: 'MYNTRA987',
      name: 'Emily Davis',
      phone: '+91 9876543215',
      kycStatus: 'Pending',
      netPayout: '₹23,700',
      lastUpdated: '13 May, 2025'
    },
    {
      id: 'MYNTRA147',
      name: 'Robert Wilson',
      phone: '+91 9876543216',
      kycStatus: 'Verified',
      netPayout: '₹76,500',
      lastUpdated: '9 May, 2025'
    },
    {
      id: 'MYNTRA258',
      name: 'Lisa Anderson',
      phone: '+91 9876543217',
      kycStatus: 'Rejected',
      netPayout: '₹8,900',
      lastUpdated: '8 May, 2025'
    },
    {
      id: 'MYNTRA369',
      name: 'James Taylor',
      phone: '+91 9876543218',
      kycStatus: 'Verified',
      netPayout: '₹54,200',
      lastUpdated: '7 May, 2025'
    },
    {
      id: 'MYNTRA741',
      name: 'Maria Garcia',
      phone: '+91 9876543219',
      kycStatus: 'Pending',
      netPayout: '₹41,800',
      lastUpdated: '6 May, 2025'
    },
    {
      id: 'MYNTRA852',
      name: 'Thomas Martinez',
      phone: '+91 9876543220',
      kycStatus: 'Verified',
      netPayout: '₹67,300',
      lastUpdated: '5 May, 2025'
    },
    {
      id: 'MYNTRA963',
      name: 'Jennifer Rodriguez',
      phone: '+91 9876543221',
      kycStatus: 'Verified',
      netPayout: '₹92,100',
      lastUpdated: '4 May, 2025'
    },
    {
      id: 'MYNTRA159',
      name: 'Christopher Lee',
      phone: '+91 9876543222',
      kycStatus: 'Pending',
      netPayout: '₹19,600',
      lastUpdated: '3 May, 2025'
    },
    {
      id: 'MYNTRA357',
      name: 'Amanda White',
      phone: '+91 9876543223',
      kycStatus: 'Rejected',
      netPayout: '₹12,400',
      lastUpdated: '2 May, 2025'
    },
    {
      id: 'MYNTRA486',
      name: 'Daniel Harris',
      phone: '+91 9876543224',
      kycStatus: 'Verified',
      netPayout: '₹83,700',
      lastUpdated: '1 May, 2025'
    },
    {
      id: 'MYNTRA624',
      name: 'Michelle Clark',
      phone: '+91 9876543225',
      kycStatus: 'Verified',
      netPayout: '₹58,900',
      lastUpdated: '30 April, 2025'
    },
    {
      id: 'MYNTRA735',
      name: 'Kevin Lewis',
      phone: '+91 9876543226',
      kycStatus: 'Pending',
      netPayout: '₹27,300',
      lastUpdated: '29 April, 2025'
    },
    {
      id: 'MYNTRA846',
      name: 'Nicole Young',
      phone: '+91 9876543227',
      kycStatus: 'Verified',
      netPayout: '₹71,500',
      lastUpdated: '28 April, 2025'
    },
    {
      id: 'MYNTRA957',
      name: 'Steven King',
      phone: '+91 9876543228',
      kycStatus: 'Rejected',
      netPayout: '₹6,800',
      lastUpdated: '27 April, 2025'
    },
    {
      id: 'MYNTRA168',
      name: 'Rachel Wright',
      phone: '+91 9876543229',
      kycStatus: 'Verified',
      netPayout: '₹95,400',
      lastUpdated: '26 April, 2025'
    },
    {
      id: 'MYNTRA279',
      name: 'Brian Lopez',
      phone: '+91 9876543230',
      kycStatus: 'Pending',
      netPayout: '₹34,200',
      lastUpdated: '25 April, 2025'
    },
    {
      id: 'MYNTRA380',
      name: 'Laura Hill',
      phone: '+91 9876543231',
      kycStatus: 'Verified',
      netPayout: '₹62,800',
      lastUpdated: '24 April, 2025'
    },
    {
      id: 'MYNTRA491',
      name: 'Mark Scott',
      phone: '+91 9876543232',
      kycStatus: 'Verified',
      netPayout: '₹78,100',
      lastUpdated: '23 April, 2025'
    },
    {
      id: 'MYNTRA502',
      name: 'Jessica Green',
      phone: '+91 9876543233',
      kycStatus: 'Pending',
      netPayout: '₹16,700',
      lastUpdated: '22 April, 2025'
    },
    {
      id: 'MYNTRA613',
      name: 'Paul Adams',
      phone: '+91 9876543234',
      kycStatus: 'Verified',
      netPayout: '₹87,300',
      lastUpdated: '21 April, 2025'
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

  const totalPages = Math.ceil(filteredAffiliates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAffiliates = filteredAffiliates.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-6 w-6 text-myntra-purple" />
                <h2 className="text-lg sm:text-xl font-semibold">Affiliate Management</h2>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search affiliates..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-full inline-block align-middle">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[120px]">Affiliate ID</TableHead>
                      <TableHead className="min-w-[120px]">Name</TableHead>
                      <TableHead className="min-w-[140px] hidden sm:table-cell">Phone</TableHead>
                      <TableHead className="min-w-[100px]">KYC Status</TableHead>
                      <TableHead className="min-w-[150px] hidden md:table-cell">Net Payout Till Date</TableHead>
                      <TableHead className="min-w-[120px] hidden lg:table-cell">Last Updated</TableHead>
                      <TableHead className="min-w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentAffiliates.map((affiliate) => (
                      <TableRow key={affiliate.id}>
                        <TableCell className="font-medium">{affiliate.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{affiliate.name}</div>
                            <div className="text-sm text-gray-500 sm:hidden">{affiliate.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{affiliate.phone}</TableCell>
                        <TableCell>{getStatusBadge(affiliate.kycStatus)}</TableCell>
                        <TableCell className="hidden md:table-cell">{affiliate.netPayout}</TableCell>
                        <TableCell className="hidden lg:table-cell">{affiliate.lastUpdated}</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleViewAffiliate(affiliate.id)}
                            className="flex items-center text-xs sm:text-sm"
                          >
                            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="hidden sm:inline">View</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {currentAffiliates.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                          No affiliates found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) handlePageChange(currentPage - 1);
                        }}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) handlePageChange(currentPage + 1);
                        }}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
