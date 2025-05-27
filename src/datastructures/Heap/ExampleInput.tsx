
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Send } from 'lucide-react';

interface ExampleInputProps {
  onSubmit: (input: string) => void;
  className?: string;
}

const ExampleInput: React.FC<ExampleInputProps> = ({ onSubmit, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue.trim());
      setInputValue('');
      setIsOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!isOpen) {
    return (
      <div className={className}>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus size={16} className="mr-2" />
          Create Example
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-xl border border-gray-600/50 shadow-2xl p-4 ${className}`}>
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          Create Custom Example
        </h3>
        
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your example input..."
            className="flex-1 bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-emerald-400"
            autoFocus
          />
          <Button
            onClick={handleSubmit}
            disabled={!inputValue.trim()}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </Button>
        </div>
        
        <Button
          onClick={() => setIsOpen(false)}
          variant="ghost"
          className="text-gray-400 hover:text-white text-sm"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ExampleInput;
