
import React from 'react';
import { Button } from '@/components/ui/button';

interface RestartButtonProps {
  onClick: () => void;
}

const RestartButton: React.FC<RestartButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="lg"
      className="relative bg-gray-700/50 hover:bg-gray-600/50 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-full w-12 h-12 p-0 transition-all duration-300 transform hover:scale-105 group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 to-red-400/0 group-hover:from-orange-400/20 group-hover:to-red-400/20 rounded-full transition-all duration-300"></div>
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
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    </Button>
  );
};

export default RestartButton;
