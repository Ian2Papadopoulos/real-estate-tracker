// src/components/SearchFilters.tsx

import React from 'react';
import { Search, Filter } from 'lucide-react';
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

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 p-8 max-w-5xl w-full max-h-[70vh] overflow-y-auto">
      <div className="flex items-center justify-end mb-6">
        <button
          onClick={onClearFilters}
          className="text-violet-500 hover:text-violet-600 font-medium transition-colors text-sm px-3 py-1.5 rounded-lg hover:bg-violet-50/50"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-slate-600 mb-2">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleInputChange}
              className="w-full pl-10 pr-3.5 py-2.5 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400 transition-all bg-white/80 text-slate-700"
              placeholder="Search by address or agent..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Min Price</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleInputChange}
            className="w-full px-3.5 py-2.5 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400 transition-all bg-white/80 text-slate-700"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleInputChange}
            className="w-full px-3.5 py-2.5 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400 transition-all bg-white/80 text-slate-700"
            placeholder="1000000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Listing Type</label>
          <select
            name="listingType"
            value={filters.listingType}
            onChange={handleInputChange}
            className="w-full px-3.5 py-2.5 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400 transition-all bg-white/80 text-slate-700"
          >
            <option value="">All Types</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Property Type</label>
          <select
            name="type"
            value={filters.type}
            onChange={handleInputChange}
            className="w-full px-3.5 py-2.5 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400 transition-all bg-white/80 text-slate-700"
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
          <label className="block text-sm font-medium text-slate-600 mb-2">Min Bedrooms</label>
          <select
            name="minBedrooms"
            value={filters.minBedrooms}
            onChange={handleInputChange}
            className="w-full px-3.5 py-2.5 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400 transition-all bg-white/80 text-slate-700"
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
          <label className="block text-sm font-medium text-slate-600 mb-2">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleInputChange}
            className="w-full px-3.5 py-2.5 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400 transition-all bg-white/80 text-slate-700"
          >
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="Pending">Pending</option>
            <option value="Sold">Sold</option>
            <option value="Off Market">Off Market</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Agent</label>
          <input
            type="text"
            name="agent"
            value={filters.agent}
            onChange={handleInputChange}
            className="w-full px-3.5 py-2.5 border border-slate-200/80 rounded-xl focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400 transition-all bg-white/80 text-slate-700"
            placeholder="Agent name..."
          />
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-violet-50/40 to-purple-50/40 p-4 rounded-xl border border-violet-100/30">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-600">Active Filters</h3>
          <span className="bg-violet-100/60 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
            {resultCount} properties found
          </span>
        </div>
      </div>
    </div>
  );
};