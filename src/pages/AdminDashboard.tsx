import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from '@/components/ui/table';

import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious
} from '@/components/ui/pagination';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

import { LogOut, Search, Check, Clock, AlertTriangle, UserCheck, ExternalLink } from 'lucide-react';
import MyntraLogo from '@/components/MyntraLogo';

import { useGetAllAdminAffiliatesQuery } from '@/lib/api/commonApi';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, error } = useGetAllAdminAffiliatesQuery({
    page: currentPage,
    limit: itemsPerPage,
    sortBy: 'created_at',
    sortOrder: 'ASC',
  });

  const affiliates = data?.result?.affiliates || [];
  const totalPages = data?.result?.pages || 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/admin/login');
  };

  const handleViewAffiliate = (id: string) => {
    navigate(`/admin/affiliate/${id}`);
  };

  const getStatusBadge = (kyc: any) => {
    const status = kyc?.status;
    if (status === 'verified') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <Check className="w-3 h-3 mr-1" /> Verified
        </span>
      );
    } else if (status === 'pending') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" /> Pending
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <AlertTriangle className="w-3 h-3 mr-1" /> Not Submitted
        </span>
      );
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-6 w-6 text-myntra-purple" />
                <h2 className="text-xl font-semibold">Affiliate Management</h2>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by ID, name, or phone"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Affiliate ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Phone</TableHead>
                    <TableHead>KYC Status</TableHead>
                    <TableHead className="hidden md:table-cell">Payout</TableHead>
                    <TableHead className="hidden lg:table-cell">Created</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                        Loading affiliates...
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-red-500">
                        Failed to load affiliates.
                      </TableCell>
                    </TableRow>
                  ) : affiliates.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                        No affiliates found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    affiliates.map((a: any) => (
                      <TableRow key={a.id}>
                        <TableCell>{a.affiliate_id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{a.first_name || '-'}</div>
                          <div className="text-sm text-gray-500 sm:hidden">{a.mobile}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{a.mobile}</TableCell>
                        <TableCell>{getStatusBadge(a.kyc)}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          ₹
                          {a.invoices?.reduce(
                            (sum: number, invoice: any) => sum + parseFloat(invoice.amount || 0),
                            0
                          ) || 0}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {new Date(a.created_at).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleViewAffiliate(a.id)}
                            className="flex items-center text-xs sm:text-sm"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
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
