
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input'; 

type AffiliateKycTabProps = {
  kycDetails?: {
    pan: string;
    gstin: string;
    accountNumber: string;
    ifsc: string;
    accountName: string;
    bankName?: string;     
    accountType?: string;  
    bankDocument?: string; 
  };
  kycStatus: string;
  onVerify: (isApproved: boolean) => void;
};

const AffiliateKycTab = ({ kycDetails, kycStatus, onVerify }: AffiliateKycTabProps) => {
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const isReviewing = kycStatus?.toLowerCase() === 'pending';

  if (!kycDetails) {
    return (
      <Card>
        <CardContent className="p-4 sm:p-6">
          <p className="text-sm text-gray-500">KYC details not available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold">Identity Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">PAN</h3>
              <p className="text-sm sm:text-base">{kycDetails.pan ?? 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">GSTIN</h3>
              <p className="text-sm sm:text-base">{kycDetails.gstin ?? 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold">Bank Account Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Account Number</h3>
              <p className="text-sm sm:text-base break-all">{kycDetails.accountNumber ?? 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">IFSC Code</h3>
              <p className="text-sm sm:text-base">{kycDetails.ifsc ?? 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Account Holder Name</h3>
              <p className="text-sm sm:text-base">{kycDetails.accountName ?? 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Bank Name</h3>
              <p className="text-sm sm:text-base">{kycDetails.bankName ?? 'N/A'}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Account Type</h3>
              <p className="text-sm sm:text-base">{kycDetails.accountType ?? 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {isReviewing && (
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
          <Button
            variant="outline"
            className="flex items-center justify-center w-full sm:w-auto"
            onClick={() => onVerify(false)}
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            Reject KYC
          </Button>
          <Button
            className="flex items-center justify-center w-full sm:w-auto"
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
