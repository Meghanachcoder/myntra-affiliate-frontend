
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

type KycDetailsTabProps = {
  kycDetails: {
    idType: string;
    idValue: string;
    accountNumber: string;
    ifsc: string;
    accountName: string;
  };
};

const KycDetailsTab = ({ kycDetails }: KycDetailsTabProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">KYC Details</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">ID Type</h3>
            <p className="text-base">{kycDetails.idType}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{kycDetails.idType} Number</h3>
            <p className="text-base">{kycDetails.idValue}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Bank Account Number</h3>
            <p className="text-base">{kycDetails.accountNumber}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">IFSC Code</h3>
            <p className="text-base">{kycDetails.ifsc}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Account Holder Name</h3>
            <p className="text-base">{kycDetails.accountName}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KycDetailsTab;
