import React, { useState, useEffect } from 'react';

interface TreeNode {
  value: number;
  x: number;
  y: number;
  index: number;
  state: 'initial' | 'current' | 'comparing' | 'largest' | 'swapping' | 'sorted';
}

interface HeapSortVisualizationProps {
  userInput?: string;
  currentStep: number;
  isPlaying: boolean;
  playbackSpeed: number;
  onStepChange: (step: number) => void;
  onPlayingChange: (playing: boolean) => void;
  onAnimationComplete: () => void;
  isAnimationComplete: boolean;
  className?: string;
}

interface AlgorithmStep {
  action: string;
  indices: number[];
  values?: number[];
  phase: 'build' | 'sort' | 'heapify';
  description: string;
  codeLineIndex: number;
  variables?: { [key: string]: any };
}

const HeapSortVisualization: React.FC<HeapSortVisualizationProps> = ({ 
  userInput, 
  currentStep,
  isPlaying,
  playbackSpeed,
  onStepChange,
  onPlayingChange,
  onAnimationComplete,
  isAnimationComplete,
  className 
}) => {
  const [data, setData] = useState<number[]>([]);
  const [originalData, setOriginalData] = useState<number[]>([]);
  const [heap, setHeap] = useState<number[]>([]);
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>([]);
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set());
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
  const [largestIndex, setLargestIndex] = useState<number>(-1);
  const [currentStepText, setCurrentStepText] = useState('');
  const [heapSize, setHeapSize] = useState(0);

  // Initialize data from user input or use default
  useEffect(() => {
    if (userInput && userInput.trim()) {
      const numbers = userInput.split(/[,\s]+/).map(num => parseInt(num.trim())).filter(n => !isNaN(n));
      if (numbers.length > 0) {
        initializeVisualization(numbers.slice(0, 10));
      }
    } else {
      const defaultData = [9, 4, 3, 8, 10, 2, 5];
      initializeVisualization(defaultData);
    }
  }, [userInput]);

  // Handle play/pause control with immediate response
  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1 && !isAnimationComplete) {
      const timer = setTimeout(() => {
        onStepChange(currentStep + 1);
      }, Math.max(500, 1000 / playbackSpeed));

      return () => clearTimeout(timer);
    } else if (isPlaying && currentStep >= steps.length - 1) {
      onAnimationComplete();
    }
  }, [isPlaying, currentStep, playbackSpeed, steps.length, isAnimationComplete]);

  // IMMEDIATE synchronization - execute step instantly when currentStep changes
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      executeStepImmediately(steps[currentStep]);
    }
  }, [currentStep, steps]);

  const initializeVisualization = (numbers: number[]) => {
    setData([...numbers]);
    setOriginalData([...numbers]); // Store original data for reset
    setHeap([...numbers]);
    setHeapSize(numbers.length);
    setSortedIndices(new Set());
    setComparingIndices([]);
    setSwappingIndices([]);
    setLargestIndex(-1);
    setCurrentStepText('Ready to start HeapSort');
    calculateTreePositions(numbers);
    generateAlgorithmSteps(numbers);
  };

  const resetVisualization = () => {
    // Reset to original unsorted state
    setHeap([...originalData]);
    setData([...originalData]);
    setHeapSize(originalData.length);
    setSortedIndices(new Set());
    setComparingIndices([]);
    setSwappingIndices([]);
    setLargestIndex(-1);
    setCurrentStepText('Ready to start HeapSort');
    calculateTreePositions(originalData);
    
    // Reset tree nodes to initial state
    setTreeNodes(prevNodes => 
      prevNodes.map((node, index) => ({
        ...node,
        value: originalData[index],
        state: 'initial' as const
      }))
    );
  };

  // Expose reset function to parent
  useEffect(() => {
    (window as any).resetHeapSortVisualization = resetVisualization;
    return () => {
      delete (window as any).resetHeapSortVisualization;
    };
  }, [originalData]);

  const generateAlgorithmSteps = (arr: number[]) => {
    const algorithmSteps: AlgorithmStep[] = [];
    const workingArray = [...arr];
    const n = arr.length;

    algorithmSteps.push({
      action: 'start',
      indices: [],
      phase: 'build',
      description: 'Starting HeapSort algorithm',
      codeLineIndex: 18,
      variables: { n }
    });

    algorithmSteps.push({
      action: 'get_length',
      indices: [],
      phase: 'build',
      description: 'Get array length',
      codeLineIndex: 19,
      variables: { n }
    });

    algorithmSteps.push({
      action: 'build_heap_start',
      indices: [],
      phase: 'build',
      description: 'Building max heap from bottom up',
      codeLineIndex: 20,
      variables: { n, startIndex: Math.floor(n / 2) - 1 }
    });

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      algorithmSteps.push({
        action: 'build_heapify_call',
        indices: [i],
        phase: 'build',
        description: `Heapifying subtree rooted at index ${i}`,
        codeLineIndex: 21,
        variables: { n, i }
      });
      
      addHeapifySteps(algorithmSteps, workingArray, n, i, 'build');
    }

    algorithmSteps.push({
      action: 'sort_start',
      indices: [],
      phase: 'sort',
      description: 'Starting extraction phase',
      codeLineIndex: 23,
      variables: { n }
    });

    for (let i = n - 1; i > 0; i--) {
      algorithmSteps.push({
        action: 'extract_max',
        indices: [0, i],
        phase: 'sort',
        description: `Extracting maximum element to position ${i}`,
        codeLineIndex: 24,
        variables: { n, i, maxElement: workingArray[0] }
      });

      algorithmSteps.push({
        action: 'swap',
        indices: [0, i],
        values: [workingArray[0], workingArray[i]],
        phase: 'sort',
        description: `Swapping elements at indices 0 and ${i}`,
        codeLineIndex: 25,
        variables: { i, temp: workingArray[0] }
      });

      [workingArray[0], workingArray[i]] = [workingArray[i], workingArray[0]];

      algorithmSteps.push({
        action: 'sort_heapify_call',
        indices: [0],
        phase: 'sort',
        description: `Heapifying reduced heap of size ${i}`,
        codeLineIndex: 27,
        variables: { i, heapSize: i }
      });

      addHeapifySteps(algorithmSteps, workingArray, i, 0, 'sort');
    }

    algorithmSteps.push({
      action: 'complete',
      indices: [],
      phase: 'sort',
      description: 'HeapSort completed!',
      codeLineIndex: 29,
      variables: {}
    });

    setSteps(algorithmSteps);
  };

  const addHeapifySteps = (steps: AlgorithmStep[], arr: number[], n: number, i: number, phase: 'build' | 'sort') => {
    steps.push({
      action: 'heapify_start',
      indices: [i],
      phase,
      description: `Heapify called with root at index ${i}`,
      codeLineIndex: 0,
      variables: { n, i }
    });

    steps.push({
      action: 'init_largest',
      indices: [i],
      phase,
      description: `Initialize largest as root (${i})`,
      codeLineIndex: 1,
      variables: { largest: i, i }
    });

    const l = 2 * i + 1;
    const r = 2 * i + 2;

    steps.push({
      action: 'calc_children',
      indices: l < n ? [l] : [],
      phase,
      description: `Calculate left child index: ${l}`,
      codeLineIndex: 2,
      variables: { l, i }
    });

    if (r < n) {
      steps.push({
        action: 'calc_right',
        indices: [r],
        phase,
        description: `Calculate right child index: ${r}`,
        codeLineIndex: 3,
        variables: { r, i }
      });
    }

    let largest = i;

    if (l < n) {
      steps.push({
        action: 'compare_left',
        indices: [l, largest],
        phase,
        description: `Comparing left child arr[${l}]=${arr[l]} with arr[${largest}]=${arr[largest]}`,
        codeLineIndex: 4,
        variables: { l, largest, n, leftValue: arr[l], largestValue: arr[largest] }
      });

      if (arr[l] > arr[largest]) {
        largest = l;
        steps.push({
          action: 'update_largest',
          indices: [l],
          phase,
          description: `Left child is larger, updating largest to ${l}`,
          codeLineIndex: 5,
          variables: { largest: l, l }
        });
      }
    }

    if (r < n) {
      steps.push({
        action: 'compare_right',
        indices: [r, largest],
        phase,
        description: `Comparing right child arr[${r}]=${arr[r]} with arr[${largest}]=${arr[largest]}`,
        codeLineIndex: 7,
        variables: { r, largest, n, rightValue: arr[r], largestValue: arr[largest] }
      });

      if (arr[r] > arr[largest]) {
        largest = r;
        steps.push({
          action: 'update_largest',
          indices: [r],
          phase,
          description: `Right child is larger, updating largest to ${r}`,
          codeLineIndex: 8,
          variables: { largest: r, r }
        });
      }
    }

    if (largest !== i) {
      steps.push({
        action: 'swap_needed',
        indices: [i, largest],
        phase,
        description: `Swap needed between indices ${i} and ${largest}`,
        codeLineIndex: 10,
        variables: { largest, i }
      });

      steps.push({
        action: 'perform_swap',
        indices: [i, largest],
        values: [arr[i], arr[largest]],
        phase,
        description: `Swapping arr[${i}]=${arr[i]} with arr[${largest}]=${arr[largest]}`,
        codeLineIndex: 11,
        variables: { temp: arr[i], i, largest }
      });

      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      steps.push({
        action: 'recursive_call',
        indices: [largest],
        phase,
        description: `Recursively heapify subtree at ${largest}`,
        codeLineIndex: 14,
        variables: { largest, n }
      });

      if (largest < Math.floor(n / 2)) {
        addHeapifySteps(steps, arr, n, largest, phase);
      }
    } else {
      steps.push({
        action: 'no_swap_needed',
        indices: [i],
        phase,
        description: `No swap needed, heap property satisfied`,
        codeLineIndex: 10,
        variables: { largest, i }
      });
    }
  };

  // Get current step variables for pseudocode panel
  const getCurrentStepVariables = () => {
    if (currentStep < steps.length) {
      return steps[currentStep].variables || {};
    }
    return {};
  };

  // Get current step for pseudocode panel
  const getCurrentStep = () => {
    if (currentStep < steps.length) {
      return steps[currentStep];
    }
    return null;
  };

  // Expose current step data to parent
  useEffect(() => {
    (window as any).getCurrentStepData = () => ({
      step: getCurrentStep(),
      variables: getCurrentStepVariables(),
      currentStep
    });
  }, [currentStep, steps]);

  // IMMEDIATE execution - no delays, instant state updates
  const executeStepImmediately = (step: AlgorithmStep) => {
    // Reset all states immediately
    setComparingIndices([]);
    setSwappingIndices([]);
    setLargestIndex(-1);

    // Set explanation text immediately
    setCurrentStepText(step.description);

    // Immediate state updates based on action
    switch (step.action) {
      case 'compare_left':
      case 'compare_right':
        setComparingIndices([...step.indices]);
        break;
      case 'update_largest':
        setLargestIndex(step.indices[0]);
        break;
      case 'swap':
      case 'perform_swap':
        setSwappingIndices([...step.indices]);
        if (step.values) {
          const newHeap = [...heap];
          [newHeap[step.indices[0]], newHeap[step.indices[1]]] = [step.values[1], step.values[0]];
          setHeap(newHeap);
          calculateTreePositions(newHeap);
        }
        break;
      case 'extract_max':
        if (step.phase === 'sort') {
          setSortedIndices(prev => new Set([...prev, step.indices[1]]));
          setHeapSize(step.indices[1]);
        }
        break;
    }

    // Update tree nodes immediately
    updateTreeNodeStatesImmediately(step);
  };

  // IMMEDIATE tree node state updates
  const updateTreeNodeStatesImmediately = (step: AlgorithmStep) => {
    setTreeNodes(prevNodes => 
      prevNodes.map((node, index) => {
        let newState: TreeNode['state'] = 'initial';
        
        if (sortedIndices.has(index)) {
          newState = 'sorted';
        } else if (step.action === 'perform_swap' || step.action === 'swap') {
          if (step.indices.includes(index)) {
            newState = 'swapping';
          }
        } else if (step.action === 'compare_left' || step.action === 'compare_right') {
          if (step.indices.includes(index)) {
            newState = 'comparing';
          }
        } else if (step.action === 'update_largest' && step.indices[0] === index) {
          newState = 'largest';
        } else if (step.indices.includes(index)) {
          newState = 'current';
        }

        return {
          ...node,
          state: newState,
          value: heap[index] || node.value
        };
      })
    );
  };

  const calculateTreePositions = (arr: number[]) => {
    const nodes: TreeNode[] = [];
    const centerX = 400;
    const startY = 80;
    const levelHeight = 90;

    arr.forEach((value, index) => {
      const level = Math.floor(Math.log2(index + 1));
      const positionInLevel = index - (Math.pow(2, level) - 1);
      const totalInLevel = Math.pow(2, level);
      const spacing = Math.max(100, 600 / totalInLevel);
      
      const x = centerX + (positionInLevel - (totalInLevel - 1) / 2) * spacing;
      const y = startY + level * levelHeight;

      nodes.push({
        value,
        x,
        y,
        index,
        state: 'initial'
      });
    });

    setTreeNodes(nodes);
  };

  const getNodeColor = (node: TreeNode) => {
    switch (node.state) {
      case 'swapping': return 'fill-red-500';
      case 'comparing': return 'fill-yellow-500';
      case 'largest': return 'fill-orange-500';
      case 'current': return 'fill-blue-500';
      case 'sorted': return 'fill-green-500';
      default: return 'fill-purple-500';
    }
  };

  const renderTreeConnections = () => {
    const connections = [];
    treeNodes.forEach((node, index) => {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      
      if (leftChildIndex < treeNodes.length) {
        const leftChild = treeNodes[leftChildIndex];
        connections.push(
          <line
            key={`left-${index}`}
            x1={node.x}
            y1={node.y}
            x2={leftChild.x}
            y2={leftChild.y}
            stroke="#6b7280"
            strokeWidth="2"
          />
        );
      }
      
      if (rightChildIndex < treeNodes.length) {
        const rightChild = treeNodes[rightChildIndex];
        connections.push(
          <line
            key={`right-${index}`}
            x1={node.x}
            y1={node.y}
            x2={rightChild.x}
            y2={rightChild.y}
            stroke="#6b7280"
            strokeWidth="2"
          />
        );
      }
    });
    return connections;
  };

  return (
    <div className={`bg-gray-800/30 rounded-lg border border-gray-600/50 flex flex-col ${className}`}>
      {/* Status text - immediate display */}
      <div className="p-4 text-center bg-gray-800/50 rounded-t-lg">
        <p className="text-white text-lg font-medium">{currentStepText}</p>
        <p className="text-gray-400 text-sm mt-1">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mb-4 p-3 bg-gray-800/40 mx-4 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-xs text-gray-300">Initial</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-xs text-gray-300">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-xs text-gray-300">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-xs text-gray-300">Largest</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-xs text-gray-300">Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-300">Sorted</span>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="flex-1 bg-gray-800/30 rounded-lg mx-4 mb-4 min-h-[300px]">
        <svg width="100%" height="350" viewBox="0 0 800 350" className="overflow-visible">
          {renderTreeConnections()}
          
          {treeNodes.map((node, index) => (
            <g key={`node-${index}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r="35"
                className={`${getNodeColor(node)} stroke-gray-300 stroke-2 transition-all duration-100`}
              />
              <text
                x={node.x}
                y={node.y + 6}
                textAnchor="middle"
                className="fill-white font-bold text-xl pointer-events-none"
              >
                {node.value}
              </text>
              <text
                x={node.x}
                y={node.y - 45}
                textAnchor="middle"
                className="fill-gray-400 text-sm pointer-events-none"
              >
                [{index}]
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Array representation */}
      <div className="p-4 bg-gray-800/50 rounded-lg mx-4 mb-4">
        <h4 className="text-sm font-semibold text-white mb-3">
          Array Representation (Heap Size: {heapSize}):
        </h4>
        <div className="flex flex-wrap gap-2 justify-center">
          {heap.map((value, index) => (
            <div
              key={index}
              className={`
                w-16 h-16 flex items-center justify-center rounded-lg border-2 transition-all duration-100 text-white font-bold text-xl
                ${index >= heapSize ? 'bg-gray-600 border-gray-500 opacity-50' :
                  sortedIndices.has(index) ? 'bg-green-500 border-green-400' : 
                  swappingIndices.includes(index) ? 'bg-red-500 border-red-400' :
                  comparingIndices.includes(index) ? 'bg-yellow-500 border-yellow-400' :
                  largestIndex === index ? 'bg-orange-500 border-orange-400' :
                  'bg-purple-500 border-purple-400'}
              `}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeapSortVisualization;
