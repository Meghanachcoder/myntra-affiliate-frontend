
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, TrendingUp } from 'lucide-react';

type PayoutCardProps = {
  type: 'pending' | 'net';
  amount: string;
  subtext: string;
};

const PayoutCard = ({ type, amount, subtext }: PayoutCardProps) => {
  const isPending = type === 'pending';
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-1">
          {isPending ? (
            <Clock className="w-5 h-5 mr-2 text-yellow-500" />
          ) : (
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
          )}
          <h2 className="text-lg font-medium">
            {isPending ? 'Payout Pending' : 'Net Payout Till Date'}
          </h2>
        </div>
        <p className="text-3xl font-bold text-myntra-purple">{amount}</p>
        <p className="text-sm text-gray-500 mt-2">{subtext}</p>
      </CardContent>
    </Card>
  );
};

export default PayoutCard;
