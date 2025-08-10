// src/components/PropertyForm.tsx

import React, { useState } from 'react';
import { Plus, MapPin, DollarSign, Home, Bed, Bath, Square, User, Phone, MessageSquare } from 'lucide-react';
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

  const inputClasses = "w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 disabled:opacity-50 disabled:bg-slate-50 bg-white/80 backdrop-blur-sm text-slate-700 placeholder:text-slate-400";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-3";

  return (
    <div className="space-y-8">
      {/* Property Information Section */}
      <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl p-6 border border-blue-100/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl text-white">
            <Home className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Property Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Property Address */}
          <div className="lg:col-span-2">
            <label className={labelClasses}>
              <MapPin className="w-4 h-4 inline mr-2" />
              Property Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={inputClasses}
              placeholder="123 Main Street, City, State, ZIP"
            />
          </div>

          {/* Price */}
          <div>
            <label className={labelClasses}>
              <DollarSign className="w-4 h-4 inline mr-2" />
              Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={inputClasses}
              placeholder="450,000"
            />
          </div>

          {/* Listing Type */}
          <div>
            <label className={labelClasses}>
              Listing Type
            </label>
            <select
              name="listingType"
              value={formData.listingType}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={inputClasses}
            >
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className={labelClasses}>
              Property Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={inputClasses}
            >
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Apartment">Apartment</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className={labelClasses}>
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={inputClasses}
            >
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
              <option value="Off Market">Off Market</option>
            </select>
          </div>
        </div>
      </div>

      {/* Property Details Section */}
      <div className="bg-gradient-to-r from-emerald-50/50 to-teal-50/50 rounded-2xl p-6 border border-emerald-100/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl text-white">
            <Square className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Property Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bedrooms */}
          <div>
            <label className={labelClasses}>
              <Bed className="w-4 h-4 inline mr-2" />
              Bedrooms
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={inputClasses}
              placeholder="3"
              min="0"
            />
          </div>

          {/* Bathrooms */}
          <div>
            <label className={labelClasses}>
              <Bath className="w-4 h-4 inline mr-2" />
              Bathrooms
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={inputClasses}
              placeholder="2"
              min="0"
              step="0.5"
            />
          </div>

          {/* Square Feet */}
          <div>
            <label className={labelClasses}>
              <Square className="w-4 h-4 inline mr-2" />
              Square Feet
            </label>
            <input
              type="number"
              name="sqft"
              value={formData.sqft}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={inputClasses}
              placeholder="1,800"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-2xl p-6 border border-purple-100/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl text-white">
            <User className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Contact Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Agent Name */}
          <div>
            <label className={labelClasses}>
              <User className="w-4 h-4 inline mr-2" />
              Agent Name
            </label>
            <input
              type="text"
              name="agent"
              value={formData.agent}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={inputClasses}
              placeholder="John Doe"
            />
          </div>

          {/* Owner Name */}
          <div>
            <label className={labelClasses}>
              <Home className="w-4 h-4 inline mr-2" />
              Owner Name
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={inputClasses}
              placeholder="Jane Smith"
            />
          </div>

          {/* Owner Phone */}
          <div>
            <label className={labelClasses}>
              <Phone className="w-4 h-4 inline mr-2" />
              Owner Phone
            </label>
            <input
              type="tel"
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={inputClasses}
              placeholder="(555) 123-4567"
            />
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-gradient-to-r from-slate-50/50 to-gray-50/50 rounded-2xl p-6 border border-slate-100/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-slate-400 to-gray-400 rounded-xl text-white">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Additional Notes</h3>
        </div>
        
        <div>
          <label className={labelClasses}>
            Comments & Notes
          </label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            disabled={isSubmitting}
            rows={4}
            className={inputClasses}
            placeholder="Add any additional notes about this property, special features, or important details..."
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6 border-t border-slate-200">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.address || !formData.price}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:hover:shadow-lg"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Adding Property...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Add Property to Portfolio
            </>
          )}
        </button>
        
        {(!formData.address || !formData.price) && (
          <p className="text-slate-500 text-sm text-center mt-3">
            Please fill in the property address and price to continue
          </p>
        )}
      </div>
    </div>
  );
};