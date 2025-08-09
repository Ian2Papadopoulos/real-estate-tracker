// src/components/PropertyCard.tsx

import React from 'react';
import { DollarSign, Home, MapPin, User, Calendar, Phone, UserCheck, MessageCircle } from 'lucide-react';
import { Property } from '@/types/property';
import { formatPrice, formatDate } from '@/utils/formatters';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-100/70 text-emerald-700';
      case 'Pending':
        return 'bg-amber-100/70 text-amber-700';
      case 'Sold':
        return 'bg-blue-100/70 text-blue-700';
      default:
        return 'bg-slate-100/70 text-slate-700';
    }
  };

  const getListingTypeStyle = (listingType: string) => {
    return listingType === 'For Sale' 
      ? 'bg-violet-100/70 text-violet-700' 
      : 'bg-orange-100/70 text-orange-700';
  };

  return (
    <div className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 bg-white/60 backdrop-blur-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-base font-medium text-slate-700 leading-tight pr-2">
          {property.address}
        </h3>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(property.status)}`}>
            {property.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getListingTypeStyle(property.listingType)}`}>
            {property.listingType}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-green-600">
          <DollarSign className="w-4 h-4 mr-3" />
          <span className="font-semibold text-base">
            {formatPrice(property.price, property.listingType)}
          </span>
        </div>

        <div className="flex items-center text-slate-600">
          <Home className="w-4 h-4 mr-3" />
          <span className="text-sm">{property.type}</span>
        </div>

        <div className="flex items-center text-slate-600">
          <MapPin className="w-4 h-4 mr-3" />
          <span className="text-sm">
            {property.bedrooms} bed • {property.bathrooms} bath • {property.sqft.toLocaleString()} sqft
          </span>
        </div>

        {property.agent && (
          <div className="flex items-center text-slate-600">
            <User className="w-4 h-4 mr-3" />
            <span className="text-sm">Agent: {property.agent}</span>
          </div>
        )}

        {property.ownerName && (
          <div className="flex items-center text-slate-600">
            <UserCheck className="w-4 h-4 mr-3" />
            <span className="text-sm">Owner: {property.ownerName}</span>
          </div>
        )}

        {property.ownerPhone && (
          <div className="flex items-center text-slate-600">
            <Phone className="w-4 h-4 mr-3" />
            <span className="text-sm">{property.ownerPhone}</span>
          </div>
        )}

        {property.comments && (
          <div className="flex items-start text-slate-600">
            <MessageCircle className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-sm leading-relaxed">{property.comments}</span>
          </div>
        )}

        <div className="flex items-center text-slate-500 pt-2 border-t border-slate-100">
          <Calendar className="w-4 h-4 mr-3" />
          <span className="text-xs">Added {formatDate(property.dateAdded)}</span>
        </div>
      </div>
    </div>
  );
};