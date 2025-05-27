import exp from "constants";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const AlgoCode  : React.FC = () => {
    {
       return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-lg rounded-lg p-8 max-w-md"
            >
                <h2 className="text-2xl font-bold mb-4">AlgoCode</h2>
                <p className="text-gray-700 mb-6">
                    This is a placeholder for the AlgoCode component.
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Get Started
                    <ArrowRight className="ml-1 h-4 w-4" />
                </button>
            </motion.div>
        </div>
    );
    }
};

   
    export default AlgoCode;