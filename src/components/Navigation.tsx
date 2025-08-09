// src/components/Navigation.tsx

import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Filter, Home } from 'lucide-react';
import { NavigationSection } from '@/types/property';

interface NavigationProps {
  currentSection: number;
  onSectionChange: (index: number) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentSection, 
  onSectionChange 
}) => {
  const sections: NavigationSection[] = [
    {
      title: "Add Property",
      icon: Plus,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Search & Filter",
      icon: Filter,
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Property Portfolio",
      icon: Home,
      color: "from-green-500 to-teal-600"
    }
  ];

  const nextSection = () => {
    onSectionChange((currentSection + 1) % 3);
  };

  const prevSection = () => {
    onSectionChange((currentSection - 1 + 3) % 3);
  };

  return (
    <>
      {/* Navigation Arrows */}
      <button
        onClick={prevSection}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/40 backdrop-blur-sm text-slate-600 p-2 rounded-full hover:bg-white/60 transition-all duration-200 shadow-sm"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={nextSection}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/40 backdrop-blur-sm text-slate-600 p-2 rounded-full hover:bg-white/60 transition-all duration-200 shadow-sm"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Section Indicators */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-12 bg-white/30 backdrop-blur-sm rounded-full px-8 py-3 border border-white/20">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => onSectionChange(index)}
              className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center ${
                currentSection === index
                  ? `bg-gradient-to-r ${section.color} opacity-90 shadow-md scale-105`
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            >
              <section.icon 
                className={`w-4 h-4 ${
                  currentSection === index ? 'text-white' : 'text-slate-600'
                }`} 
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};