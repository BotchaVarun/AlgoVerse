
import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Plus, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CodeStep {
  lineNumber: number;
  code: string;
  phase: 'heapify' | 'build' | 'sort' | 'main';
  action: string;
}

interface CodePanelProps {
  currentStep: number;
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
  className?: string;
}

const heapSortCode: CodeStep[] = [
  { lineNumber: 1, code: "static void heapify(int arr[], int n, int i) {", phase: 'heapify', action: 'function_start' },
  { lineNumber: 2, code: "  int largest = i;", phase: 'heapify', action: 'init_largest' },
  { lineNumber: 3, code: "  int l = 2 * i + 1;", phase: 'heapify', action: 'calc_left' },
  { lineNumber: 4, code: "  int r = 2 * i + 2;", phase: 'heapify', action: 'calc_right' },
  { lineNumber: 5, code: "  if (l < n && arr[l] > arr[largest]) {", phase: 'heapify', action: 'compare_left' },
  { lineNumber: 6, code: "    largest = l;", phase: 'heapify', action: 'update_largest_left' },
  { lineNumber: 7, code: "  }", phase: 'heapify', action: 'end_left_check' },
  { lineNumber: 8, code: "  if (r < n && arr[r] > arr[largest]) {", phase: 'heapify', action: 'compare_right' },
  { lineNumber: 9, code: "    largest = r;", phase: 'heapify', action: 'update_largest_right' },
  { lineNumber: 10, code: "  }", phase: 'heapify', action: 'end_right_check' },
  { lineNumber: 11, code: "  if (largest != i) {", phase: 'heapify', action: 'check_swap_needed' },
  { lineNumber: 12, code: "    int temp = arr[i];", phase: 'heapify', action: 'swap_start' },
  { lineNumber: 13, code: "    arr[i] = arr[largest];", phase: 'heapify', action: 'swap_assign' },
  { lineNumber: 14, code: "    arr[largest] = temp;", phase: 'heapify', action: 'swap_complete' },
  { lineNumber: 15, code: "    heapify(arr, n, largest);", phase: 'heapify', action: 'recursive_call' },
  { lineNumber: 16, code: "  }", phase: 'heapify', action: 'end_swap_block' },
  { lineNumber: 17, code: "}", phase: 'heapify', action: 'function_end' },
  { lineNumber: 18, code: "", phase: 'main', action: 'separator' },
  { lineNumber: 19, code: "static void heapSort(int arr[]) {", phase: 'main', action: 'heapsort_start' },
  { lineNumber: 20, code: "  int n = arr.length;", phase: 'main', action: 'get_length' },
  { lineNumber: 21, code: "  for (int i = n / 2 - 1; i >= 0; i--) {", phase: 'build', action: 'build_heap_loop' },
  { lineNumber: 22, code: "    heapify(arr, n, i);", phase: 'build', action: 'build_heapify_call' },
  { lineNumber: 23, code: "  }", phase: 'build', action: 'build_loop_end' },
  { lineNumber: 24, code: "  for (int i = n - 1; i > 0; i--) {", phase: 'sort', action: 'sort_loop' },
  { lineNumber: 25, code: "    int temp = arr[0];", phase: 'sort', action: 'extract_temp' },
  { lineNumber: 26, code: "    arr[0] = arr[i];", phase: 'sort', action: 'move_last_to_root' },
  { lineNumber: 27, code: "    arr[i] = temp;", phase: 'sort', action: 'place_max_at_end' },
  { lineNumber: 28, code: "    heapify(arr, i, 0);", phase: 'sort', action: 'sort_heapify_call' },
  { lineNumber: 29, code: "  }", phase: 'sort', action: 'sort_loop_end' },
  { lineNumber: 30, code: "}", phase: 'main', action: 'heapsort_end' }
];

