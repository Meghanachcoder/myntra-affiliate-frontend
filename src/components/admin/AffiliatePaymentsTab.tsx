
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, CreditCard, AlertTriangle } from 'lucide-react';

type PaymentBreakdown = {
  label: string;
  value: string;
};

type AffiliatePaymentsTabProps = {
  currentPayment: {
    amount: string;
    date: string;
    breakdown: PaymentBreakdown[];
    status: string;
  };
  onProcessPayment: () => void;
};

const AffiliatePaymentsTab = ({ currentPayment, onProcessPayment }: AffiliatePaymentsTabProps) => {
  const isPending = currentPayment.status === 'Pending';
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Current Payment</h2>
            <div className="flex items-center text-gray-500 mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="text-sm">{currentPayment.date}</span>
            </div>
          </div>
          <div className="text-2xl font-bold">{currentPayment.amount}</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h3 className="font-medium mb-3">Payment Breakdown</h3>
          <div className="flex items-center mb-4 p-2 bg-yellow-50 text-yellow-800 rounded-md">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <p className="text-sm">This calculation is for a non GST compliant affiliate.</p>
          </div>
          {currentPayment.breakdown.map((item, index) => (
            <div key={index} className="flex justify-between py-2">
              <span className="text-gray-600">{item.label}</span>
              <span className={`font-medium ${item.value.startsWith('-') ? 'text-red-600' : ''}`}>
                {item.value}
              </span>
            </div>
          ))}
          <Separator className="my-3" />
          <div className="flex justify-between py-2 font-semibold">
            <span>Final Amount</span>
            <span>{currentPayment.breakdown[currentPayment.breakdown.length - 1].value}</span>
          </div>
        </div>
        
        {isPending && (
          <div className="flex justify-end">
            <Button 
              className="flex items-center"
              onClick={onProcessPayment}
            >
              <CreditCard className="h-4 w-4 mr-1" />
              Process Payment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AffiliatePaymentsTab;
