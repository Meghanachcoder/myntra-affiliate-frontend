
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const NoInvoices = () => {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">No invoices yet</h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Your invoices will appear here once you start earning commissions through your affiliate links.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoInvoices;
