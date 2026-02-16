import React, { useState } from 'react';
import type { COI, COIFormData, COIStatus } from '../types/coi.types';
import { isValidEmail } from '../Utils/helper';

interface COIModalProps {
  coi: COI | null;
  onClose: () => void;
  onSave: (data: COIFormData) => void;
  properties: string[];
}

interface FormErrors {
  property?: string;
  tenantName?: string;
  tenantEmail?: string;
  unit?: string;
  coiName?: string;
  expiryDate?: string;
}

const COIModal: React.FC<COIModalProps> = ({ coi, onClose, onSave, properties }) => {
  const [formData, setFormData] = useState<COIFormData>({
    property: coi?.property || '',
    tenantName: coi?.tenantName || '',
    tenantEmail: coi?.tenantEmail || '',
    unit: coi?.unit || '',
    coiName: coi?.coiName || '',
    expiryDate: coi?.expiryDate || '',
    status: coi?.status || 'Not Processed'
  });
  
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.property) newErrors.property = 'Property is required';
    if (!formData.tenantName) newErrors.tenantName = 'Tenant name is required';
    if (!formData.tenantEmail) {
      newErrors.tenantEmail = 'Email is required';
    } else if (!isValidEmail(formData.tenantEmail)) {
      newErrors.tenantEmail = 'Invalid email format';
    }
    if (!formData.unit) newErrors.unit = 'Unit is required';
    if (!formData.coiName) newErrors.coiName = 'COI name is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  const handleChange = (field: keyof COIFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            {coi ? 'Edit COI' : 'Add New COI'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Property <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.property || ''}
                onChange={(e) => handleChange('property', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.property ? 'border-red-500' : 'border-slate-200'
                }`}
                list="properties"
              />
              <datalist id="properties">
                {properties.map(prop => (
                  <option key={prop} value={prop} />
                ))}
              </datalist>
              {errors.property && <p className="text-red-500 text-xs mt-1">{errors.property}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Tenant Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.tenantName || ''}
                onChange={(e) => handleChange('tenantName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.tenantName ? 'border-red-500' : 'border-slate-200'
                }`}
              />
              {errors.tenantName && <p className="text-red-500 text-xs mt-1">{errors.tenantName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Tenant Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.tenantEmail || ''}
                onChange={(e) => handleChange('tenantEmail', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.tenantEmail ? 'border-red-500' : 'border-slate-200'
                }`}
              />
              {errors.tenantEmail && <p className="text-red-500 text-xs mt-1">{errors.tenantEmail}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Unit <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.unit || ''}
                onChange={(e) => handleChange('unit', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.unit ? 'border-red-500' : 'border-slate-200'
                }`}
              />
              {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                COI Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.coiName || ''}
                onChange={(e) => handleChange('coiName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.coiName ? 'border-red-500' : 'border-slate-200'
                }`}
              />
              {errors.coiName && <p className="text-red-500 text-xs mt-1">{errors.coiName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.expiryDate || ''}
                onChange={(e) => handleChange('expiryDate', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.expiryDate ? 'border-red-500' : 'border-slate-200'
                }`}
              />
              {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Status
              </label>
              <select
                value={formData.status || 'Not Processed'}
                onChange={(e) => handleChange('status', e.target.value as COIStatus)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
                <option value="Rejected">Rejected</option>
                <option value="Expiring Soon">Expiring Soon</option>
                <option value="Not Processed">Not Processed</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {coi ? 'Update COI' : 'Add COI'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default COIModal;