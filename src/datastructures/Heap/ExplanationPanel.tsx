
import React, { useEffect, useState } from 'react';

interface ExplanationPanelProps {
  currentExplanation: string;
  currentStep: number;
  className?: string;
}

const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ 
  currentExplanation, 
  currentStep, 
  className 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    setDisplayedText('');
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < currentExplanation.length) {
        setDisplayedText(currentExplanation.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsAnimating(false);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [currentExplanation, currentStep]);

  return (
    <div className={`bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-xl border border-gray-600/50 shadow-2xl ${className}`}>
      <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 px-4 py-2 border-b border-gray-600/50 rounded-t-xl">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          Explanation
        </h3>
      </div>
      
      <div className="p-4 h-full overflow-auto">
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20 shadow-lg h-full">
          <div className="flex items-start gap-3 h-full">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="flex-1 h-full flex flex-col">
              <p className="text-gray-200 text-sm leading-relaxed flex-1">
                {displayedText}
                {isAnimating && (
                  <span className="inline-block w-1.5 h-4 bg-blue-400 ml-1 animate-pulse"></span>
                )}
              </p>
              
              {/* Compact progress indicator */}
              <div className="mt-3 flex items-center gap-2">
                <div className="text-xs text-gray-400">Step:</div>
                <div className="flex-1 bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep + 1) / 15) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 min-w-[3rem]">
                  {currentStep + 1}/15
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplanationPanel;
