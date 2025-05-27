
import React, { useEffect, useState } from 'react';

interface PseudoCodeStep {
  lineNumber: number;
  code: string;
  phase: 'heapify' | 'build' | 'sort' | 'main';
  action: string;
}

interface PseudoCodePanelProps {
  currentStep: number;
  className?: string;
}

const heapSortCode: PseudoCodeStep[] = [
  { lineNumber: 1, code: "static void heapify(int arr[], int n, int i) {", phase: 'heapify', action: 'heapify_start' },
  { lineNumber: 2, code: "  int largest = i;", phase: 'heapify', action: 'init_largest' },
  { lineNumber: 3, code: "  int l = 2 * i + 1;", phase: 'heapify', action: 'calc_children' },
  { lineNumber: 4, code: "  int r = 2 * i + 2;", phase: 'heapify', action: 'calc_right' },
  { lineNumber: 5, code: "  if (l < n && arr[l] > arr[largest]) {", phase: 'heapify', action: 'compare_left' },
  { lineNumber: 6, code: "    largest = l;", phase: 'heapify', action: 'update_largest' },
  { lineNumber: 7, code: "  }", phase: 'heapify', action: 'end_left_check' },
  { lineNumber: 8, code: "  if (r < n && arr[r] > arr[largest]) {", phase: 'heapify', action: 'compare_right' },
  { lineNumber: 9, code: "    largest = r;", phase: 'heapify', action: 'update_largest' },
  { lineNumber: 10, code: "  }", phase: 'heapify', action: 'end_right_check' },
  { lineNumber: 11, code: "  if (largest != i) {", phase: 'heapify', action: 'swap_needed' },
  { lineNumber: 12, code: "    int temp = arr[i];", phase: 'heapify', action: 'perform_swap' },
  { lineNumber: 13, code: "    arr[i] = arr[largest];", phase: 'heapify', action: 'perform_swap' },
  { lineNumber: 14, code: "    arr[largest] = temp;", phase: 'heapify', action: 'perform_swap' },
  { lineNumber: 15, code: "    heapify(arr, n, largest);", phase: 'heapify', action: 'recursive_call' },
  { lineNumber: 16, code: "  }", phase: 'heapify', action: 'end_swap_block' },
  { lineNumber: 17, code: "}", phase: 'heapify', action: 'function_end' },
  { lineNumber: 18, code: "", phase: 'main', action: 'separator' },
  { lineNumber: 19, code: "static void heapSort(int arr[]) {", phase: 'main', action: 'start' },
  { lineNumber: 20, code: "  int n = arr.length;", phase: 'main', action: 'get_length' },
  { lineNumber: 21, code: "  for (int i = n / 2 - 1; i >= 0; i--) {", phase: 'build', action: 'build_heap_start' },
  { lineNumber: 22, code: "    heapify(arr, n, i);", phase: 'build', action: 'build_heapify_call' },
  { lineNumber: 23, code: "  }", phase: 'build', action: 'build_loop_end' },
  { lineNumber: 24, code: "  for (int i = n - 1; i > 0; i--) {", phase: 'sort', action: 'sort_start' },
  { lineNumber: 25, code: "    int temp = arr[0];", phase: 'sort', action: 'extract_max' },
  { lineNumber: 26, code: "    arr[0] = arr[i];", phase: 'sort', action: 'swap' },
  { lineNumber: 27, code: "    arr[i] = temp;", phase: 'sort', action: 'swap' },
  { lineNumber: 28, code: "    heapify(arr, i, 0);", phase: 'sort', action: 'sort_heapify_call' },
  { lineNumber: 29, code: "  }", phase: 'sort', action: 'sort_loop_end' },
  { lineNumber: 30, code: "}", phase: 'main', action: 'heapsort_end' }
];

// Action to line mapping for precise highlighting
const actionToLineMap: { [key: string]: number } = {
  'start': 18,
  'get_length': 19,
  'build_heap_start': 20,
  'build_heapify_call': 21,
  'heapify_start': 0,
  'init_largest': 1,
  'calc_children': 2,
  'calc_right': 3,
  'compare_left': 4,
  'update_largest': 5,
  'compare_right': 7,
  'swap_needed': 10,
  'no_swap_needed': 10,
  'perform_swap': 11,
  'recursive_call': 14,
  'sort_start': 23,
  'extract_max': 24,
  'swap': 25,
  'sort_heapify_call': 27,
  'complete': 29
};

