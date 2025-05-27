
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text">
                Anil Neerkonda Institute of Technology and Sciences
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Empowering students with cutting-edge technology education and research opportunities since 1995.
              </p>
            </div>

            {/* Top 2 small frames with names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
              <motion.div 
                className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-border"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-square bg-muted/50 w-full">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
                    alt="HOD" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-foreground">HOD</h3>
                </div>
              </motion.div>

              <motion.div 
                className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-border"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-square bg-muted/50 w-full">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786" 
                    alt="Assistant Professor" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-foreground">Assistant Professor</h3>
                </div>
              </motion.div>
            </div>

            {/* Bottom 8 small frames with Designer labels */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.div 
                  key={index}
                  className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all border border-border"
                  whileHover={{ y: -3 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="aspect-square bg-muted/50 w-full">
                    <img 
                      src={`https://images.unsplash.com/photo-${1500000000000 + index}?w=300&h=300&fit=crop&crop=face`}
                      alt={`Designer ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2 text-center">
                    <h3 className="text-sm font-medium text-foreground">Designer</h3>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Mission</h2>
              <p className="text-muted-foreground">
                At Anil Neerkonda Institute of Technology and Sciences, we are dedicated to providing a transformative educational experience that prepares students to be leaders in technology and innovation. Our curriculum combines rigorous academic studies with practical experience, ensuring graduates are ready to meet the challenges of a rapidly evolving technological landscape.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 mt-8 text-foreground">Our Vision</h2>
              <p className="text-muted-foreground">
                We envision a world where technology serves humanity, and our graduates lead the way in creating solutions to the most pressing challenges of our time. Through research, innovation, and a commitment to excellence, we aim to be at the forefront of technological advancement and education.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 mt-8 text-foreground">Core Values</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>Excellence in education and research</li>
                <li>Innovation and creativity in problem-solving</li>
                <li>Ethical leadership and responsibility</li>
                <li>Diversity and inclusion in all aspects of our community</li>
                <li>Collaboration and partnership with industry and society</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
