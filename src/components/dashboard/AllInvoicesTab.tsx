
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import InvoicesList from './InvoicesList';
import NoInvoices from './NoInvoices';

type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: string;
  referenceNumber?: string | null;
};

type AllInvoicesTabProps = {
  invoices: Invoice[];
  onDownload: (invoiceId: string) => void;
};

const AllInvoicesTab = ({ invoices, onDownload }: AllInvoicesTabProps) => {
  if (invoices.length === 0) {
    return <NoInvoices />;
  }

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
