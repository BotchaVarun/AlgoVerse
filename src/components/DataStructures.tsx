import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Target,
  Search,
  Clock,
  Code,
  ArrowRight,
  Check,
  ChevronLeft,
  PlayCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom'; // Make sure Link is imported

const DataStructures = () => {
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  const examples = [
    {
      id: 'LinearSearch',
      title: 'Linear Search',
      description: 'A straightforward search algorithm that checks each element in a collection until finding the target.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      pseudoCode: [
        'function linearSearch(array, target):',
        '   for i from 0 to length(array) - 1:',
        '       if array[i] equals target:',
        '           return i',
        '   return -1'
      ],
      steps: [
        'Start from the first element and compare it with the target value',
        'If the element matches the target, return the index',
        'If not, move to the next element',
        'Repeat until the element is found or the end of array is reached',
        'If the target is not found, return -1'
      ]
    },
    {
      id: 'bubble-sort',
      title: 'Bubble Sort',
      description: 'A simple sorting algorithm that repeatedly compares adjacent elements and swaps them if they are in the wrong order.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      pseudoCode: [
        'function bubbleSort(array):',
        '   n = length(array)',
        '   for i from 0 to n - 1:',
        '       for j from 0 to n - i - 1:',
        '           if array[j] > array[j + 1]:',
        '               swap array[j] and array[j + 1]',
        '   return array'
      ],
      steps: [
        'Compare each pair of adjacent elements',
        'Swap elements if they are in the wrong order',
        'After each iteration, the largest element bubbles up to the end',
        'Repeat the process for all elements',
        'The array is sorted when all elements are in order'
      ]
    },
    {
      id: 'selection-sort',
      title: 'Selection Sort',
      description: 'A sorting algorithm that finds the minimum element and places it at the beginning of the unsorted portion.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      pseudoCode: [
        'function selectionSort(array):',
        '   n = length(array)',
        '   for i from 0 to n - 1:',
        '       minIndex = i',
        '       for j from i + 1 to n:',
        '           if array[j] < array[minIndex]:',
        '               minIndex = j',
        '       swap array[i] and array[minIndex]',
        '   return array'
      ],
      steps: [
        'Find the minimum element in the unsorted part of the array',
        'Swap it with the element at the beginning of the unsorted segment',
        'Move the boundary of the unsorted segment one element to the right',
        'Repeat until the array is sorted',
        'After each iteration, the left portion of the array becomes sorted'
      ]
    },
    {
      id: 'LinearSearch',
      title: 'Linear Search',
      description: 'A straightforward search algorithm that checks each element in a collection until finding the target.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      pseudoCode: [
        'function linearSearch(array, target):',
        '   for i from 0 to length(array) - 1:',
        '       if array[i] equals target:',
        '           return i',
        '   return -1'
      ],
      steps: [
        'Start from the first element and compare it with the target value',
        'If the element matches the target, return the index',
        'If not, move to the next element',
        'Repeat until the element is found or the end of array is reached',
        'If the target is not found, return -1'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-orange-50/30 to-yellow-50/30 dark:from-background dark:via-orange-950/30 dark:to-yellow-950/30">
      {/* Watermark */}
      <div className="watermark">DSA</div>

      {/* Navigation */}
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home Page</span>
        </Link>

        {/* Hero Section */}
        <section className="relative pt-8 pb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Target className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Data Structures</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Master <span className="gradient-text">Data Structures</span> Approaches
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
            Solve problems using different data structures and their approaches . solve real time problems by learning different visualizations and simulations.
          </p>

          <div className="flex items-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-sm">
              <Check className="w-4 h-4" />
              <span>Beginner Friendly</span>
            </div>

          </div>
        </section>

        {/* Overview Section */}
        <section className="mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">What are Data Structures</h2>
                  <p className="text-muted-foreground mb-4">
                    Data structures are simply ways to organize and store data in a computer so it can be used efficiently. Think of them as specialized containers designed for different types of information. By choosing the right structure, we can perform operations like searching or adding data much faster.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    While not always efficient for complex problems, Data Structures have:
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Organized Storage: They arrange data systematically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Efficient Operations: They speed up tasks like searching or adding data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Memory Use: They dictate how data occupies space</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Abstract View: They simplify how we interact with data</span>
                    </li>
                  </ul>


                </div>

                <div className="bg-muted/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Time & Space Complexity</h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Linear Search</span>
                        <span className="text-sm text-muted-foreground">O(n)</span>

                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full w-[30%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Bubble Sort</span>
                        <span className="text-sm text-muted-foreground">O(n²)</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full w-[60%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Selection Sort</span>
                        <span className="text-sm text-muted-foreground">O(n²)</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full w-[60%]"></div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Common Characteristics</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Often have higher time complexity (e.g., O(n), O(n²))</li>
                        <li>• Usually have modest space complexity (often O(1) or O(n))</li>
                        <li>• Performance degrades as input size increases</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Examples Section */}
        <section className="mb-16">
          <h2 className="section-title gradient-text mb-8">Data Structures</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {examples.map((example) => (
              <Card
                key={example.id}
                className={`cursor-pointer transition-all ${
                  selectedExample === example.id ? 'ring-2 ring-primary' : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedExample(example.id === selectedExample ? null : example.id)}
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{example.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{example.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {example.timeComplexity} time
                      </span>
                    </div>

                    {/* MODIFIED PART: Wrapped Button with Link */}
                    <Link to={`/${example.id}`}> {/* Dynamic path based on example.id */}
                      <Button size="sm" variant="outline">
                        <PlayCircle className="w-4 h-4 mr-1" />
                        Explore
                      </Button>
                    </Link>
                    {/* END MODIFIED PART */}

                    <Link to="/algocode">
                      <Button className="cta-button">
                        try out challenges
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Expanded View for Selected Example */}
          {selectedExample && (
            <Card className="mt-8 animate-fade-in">
              <CardContent className="p-8">
                {examples.filter(ex => ex.id === selectedExample).map(example => (
                  <div key={example.id}>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{example.title}</h3>
                        <p className="text-muted-foreground">{example.description}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-sm mb-1">
                          Time Complexity: <span className="font-mono">{example.timeComplexity}</span>
                        </div>
                        <div className="text-sm">
                          Space Complexity: <span className="font-mono">{example.spaceComplexity}</span>
                        </div>
                      </div>
                    </div>

                    <Tabs defaultValue="code">
                      <TabsList className="w-full justify-start mb-4">
                        <TabsTrigger value="code">Pseudocode</TabsTrigger>
                        <TabsTrigger value="steps">How It Works</TabsTrigger>
                      </TabsList>

                      <TabsContent value="code" className="mt-0">
                        <Card>
                          <CardContent className="p-4 bg-gray-900 text-green-400 font-mono text-sm rounded-lg">
                            <pre>
                              {example.pseudoCode.map((line, i) => (
                                <div key={i} className="py-0.5">
                                  {line}
                                </div>
                              ))}
                            </pre>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="steps" className="mt-0">
                        <Card>
                          <CardContent className="p-4">
                            <ol className="space-y-2">
                              {example.steps.map((step, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                                    {i + 1}
                                  </div>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>

                    <div className="mt-6 flex justify-end">
                      <Button className="cta-button">
                        Try Interactive Demo
                        <Code className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </section>

        {/* Next Steps Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Continue Your Learning Journey</h2>

          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-none shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Ready for the next step?</h3>
                  <p className="text-muted-foreground mb-6">
                    Once you've mastered Data Structure approaches, advance to  algorithms.
                    Explore Different algorithm types and their applications in real-world scenarios.
                  </p>

                  <Link to="/algorithms">
                    <Button variant="outline" className="group">
                      View All Algorithm Types
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                <div className="w-full md:w-1/3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl"></div>
                    <Card className="relative z-10">
                      <CardContent className="p-6 space-y-3">
                        <h4 className="font-semibold">Next Topics:</h4>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Divide & Conquer</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Recursion</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Greedy Algorithms</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default DataStructures;