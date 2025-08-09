// src/components/PropertyForm.tsx

import React, { useState } from 'react';
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
    const { name, value } = e.target;
    
    // Apply validation based on field type
    let validatedValue = value;
    
    // Numeric fields should only accept non-negative numbers
    if (['price', 'bedrooms', 'bathrooms', 'sqft'].includes(name)) {
      // Remove any non-numeric characters except decimal point for price
      if (name === 'price') {
        validatedValue = value.replace(/[^0-9.]/g, '');
        // Ensure only one decimal point
        const parts = validatedValue.split('.');
        if (parts.length > 2) {
          validatedValue = parts[0] + '.' + parts.slice(1).join('');
        }
      } else {
        // For bedrooms, bathrooms, sqft - only integers
        validatedValue = value.replace(/[^0-9]/g, '');
      }
      
      // Ensure non-negative
      if (parseFloat(validatedValue) < 0) {
        validatedValue = '0';
      }
    }
    
    // Phone number validation - only numbers, spaces, dashes, parentheses, plus
    if (name === 'ownerPhone') {
      validatedValue = value.replace(/[^0-9\s\-\(\)\+]/g, '');
    }

    setFormData({
      ...formData,
      [name]: validatedValue
    });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // Prevent double submission
    
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

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-10 max-w-6xl w-full max-h-[75vh] overflow-y-auto">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Property Address - Full width */}
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-slate-600 mb-3">Property Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all bg-white/50 disabled:opacity-50"
            placeholder="123 Main Street, City, State"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-3">Price ($) *</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all bg-white/50 disabled:opacity-50"
            placeholder="450000"
            required
          />
        </div>

        {/* Listing Type */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-3">Listing Type</label>
          <select
            name="listingType"
            value={formData.listingType}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all bg-white/50 disabled:opacity-50"
          >
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-3">Property Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all bg-white/50 disabled:opacity-50"
          >
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Apartment">Apartment</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-3">Bedrooms</label>
          <input
            type="text"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all bg-white/50 disabled:opacity-50"
            placeholder="3"
            min="0"
          />
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-3">Bathrooms</label>
          <input
            type="text"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all bg-white/50 disabled:opacity-50"
            placeholder="2"
            min="0"
          />
        </div>

        {/* Square Feet */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-3">Square Feet</label>
          <input
            type="text"
            name="sqft"
            value={formData.sqft}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all bg-white/50 disabled:opacity-50"
            placeholder="1800"
            min="0"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-3">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all bg-white/50 disabled:opacity-50"
          >
            <option value="Available">Available</option>
            <option value="Pending">Pending</option>
            <option value="Sold">Sold</option>
            <option value="Off Market">Off Market</option>
          </select>
        </div>

        {/* Agent Name */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-3">Agent Name</label>
          <input
            type="text"
            name="agent"
            value={formData.agent}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all bg-white/50 disabled:opacity-50"
            placeholder="John Doe"
          />
        </div>

        {/* Owner Name */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-3">Owner Name</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all bg-white/50 disabled:opacity-50"
            placeholder="Jane Smith"
          />
        </div>

        {/* Owner Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-3">Owner Phone</label>
          <input
            type="tel"
            name="ownerPhone"
            value={formData.ownerPhone}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all bg-white/50 disabled:opacity-50"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Comments - Full width */}
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-slate-600 mb-3">Comments</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            disabled={isSubmitting}
            rows={4}
            className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all bg-white/50 disabled:opacity-50 resize-none"
            placeholder="Additional notes about the property..."
          />
        </div>

        {/* Submit Button */}
        <div className="lg:col-span-3 pt-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.address || !formData.price}
            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-8 py-3.5 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-200 font-medium flex items-center shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Adding...
              </>
            ) : (
              <>
                Add Property
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};