// src/components/PropertyList.tsx

import React from 'react';
import { Home, Plus, Search } from 'lucide-react';
import { Property } from '@/types/property';
import { PropertyCard } from './PropertyCard';

interface PropertyListProps {
  properties: Property[];
}

export const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  return (
    <div className="space-y-8">
      {properties.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-slate-100/50 to-gray-100/50 rounded-3xl p-12 border border-slate-200/50 max-w-2xl mx-auto">
            {/* Empty State Icon */}
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-slate-300 to-gray-300 rounded-3xl mx-auto flex items-center justify-center">
                <Home className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
            </div>
            
            {/* Empty State Content */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-800">No Properties Found</h3>
              <p className="text-slate-600 text-lg leading-relaxed max-w-md mx-auto">
                We couldn't find any properties that match your current search criteria.
              </p>
            </div>

            {/* Suggestions */}
            <div className="mt-8 space-y-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                <h4 className="font-semibold text-slate-700 mb-3">Try these suggestions:</h4>
                <ul className="space-y-2 text-slate-600 text-left">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Adjust your price range or remove price filters
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Try different property types or listing types
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Clear all filters and browse all properties
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Add your first property to get started
                  </li>
                </ul>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Clear Filters
                </button>
                <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add Property
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Properties Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Grid Summary */}
          <div className="bg-gradient-to-r from-slate-50/50 to-gray-50/50 rounded-2xl p-6 border border-slate-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-slate-500 to-gray-500 rounded-xl text-white">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Portfolio Summary</h3>
                  <p className="text-slate-600">
                    {properties.length === 1 
                      ? "Showing 1 property" 
                      : `Showing ${properties.length} properties`
                    }
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-800">{properties.length}</div>
                <p className="text-sm text-slate-500">
                  {properties.length === 1 ? 'Property' : 'Properties'}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white/60 rounded-xl border border-white/50">
                  <div className="text-lg font-semibold text-emerald-600">
                    {properties.filter(p => p.status === 'Available').length}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Available</div>
                </div>
                <div className="text-center p-3 bg-white/60 rounded-xl border border-white/50">
                  <div className="text-lg font-semibold text-amber-600">
                    {properties.filter(p => p.status === 'Pending').length}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Pending</div>
                </div>
                <div className="text-center p-3 bg-white/60 rounded-xl border border-white/50">
                  <div className="text-lg font-semibold text-blue-600">
                    {properties.filter(p => p.status === 'Sold').length}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Sold</div>
                </div>
                <div className="text-center p-3 bg-white/60 rounded-xl border border-white/50">
                  <div className="text-lg font-semibold text-slate-600">
                    {properties.filter(p => p.status === 'Off Market').length}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Off Market</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};