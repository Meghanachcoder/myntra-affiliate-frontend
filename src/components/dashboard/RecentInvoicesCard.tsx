
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import InvoicesList from './InvoicesList';

type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: string;
};

type RecentInvoicesCardProps = {
  invoices: Invoice[];
  onViewAll: () => void;
  onDownload: (invoiceId: string) => void;
};

const RecentInvoicesCard = ({ invoices, onViewAll, onDownload }: RecentInvoicesCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Recent Invoices</h2>
        </div>
        <InvoicesList 
          invoices={invoices}
          limit={3}
          showViewAll={true}
          onViewAll={onViewAll}
          onDownload={onDownload}
        />
      </CardContent>
    </Card>
  );
};

export default RecentInvoicesCard;
