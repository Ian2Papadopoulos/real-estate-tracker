// src/components/SearchFilters.tsx

import React from 'react';
import { Search, DollarSign, Home, Bed, Filter, User } from 'lucide-react';
import { PropertyFilters } from '@/types/property';

interface SearchFiltersProps {
  filters: PropertyFilters;
  onFilterChange: (name: keyof PropertyFilters, value: string) => void;
  onClearFilters: () => void;
  resultCount: number;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  resultCount
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFilterChange(e.target.name as keyof PropertyFilters, e.target.value);
  };

  const inputClasses = "w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-white/80 backdrop-blur-sm text-slate-700 placeholder:text-slate-400";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-3";

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl p-6 border border-blue-100/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl text-white">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Quick Search</h3>
        </div>
        
        <div>
          <label className={labelClasses}>
            Search Properties
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleInputChange}
              className={`${inputClasses} pl-12`}
              placeholder="Search by address, agent, or owner..."
            />
          </div>
        </div>
      </div>

      {/* Price Range Section */}
      <div className="bg-gradient-to-r from-emerald-50/50 to-teal-50/50 rounded-2xl p-6 border border-emerald-100/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl text-white">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Price Range</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>
              Minimum Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleInputChange}
                className={`${inputClasses} pl-11`}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className={labelClasses}>
              Maximum Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleInputChange}
                className={`${inputClasses} pl-11`}
                placeholder="1,000,000"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Property Details Section */}
      <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-2xl p-6 border border-purple-100/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl text-white">
            <Home className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Property Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className={labelClasses}>
              Listing Type
            </label>
            <select
              name="listingType"
              value={filters.listingType}
              onChange={handleInputChange}
              className={inputClasses}
            >
              <option value="">All Types</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>
              Property Type
            </label>
            <select
              name="type"
              value={filters.type}
              onChange={handleInputChange}
              className={inputClasses}
            >
              <option value="">All Types</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Apartment">Apartment</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>
              <Bed className="w-4 h-4 inline mr-2" />
              Min Bedrooms
            </label>
            <select
              name="minBedrooms"
              value={filters.minBedrooms}
              onChange={handleInputChange}
              className={inputClasses}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>
              Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleInputChange}
              className={inputClasses}
            >
              <option value="">All Status</option>
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
              <option value="Off Market">Off Market</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact Filters Section */}
      <div className="bg-gradient-to-r from-rose-50/50 to-orange-50/50 rounded-2xl p-6 border border-rose-100/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-rose-400 to-orange-400 rounded-xl text-white">
            <User className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Contact Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>
              <User className="w-4 h-4 inline mr-2" />
              Agent Name
            </label>
            <input
              type="text"
              name="agent"
              value={filters.agent}
              onChange={handleInputChange}
              className={inputClasses}
              placeholder="Search by agent name..."
            />
          </div>

          <div>
            <label className={labelClasses}>
              <Home className="w-4 h-4 inline mr-2" />
              Owner Name
            </label>
            <input
              type="text"
              name="ownerName"
              value={filters.ownerName}
              onChange={handleInputChange}
              className={inputClasses}
              placeholder="Search by owner name..."
            />
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-gradient-to-r from-slate-100/50 to-gray-100/50 rounded-2xl p-6 border border-slate-200/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-slate-500 to-gray-500 rounded-xl text-white">
              <Filter className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Search Results</h3>
              <p className="text-slate-600">
                {resultCount === 0 
                  ? "No properties match your criteria" 
                  : `Found ${resultCount} ${resultCount === 1 ? 'property' : 'properties'}`
                }
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-2xl font-bold text-xl shadow-md">
              {resultCount}
            </div>
            <p className="text-sm text-slate-500 mt-2">
              {resultCount === 1 ? 'Result' : 'Results'}
            </p>
          </div>
        </div>

        {/* Active Filters Display */}
        {(filters.searchTerm || filters.minPrice || filters.maxPrice || filters.listingType || 
          filters.type || filters.minBedrooms || filters.status || filters.agent || filters.ownerName) && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-slate-700">Active Filters</h4>
              <button
                onClick={onClearFilters}
                className="text-indigo-500 hover:text-indigo-600 font-medium text-sm transition-colors duration-200 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.searchTerm && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Search: "{filters.searchTerm}"
                </span>
              )}
              {filters.minPrice && (
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Min: ${parseInt(filters.minPrice).toLocaleString()}
                </span>
              )}
              {filters.maxPrice && (
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Max: ${parseInt(filters.maxPrice).toLocaleString()}
                </span>
              )}
              {filters.listingType && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium">
                  {filters.listingType}
                </span>
              )}
              {filters.type && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium">
                  {filters.type}
                </span>
              )}
              {filters.minBedrooms && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium">
                  {filters.minBedrooms}+ Bedrooms
                </span>
              )}
              {filters.status && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium">
                  {filters.status}
                </span>
              )}
              {filters.agent && (
                <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Agent: {filters.agent}
                </span>
              )}
              {filters.ownerName && (
                <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Owner: {filters.ownerName}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};