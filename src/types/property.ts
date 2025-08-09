// src/types/property.ts

export interface Property {
  id: number;
  address: string;
  price: number;
  listingType: 'For Sale' | 'For Rent';
  type: 'House' | 'Condo' | 'Apartment' | 'Townhouse' | 'Commercial';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  status: 'Available' | 'Pending' | 'Sold' | 'Off Market';
  agent: string;
  ownerName: string;
  ownerPhone: string;
  comments: string;
  dateAdded: string;
}

export interface PropertyFormData {
  address: string;
  price: string;
  listingType: 'For Sale' | 'For Rent';
  type: 'House' | 'Condo' | 'Apartment' | 'Townhouse' | 'Commercial';
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  status: 'Available' | 'Pending' | 'Sold' | 'Off Market';
  agent: string;
  ownerName: string;
  ownerPhone: string;
  comments: string;
}

export interface PropertyFilters {
  searchTerm: string;
  minPrice: string;
  maxPrice: string;
  listingType: string;
  type: string;
  minBedrooms: string;
  status: string;
  agent: string;
  ownerName: string;
}

export interface NavigationSection {
  title: string;
  icon: any; // Lucide icon component
  color: string;
}