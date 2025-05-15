
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

type AffiliateKycTabProps = {
  kycDetails: {
    idType: string;
    idValue: string;
    idDocument: string;
    accountNumber: string;
    ifsc: string;
    accountName: string;
    bankName: string;
    accountType: string;
    bankDocument: string;
  };
  kycStatus: string;
  onVerify: (isApproved: boolean) => void;
};

const AffiliateKycTab = ({ kycDetails, kycStatus, onVerify }: AffiliateKycTabProps) => {
  const isReviewing = kycStatus === 'Pending';
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Identity Details</h2>
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
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Bank Account Details</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Account Number</h3>
              <p className="text-base">{kycDetails.accountNumber}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">IFSC Code</h3>
              <p className="text-base">{kycDetails.ifsc}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Account Holder Name</h3>
              <p className="text-base">{kycDetails.accountName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Bank Name</h3>
              <p className="text-base">{kycDetails.bankName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Account Type</h3>
              <p className="text-base">{kycDetails.accountType}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {isReviewing && (
        <div className="flex justify-end space-x-4 mt-6">
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => onVerify(false)}
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            Reject KYC
          </Button>
          <Button 
            className="flex items-center"
            onClick={() => onVerify(true)}
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            Approve KYC
          </Button>
        </div>
      )}
    </div>
  );
};

export default AffiliateKycTab;
