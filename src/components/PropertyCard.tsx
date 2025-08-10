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
        return 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-200/50';
      case 'Pending':
        return 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200/50';
      case 'Sold':
        return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200/50';
      case 'Off Market':
        return 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-600 border-slate-200/50';
      default:
        return 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-600 border-slate-200/50';
    }
  };

  const getListingTypeStyle = (listingType: string) => {
    return listingType === 'For Sale' 
      ? 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 border-purple-200/50' 
      : 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border-rose-200/50';
  };

  return (
    <div className="group bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-semibold text-slate-800 leading-tight group-hover:text-slate-900 transition-colors">
            {property.address}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-500">{property.type}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <span className={`px-3 py-1.5 rounded-xl text-xs font-medium border backdrop-blur-sm ${getStatusStyle(property.status)}`}>
{property.status}
          </span>
          <span className={`px-3 py-1.5 rounded-xl text-xs font-medium border backdrop-blur-sm ${getListingTypeStyle(property.listingType)}`}>
            {property.listingType}
          </span>
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100/50">
          <div className="p-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl text-white shadow-md">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-bold text-emerald-700">
              {formatPrice(property.price, property.listingType)}
            </span>
            <p className="text-sm text-emerald-600 mt-0.5">Investment Value</p>
          </div>
        </div>
      </div>

      {/* Property Details Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-slate-50/80 rounded-xl border border-slate-100">
          <Bed className="w-5 h-5 text-slate-500 mx-auto mb-2" />
          <div className="text-lg font-semibold text-slate-700">{property.bedrooms}</div>
          <div className="text-xs text-slate-500 font-medium">Bedrooms</div>
        </div>
        <div className="text-center p-3 bg-slate-50/80 rounded-xl border border-slate-100">
          <Bath className="w-5 h-5 text-slate-500 mx-auto mb-2" />
          <div className="text-lg font-semibold text-slate-700">{property.bathrooms}</div>
          <div className="text-xs text-slate-500 font-medium">Bathrooms</div>
        </div>
        <div className="text-center p-3 bg-slate-50/80 rounded-xl border border-slate-100">
          <Square className="w-5 h-5 text-slate-500 mx-auto mb-2" />
          <div className="text-lg font-semibold text-slate-700">{property.sqft.toLocaleString()}</div>
          <div className="text-xs text-slate-500 font-medium">Sq Ft</div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-3 mb-6">
        {property.agent && (
          <div className="flex items-center gap-3 p-3 bg-blue-50/80 rounded-xl border border-blue-100/50">
            <User className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-blue-700">Agent</div>
              <div className="text-sm text-blue-600">{property.agent}</div>
            </div>
          </div>
        )}

        {property.ownerName && (
          <div className="flex items-center gap-3 p-3 bg-purple-50/80 rounded-xl border border-purple-100/50">
            <Home className="w-4 h-4 text-purple-500 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-purple-700">Owner</div>
              <div className="text-sm text-purple-600">{property.ownerName}</div>
            </div>
          </div>
        )}

        {property.ownerPhone && (
          <div className="flex items-center gap-3 p-3 bg-rose-50/80 rounded-xl border border-rose-100/50">
            <Phone className="w-4 h-4 text-rose-500 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-rose-700">Phone</div>
              <div className="text-sm text-rose-600">{property.ownerPhone}</div>
            </div>
          </div>
        )}
      </div>

      {/* Comments Section */}
      {property.comments && (
        <div className="mb-4">
          <div className="p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border border-slate-100/50">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-slate-700 mb-1">Notes</div>
                <div className="text-sm text-slate-600 leading-relaxed">{property.comments}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Added {formatDate(property.dateAdded)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span>Property #{property.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};