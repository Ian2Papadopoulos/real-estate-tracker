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

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-2";

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="space-y-6">
      {/* Search Section */}
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
            className={`${inputClasses} pl-12`}
            placeholder="Search by address, agent, or owner..."
          />
        </div>
      </div>

      {/* Price Range Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gray-900 rounded-lg text-white">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Price Range</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Min Price</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleInputChange}
              className={inputClasses}
              placeholder="Minimum price"
            />
          </div>

          <div>
            <label className={labelClasses}>Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleInputChange}
              className={inputClasses}
              placeholder="Maximum price"
            />
          </div>
        </div>
      </div>

      {/* Property Filters Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-900 rounded-lg text-white">
              <Home className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Property Filters</h3>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className={labelClasses}>Listing Type</label>
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
            <label className={labelClasses}>Property Type</label>
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
              <Bed className="w-4 h-4 inline mr-1" />
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
            <label className={labelClasses}>Status</label>
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
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gray-900 rounded-lg text-white">
            <User className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Contact Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>
              <User className="w-4 h-4 inline mr-1" />
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
              <Home className="w-4 h-4 inline mr-1" />
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
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-900 rounded-lg text-white">
              <Filter className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Search Results</h3>
              <p className="text-gray-600">
                {resultCount === 0 
                  ? "No properties match your criteria" 
                  : `Found ${resultCount} ${resultCount === 1 ? 'property' : 'properties'}`
                }
              </p>
            </div>
          </div>
          
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium text-lg">
            {resultCount}
          </div>
        </div>
      </div>
    </div>
  );
};