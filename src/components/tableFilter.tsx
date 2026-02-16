import React from 'react';
import { Search, Settings, Plus, ChevronDown } from 'lucide-react';
import type { FilterExpiry, FilterStatus } from '../types/coi.types';

interface TableFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterProperty: string[];
  onFilterPropertyChange: (properties: string[]) => void;
  filterStatus: FilterStatus;
  onFilterStatusChange: (status: FilterStatus) => void;
  filterExpiry: FilterExpiry;
  onFilterExpiryChange: (expiry: FilterExpiry) => void;
  uniqueProperties: string[];
  showPropertyDropdown: boolean;
  setShowPropertyDropdown: (show: boolean) => void;
  showStatusDropdown: boolean;
  setShowStatusDropdown: (show: boolean) => void;
  showExpiryDropdown: boolean;
  setShowExpiryDropdown: (show: boolean) => void;
  onAddCOI: () => void;
}

const TableFilters: React.FC<TableFiltersProps> = ({
  searchQuery,
  onSearchChange,
  filterProperty,
  onFilterPropertyChange,
  filterStatus,
  onFilterStatusChange,
  filterExpiry,
  onFilterExpiryChange,
  uniqueProperties,
  showPropertyDropdown,
  setShowPropertyDropdown,
  showStatusDropdown,
  setShowStatusDropdown,
  showExpiryDropdown,
  setShowExpiryDropdown,
  onAddCOI,
}) => {
  const statusOptions: FilterStatus[] = ['All', 'Active', 'Expired', 'Rejected', 'Expiring Soon', 'Not Processed'];
  const expiryOptions: FilterExpiry[] = ['All', 'Expired', 'Expiring in 30 days', 'Expiring in 60 days', 'Active'];

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setShowPropertyDropdown(!showPropertyDropdown)}
            className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-normal"
          >
            <span>{filterProperty.length > 0 ? `${filterProperty.length} selected` : 'All Properties'}</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
          {showPropertyDropdown && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
              <div className="p-2">
                <label className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterProperty.length === 0}
                    onChange={() => onFilterPropertyChange([])}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">All Properties</span>
                </label>
                {uniqueProperties.map(prop => (
                  <label key={prop} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterProperty.includes(prop)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onFilterPropertyChange([...filterProperty, prop]);
                        } else {
                          onFilterPropertyChange(filterProperty.filter(p => p !== prop));
                        }
                      }}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{prop}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-normal"
          >
            <span>{filterStatus}</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
          {showStatusDropdown && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              <div className="p-2">
                {statusOptions.map(status => (
                  <button
                    key={status}
                    onClick={() => {
                      onFilterStatusChange(status);
                      setShowStatusDropdown(false);
                    }}
                    className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded text-sm text-gray-700"
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowExpiryDropdown(!showExpiryDropdown)}
            className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-normal"
          >
            <span>Filter by Expiry</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
          {showExpiryDropdown && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              <div className="p-2">
                {expiryOptions.map(expiry => (
                  <button
                    key={expiry}
                    onClick={() => {
                      onFilterExpiryChange(expiry);
                      setShowExpiryDropdown(false);
                    }}
                    className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded text-sm text-gray-700"
                  >
                    {expiry}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by tenant, properties , or unit..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button className="w-10 h-10 bg-white border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
          <Settings size={18} />
        </button>

        <button
          onClick={onAddCOI}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>ADD COI</span>
        </button>
      </div>
    </div>
  );
};

export default TableFilters;