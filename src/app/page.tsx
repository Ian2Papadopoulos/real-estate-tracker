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
        <div className="text-center bg-white rounded-2xl p-10 shadow-lg border border-slate-200 w-full max-w-md">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500 mx-auto mb-5"></div>
          <h2 className="text-lg font-semibold text-slate-800">Loading Properties</h2>
          <p className="text-sm text-slate-500 mt-1">Please wait while we fetch your data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-red-200 max-w-sm w-full">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Connection Error</h2>
          <p className="text-sm text-slate-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm hover:from-indigo-600 hover:to-purple-600 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { name: 'Add Property', icon: Plus, color: 'from-emerald-400 to-teal-400' },
    { name: 'Search & Filter', icon: Filter, color: 'from-blue-400 to-indigo-400' },
    { name: 'Portfolio', icon: Home, color: 'from-purple-400 to-pink-400' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Real Estate Portfolio
            </h1>
            <p className="text-slate-500 text-sm lg:text-base mt-1">
              Manage your property investments with elegance
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-slate-600 text-sm font-medium">{properties.length} Properties</span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 py-4 px-4 text-sm font-medium transition relative ${
                activeTab === index
                  ? 'text-slate-800'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                activeTab === index 
                  ? `bg-gradient-to-r ${tab.color} text-white` 
                  : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
              }`}>
                <tab.icon className="w-4 h-4" />
              </div>
              {tab.name}
              {activeTab === index && (
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tab.color} rounded-full`}></div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content - padding top for floating effect */}
      <main className="flex-grow flex items-start justify-center w-full pt-10 sm:pt-16">
        <div className="w-full max-w-7xl px-6 pb-8 sm:pb-12">
          
          {activeTab === 0 && (
            <section className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg text-white">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Add New Property</h2>
                  <p className="text-sm text-slate-500">Expand your portfolio with a new investment</p>
                </div>
              </div>
              <PropertyForm onAddProperty={handleAddProperty} />
            </section>
          )}

          {activeTab === 1 && (
            <section className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg text-white">
                    <Filter className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Search & Filter</h2>
                    <p className="text-sm text-slate-500">Find exactly what you're looking for</p>
                  </div>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-indigo-500 hover:text-indigo-600 text-sm px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100"
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
            <section className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg text-white">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Property Portfolio</h2>
                    <p className="text-sm text-slate-500">Your complete investment overview</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
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
