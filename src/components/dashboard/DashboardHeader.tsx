
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import MyntraLogo from '@/components/MyntraLogo';

type DashboardHeaderProps = {
  affiliateId: string;
  onLogout: () => void;
};

const DashboardHeader = ({ affiliateId, onLogout }: DashboardHeaderProps) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <MyntraLogo className="h-8 w-auto mr-3" />
          <h1 className="text-xl font-bold text-gray-900">Affiliate Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 mr-2">Affiliate ID:</span>
          <span className="font-medium">{affiliateId}</span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onLogout}
            className="flex items-center text-gray-600 hover:text-red-600"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
