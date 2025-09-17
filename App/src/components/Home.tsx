import React from 'react';
import { Building, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeProps {
  onReportIssue: () => void;
}

const Home: React.FC<HomeProps> = ({ onReportIssue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute top-60 right-8 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
        <div className="absolute bottom-40 left-6 w-20 h-20 bg-white/5 rounded-full blur-lg"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Building size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white text-center">CityFix</h1>
        </motion.div>

        {/* Main Report Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-12"
        >
          <button
            onClick={onReportIssue}
            className="w-48 h-48 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full flex flex-col items-center justify-center shadow-2xl hover:bg-white/25 hover:scale-105 transition-all duration-300 group"
          >
            <Plus size={48} className="text-white mb-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-white font-semibold text-lg text-center px-4">
              Report an Issue
            </span>
          </button>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-2xl font-light text-white/90">
            Your city, fixed.
          </h2>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
