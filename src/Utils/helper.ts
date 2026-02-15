import type { COIStatus } from "../types/coi.types";

/**
 * Format date string to display format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

/**
 * Get Tailwind CSS classes for status badge
 */
export const getStatusColor = (status: COIStatus): string => {
  switch (status) {
    case 'Active':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Expired':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'Rejected':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'Expiring Soon':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'Not Processed':
      return 'bg-sky-50 text-sky-700 border-sky-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

/**
 * Check if a COI is expiring within the specified number of days
 */
export const isExpiringWithinDays = (expiryDate: string, days: number): boolean => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const daysFromNow = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
  return expiry > today && expiry <= daysFromNow;
};

/**
 * Check if a COI is expired
 */
export const isExpired = (expiryDate: string): boolean => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  return expiry < today;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Load data from localStorage
 */
export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Save data to localStorage
 */
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};