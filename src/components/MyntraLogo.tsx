
import React from 'react';

interface MyntraLogoProps {
  className?: string;
}

const MyntraLogo: React.FC<MyntraLogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="/lovable-uploads/24d05862-1b11-4d48-9bc3-cb3c86675652.png" 
        alt="Ultimate Glam Logo" 
        className="h-8 w-auto object-contain"
      />
    </div>
  );
};

export default MyntraLogo;
