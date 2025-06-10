
import React from 'react';

interface MyntraLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const MyntraLogo: React.FC<MyntraLogoProps> = ({ className = "", size = "medium" }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'h-8 w-auto';
      case 'large':
        return 'h-20 w-auto';
      case 'medium':
      default:
        return 'h-12 w-auto';
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="/lovable-uploads/24d05862-1b11-4d48-9bc3-cb3c86675652.png" 
        alt="Ultimate Glam Logo" 
        className={`${getSizeClass()} object-contain`}
      />
    </div>
  );
};

export default MyntraLogo;
