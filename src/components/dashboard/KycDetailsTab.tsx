
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
  kycStatus: {
    status: string;
    date: string;
    requestDate: string;
  };
};

const KycDetailsTab = ({ kycDetails, kycStatus }: KycDetailsTabProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">KYC Details</h2>
        </div>
        
        <div className="space-y-6">
          {/* KYC Status Section */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-3">KYC Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Current Status</h4>
                <p className="text-base">{kycStatus.status}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Request Submitted On</h4>
                <p className="text-base">{kycStatus.requestDate}</p>
              </div>
            </div>
          </div>

          {/* KYC Request Data Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Submitted Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">ID Type</h4>
                <p className="text-base">{kycDetails.idType}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">{kycDetails.idType} Number</h4>
                <p className="text-base">{kycDetails.idValue}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Bank Account Number</h4>
                <p className="text-base">{kycDetails.accountNumber}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">IFSC Code</h4>
                <p className="text-base">{kycDetails.ifsc}</p>
              </div>
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Account Holder Name</h4>
                <p className="text-base">{kycDetails.accountName}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KycDetailsTab;
