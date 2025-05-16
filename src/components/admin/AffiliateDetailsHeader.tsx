
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Clock, AlertTriangle } from 'lucide-react';

type AffiliateDetailsHeaderProps = {
  affiliate: {
    id: string;
    name: string;
    phone: string;
    kycStatus: string;
    netPayout: string;
  };
};

const AffiliateDetailsHeader = ({ affiliate }: AffiliateDetailsHeaderProps) => {
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

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">{affiliate.name}</h2>
            <p className="text-gray-500">{affiliate.id}</p>
          </div>
          <div className="mt-4 md:mt-0 md:ml-4">
            {getStatusBadge(affiliate.kycStatus)}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h3>
            <p className="text-base">{affiliate.phone}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Net Payout Till Date</h3>
            <p className="text-base font-medium text-green-600">{affiliate.netPayout}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffiliateDetailsHeader;
