
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { FileText } from 'lucide-react';

type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: string;
  referenceNumber?: string | null;
};

type InvoicesListProps = {
  invoices: Invoice[];
  limit?: number;
  showViewAll?: boolean;
  onViewAll?: () => void;
  onDownload: (invoiceId: string) => void;
};

const InvoicesList = ({ 
  invoices, 
  limit, 
  showViewAll = false, 
  onViewAll, 
  onDownload 
}: InvoicesListProps) => {
  const displayInvoices = limit ? invoices.slice(0, limit) : invoices;

  const getStatusBadge = (status: string) => {
    if (status === 'Paid') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {status}
        </span>
      );
    } else if (status === 'Initiated') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {status}
        </span>
      );
    } else if (status === 'Payment Due') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          {status}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          {status}
        </span>
      );
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Reference Number</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayInvoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>{invoice.amount}</TableCell>
            <TableCell>
              {getStatusBadge(invoice.status)}
            </TableCell>
            <TableCell>
              {invoice.referenceNumber ? (
                <span className="text-sm font-mono">{invoice.referenceNumber}</span>
              ) : (
                <span className="text-sm text-gray-400">-</span>
              )}
            </TableCell>
            <TableCell>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => onDownload(invoice.id)}
                className="flex items-center"
              >
                <FileText className="h-4 w-4 mr-1" />
                Download
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {showViewAll && (
        <tfoot>
          <tr>
            <td colSpan={6} className="pt-4 text-right">
              <Button variant="outline" onClick={onViewAll}>View All</Button>
            </td>
          </tr>
        </tfoot>
      )}
    </Table>
  );
};

export default InvoicesList;
