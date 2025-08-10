// src/components/PropertyCard.tsx

import React from 'react';
import { DollarSign, Home, MapPin, User, Calendar, Building2, Bed, Bath, Square, Phone, MessageSquare, Eye, Edit3, Trash2 } from 'lucide-react';
import { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatPrice = (price: number, listingType: string) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
    
    return listingType === 'For Rent' ? `${formatted}/mo` : formatted;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Sold': return 'bg-blue-100 text-blue-800';
      case 'Off Market': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.address}</h3>
          <p className="text-2xl font-bold text-gray-900">{formatPrice(property.price, property.listingType)}</p>
          <p className="text-sm text-gray-600">{property.listingType}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
          {property.status}
        </span>
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building2 className="w-4 h-4" />
            {property.type}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Bed className="w-4 h-4" />
            {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Bath className="w-4 h-4" />
            {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Square className="w-4 h-4" />
            {property.sqft ? `${property.sqft.toLocaleString()} sq ft` : 'N/A'}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      {(property.agent || property.ownerName) && (
        <div className="border-t border-gray-200 pt-4">
          <div className="space-y-1">
            {property.agent && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Agent: {property.agent}</span>
              </div>
            )}
            {property.ownerName && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Owner: {property.ownerName}</span>
              </div>
            )}
            {property.ownerPhone && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{property.ownerPhone}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Comments */}
      {property.comments && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-sm text-gray-600">{property.comments}</p>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Added {formatDate(property.dateAdded)}</span>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};