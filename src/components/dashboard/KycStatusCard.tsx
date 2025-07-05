import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Clock, AlertTriangle } from 'lucide-react';

type KycStatusProps = {
  status: 'Verified' | 'Pending' | 'Rejected' | string;
  date: string;
  requestDate: string;
};

const KycStatusCard = ({ status, date, requestDate }: KycStatusProps) => {
  const getStatusBadge = (status: string) => {
    const baseClass =
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

    switch (status.toLowerCase()) {
      case 'verified':
        return (
          <span className={`${baseClass} bg-green-100 text-green-800`}>
            <Check className="w-3 h-3 mr-1" /> Verified
          </span>
        );
      case 'pending':
        return (
          <span className={`${baseClass} bg-yellow-100 text-yellow-800`}>
            <Clock className="w-3 h-3 mr-1" /> Pending
          </span>
        );
      case 'rejected':
        return (
          <span className={`${baseClass} bg-red-100 text-red-800`}>
            <AlertTriangle className="w-3 h-3 mr-1" /> Rejected
          </span>
        );
      default:
        return (
          <span className={`${baseClass} bg-gray-100 text-gray-800`}>
            <AlertTriangle className="w-3 h-3 mr-1" /> {status}
          </span>
        );
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-800">KYC Status</h2>
          {getStatusBadge(status)}
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <strong>Request submitted:</strong> {requestDate}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Last updated:</strong> {date}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default KycStatusCard;
