'use client'

import React, { useState } from 'react';
import { FileText, Search, Home } from 'lucide-react';
import { useProperties } from '../hooks/useProperties';
import { useFilters } from '../hooks/useFilters';
import { PropertyForm } from '../components/PropertyForm';
import { SearchFilters } from '../components/SearchFilters';
import { PropertyList } from '../components/PropertyList';
import { Navigation } from '../components/Navigation';

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState(0);
  
  // Custom hooks for state management (now with database!)
  const { properties, loading, error, addProperty } = useProperties();
  const { filters, filteredProperties, updateFilter, clearFilters } = useFilters(properties);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <div className="text-center bg-white/80 p-8 rounded-2xl shadow-sm border border-red-200">
          <div className="text-red-500 text-xl mb-4">⚠️ Database Error</div>
          <p className="text-slate-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Header */}
      <div className="text-center py-8 relative z-10">
        <h1 className="text-3xl font-light text-slate-700 mb-2">Real Estate Asset Tracker</h1>
        <p className="text-slate-500 font-light text-sm">Manage your property portfolio with ease</p>
        <div className="text-xs text-slate-400 mt-2 flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
          <span>Connected to database • {properties.length} properties</span>
        </div>
      </div>

      {/* Navigation Component */}
      <Navigation 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection}
      />

      {/* Main Carousel Container */}
      <div className="relative h-[calc(100vh-140px)] overflow-hidden">
        {/* Section Title - Shows only current section's title */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
          {currentSection === 0 && (
            <div className="flex items-center bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-white/40">
              <div className="w-7 h-7 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                <FileText className="w-3.5 h-3.5 text-white" />
              </div>
              <h2 className="text-lg font-medium text-slate-600">Property Input</h2>
            </div>
          )}
          
          {currentSection === 1 && (
            <div className="flex items-center bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-white/40">
              <div className="w-7 h-7 bg-gradient-to-r from-violet-400 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                <Search className="w-3.5 h-3.5 text-white" />
              </div>
              <h2 className="text-lg font-medium text-slate-600">Search & Filter</h2>
            </div>
          )}
          
          {currentSection === 2 && (
            <div className="flex items-center bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-white/40">
              <div className="w-7 h-7 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                <Home className="w-3.5 h-3.5 text-white" />
              </div>
              <h2 className="text-lg font-medium text-slate-600">Property Portfolio</h2>
            </div>
          )}
        </div>

        <div
          className="flex transition-transform duration-500 ease-out h-full pt-14"
          style={{ transform: `translateX(-${currentSection * 100}%)` }}
        >
          {/* Section 1: Add Property */}
          <div className="w-screen flex-shrink-0 px-8 flex items-center justify-center">
            <PropertyForm onAddProperty={addProperty} />
          </div>

          {/* Section 2: Search & Filters */}
          <div className="w-screen flex-shrink-0 px-8 flex items-center justify-center">
            <SearchFilters
              filters={filters}
              onFilterChange={updateFilter}
              onClearFilters={clearFilters}
              resultCount={filteredProperties.length}
            />
          </div>

          {/* Section 3: Property Portfolio */}
          <div className="w-screen flex-shrink-0 px-8 flex items-center justify-center">
            <PropertyList properties={filteredProperties} />
          </div>
        </div>
      </div>
    </div>
  );
}