
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';
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
  if (invoices.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Recent Invoices</h2>
          </div>
          <div className="text-center py-8">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">No invoices yet</p>
                <p className="text-xs text-gray-500">
                  Your recent invoices will appear here once you start earning commissions.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
