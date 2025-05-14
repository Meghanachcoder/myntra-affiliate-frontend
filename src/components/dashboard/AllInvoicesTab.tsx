
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import InvoicesList from './InvoicesList';

type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: string;
};

type AllInvoicesTabProps = {
  invoices: Invoice[];
  onDownload: (invoiceId: string) => void;
};

const AllInvoicesTab = ({ invoices, onDownload }: AllInvoicesTabProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">All Invoices</h2>
        <InvoicesList 
          invoices={invoices}
          onDownload={onDownload}
        />
      </CardContent>
    </Card>
  );
};

export default AllInvoicesTab;
