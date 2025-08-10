'use client'

import React, { useState, useMemo } from 'react';
import { Plus, Filter, Home, Search, MapPin, DollarSign, Bed, Bath, Square, User, Phone, MessageSquare, Building, Eye, Edit3, Trash2 } from 'lucide-react';
import { useProperties } from '../hooks/useProperties';
import { useFilters } from '../hooks/useFilters';

// Types (keeping your existing types but ensuring compatibility)
interface PropertyFormData {
  address: string;
  price: string;
  listingType: 'For Sale' | 'For Rent';
  type: 'House' | 'Condo' | 'Apartment' | 'Townhouse' | 'Commercial';
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  status: 'Available' | 'Pending' | 'Sold' | 'Off Market';
  agent: string;
  ownerName: string;
  ownerPhone: string;
  comments: string;
}

// Tab Navigation Component
const TabNavigation = ({ activeTab, setActiveTab, tabs, resultCount }) => (
  <nav className="border-b border-gray-200 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex justify-center space-x-8">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex items-center gap-3 py-4 px-6 text-sm font-medium transition-all duration-200 relative ${
              activeTab === index
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className={`p-2 rounded-lg transition-all duration-200 ${
              activeTab === index 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              <tab.icon className="w-4 h-4" />
            </div>
            {tab.name}
            {index === 2 && resultCount > 0 && (
              <span className="ml-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-full">
                {resultCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  </nav>
);

// Property Form Component
const PropertyForm = ({ onAddProperty }) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    address: '',
    price: '',
    listingType: 'For Sale',
    type: 'House',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    status: 'Available',
    agent: '',
    ownerName: '',
    ownerPhone: '',
    comments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting || !formData.address || !formData.price) return;
    
    setIsSubmitting(true);
    
    try {
      await onAddProperty(formData);
      
      // Reset form
      setFormData({
        address: '',
        price: '',
        listingType: 'For Sale',
        type: 'House',
        bedrooms: '',
        bathrooms: '',
        sqft: '',
        status: 'Available',
        agent: '',
        ownerName: '',
        ownerPhone: '',
        comments: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="space-y-8">
      {/* Property Details */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gray-900 rounded-lg text-white">
            <Building className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Property Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>
              <MapPin className="w-4 h-4 inline mr-1" />
              Property Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="Enter property address"
              required
            />
          </div>

          <div>
            <label className={labelClass}>
              <DollarSign className="w-4 h-4 inline mr-1" />
              Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Listing Type</label>
            <select name="listingType" value={formData.listingType} onChange={handleInputChange} className={inputClass}>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Property Type</label>
            <select name="type" value={formData.type} onChange={handleInputChange} className={inputClass}>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Apartment">Apartment</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select name="status" value={formData.status} onChange={handleInputChange} className={inputClass}>
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
              <option value="Off Market">Off Market</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>
              <Bed className="w-4 h-4 inline mr-1" />
              Bedrooms
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="Number of bedrooms"
            />
          </div>

          <div>
            <label className={labelClass}>
              <Bath className="w-4 h-4 inline mr-1" />
              Bathrooms
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="Number of bathrooms"
              step="0.5"
            />
          </div>

          <div>
            <label className={labelClass}>
              <Square className="w-4 h-4 inline mr-1" />
              Square Feet
            </label>
            <input
              type="number"
              name="sqft"
              value={formData.sqft}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="Total square footage"
            />
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gray-900 rounded-lg text-white">
            <User className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>
              <User className="w-4 h-4 inline mr-1" />
              Agent Name
            </label>
            <input
              type="text"
              name="agent"
              value={formData.agent}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="Listing agent name"
            />
          </div>

          <div>
            <label className={labelClass}>
              <User className="w-4 h-4 inline mr-1" />
              Owner Name
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="Property owner name"
            />
          </div>

          <div>
            <label className={labelClass}>
              <Phone className="w-4 h-4 inline mr-1" />
              Owner Phone
            </label>
            <input
              type="tel"
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="Owner phone number"
            />
          </div>

          <div>
            <label className={labelClass}>
              <MessageSquare className="w-4 h-4 inline mr-1" />
              Comments
            </label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              className={`${inputClass} h-24 resize-none`}
              placeholder="Additional notes or comments"
            />
          </div>
        </div>
      </section>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.address || !formData.price}
          className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Adding...' : 'Add Property'}
        </button>
      </div>
    </div>
  );
};

// Search Filters Component
const SearchFilters = ({ filters, onFilterChange, onClearFilters, resultCount }) => {
  const handleInputChange = (e) => {
    onFilterChange(e.target.name, e.target.value);
  };

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gray-900 rounded-lg text-white">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Search Properties</h3>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="searchTerm"
            value={filters.searchTerm}
            onChange={handleInputChange}
            className={`${inputClass} pl-12`}
            placeholder="Search by address, agent, or owner..."
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-900 rounded-lg text-white">
              <Filter className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div>
            <label className={labelClass}>Min Price</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="Min price"
            />
          </div>

          <div>
            <label className={labelClass}>Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="Max price"
            />
          </div>

          <div>
            <label className={labelClass}>Listing Type</label>
            <select name="listingType" value={filters.listingType} onChange={handleInputChange} className={inputClass}>
              <option value="">All Types</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Property Type</label>
            <select name="type" value={filters.type} onChange={handleInputChange} className={inputClass}>
              <option value="">All Types</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Apartment">Apartment</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Min Bedrooms</label>
            <select name="minBedrooms" value={filters.minBedrooms} onChange={handleInputChange} className={inputClass}>
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select name="status" value={filters.status} onChange={handleInputChange} className={inputClass}>
              <option value="">All Status</option>
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
              <option value="Off Market">Off Market</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">
            {resultCount === 0 
              ? "No properties found" 
              : `${resultCount} ${resultCount === 1 ? 'property' : 'properties'} found`
            }
          </span>
          <div className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
            {resultCount}
          </div>
        </div>
      </div>
    </div>
  );
};

// Property Card Component
const PropertyCard = ({ property }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Sold': return 'bg-blue-100 text-blue-800';
      case 'Off Market': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.address}</h3>
          <p className="text-2xl font-bold text-gray-900">{formatPrice(property.price)}</p>
          <p className="text-sm text-gray-600">{property.listingType}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
          {property.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building className="w-4 h-4" />
            {property.type}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Bed className="w-4 h-4" />
            {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Bath className="w-4 h-4" />
            {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Square className="w-4 h-4" />
            {property.sqft ? `${property.sqft.toLocaleString()} sq ft` : 'N/A'}
          </div>
        </div>
      </div>

      {(property.agent || property.ownerName) && (
        <div className="border-t border-gray-200 pt-4">
          <div className="space-y-1">
            {property.agent && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Agent: {property.agent}</span>
              </div>
            )}
            {property.ownerName && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Owner: {property.ownerName}</span>
              </div>
            )}
            {property.ownerPhone && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{property.ownerPhone}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {property.comments && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-sm text-gray-600">{property.comments}</p>
        </div>
      )}

      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Added {property.dateAdded}</span>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Property List Component
const PropertyList = ({ properties }) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gray-50 rounded-lg p-12 max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Home className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
          <p className="text-gray-600">
            No properties match your current search criteria. Try adjusting your filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

// Main App Component
export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);
  
  const { properties, loading, error, addProperty } = useProperties();
  const { filters, filteredProperties, updateFilter, clearFilters } = useFilters(properties);

  const tabs = [
    { name: 'Add Property', icon: Plus },
    { name: 'Search & Filter', icon: Filter },
    { name: 'Portfolio', icon: Home }
  ];

  const handleAddProperty = async (formData: PropertyFormData) => {
    const success = await addProperty(formData);
    if (success) setActiveTab(2);
    return success;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white rounded-lg p-12 shadow-lg border border-gray-200 w-full max-w-md">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-gray-900 mx-auto mb-8"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Properties</h2>
          <p className="text-gray-600">Please wait while we fetch your data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center bg-white p-10 rounded-lg shadow-lg border border-red-200 max-w-md w-full">
          <div className="text-red-500 text-5xl mb-6">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Connection Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Real Estate Portfolio</h1>
              <p className="text-gray-600 mt-1">Manage your property investments</p>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 font-medium">{properties.length} Properties</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <TabNavigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        tabs={tabs} 
        resultCount={filteredProperties.length}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gray-900 rounded-lg text-white">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Add New Property</h2>
                <p className="text-gray-600">Add a new property to your portfolio</p>
              </div>
            </div>
            <PropertyForm onAddProperty={handleAddProperty} />
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gray-900 rounded-lg text-white">
                <Filter className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Search & Filter Properties</h2>
                <p className="text-gray-600">Find properties using advanced filters</p>
              </div>
            </div>
            <SearchFilters
              filters={filters}
              onFilterChange={updateFilter}
              onClearFilters={clearFilters}
              resultCount={filteredProperties.length}
            />
          </div>
        )}

        {activeTab === 2 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-900 rounded-lg text-white">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Property Portfolio</h2>
                  <p className="text-gray-600">Your complete investment overview</p>
                </div>
              </div>
              <div className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'}
              </div>
            </div>
            <PropertyList properties={filteredProperties} />
          </div>
        )}
      </main>
    </div>
  );
}