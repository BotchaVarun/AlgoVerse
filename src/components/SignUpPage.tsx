import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Code2, BookOpen, Trophy, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar'; // Assuming this is the correct path to your Navbar component

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent, type: 'login' | 'signup') => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: type === 'login' ? 'Welcome back!' : 'Account created!',
        description: type === 'login'
          ? 'You have successfully logged in to AlgoVerse.'
          : 'Your AlgoVerse account has been created successfully.',
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navbar at the top, explicitly hiding the SignUp button */}
      <Navbar hideSignUpButton={true} />

      {/* Watermark */}
      <div className="watermark">AlgoVerse</div>

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Main Content Container */}
      {/* Added pt-20 (5rem) and min-h-[calc(100vh-80px)] to push content down below the fixed navbar */}
      <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center p-4 pt-20">
        <div className="w-full max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden">

          {/* LEFT COLUMN: Branding, Feature Icons, Stats (Hidden on LG screens and up) */}
          <div className="hidden lg:flex w-full lg:w-1/2 flex-col justify-center items-center p-6 lg:p-12 relative order-2 md:order-1">
            <div className="max-w-lg text-center space-y-6">
              <div className="flex items-center justify-center mb-8">
                <Code2 className="w-12 h-12 text-primary mr-3" />
                <h1 className="text-4xl font-bold gradient-text">AlgoVerse</h1>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white leading-tight">
                Master the art of <span className="gradient-text">algorithms</span> with interactive learning
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300">
                Explore complex concepts through visualizations, hands-on challenges, and expert-crafted learning paths designed for all experience levels.
              </p>

              {/* Feature Icons */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="feature-icon">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Interactive Visualizations</h3>
                </div>
                <div className="text-center">
                  <div className="feature-icon">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Hands-on Challenges</h3>
                </div>
                <div className="text-center">
                  <div className="feature-icon">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Learning Paths</h3>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-center items-center space-x-8 mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Developers mastering algorithms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Interactive challenges</div>
                </div>
              </div>
            </div>

            {/* Code Snippet Decoration */}
          
          </div>

          {/* RIGHT COLUMN: Auth Form + Quick Sort Card (Visible on all screens) */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 lg:p-12 order-1 md:order-2">
            <div className="w-full max-w-md">
              <Card className="glass-card border-0 shadow-2xl p-8">
                <div className="text-center mb-8">
                  {/* The AlgoVerse logo/title visible on smaller screens within the card */}
                  <div className="flex items-center justify-center lg:hidden mb-4">
                    <Code2 className="w-8 h-8 text-primary mr-2" />
                    <h1 className="text-2xl font-bold gradient-text">AlgoVerse</h1>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Welcome to your learning journey
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Join thousands of developers mastering algorithms
                  </p>
                </div>

                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={(e) => handleAuth(e, 'login')} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            required
                            className="h-12 pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="text-gray-600 dark:text-gray-400">Remember me</span>
                        </label>
                        <a href="#" className="text-primary hover:underline">
                          Forgot password?
                        </a>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 cta-button"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form onSubmit={(e) => handleAuth(e, 'signup')} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            required
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            required
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signupEmail">Email</Label>
                        <Input
                          id="signupEmail"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signupPassword">Password</Label>
                        <div className="relative">
                          <Input
                            id="signupPassword"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            required
                            className="h-12 pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          required
                          className="h-12"
                        />
                      </div>

                      <div className="flex items-start space-x-2 text-sm">
                        <input type="checkbox" required className="rounded border-gray-300 mt-1" />
                        <span className="text-gray-600 dark:text-gray-400">
                          I agree to the{' '}
                          <a href="#" className="text-primary hover:underline">Terms of Service</a>
                          {' '}and{' '}
                          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                        </span>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 cta-button"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating account...' : 'Create Account'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Social Login */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </div>
                   
                  </div>

              
                </div>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUpPage;