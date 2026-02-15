import React, { useState, useEffect, useMemo } from 'react';
import { useCOIStats, useDebounce, useFilteredCOIs, useLocalStorage, usePagination } from '../hooks/useCOI';
import { initialCOIData } from '../mockData/insitalData';
import type { COI, COIFormData, COIStatus, FilterExpiry, FilterStatus } from '../types/coi.types';
import { Sidebar as SDbar } from 'lucide-react';
import Header from './header';
import StatsCards from './statsCard';
import TableFilters from './tableFilter';
import COITable from './coiTable';
import Pagination from './pagination';
import COIModal from './coiModal';
import Sidebar from './sidebar';


const COIDashboard: React.FC = () => {
  // State management
  const [coiList, setCoiList] = useLocalStorage<COI[]>('coiData', initialCOIData);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProperty, setFilterProperty] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('All');
  const [filterExpiry, setFilterExpiry] = useState<FilterExpiry>('All');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCOI, setEditingCOI] = useState<COI | null>(null);
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showExpiryDropdown, setShowExpiryDropdown] = useState(false);
  const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null);

  // Debounced search
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Calculate statistics
  const stats = useCOIStats(coiList);

  // Get unique properties for filter
  const uniqueProperties = useMemo(() => {
    return Array.from(new Set(coiList.map(c => c.property)));
  }, [coiList]);

  // Filter COIs
  const filteredCOIs = useFilteredCOIs(
    coiList,
    debouncedSearch,
    filterProperty,
    filterStatus,
    filterExpiry
  );

  // Pagination
  const { paginatedItems: paginatedCOIs, totalPages } = usePagination(
    filteredCOIs,
    rowsPerPage,
    currentPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, filterProperty, filterStatus, filterExpiry, rowsPerPage]);

  // Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(paginatedCOIs.map(c => c.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  const handleStatusChange = (id: string, newStatus: COIStatus) => {
    setCoiList(prev => prev.map(coi => 
      coi.id === id ? { ...coi, status: newStatus } : coi
    ));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this COI?')) {
      setCoiList(prev => prev.filter(coi => coi.id !== id));
      setSelectedIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleEdit = (coi: COI) => {
    setEditingCOI(coi);
    setShowEditModal(true);
  };

  const handleAddCOI = (formData: COIFormData) => {
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
    setShowAddModal(false);
  };

  const handleUpdateCOI = (formData: COIFormData) => {
    if (!editingCOI) return;
    setCoiList(prev => prev.map(coi => 
      coi.id === editingCOI.id ? { ...coi, ...formData } : coi
    ));
    setShowEditModal(false);
    setEditingCOI(null);
  };

  // Close dropdowns when clicking outside
  const handleCloseDropdowns = () => {
    setShowPropertyDropdown(false);
    setShowStatusDropdown(false);
    setShowExpiryDropdown(false);
    setActiveActionMenu(null);
  };

  return (
    <div className="min-h-screen">
      <SDbar />
      <Sidebar/>
      <div className="ml-56 px-8 pb-7">
        <Header/>
        <StatsCards stats={stats} />

        <div className="bg-neutral-50 rounded-xl border border-slate-200 shadow-sm p-4">
          <TableFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterProperty={filterProperty}
            onFilterPropertyChange={setFilterProperty}
            filterStatus={filterStatus}
            onFilterStatusChange={setFilterStatus}
            filterExpiry={filterExpiry}
            onFilterExpiryChange={setFilterExpiry}
            uniqueProperties={uniqueProperties}
            showPropertyDropdown={showPropertyDropdown}
            setShowPropertyDropdown={setShowPropertyDropdown}
            showStatusDropdown={showStatusDropdown}
            setShowStatusDropdown={setShowStatusDropdown}
            showExpiryDropdown={showExpiryDropdown}
            setShowExpiryDropdown={setShowExpiryDropdown}
            onAddCOI={() => setShowAddModal(true)}
          />

          <COITable
            paginatedCOIs={paginatedCOIs}
            selectedIds={selectedIds}
            onSelectAll={handleSelectAll}
            onSelectOne={handleSelectOne}
            onStatusChange={handleStatusChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
            activeActionMenu={activeActionMenu}
            setActiveActionMenu={setActiveActionMenu}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        </div>
      </div>

      {(showAddModal || showEditModal) && (
        <COIModal
          coi={editingCOI}
          onClose={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            setEditingCOI(null);
          }}
          onSave={showAddModal ? handleAddCOI : handleUpdateCOI}
          properties={uniqueProperties}
        />
      )}

      {(showPropertyDropdown || showStatusDropdown || showExpiryDropdown || activeActionMenu) && (
        <div
          className="fixed inset-0 z-10"
          onClick={handleCloseDropdowns}
        />
      )}
    </div>
  );
};

export default COIDashboard;