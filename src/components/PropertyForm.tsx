// src/components/PropertyForm.tsx

import React, { useState } from 'react';
import { MapPin, DollarSign, Home, Bed, Bath, Square, User, Phone, MessageSquare, Building } from 'lucide-react';
import { PropertyFormData } from '../types/property';

interface PropertyFormProps {
  onAddProperty: (formData: PropertyFormData) => Promise<boolean>;
}

export const PropertyForm: React.FC<PropertyFormProps> = ({ onAddProperty }) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    address: '',
    price: '',
    listingType: 'For Sale',
    type: 'House',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    status: 'Available',
    agent: '',
    ownerName: '',
    ownerPhone: '',
    comments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const success = await onAddProperty(formData);
      if (success) {
        // Reset form on success
        setFormData({
          address: '',
          price: '',
          listingType: 'For Sale',
          type: 'House',
          bedrooms: '',
          bathrooms: '',
          sqft: '',
          status: 'Available',
          agent: '',
          ownerName: '',
          ownerPhone: '',
          comments: ''
        });
      }
    } catch (error) {
      console.error('Error adding property:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors disabled:opacity-50 disabled:bg-gray-50";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="space-y-8">
      {/* Property Information Section */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gray-900 rounded-lg text-white">
            <Building className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Property Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClasses}>
              <MapPin className="w-4 h-4 inline mr-1" />
              Property Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={inputClasses}
              placeholder="Enter property address"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>
              <DollarSign className="w-4 h-4 inline mr-1" />
              Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className={inputClasses}
              placeholder="Enter price"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>Listing Type</label>
            <select
              name="listingType"
              value={formData.listingType}
              onChange={handleInputChange}
              className={inputClasses}
              disabled={isSubmitting}
            >
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>Property Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className={inputClasses}
              disabled={isSubmitting}
            >
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Apartment">Apartment</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={inputClasses}
              disabled={isSubmitting}
            >
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
              <option value="Off Market">Off Market</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>
              <Bed className="w-4 h-4 inline mr-1" />
              Bedrooms
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              className={inputClasses}
              placeholder="Number of bedrooms"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className={labelClasses}>
              <Bath className="w-4 h-4 inline mr-1" />
              Bathrooms
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              className={inputClasses}
              placeholder="Number of bathrooms"
              step="0.5"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className={labelClasses}>
              <Square className="w-4 h-4 inline mr-1" />
              Square Feet
            </label>
            <input
              type="number"
              name="sqft"
              value={formData.sqft}
              onChange={handleInputChange}
              className={inputClasses}
              placeholder="Total square footage"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gray-900 rounded-lg text-white">
            <User className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>
              <User className="w-4 h-4 inline mr-1" />
              Agent Name
            </label>
            <input
              type="text"
              name="agent"
              value={formData.agent}
              onChange={handleInputChange}
              className={inputClasses}
              placeholder="Listing agent name"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className={labelClasses}>
              <User className="w-4 h-4 inline mr-1" />
              Owner Name
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleInputChange}
              className={inputClasses}
              placeholder="Property owner name"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className={labelClasses}>
              <Phone className="w-4 h-4 inline mr-1" />
              Owner Phone
            </label>
            <input
              type="tel"
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={handleInputChange}
              className={inputClasses}
              placeholder="Owner phone number"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className={labelClasses}>
              <MessageSquare className="w-4 h-4 inline mr-1" />
              Comments
            </label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              className={`${inputClasses} h-24 resize-none`}
              placeholder="Additional notes or comments"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </section>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.address || !formData.price}
          className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Adding...' : 'Add Property'}
        </button>
      </div>
    </div>
  );
};