import React from 'react';
import { Pencil, MoreVertical } from 'lucide-react';
import type { COI, COIStatus } from '../types/coi.types';
import { formatDate } from '../Utils/helper';

interface COITableProps {
  paginatedCOIs: COI[];
  selectedIds: Set<string>;
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: string, checked: boolean) => void;
  onStatusChange: (id: string, status: COIStatus) => void;
  onEdit: (coi: COI) => void;
  onDelete: (id: string) => void;
  activeActionMenu: string | null;
  setActiveActionMenu: (id: string | null) => void;
}

const COITable: React.FC<COITableProps> = ({
  paginatedCOIs,
  selectedIds,
  onSelectAll,
  onSelectOne,
  onStatusChange,
  onEdit,
  onDelete,
  activeActionMenu,
  setActiveActionMenu,
}) => {
  const allSelected = paginatedCOIs.length > 0 && paginatedCOIs.every(c => selectedIds.has(c.id));

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-300 mb-2.5">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left p-4 w-12 border-r border-b border-gray-300">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 cursor-pointer"
              />
            </th>
            <th className="text-left p-4 text-neutral-700 text-base font-medium border-r border-b border-gray-300 w-32 whitespace-nowrap">Property</th>
            <th className="text-left p-4 text-neutral-700 text-base font-medium border-r border-b border-gray-300 whitespace-nowrap">Tenant Name</th>
            <th className="text-left p-4 text-neutral-700 text-base font-medium border-r border-b border-gray-300 whitespace-nowrap">Unit</th>
            <th className="text-left p-4 text-neutral-700 text-base font-medium border-r border-b border-gray-300 whitespace-nowrap">COI Name</th>
            <th className="text-left p-4 text-neutral-700 text-base font-medium border-r border-b border-gray-300 w-44 whitespace-nowrap">Expiry Date</th>
            <th className="text-left p-4 text-neutral-700 text-base font-medium border-r border-b border-gray-300 whitespace-nowrap">Status</th>
            <th className="text-left p-4 text-neutral-700 text-base font-medium border-r border-b border-gray-300 whitespace-nowrap">Reminder Status</th>
            <th className="text-left p-4 text-neutral-700 text-base font-medium border-b border-gray-300 whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCOIs.map((coi) => (
            <tr 
              key={coi.id} 
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="p-4 border-r border-b border-gray-300">
                <input
                  type="checkbox"
                  checked={selectedIds.has(coi.id)}
                  onChange={(e) => onSelectOne(coi.id, e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 cursor-pointer"
                />
              </td>
              <td className="p-4 text-sm text-neutral-800 border-r border-b border-gray-300 truncate max-w-[8rem]" title={coi.property}>{coi.property}</td>
              <td className="p-4 text-sm text-neutral-800 border-r border-b border-gray-300 truncate max-w-[8rem]" title={coi.tenantName}>{coi.tenantName}</td>
              <td className="p-4 text-sm text-neutral-800 border-r border-b border-gray-300">{coi.unit}</td>
              <td className="p-4 text-sm text-neutral-800 border-r border-b border-gray-300">{coi.coiName}</td>
              <td className="p-4 border-r border-b border-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-800">{formatDate(coi.expiryDate)}</span>
                  <button
                    onClick={() => onEdit(coi)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
              </td>
              <td className="p-4 border-r border-b border-gray-300">
                <select
                  value={coi.status}
                  onChange={(e) => onStatusChange(coi.id, e.target.value as COIStatus)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium cursor-pointer appearance-none pr-8 bg-no-repeat bg-right bg-contain ${
                    coi.status === 'Active' 
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : coi.status === 'Expired'
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : coi.status === 'Rejected'
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : coi.status === 'Expiring Soon'
                      ? 'bg-orange-50 border-orange-200 text-orange-700'
                      : 'bg-gray-50 border-gray-300 text-gray-700'
                  }`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L2 4h8z'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '12px'
                  }}
                >
                  <option value="Active">Active</option>
                  <option value="Expired">Expired</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Expiring Soon">Expiring Soon</option>
                  <option value="Not Processed">Not Processed</option>
                </select>
              </td>
              <td className="p-4 border-r border-b border-gray-300">
                <span className={`text-sm ${
                  coi.reminderStatus.includes('Sent') 
                    ? 'text-emerald-600 font-medium' 
                    : 'text-gray-500'
                }`}>
                  {coi.reminderStatus}
                </span>
              </td>
              <td className="p-4 border-b border-gray-300">
                <div className="relative">
                  <button
                    onClick={() => setActiveActionMenu(activeActionMenu === coi.id ? null : coi.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <MoreVertical size={20} />
                  </button>
                  {activeActionMenu === coi.id && (
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                      <button
                        onClick={() => {
                          onEdit(coi);
                          setActiveActionMenu(null);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 first:rounded-t-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          onDelete(coi.id);
                          setActiveActionMenu(null);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-red-600 last:rounded-b-lg"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default COITable;