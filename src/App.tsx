
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignUpPage from "./components/SignUpPage";
import DataStructures from "./components/DataStructures";
import Algorithms from "./components/Algorithms";
import LinearSearch from "./datastructures/LinearSearch";
import AlgoCode from "./components/AlgoCode";
import Contact from "./components/Contact";
import About from "./components/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/datastructures" element={<DataStructures />} />
          <Route path="/Algorithms" element={<Algorithms />} />
          <Route path="/LinearSearch" element={<LinearSearch />} />
          <Route path="/AlgoCode" element={<AlgoCode />} />
          <Route path="/Contact" element={<Contact/>} />
          <Route path="/About" element={<About/>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