const PseudoCodePanel: React.FC<PseudoCodePanelProps> = ({ currentStep, className }) => {
  const [currentStepData, setCurrentStepData] = useState<any>(null);
  const [variables, setVariables] = useState<any>({});

  // Get current step data from HeapSortVisualization
  useEffect(() => {
    const getCurrentStepData = (window as any).getCurrentStepData;
    if (getCurrentStepData) {
      const stepData = getCurrentStepData();
      setCurrentStepData(stepData.step);
      setVariables(stepData.variables || {});
    }
  }, [currentStep]);

  const getCurrentHighlightedLine = () => {
    if (!currentStepData) return -1;
    return currentStepData.codeLineIndex;
  };

  const highlightedLineIndex = getCurrentHighlightedLine();

  const substituteVariables = (code: string, vars: any) => {
    let substituted = code;
    
    // Replace variable references with their values
    Object.entries(vars).forEach(([key, value]) => {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      substituted = substituted.replace(regex, String(value));
    });

    // Handle specific patterns for calculations
    if (substituted.includes('2 * ') && vars.i !== undefined) {
      // For l = 2 * i + 1
      if (substituted.includes('2 * i + 1')) {
        const result = 2 * vars.i + 1;
        substituted = substituted.replace('2 * i + 1', `2 * ${vars.i} + 1 = ${result}`);
      }
      // For r = 2 * i + 2
      if (substituted.includes('2 * i + 2')) {
        const result = 2 * vars.i + 2;
        substituted = substituted.replace('2 * i + 2', `2 * ${vars.i} + 2 = ${result}`);
      }
    }

    // Handle array length calculations
    if (substituted.includes('n / 2 - 1') && vars.n !== undefined) {
      const result = Math.floor(vars.n / 2) - 1;
      substituted = substituted.replace('n / 2 - 1', `${vars.n} / 2 - 1 = ${result}`);
    }

    return substituted;
  };

  const getLineClass = (index: number) => {
    const baseClass = "flex items-start px-4 py-2 transition-all duration-300 border-l-4 text-sm font-mono group hover:bg-gray-700/30";
    
    if (index === highlightedLineIndex) {
      return `${baseClass} bg-gradient-to-r from-yellow-500/40 to-orange-500/30 border-l-yellow-400 shadow-lg scale-[1.02] transform animate-pulse`;
    } else if (index < highlightedLineIndex) {
      return `${baseClass} bg-gradient-to-r from-green-500/15 to-emerald-500/10 border-l-green-400/70`;
    } else {
      return `${baseClass} bg-transparent border-l-gray-600/30 hover:border-l-gray-500/50`;
    }
  };

  const getDisplayCode = (step: PseudoCodeStep, index: number) => {
    if (index === highlightedLineIndex && variables) {
      return substituteVariables(step.code, variables);
    }
    return step.code;
  };

  return (
    <div className={`bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-600/40 shadow-2xl ${className}`}>
      <div className="bg-gradient-to-r from-gray-700/60 to-gray-800/60 px-6 py-4 border-b border-gray-600/40 rounded-t-xl flex items-center gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <h3 className="text-lg font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          HeapSort Pseudocode
        </h3>
      </div>
      
      <div className="overflow-auto max-h-[600px] p-2">
        {heapSortCode.map((step, index) => (
          <div key={index} className={getLineClass(index)}>
            <div className="w-10 text-gray-500 text-right mr-4 select-none text-xs pt-1 font-medium">
              {step.lineNumber || ''}
            </div>
            <div className="text-gray-200 flex-1 leading-relaxed text-sm group-hover:text-white transition-colors duration-200">
              {getDisplayCode(step, index)}
            </div>
            {index === highlightedLineIndex && (
              <div className="ml-3 pt-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="px-6 py-4 border-t border-gray-600/40 bg-gradient-to-r from-gray-800/40 to-gray-900/60">
        <p className="text-sm text-gray-300">
          <span className="text-emerald-400 font-semibold">Step:</span>{' '}
          {currentStep + 1} - {currentStepData ? 
            currentStepData.action.replace(/_/g, ' ') : 
            'Processing...'}
        </p>
        {variables && Object.keys(variables).length > 0 && (
          <div className="mt-2 text-xs text-gray-400">
            <span className="text-blue-400 font-semibold">Variables:</span>{' '}
            {Object.entries(variables).map(([key, value]) => (
              <span key={key} className="mr-3">
                {key}={String(value)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PseudoCodePanel;
