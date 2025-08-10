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
          <div className="bg-gray-50 rounded-lg p-12 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Home className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600 mb-6">
              No properties match your current search criteria. Try adjusting your filters.
            </p>
            
            {/* Suggestions */}
            <div className="text-left bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Try these suggestions:</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  Adjust your price range or remove price filters
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  Try different property types or listing types
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  Clear all filters and browse all properties
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  Add your first property to get started
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Properties Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Portfolio Summary */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-900 rounded-lg text-white">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Portfolio Summary</h3>
                  <p className="text-gray-600">
                    {properties.length === 1 
                      ? "Showing 1 property" 
                      : `Showing ${properties.length} properties`
                    }
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{properties.length}</div>
                <p className="text-sm text-gray-500">
                  {properties.length === 1 ? 'Property' : 'Properties'}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};