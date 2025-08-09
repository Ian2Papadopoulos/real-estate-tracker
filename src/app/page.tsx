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
  
  // Custom hooks for state management
  const { properties, loading, error, addProperty } = useProperties();
  const { filters, filteredProperties, updateFilter, clearFilters } = useFilters(properties);

  // Handle successful property addition - switch to portfolio tab
  const handleAddProperty = async (formData: any) => {
    const success = await addProperty(formData);
    if (success) {
      setActiveTab(2); // Switch to portfolio view after adding
    }
    return success;
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm border border-red-200 max-w-md">
          <div className="text-red-500 text-xl mb-4">⚠️ Database Error</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { name: 'Add Property', icon: Plus },
    { name: 'Search & Filter', icon: Filter },
    { name: 'Portfolio', icon: Home }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Real Estate Asset Tracker</h1>
                <p className="text-gray-600 mt-1">Manage your property portfolio efficiently</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{properties.length} properties</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === index
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Property Tab */}
        {activeTab === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Property</h2>
            <PropertyForm onAddProperty={handleAddProperty} />
          </div>
        )}

        {/* Search & Filter Tab */}
        {activeTab === 1 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Search & Filter Properties</h2>
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
              >
                Clear All Filters
              </button>
            </div>
            <SearchFilters
              filters={filters}
              onFilterChange={updateFilter}
              onClearFilters={clearFilters}
              resultCount={filteredProperties.length}
            />
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 2 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Property Portfolio</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {filteredProperties.length} properties
              </span>
            </div>
            <PropertyList properties={filteredProperties} />
          </div>
        )}
      </div>
    </div>
  );
}