
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, HelpCircle, Book, FileText, MessageCircle } from "lucide-react";

const HelpPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">How Can We Help You?</h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Find answers to your questions or reach out for personalized assistance.
              </p>
            </div>

            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search for help topics..." 
                  className="pl-10 py-6 text-lg"
                />
              </div>
            </div>

            <Tabs defaultValue="faq" className="mb-12">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="faq">FAQs</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
                <TabsTrigger value="contact">Contact Support</TabsTrigger>
              </TabsList>
              
              <TabsContent value="faq">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Browse common questions and answers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>How do I create an account?</AccordionTrigger>
                        <AccordionContent>
                          To create an account, click on the "Sign Up" button in the navigation bar. Fill in your details in the registration form and follow the instructions to complete the sign-up process.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-2">
                        <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                        <AccordionContent>
                          If you've forgotten your password, click on the "Login" button and then select "Forgot Password". Enter your email address, and we'll send you instructions to reset your password.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-3">
                        <AccordionTrigger>What algorithms are covered in AlgoVerse?</AccordionTrigger>
                        <AccordionContent>
                          AlgoVerse covers a wide range of algorithms including sorting, searching, graph algorithms, dynamic programming, and more. We continuously update our content to include the latest algorithm techniques and challenges.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-4">
                        <AccordionTrigger>How do I track my progress?</AccordionTrigger>
                        <AccordionContent>
                          Once you've created an account and logged in, you can track your progress through your user dashboard. The dashboard shows completed lessons, current skill level, and recommended next steps.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-5">
                        <AccordionTrigger>Is there a mobile app available?</AccordionTrigger>
                        <AccordionContent>
                          We're currently developing mobile apps for iOS and Android. In the meantime, our website is fully responsive and optimized for mobile browsing.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="guides">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Guides</CardTitle>
                    <CardDescription>Step-by-step tutorials and learning paths</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg hover:bg-accent/10 transition-colors">
                        <Book className="h-6 w-6 text-primary mb-2" />
                        <h3 className="font-medium mb-1">Getting Started Guide</h3>
                        <p className="text-sm text-muted-foreground">Learn the basics and set up your learning environment</p>
                      </div>
                      
                      <div className="p-4 border rounded-lg hover:bg-accent/10 transition-colors">
                        <Book className="h-6 w-6 text-primary mb-2" />
                        <h3 className="font-medium mb-1">Data Structures Basics</h3>
                        <p className="text-sm text-muted-foreground">Understanding arrays, linked lists, stacks, and queues</p>
                      </div>
                      
                      <div className="p-4 border rounded-lg hover:bg-accent/10 transition-colors">
                        <Book className="h-6 w-6 text-primary mb-2" />
                        <h3 className="font-medium mb-1">Sorting Algorithms</h3>
                        <p className="text-sm text-muted-foreground">Master various sorting techniques and their applications</p>
                      </div>
                      
                      <div className="p-4 border rounded-lg hover:bg-accent/10 transition-colors">
                        <Book className="h-6 w-6 text-primary mb-2" />
                        <h3 className="font-medium mb-1">Graph Algorithms</h3>
                        <p className="text-sm text-muted-foreground">Understand traversal, shortest paths, and network flows</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="documentation">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Documentation</CardTitle>
                    <CardDescription>Detailed references and specifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="p-4 border rounded-lg hover:bg-accent/10 transition-colors">
                        <FileText className="h-6 w-6 text-primary mb-2" />
                        <h3 className="font-medium mb-1">API Documentation</h3>
                        <p className="text-sm text-muted-foreground">Complete reference for developers</p>
                        <Button variant="link" className="px-0 mt-2">View Documentation →</Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg hover:bg-accent/10 transition-colors">
                        <FileText className="h-6 w-6 text-primary mb-2" />
                        <h3 className="font-medium mb-1">Algorithm Complexity Guide</h3>
                        <p className="text-sm text-muted-foreground">Time and space complexity analysis</p>
                        <Button variant="link" className="px-0 mt-2">View Documentation →</Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg hover:bg-accent/10 transition-colors">
                        <FileText className="h-6 w-6 text-primary mb-2" />
                        <h3 className="font-medium mb-1">Implementation Examples</h3>
                        <p className="text-sm text-muted-foreground">Code samples in multiple programming languages</p>
                        <Button variant="link" className="px-0 mt-2">View Documentation →</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                    <CardDescription>Get personalized help from our team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 border rounded-lg hover:bg-accent/10 transition-colors text-center">
                        <MessageCircle className="h-8 w-8 mx-auto text-primary mb-3" />
                        <h3 className="font-medium mb-2">Live Chat</h3>
                        <p className="text-sm text-muted-foreground mb-4">Chat with our support team in real-time</p>
                        <Button>Start Chat</Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg hover:bg-accent/10 transition-colors text-center">
                        <HelpCircle className="h-8 w-8 mx-auto text-primary mb-3" />
                        <h3 className="font-medium mb-2">Email Support</h3>
                        <p className="text-sm text-muted-foreground mb-4">Get help via email within 24 hours</p>
                        <Button variant="outline">Send Email</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-12">
              <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
              <p className="text-muted-foreground mb-6">
                Visit our comprehensive learning center or contact our support team directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg">Learning Resources</Button>
                <Button variant="outline" size="lg">Contact Us</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpPage;
