import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Lightbulb, GraduationCap } from "lucide-react";
import { Link } from 'react-router-dom'; // Import Link

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="watermark">AlgoVerse</div>

      {/* Background decorative elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm">
                Algorithms & Data Structures
              </span>

              <h1 className="text-4xl md:text-6xl font-extrabold !leading-tight">
                Master the art of <span className="gradient-text">algorithms</span> with interactive learning
              </h1>

              <p className="text-lg text-foreground/70 md:pr-12">
                Explore complex concepts through visualizations, hands-on challenges, and expert-crafted learning paths designed for all experience levels.
              </p>

              <div className="flex flex-wrap gap-4">
                {/* Wrap the Button with Link to scroll to the 'learning-paths' ID */}
                <Link to="/#learning-paths">
                  <Button size="lg" className="cta-button">
                    View curriculum
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>

               
              </div>

              <div className="flex items-center gap-4 text-sm text-foreground/60">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800 overflow-hidden">
                      <img
                        // Using DiceBear API to generate unique avatars
                        src={`https://api.dicebear.com/8.x/lorelei/svg?seed=developer${i}&flip=true&radius=50&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc`}
                        alt={`Developer Avatar ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <span>Join 1000+ students mastering algorithms</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <div className="glass-card rounded-3xl p-6 shadow-xl">
                <pre className="text-xs md:text-sm bg-gray-900 text-gray-100 p-1 rounded-lg overflow-x-auto">
                  <code>{`function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}`}</code>
                </pre>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-primary/10 dark:bg-primary/20 p-3 text-center">
                    <div className="font-bold">O(n log n)</div>
                    <div className="text-xs text-foreground/60">Average</div>
                  </div>
                  <div className="rounded-lg bg-amber-500/10 dark:bg-amber-500/20 p-3 text-center">
                    <div className="font-bold">O(n²)</div>
                    <div className="text-xs text-foreground/60">Worst</div>
                  </div>
                  <div className="rounded-lg bg-green-500/10 dark:bg-green-500/20 p-3 text-center">
                    <div className="font-bold">O(n log n)</div>
                    <div className="text-xs text-foreground/60">Best</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/20 rounded-full blur-xl -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/20 rounded-full blur-xl -z-10"></div>
            </div>
          </motion.div>
        </div>

        {/* Features section */}
        <motion.div
          className="mt-24 grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="glass-card rounded-xl p-6">
            <div className="feature-icon">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Interactive Visualizations</h3>
            <p className="text-foreground/70">See algorithms in action with step-by-step visual breakdowns to understand complex concepts.</p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="feature-icon">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Hands-on Challenges</h3>
            <p className="text-foreground/70">Apply your knowledge by solving real coding problems with instant feedback.</p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="feature-icon">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Learning Paths</h3>
            <p className="text-foreground/70">Follow structured courses from basic to advanced topics designed by industry experts.</p>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;