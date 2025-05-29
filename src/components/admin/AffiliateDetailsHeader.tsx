
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
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">{affiliate.name}</h2>
              <p className="text-gray-500 text-sm sm:text-base">{affiliate.id}</p>
            </div>
            <div className="self-start sm:self-auto">
              {getStatusBadge(affiliate.kycStatus)}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h3>
            <p className="text-sm sm:text-base break-all">{affiliate.phone}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Net Payout Till Date</h3>
            <p className="text-sm sm:text-base font-medium text-green-600">{affiliate.netPayout}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffiliateDetailsHeader;
