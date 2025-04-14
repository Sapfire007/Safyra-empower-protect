
import React from 'react';

interface LogoProps {
  className?: string;
  isFooter?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", isFooter = false }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        viewBox="0 0 50 50" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        {/* Shield outline */}
        <path 
          d="M25 2.5L45 8.75V22.5C45 32.5 36.25 42.5 25 47.5C13.75 42.5 5 32.5 5 22.5V8.75L25 2.5Z" 
          stroke={isFooter ? "#D4AF37" : "#1A2A40"} 
          strokeWidth="2" 
          fill="none" 
        />
        
        {/* Gemstone (Sapphire) */}
        <path 
          d="M25 12.5L32.5 20L25 35L17.5 20L25 12.5Z" 
          fill={isFooter ? "#FFFFFF" : "#1A2A40"} 
        />
        
        {/* Gemstone shine */}
        <path 
          d="M25 12.5L27.5 20L25 35L22.5 20L25 12.5Z" 
          fill={isFooter ? "#D4AF37" : "#D4AF37"} 
        />
      </svg>
      <span className={`ml-2 font-montserrat font-bold text-xl ${isFooter ? 'text-white' : 'text-safyra-navy'}`}>SAFYRA</span>
    </div>
  );
};

export default Logo;
