'use client'

import React, { useState } from 'react';
import { Plus, Filter, Home } from 'lucide-react';
import { useProperties } from '../hooks/useProperties';
import { useFilters } from '../hooks/useFilters';
import { PropertyForm } from '../components/PropertyForm';
import { SearchFilters } from '../components/SearchFilters';
import { PropertyList } from '../components/PropertyList';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);
  
  const { properties, loading, error, addProperty } = useProperties();
  const { filters, filteredProperties, updateFilter, clearFilters } = useFilters(properties);

  const handleAddProperty = async (formData: any) => {
    const success = await addProperty(formData);
    if (success) setActiveTab(2);
    return success;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center bg-white/90 backdrop-blur-lg rounded-3xl p-12 shadow-xl border border-slate-200/50 w-full max-w-md transform transition-all duration-500">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-indigo-500 mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-20 animate-pulse"></div>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Loading Properties</h2>
          <p className="text-slate-500 leading-relaxed">Please wait while we fetch your data...</p>
          <div className="mt-6 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4">
        <div className="text-center bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-red-200/50 max-w-md w-full transform transition-all duration-500">
          <div className="text-red-400 text-5xl mb-6 animate-bounce">⚠️</div>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Connection Error</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl text-sm hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { name: 'Add Property', icon: Plus, color: 'from-emerald-400 to-teal-400', accent: 'emerald' },
    { name: 'Search & Filter', icon: Filter, color: 'from-blue-400 to-indigo-400', accent: 'blue' },
    { name: 'Portfolio', icon: Home, color: 'from-purple-400 to-pink-400', accent: 'purple' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-indigo-200 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-sm border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
              Real Estate Portfolio
            </h1>
            <p className="text-slate-500 text-sm lg:text-base mt-2 font-medium">
              Manage your property investments with elegance
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-2xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
            <span className="text-slate-700 text-sm font-semibold">{properties.length} Properties</span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="relative bg-white/60 backdrop-blur-sm border-b border-slate-200/50">
        <div className="w-full flex justify-center gap-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-3 py-5 px-12 text-sm font-medium transition-all duration-300 relative group ${
                activeTab === index
                  ? 'text-slate-800 scale-105'
                  : 'text-slate-500 hover:text-slate-700 hover:scale-102'
              }`}
            >
              <div className={`p-2.5 rounded-xl transition-all duration-300 shadow-md ${
                activeTab === index 
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-110` 
                  : 'bg-slate-100/80 text-slate-400 group-hover:bg-slate-200/80 group-hover:scale-105'
              }`}>
                <tab.icon className="w-4 h-4" />
              </div>
              <span className="font-semibold">{tab.name}</span>
              {activeTab === index && (
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tab.color} rounded-full shadow-md`}></div>
              )}
              {activeTab === index && (
                <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} opacity-5 rounded-lg`}></div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content - maintaining centered layout */}
      <main className="relative flex-grow flex items-center justify-center w-full py-16 sm:py-24">
        <div className="w-full max-w-7xl px-6">
          
          {activeTab === 0 && (
            <section className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/60 p-8 sm:p-10 transform hover:scale-[1.01] animate-in slide-in-from-bottom-4 fade-in duration-700">
              <div className="flex items-center gap-8 mb-8">
                <div className="p-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Add New Property</h2>
                  <p className="text-slate-500 font-medium">Expand your portfolio with a new investment</p>
                </div>
              </div>
              <PropertyForm onAddProperty={handleAddProperty} />
            </section>
          )}

          {activeTab === 1 && (
            <section className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/60 p-8 sm:p-10 transform hover:scale-[1.01] animate-in slide-in-from-bottom-4 fade-in duration-700">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-8">
                  <div className="p-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                    <Filter className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Search & Filter</h2>
                    <p className="text-slate-500 font-medium">Find exactly what you're looking for</p>
                  </div>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-indigo-600 hover:text-indigo-700 text-sm px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-all duration-200 font-semibold hover:scale-105 border border-indigo-200/50"
                >
                  Clear Filters
                </button>
              </div>
              <SearchFilters
                filters={filters}
                onFilterChange={updateFilter}
                onClearFilters={clearFilters}
                resultCount={filteredProperties.length}
              />
            </section>
          )}

          {activeTab === 2 && (
            <section className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/60 p-8 sm:p-10 transform hover:scale-[1.01] animate-in slide-in-from-bottom-4 fade-in duration-700 mt-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-8">
                  <div className="p-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                    <Home className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Property Portfolio</h2>
                    <p className="text-slate-500 font-medium">Your complete investment overview</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'}
                </div>
              </div>
              <PropertyList properties={filteredProperties} />
            </section>
          )}

        </div>
      </main>
    </div>
  );
}