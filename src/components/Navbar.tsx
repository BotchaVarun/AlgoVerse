import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";

// Define an interface for the props the Navbar component can receive
interface NavbarProps {
  /**
   * If true, the "Sign Up" button will be hidden from the Navbar.
   * @default false
   */
  hideSignUpButton?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ hideSignUpButton = false }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState([0]);
  const location = useLocation();

  useEffect(() => {
    // Check if user has already set a preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    // Check system preference if no saved theme
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === "dark" || (savedTheme === null && prefersDark)) {
      setIsDarkTheme(true);
      setSliderValue([100]);
      document.documentElement.classList.add("dark");
    } else {
      // Ensure light theme is applied if no theme or light theme is saved
      setIsDarkTheme(false);
      setSliderValue([0]);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light"); // Added from the conflicting branch
    }
  }, []);

  const handleThemeChange = (value: number[]) => {
    const isDark = value[0] === 100;
    setIsDarkTheme(isDark);
    setSliderValue(value); // Added from the conflicting branch

    if (isDark) {
      // Switch to dark mode
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } 
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-lg py-4 border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            {/* Added a subtle text-shadow for "AlgoVerse" if gradient-text styling allows */}
            <span className="text-2xl font-extrabold gradient-text leading-none tracking-tight">AlgoVerse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 font-medium">
            <Link
              to="/about"
              className={`text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left ${location.pathname === '/about' ? 'text-primary after:scale-x-100' : ''}`}
            >
              About
            </Link>
            <Link
              to="/help"
              className={`text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left ${location.pathname === '/help' ? 'text-primary after:scale-x-100' : ''}`}
            >
              Help
            </Link>
            <Link
              to="/contact"
              className={`text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left ${location.pathname === '/contact' ? 'text-primary after:scale-x-100' : ''}`}
            >
              Contact
            </Link>
          </div>

          {/* Right-hand side: Theme toggle and Auth buttons */}
          <div className="flex items-center space-x-5">
            {/* Theme Toggle Slider */}


            {/* Desktop Auth Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              {!hideSignUpButton && ( // Kept the hideSignUpButton prop logic
                <Link to="/signup">
                  <Button variant="outline" size="sm" className="rounded-full border-primary/50 hover:border-primary hover:bg-primary/10">
                    Sign Up
                  </Button>
                </Link>
              )}
              {/* Removed the Login button from here */}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="flex md:hidden items-center justify-center p-2 rounded-md text-foreground hover:bg-muted/50"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 px-2 space-y-3 border-t border-border/30 mt-4">
            <Link
              to="/about"
              className="block py-2 px-3 rounded-md hover:bg-muted/50 transition-colors"
            >
              About
            </Link>
            <Link
              to="/help"
              className="block py-2 px-3 rounded-md hover:bg-muted/50 transition-colors"
            >
              Help
            </Link>
            <Link
              to="/contact"
              className="block py-2 px-3 rounded-md hover:bg-muted/50 transition-colors"
            >
              Contact
            </Link>
            <div className="flex space-x-3 mt-4 pt-4 border-t border-border/30">
              {!hideSignUpButton && ( // Kept the hideSignUpButton prop logic for mobile too
                <Link to="/signup" className="flex-1">
                  <Button variant="outline" className="w-full">Sign Up</Button>
                </Link>
              )}
              {/* Removed the Login button from here */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;