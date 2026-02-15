import { useState, useEffect, useMemo } from 'react';
import type { COI, COIStats, FilterExpiry, FilterStatus } from '../types/coi.types';
import { isExpiringWithinDays } from '../Utils/helper';

/**
 * Hook for debouncing a value
 */
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook for calculating COI statistics
 */
export const useCOIStats = (coiList: COI[]): COIStats => {
  return useMemo(() => {
    return {
      total: coiList.length,
      accepted: coiList.filter(c => c.status === 'Active').length,
      rejected: coiList.filter(c => c.status === 'Rejected').length,
      expiringSoon: coiList.filter(c => isExpiringWithinDays(c.expiryDate, 30)).length
    };
  }, [coiList]);
};

/**
 * Hook for filtering COIs based on various criteria
 */
export const useFilteredCOIs = (
  coiList: COI[],
  searchQuery: string,
  filterProperty: string[],
  filterStatus: FilterStatus,
  filterExpiry: FilterExpiry
): COI[] => {
  return useMemo(() => {
    return coiList.filter(coi => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        coi.tenantName.toLowerCase().includes(searchLower) ||
        coi.property.toLowerCase().includes(searchLower) ||
        coi.unit.toLowerCase().includes(searchLower);

      // Property filter
      const matchesProperty = filterProperty.length === 0 || filterProperty.includes(coi.property);

      // Status filter
      const matchesStatus = filterStatus === 'All' || coi.status === filterStatus;

      // Expiry filter
      let matchesExpiry = true;
      if (filterExpiry !== 'All') {
        const today = new Date();
        const expiryDate = new Date(coi.expiryDate);
        
        if (filterExpiry === 'Expired') {
          matchesExpiry = expiryDate < today;
        } else if (filterExpiry === 'Expiring in 30 days') {
          matchesExpiry = isExpiringWithinDays(coi.expiryDate, 30);
        } else if (filterExpiry === 'Expiring in 60 days') {
          matchesExpiry = isExpiringWithinDays(coi.expiryDate, 60);
        } else if (filterExpiry === 'Active') {
          matchesExpiry = expiryDate > today;
        }
      }

      return matchesSearch && matchesProperty && matchesStatus && matchesExpiry;
    });
  }, [coiList, searchQuery, filterProperty, filterStatus, filterExpiry]);
};

/**
 * Hook for pagination
 */
export const usePagination = <T,>(
  items: T[],
  rowsPerPage: number,
  currentPage: number
): { paginatedItems: T[]; totalPages: number } => {
  return useMemo(() => {
    const totalPages = Math.ceil(items.length / rowsPerPage);
    const start = (currentPage - 1) * rowsPerPage;
    const paginatedItems = items.slice(start, start + rowsPerPage);
    
    return { paginatedItems, totalPages };
  }, [items, rowsPerPage, currentPage]);
};

/**
 * Hook for managing localStorage sync
 */
export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};