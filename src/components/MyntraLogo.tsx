
import React from 'react';

interface MyntraLogoProps {
  className?: string;
}

const MyntraLogo: React.FC<MyntraLogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center font-bold ${className}`}>
      <span className="text-myntra-purple text-2xl">Myntra</span>
      <span className="text-myntra-dark text-lg">Partner</span>
    </div>
  );
};

export default MyntraLogo;
