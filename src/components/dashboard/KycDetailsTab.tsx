
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, AlertTriangle } from 'lucide-react';

type KycDetailsTabProps = {
  kycDetails: {
    idType: string;
    idValue: string;
    accountNumber: string;
    ifsc: string;
    accountName: string;
  };
  onEditKyc: () => void;
};

const KycDetailsTab = ({ kycDetails, onEditKyc }: KycDetailsTabProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">KYC Details</h2>
          <Button 
            onClick={onEditKyc}
            className="flex items-center"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Details
          </Button>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                If edited, verification will be required and payouts will be paused till verification is complete.
              </p>
            </div>
          </div>
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
