
import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TopControlBarProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onRestart: () => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
  onExampleSubmit: (input: string) => void;
}

const TopControlBar: React.FC<TopControlBarProps> = ({
  isPlaying,
  onPlay,
  onPause,
  onRestart,
  playbackSpeed,
  onSpeedChange,
  onExampleSubmit
}) => {
  const [showCreateInput, setShowCreateInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const handleCreateSubmit = () => {
    if (inputValue.trim()) {
      onExampleSubmit(inputValue.trim());
      setInputValue('');
      setShowCreateInput(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateSubmit();
    } else if (e.key === 'Escape') {
      setShowCreateInput(false);
      setInputValue('');
    }
  };

  return (
    <div className="bg-gray-800/80 px-6 py-4 border-b border-gray-600/50 flex items-center justify-between">
      {/* Left side - Window controls */}
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="ml-4 text-white font-medium">HeapSort Algorithm</span>
      </div>

      {/* Center - Controls */}
      <div className="flex items-center gap-4">
        {/* Playback controls */}
        <Button
          onClick={onRestart}
          variant="outline"
          size="sm"
          className="border-gray-600 text-gray-300 hover:bg-gray-700 rounded-full w-10 h-10 p-0"
        >
          <RotateCcw size={16} />
        </Button>
        
        <Button
          onClick={isPlaying ? onPause : onPlay}
          size="sm"
          className="bg-blue-600 hover:bg-blue-500 rounded-full w-12 h-12 p-0"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </Button>

        {/* Speed control */}
        <div className="flex items-center gap-3 bg-gray-700/50 rounded-full px-4 py-2">
          <span className="text-sm text-gray-300 font-medium">Speed:</span>
          {speedOptions.map((speed) => (
            <button
              key={speed}
              onClick={() => onSpeedChange(speed)}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                speed === playbackSpeed
                  ? 'bg-green-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {speed}x
            </button>
          ))}
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            playbackSpeed === 1 ? 'text-green-400' : 'text-blue-400'
          }`}>
            {playbackSpeed === 1 ? 'Normal' : playbackSpeed > 1 ? 'Fast' : 'Slow'}
          </span>
        </div>
      </div>

      {/* Right side - Create button */}
      <div className="flex items-center gap-2">
        {!showCreateInput ? (
          <Button
            onClick={() => setShowCreateInput(true)}
            className="bg-green-600 hover:bg-green-500 text-white rounded-lg"
          >
            <Plus size={16} className="mr-1" />
            Create
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="e.g., 9,4,3,8,10,2,5"
              className="w-40 h-8 text-sm bg-gray-700/50 border-gray-600/50 text-white"
              autoFocus
            />
            <Button
              onClick={handleCreateSubmit}
              size="sm"
              className="h-8 px-3 bg-green-600 hover:bg-green-500"
            >
              ✓
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopControlBar;
