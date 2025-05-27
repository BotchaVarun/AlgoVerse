
import React from 'react';
import { Button } from '@/components/ui/button';

interface FullScreenButtonProps {
  isFullScreen: boolean;
  onClick: () => void;
}

const FullScreenButton: React.FC<FullScreenButtonProps> = ({ isFullScreen, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="lg"
      className="relative bg-gray-700/50 hover:bg-gray-600/50 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-full w-12 h-12 p-0 transition-all duration-300 transform hover:scale-105 group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 to-blue-400/0 group-hover:from-purple-400/20 group-hover:to-blue-400/20 rounded-full transition-all duration-300"></div>
      {isFullScreen ? (
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="relative z-10"
        >
          <path d="M8 3v3a2 2 0 0 1-2 2H3" />
          <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
          <path d="M3 16h3a2 2 0 0 1 2 2v3" />
          <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
        </svg>
      ) : (
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="relative z-10"
        >
          <path d="M3 7V5a2 2 0 0 1 2-2h2" />
          <path d="M17 3h2a2 2 0 0 1 2 2v2" />
          <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
          <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        </svg>
      )}
    </Button>
  );
};

export default FullScreenButton;
