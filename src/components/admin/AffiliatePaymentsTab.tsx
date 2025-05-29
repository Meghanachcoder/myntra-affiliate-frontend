
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
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">Current Payment</h2>
            <div className="flex items-center text-gray-500 mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="text-sm">{currentPayment.date}</span>
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold self-end sm:self-auto">{currentPayment.amount}</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h3 className="font-medium mb-3 text-sm sm:text-base">Payment Breakdown</h3>
          <div className="flex items-start mb-4 p-2 bg-yellow-50 text-yellow-800 rounded-md">
            <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-xs sm:text-sm">This calculation is for a non GST compliant affiliate.</p>
          </div>
          {currentPayment.breakdown.map((item, index) => (
            <div key={index} className="flex justify-between py-2">
              <span className="text-gray-600 text-sm sm:text-base">{item.label}</span>
              <span className={`font-medium text-sm sm:text-base ${item.value.startsWith('-') ? 'text-red-600' : ''}`}>
                {item.value}
              </span>
            </div>
          ))}
          <Separator className="my-3" />
          <div className="flex justify-between py-2 font-semibold">
            <span className="text-sm sm:text-base">Final Amount</span>
            <span className="text-sm sm:text-base">{currentPayment.breakdown[currentPayment.breakdown.length - 1].value}</span>
          </div>
        </div>
        
        {isPending && (
          <div className="flex justify-end">
            <Button 
              className="flex items-center w-full sm:w-auto"
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
