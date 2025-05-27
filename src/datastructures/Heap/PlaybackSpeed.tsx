
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface PlaybackSpeedProps {
  value: number;
  onChange: (value: number) => void;
}

const PlaybackSpeed: React.FC<PlaybackSpeedProps> = ({ value, onChange }) => {
  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];
  
  const handleSliderChange = (values: number[]) => {
    const newValue = values[0];
    const closestSpeed = speedOptions.reduce((prev, curr) => 
      Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev
    );
    onChange(closestSpeed);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm text-gray-400 font-medium min-w-[80px]">
        Speed: {value}x
      </div>
      
      <div className="flex-1 relative">
        <Slider
          value={[value]}
          onValueChange={handleSliderChange}
          min={0.5}
          max={2}
          step={0.25}
          className="relative"
        />
        
        {/* Speed markers */}
        <div className="flex justify-between mt-2 px-1">
          {speedOptions.map((speed) => (
            <div 
              key={speed}
              className={`text-xs transition-colors duration-200 ${
                speed === value 
                  ? 'text-blue-400 font-semibold' 
                  : 'text-gray-500 hover:text-gray-400'
              }`}
            >
              {speed}x
            </div>
          ))}
        </div>
      </div>

      <div className="min-w-[60px] text-right">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
          value === 1 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
        }`}>
          {value === 1 ? 'Normal' : value > 1 ? 'Fast' : 'Slow'}
        </div>
      </div>
    </div>
  );
};

export default PlaybackSpeed;
