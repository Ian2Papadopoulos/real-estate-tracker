// src/lib/supabase.ts

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (matches our table structure)
export interface DatabaseProperty {
  id: number;
  address: string;
  price: number;
  listing_type: 'For Sale' | 'For Rent';
  property_type: 'House' | 'Condo' | 'Apartment' | 'Townhouse' | 'Commercial';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  status: 'Available' | 'Pending' | 'Sold' | 'Off Market';
  agent: string | null;
  created_at: string;
}