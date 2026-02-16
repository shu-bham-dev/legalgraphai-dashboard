import React, { useState } from 'react';
import { FileText, Settings, Plus, ChevronLeft, BarChart3 } from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: (next: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed: collapsedProp, onToggle }) => {
  const [localCollapsed, setLocalCollapsed] = useState(false);
  const isControlled = typeof collapsedProp === 'boolean';
  const isCollapsed = isControlled ? collapsedProp! : localCollapsed;

  const handleToggle = () => {
    const next = !isCollapsed;
    if (onToggle) onToggle(next);
    if (!isControlled) setLocalCollapsed(next);
  };

  return (
    <div className={`fixed left-0 top-0 h-full hidden md:block ${isCollapsed ? 'w-16' : 'w-60'} bg-gray-50 border-r border-gray-200 z-10 transition-all duration-300`}>
      
      <div className="p-4 flex items-center justify-between">
          {!isCollapsed && (
        <div className="flex items-center gap-2 overflow-hidden">
          <img 
            src="/legalGraphLogo.png" 
            alt="LegalGraph AI" 
            className="w-8 h-8 object-contain shrink-0"
          />
            <span className="font-semibold text-blue-600 text-base whitespace-nowrap">
              LegalGraph AI
            </span>
        </div>
          )}
        <button 
          onClick={handleToggle}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft size={16} className={`transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* When collapsed, we might want a small toggle button at bottom */}
      
      
      {!isCollapsed && (
        <div className="px-4 mb-5">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-3 flex items-center justify-center gap-2 transition-colors shadow-sm">
            <span className="text-sm font-medium">Review documents</span>
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>
      )}

      <nav className={`${isCollapsed ? 'px-2' : 'px-4'} space-y-2 mt-4`}>
        <a href="#" className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} ${isCollapsed ? 'px-2' : 'px-4'} py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors group`}>
          <FileText size={20} className="shrink-0 text-gray-500 group-hover:text-gray-600" strokeWidth={1.5} />
          {!isCollapsed && <span className="text-sm font-normal">Contract Vault</span>}
        </a>
        
        <a href="#" className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} ${isCollapsed ? 'px-2' : 'px-4'} py-3 bg-blue-50 text-blue-600 rounded-xl`}>
          <FileText size={20} className="shrink-0 text-blue-500" strokeWidth={1.5} />
          {!isCollapsed && <span className="text-sm font-medium">COI Dashboard</span>}
        </a>
        
        <a href="#" className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} ${isCollapsed ? 'px-2' : 'px-4'} py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors group`}>
          <BarChart3 size={20} className="shrink-0 text-gray-500 group-hover:text-gray-600" strokeWidth={1.5} />
          {!isCollapsed && <span className="text-sm font-normal">Analysis Results</span>}
        </a>
        
        <a href="#" className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} ${isCollapsed ? 'px-2' : 'px-4'} py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors group`}>
          <Settings size={20} className="shrink-0 text-gray-500 group-hover:text-gray-600" strokeWidth={1.5} />
          {!isCollapsed && <span className="text-sm font-normal">Setting</span>}
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;