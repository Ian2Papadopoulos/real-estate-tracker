// src/components/PropertyList.tsx

import React from 'react';
import { Home, Plus } from 'lucide-react';
import { Property } from '@/types/property';
import { PropertyCard } from './PropertyCard';

interface PropertyListProps {
  properties: Property[];
}

export const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  return (
    <div className="space-y-6">
      {properties.length === 0 ? (
        <div className="text-center py-12">
          <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-4">
            No properties match your current criteria
          </p>
          <p className="text-sm text-gray-500">
            Try adjusting your filters or add some properties to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};