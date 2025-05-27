
import React from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlaybackSpeed from '../Heap/PlaybackSpeed';
import RestartButton from '../Heap/RestartButton';
import FullScreenButton from '../Heap/FullScreenButton';

interface ControlBarProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onRestart: () => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
  isFullScreen: boolean;
  onFullScreenToggle: () => void;
}

const ControlBar: React.FC<ControlBarProps> = ({
  isPlaying,
  onPlay,
  onPause,
  onRestart,
  playbackSpeed,
  onSpeedChange,
  isFullScreen,
  onFullScreenToggle,
}) => {
  return (
    <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm px-6 py-4 border-t border-gray-600/50">
      <div className="flex items-center justify-between">
        {/* Left side - Playback controls */}
        <div className="flex items-center gap-4">
          <RestartButton onClick={onRestart} />
          
          <Button
            onClick={isPlaying ? onPause : onPlay}
            size="lg"
            className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
            {isPlaying ? (
              <Pause size={24} className="relative z-10" />
            ) : (
              <Play size={24} className="relative z-10 ml-1" />
            )}
          </Button>
        </div>

        {/* Center - Speed control */}
        <div className="flex-1 max-w-md mx-8">
          <PlaybackSpeed value={playbackSpeed} onChange={onSpeedChange} />
        </div>

        {/* Right side - Additional controls */}
        <div className="flex items-center gap-4">
          <FullScreenButton 
            isFullScreen={isFullScreen} 
            onClick={onFullScreenToggle} 
          />
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
