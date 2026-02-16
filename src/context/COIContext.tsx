import React, { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { COI, COIFormData, COIStatus } from '../types/coi.types';
import { initialCOIData } from '../mockData/insitalData';
import { useLocalStorage } from '../hooks/useCOI';

interface COIContextValue {
  coiList: COI[];
  setCoiList: React.Dispatch<React.SetStateAction<COI[]>>;
  addCOI: (formData: COIFormData) => void;
  updateCOI: (id: string, formData: COIFormData) => void;
  deleteCOI: (id: string) => void;
  changeStatus: (id: string, newStatus: COIStatus) => void;
  uniqueProperties: string[];
}

const COIContext = createContext<COIContextValue | undefined>(undefined);

export const COIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [coiList, setCoiList] = useLocalStorage<COI[]>('coiData', initialCOIData);

  const addCOI = (formData: COIFormData) => {
    const newCOI: COI = {
      id: Date.now().toString(),
      property: formData.property || '',
      tenantName: formData.tenantName || '',
      tenantEmail: formData.tenantEmail || '',
      unit: formData.unit || '',
      coiName: formData.coiName || '',
      expiryDate: formData.expiryDate || '',
      status: formData.status || 'Not Processed',
      reminderStatus: 'Not Sent',
      createdAt: new Date().toISOString()
    };
    setCoiList(prev => [newCOI, ...prev]);
  };

  const updateCOI = (id: string, formData: COIFormData) => {
    setCoiList(prev => prev.map(coi => (coi.id === id ? { ...coi, ...formData } : coi)));
  };

  const deleteCOI = (id: string) => {
    setCoiList(prev => prev.filter(coi => coi.id !== id));
  };

  const changeStatus = (id: string, newStatus: COIStatus) => {
    setCoiList(prev => prev.map(coi => (coi.id === id ? { ...coi, status: newStatus } : coi)));
  };

  const uniqueProperties = useMemo(() => {
    return Array.from(new Set(coiList.map(c => c.property)));
  }, [coiList]);

  const value: COIContextValue = {
    coiList,
    setCoiList,
    addCOI,
    updateCOI,
    deleteCOI,
    changeStatus,
    uniqueProperties
  };

  return <COIContext.Provider value={value}>{children}</COIContext.Provider>;
};

export const useCOIContext = (): COIContextValue => {
  const ctx = useContext(COIContext);
  if (!ctx) throw new Error('useCOIContext must be used within COIProvider');
  return ctx;
};

export default COIContext;
