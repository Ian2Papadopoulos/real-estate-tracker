// src/components/PropertyCard.tsx

import React from 'react';
import { DollarSign, Home, MapPin, User, Calendar, Building2, Bed, Bath, Square, Phone, MessageSquare } from 'lucide-react';
import { Property } from '@/types/property';
import { formatPrice, formatDate } from '@/utils/formatters';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Sold':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Off Market':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getListingTypeStyle = (listingType: string) => {
    return listingType === 'For Sale' 
      ? 'bg-purple-50 text-purple-700 border-purple-200' 
      : 'bg-orange-50 text-orange-700 border-orange-200';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight pr-4">
          {property.address}
        </h3>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(property.status)}`}>
            {property.status}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getListingTypeStyle(property.listingType)}`}>
            {property.listingType}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-green-600">
          <DollarSign className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="font-semibold text-lg">
            {formatPrice(property.price, property.listingType)}
          </span>
        </div>

        <div className="flex items-center text-gray-600">
          <Building2 className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="text-sm">{property.type}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-3 flex-shrink-0" />
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span>{property.sqft.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center text-gray-600">
          <User className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="text-sm">{property.agent}</span>
        </div>

        {property.ownerName && (
          <div className="flex items-center text-gray-600">
            <Home className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="text-sm">Owner: {property.ownerName}</span>
          </div>
        )}

        {property.ownerPhone && (
          <div className="flex items-center text-gray-600">
            <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="text-sm">{property.ownerPhone}</span>
          </div>
        )}

        {property.comments && (
          <div className="flex items-start text-gray-600">
            <MessageSquare className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-sm leading-relaxed">{property.comments}</span>
          </div>
        )}

        <div className="flex items-center text-gray-500">
          <Calendar className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="text-xs">Added {formatDate(property.dateAdded)}</span>
        </div>
      </div>
    </div>
  );
};