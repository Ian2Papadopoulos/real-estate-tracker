// src/utils/formatters.ts

export const formatPrice = (price: number, listingType: string): string => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  
  return listingType === 'For Rent' ? `${formattedPrice}/mo` : formattedPrice;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Use a counter instead of Date.now() to avoid hydration issues
let idCounter = 1000;
export const generatePropertyId = (): number => {
  return ++idCounter;
};

export const generateCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};