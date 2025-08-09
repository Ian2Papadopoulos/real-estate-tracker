// src/hooks/useProperties.tsx

import { useState, useEffect } from 'react';
import { Property, PropertyFormData } from '../types/property';
import { supabase, DatabaseProperty } from '../lib/supabase';

// Convert database property to frontend property format
const convertToProperty = (dbProperty: DatabaseProperty): Property => ({
  id: dbProperty.id,
  address: dbProperty.address,
  price: dbProperty.price,
  listingType: dbProperty.listing_type,
  type: dbProperty.property_type,
  bedrooms: dbProperty.bedrooms,
  bathrooms: dbProperty.bathrooms,
  sqft: dbProperty.sqft,
  status: dbProperty.status,
  agent: dbProperty.agent || '',
  dateAdded: new Date(dbProperty.created_at).toISOString().split('T')[0]
});

// Convert frontend property to database format
const convertToDbProperty = (formData: PropertyFormData) => ({
  address: formData.address,
  price: parseInt(formData.price),
  listing_type: formData.listingType,
  property_type: formData.type,
  bedrooms: parseInt(formData.bedrooms) || 0,
  bathrooms: parseInt(formData.bathrooms) || 0,
  sqft: parseInt(formData.sqft) || 0,
  status: formData.status,
  agent: formData.agent || null
});

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch properties from database
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const convertedProperties = data?.map(convertToProperty) || [];
      setProperties(convertedProperties);
      setError(null);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  // Load properties on component mount
  useEffect(() => {
    fetchProperties();
  }, []);

  const addProperty = async (formData: PropertyFormData): Promise<boolean> => {
    if (!formData.address || !formData.price) return false;

    try {
      const dbProperty = convertToDbProperty(formData);
      
      const { data, error } = await supabase
        .from('properties')
        .insert([dbProperty])
        .select()
        .single();

      if (error) throw error;

      // Add the new property to local state
      const newProperty = convertToProperty(data);
      setProperties(prev => [newProperty, ...prev]);
      
      return true;
    } catch (err) {
      console.error('Error adding property:', err);
      setError(err instanceof Error ? err.message : 'Failed to add property');
      return false;
    }
  };

  const updateProperty = async (id: number, updates: Partial<Property>): Promise<boolean> => {
    try {
      // Convert frontend updates to database format
      const dbUpdates: any = {};
      if (updates.address) dbUpdates.address = updates.address;
      if (updates.price) dbUpdates.price = updates.price;
      if (updates.listingType) dbUpdates.listing_type = updates.listingType;
      if (updates.type) dbUpdates.property_type = updates.type;
      if (updates.bedrooms !== undefined) dbUpdates.bedrooms = updates.bedrooms;
      if (updates.bathrooms !== undefined) dbUpdates.bathrooms = updates.bathrooms;
      if (updates.sqft !== undefined) dbUpdates.sqft = updates.sqft;
      if (updates.status) dbUpdates.status = updates.status;
      if (updates.agent !== undefined) dbUpdates.agent = updates.agent;

      const { error } = await supabase
        .from('properties')
        .update(dbUpdates)
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setProperties(prev => 
        prev.map(property => 
          property.id === id ? { ...property, ...updates } : property
        )
      );
      
      return true;
    } catch (err) {
      console.error('Error updating property:', err);
      setError(err instanceof Error ? err.message : 'Failed to update property');
      return false;
    }
  };

  const deleteProperty = async (id: number): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Remove from local state
      setProperties(prev => prev.filter(property => property.id !== id));
      
      return true;
    } catch (err) {
      console.error('Error deleting property:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete property');
      return false;
    }
  };

  // Real-time subscription (optional but cool!)
  useEffect(() => {
    const subscription = supabase
      .channel('properties')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'properties' },
        (payload) => {
          const newProperty = convertToProperty(payload.new as DatabaseProperty);
          setProperties(prev => [newProperty, ...prev]);
        }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'properties' },
        (payload) => {
          const updatedProperty = convertToProperty(payload.new as DatabaseProperty);
          setProperties(prev => 
            prev.map(property => 
              property.id === updatedProperty.id ? updatedProperty : property
            )
          );
        }
      )
      .on('postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'properties' },
        (payload) => {
          setProperties(prev => 
            prev.filter(property => property.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    properties,
    loading,
    error,
    addProperty,
    updateProperty,
    deleteProperty,
    refetch: fetchProperties
  };
};