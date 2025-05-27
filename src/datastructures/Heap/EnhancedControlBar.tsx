
import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Maximize, Minimize, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PlaybackSpeed from '../Heap/PlaybackSpeed';

interface EnhancedControlBarProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onRestart: () => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
  onExampleSubmit: (input: string) => void;
  isFullScreen: boolean;
  onFullScreenToggle: () => void;
  isAnimationComplete: boolean;
  currentStep: number;
}

const EnhancedControlBar: React.FC<EnhancedControlBarProps> = ({
  isPlaying,
  onPlay,
  onPause,
  onRestart,
  playbackSpeed,
  onSpeedChange,
  onExampleSubmit,
  isFullScreen,
  onFullScreenToggle,
  isAnimationComplete,
  currentStep,
}) => {
  const [showCreateInput, setShowCreateInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

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
    <div className="bg-gradient-to-r from-gray-800/95 to-gray-700/95 backdrop-blur-md border-b border-gray-600/50">
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Left side - Main controls */}
          <div className="flex items-center gap-6">
            {/* Play/Pause Button */}
            <Button
              onClick={isPlaying ? onPause : onPlay}
              className="relative group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full w-16 h-16 p-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-blue-400/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/30 group-hover:to-purple-400/30 rounded-full transition-all duration-300"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {isPlaying ? (
                <Pause size={28} className="relative z-10" />
              ) : (
                <Play size={28} className="relative z-10 ml-1" />
              )}
            </Button>

            {/* Restart Button */}
            <Button
              onClick={onRestart}
              disabled={!isAnimationComplete && currentStep === 0}
              className="relative group bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 border-2 border-orange-400/30 disabled:border-gray-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 to-red-400/0 group-hover:from-orange-400/30 group-hover:to-red-400/30 rounded-full transition-all duration-300"></div>
              <RotateCcw size={24} className="relative z-10" />
            </Button>

            {/* Create Button with Hover Input */}
            <div className="relative">
              <Button
                onClick={() => setShowCreateInput(!showCreateInput)}
                className="relative group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-emerald-400/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 to-teal-400/0 group-hover:from-emerald-400/30 group-hover:to-teal-400/30 rounded-full transition-all duration-300"></div>
                <Plus size={24} className="relative z-10" />
              </Button>

              {/* Sliding Input */}
              <div className={`absolute left-16 top-0 h-14 transition-all duration-300 ${
                showCreateInput ? 'w-80 opacity-100' : 'w-0 opacity-0'
              } overflow-hidden`}>
                <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-600/50 rounded-full h-full flex items-center px-4 shadow-lg">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter numbers (e.g., 9,4,3,8,10,2,5)"
                    className="border-none bg-transparent text-white placeholder-gray-400 focus:ring-0 text-sm"
                    autoFocus={showCreateInput}
                  />
                  <Button
                    onClick={handleCreateSubmit}
                    size="sm"
                    className="ml-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-3 py-1 text-xs"
                  >
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Speed Control */}
          <div className="flex-1 max-w-md mx-8">
            <PlaybackSpeed value={playbackSpeed} onChange={onSpeedChange} />
          </div>

          {/* Right side - Fullscreen */}
          <div className="flex items-center">
            <Button
              onClick={onFullScreenToggle}
              className="relative group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-400/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 to-indigo-400/0 group-hover:from-purple-400/30 group-hover:to-indigo-400/30 rounded-full transition-all duration-300"></div>
              {isFullScreen ? (
                <Minimize size={24} className="relative z-10" />
              ) : (
                <Maximize size={24} className="relative z-10" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedControlBar;
