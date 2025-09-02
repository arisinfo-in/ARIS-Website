import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} relative group cursor-pointer`}>
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle */}
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="url(#gradient1)"
            className="group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Neural Network Nodes */}
          <circle cx="16" cy="14" r="2" fill="#ffffff" opacity="0.9" />
          <circle cx="32" cy="14" r="2" fill="#ffffff" opacity="0.9" />
          <circle cx="24" cy="24" r="3" fill="#ffffff" />
          <circle cx="12" cy="34" r="2" fill="#ffffff" opacity="0.9" />
          <circle cx="36" cy="34" r="2" fill="#ffffff" opacity="0.9" />
          
          {/* Connecting Lines */}
          <line x1="16" y1="14" x2="24" y2="24" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
          <line x1="32" y1="14" x2="24" y2="24" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
          <line x1="24" y1="24" x2="12" y2="34" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
          <line x1="24" y1="24" x2="36" y2="34" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
          
          {/* Data Flow Arrows */}
          <path
            d="M18 20 L22 22 L18 24"
            stroke="#f97316"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          />
          <path
            d="M30 20 L26 22 L30 24"
            stroke="#f97316"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
            style={{ animationDelay: '0.5s' }}
          />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="50%" stopColor="#374151" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <h1 className={`${textSizes[size]} font-bold text-white group-hover:text-orange-400 transition-colors duration-300 cursor-pointer`}>
          ARIS
        </h1>
        <p className="text-xs text-gray-400 leading-tight max-w-[200px]">
          AI Data Analyst
        </p>
      </div>
    </div>
  );
};

export default Logo;