const CodePanel: React.FC<CodePanelProps> = ({
  currentStep,
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
  className
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

  const handleRestart = () => {
    onRestart();
  };

  const getLineClass = (index: number) => {
    const baseClass = "flex items-start px-3 py-1.5 transition-all duration-200 border-l-2 text-sm font-mono";
    
    if (index === currentStep) {
      return `${baseClass} bg-blue-500/20 border-l-blue-400`;
    } else if (index < currentStep) {
      return `${baseClass} bg-green-500/10 border-l-green-400/50`;
    } else {
      return `${baseClass} bg-transparent border-l-transparent`;
    }
  };

  return (
    <div className={`bg-gray-800/50 rounded-lg border border-gray-600/50 ${className}`}>
      {/* Header with controls */}
      <div className="bg-gray-700/50 px-4 py-3 border-b border-gray-600/50 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-white">HeapSort Java Code</h3>
        </div>

        {/* Control buttons */}
        <div className="flex items-center gap-3">
          {/* Playback controls */}
          <Button
            onClick={handleRestart}
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 rounded-full w-8 h-8 p-0"
          >
            <RotateCcw size={14} />
          </Button>
          
          <Button
            onClick={isPlaying ? onPause : onPlay}
            size="sm"
            className="bg-blue-600 hover:bg-blue-500 rounded-full w-10 h-10 p-0"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </Button>

          {/* Speed control */}
          <div className="flex items-center gap-2 bg-gray-700/50 rounded-full px-3 py-1">
            <span className="text-xs text-gray-300">Speed:</span>
            {speedOptions.map((speed) => (
              <button
                key={speed}
                onClick={() => onSpeedChange(speed)}
                className={`px-1.5 py-0.5 rounded text-xs transition-colors ${
                  speed === playbackSpeed
                    ? 'bg-green-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Enhanced Create button with hover input */}
          <div className="relative group">
            <Button
              onMouseEnter={() => setShowCreateInput(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-lg px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles size={14} className="mr-2" />
              Create
            </Button>
            
            {/* Hover input panel */}
            {showCreateInput && (
              <div 
                className="absolute top-full right-0 mt-2 w-80 bg-gray-800/95 backdrop-blur-md rounded-xl border border-gray-600/50 shadow-2xl p-4 z-50"
                onMouseLeave={() => {
                  if (!inputValue) setShowCreateInput(false);
                }}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <h4 className="text-sm font-semibold text-white">Create Custom Array</h4>
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="e.g., 9,4,3,8,10,2,5"
                      className="flex-1 bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-emerald-400 text-sm"
                      autoFocus
                    />
                    <Button
                      onClick={handleCreateSubmit}
                      disabled={!inputValue.trim()}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3 disabled:opacity-50"
                    >
                      ✓
                    </Button>
                  </div>
                  
                  <p className="text-xs text-gray-400">Enter numbers separated by commas</p>
                </div>
              </div>
            )}
          </div>

          {/* Full screen toggle */}
          <Button
            onClick={onFullScreenToggle}
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 rounded-full w-8 h-8 p-0"
          >
            {isFullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </Button>
        </div>
      </div>
      
      {/* Code content */}
      <div className="overflow-auto max-h-96 p-2">
        {heapSortCode.map((step, index) => (
          <div key={index} className={getLineClass(index)}>
            <div className="w-8 text-gray-500 text-right mr-3 select-none text-xs pt-0.5">
              {step.lineNumber || ''}
            </div>
            <div className="text-gray-200 flex-1 leading-relaxed text-xs">
              {step.code}
            </div>
            {index === currentStep && (
              <div className="ml-2 pt-1">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Status footer */}
      {heapSortCode[currentStep] && (
        <div className="px-4 py-3 border-t border-gray-600/50 bg-gray-800/30">
          <p className="text-xs text-gray-300">
            <span className="text-blue-400 font-semibold">Line {heapSortCode[currentStep].lineNumber}:</span>{' '}
            {heapSortCode[currentStep].action.replace(/_/g, ' ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default CodePanel;
