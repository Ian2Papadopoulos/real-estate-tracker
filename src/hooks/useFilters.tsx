// src/hooks/useFilters.tsx

import { useState, useMemo } from 'react';
import { Property, PropertyFilters } from '@/types/property';

export const useFilters = (properties: Property[]) => {
  const [filters, setFilters] = useState<PropertyFilters>({
    searchTerm: '',
    minPrice: '',
    maxPrice: '',
    listingType: '',
    type: '',
    minBedrooms: '',
    status: '',
    agent: '',
    ownerName: ''
  });

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = property.address.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           property.agent.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           property.ownerName.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesMinPrice = !filters.minPrice || property.price >= parseInt(filters.minPrice);
      const matchesMaxPrice = !filters.maxPrice || property.price <= parseInt(filters.maxPrice);
      const matchesListingType = !filters.listingType || property.listingType === filters.listingType;
      const matchesType = !filters.type || property.type === filters.type;
      const matchesMinBedrooms = !filters.minBedrooms || property.bedrooms >= parseInt(filters.minBedrooms);
      const matchesStatus = !filters.status || property.status === filters.status;
      const matchesAgent = !filters.agent || property.agent.toLowerCase().includes(filters.agent.toLowerCase());
      const matchesOwner = !filters.ownerName || property.ownerName.toLowerCase().includes(filters.ownerName.toLowerCase());

      return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesListingType && 
             matchesType && matchesMinBedrooms && matchesStatus && matchesAgent && matchesOwner;
    });
  }, [properties, filters]);

  const updateFilter = (name: keyof PropertyFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      minPrice: '',
      maxPrice: '',
      listingType: '',
      type: '',
      minBedrooms: '',
      status: '',
      agent: '',
      ownerName: ''
    });
  };

  return {
    filters,
    filteredProperties,
    updateFilter,
    clearFilters
  };
};