
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex items-center justify-between sm:justify-start">
            <MyntraLogo className="h-6 sm:h-8 w-auto" />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onLogout}
              className="flex items-center text-gray-600 hover:text-red-600 sm:hidden"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between sm:justify-end sm:gap-4">
            <div className="flex items-center">
              <span className="text-xs sm:text-sm text-gray-600 mr-2">Affiliate ID:</span>
              <span className="font-medium text-sm sm:text-base">{affiliateId}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onLogout}
              className="hidden sm:flex items-center text-gray-600 hover:text-red-600"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
