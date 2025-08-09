// src/components/PropertyList.tsx

import React from 'react';
import { Home } from 'lucide-react';
import { Property } from '@/types/property';
import { PropertyCard } from './PropertyCard';

interface PropertyListProps {
  properties: Property[];
}

export const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 p-8 max-w-6xl w-full max-h-[70vh] overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-end mb-6">
        <span className="bg-blue-100/60 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          {properties.length} properties
        </span>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-20">
          <Home className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-lg mb-2">No properties match your criteria</p>
          <p className="text-slate-400 text-sm">Try adjusting your filters or add some properties</p>
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