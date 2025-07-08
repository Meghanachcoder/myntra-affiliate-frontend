import { TrendingUp } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

import { PayoutCardProps } from '@/interface/interface';

const PayoutCard = ({ amount, subtext }: PayoutCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-1">
          <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
          <h2 className="text-lg font-medium">Net Payout Till Date</h2>
        </div>
        <p className="text-3xl font-bold text-myntra-purple">{amount}</p>
        <p className="text-sm text-gray-500 mt-2">{subtext}</p>
      </CardContent>
    </Card>
  );
};

export default PayoutCard;
