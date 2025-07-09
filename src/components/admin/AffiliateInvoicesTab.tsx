
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { FileText } from 'lucide-react';

type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: string;
};

type AffiliateInvoicesTabProps = {
  invoices: Invoice[];
  onDownloadInvoice: (invoiceId: string) => void;
};

const AffiliateInvoicesTab = ({ invoices, onDownloadInvoice }: AffiliateInvoicesTabProps) => {
  if (!Array.isArray(invoices)) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <p className="text-sm text-red-500">Error: Invoices data is not valid.</p>
      </CardContent>
    </Card>
  );
}

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvoices = invoices.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Invoice History</h2>
        
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-full inline-block align-middle">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px]">Invoice ID</TableHead>
                  <TableHead className="min-w-[100px] hidden sm:table-cell">Date</TableHead>
                  <TableHead className="min-w-[80px]">Amount</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                  <TableHead className="min-w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {currentInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-sm text-gray-500 py-4">
                    No invoices found.
                  </TableCell>
                </TableRow>
              ) : (
                currentInvoices.map((invoice) => (
      <TableRow key={invoice.id}>
        <TableCell className="font-medium">
          <div>
            <div>{invoice.id}</div>
            <div className="text-xs text-gray-500 sm:hidden">{invoice.date}</div>
          </div>
        </TableCell>
        <TableCell className="hidden sm:table-cell">{invoice.date}</TableCell>
        <TableCell>{invoice.amount}</TableCell>
        <TableCell>
          {invoice.status === 'Paid' ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {invoice.status}
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              {invoice.status}
            </span>
          )}
        </TableCell>
        <TableCell>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => onDownloadInvoice(invoice.id)}
            className="flex items-center text-xs"
          >
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </TableCell>
      </TableRow>
    ))
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
  );
};

export default AffiliateInvoicesTab;

