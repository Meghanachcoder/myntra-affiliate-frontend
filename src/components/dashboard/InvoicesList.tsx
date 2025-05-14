
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { FileText } from 'lucide-react';

type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: string;
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

  return (
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
        {displayInvoices.map((invoice) => (
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
            <td colSpan={5} className="pt-4 text-right">
              <Button variant="outline" onClick={onViewAll}>View All</Button>
            </td>
          </tr>
        </tfoot>
      )}
    </Table>
  );
};

export default InvoicesList;
