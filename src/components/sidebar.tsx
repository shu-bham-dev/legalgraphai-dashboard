import React from 'react';
import { FileText, Settings, Plus, ChevronLeft, BarChart3 } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-60 bg-gray-50 border-r border-gray-200 z-10">
     
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/legalGraphLogo.png" 
            alt="LegalGraph AI" 
            className="w-8 h-8 object-contain"
          />
          <span className="font-semibold text-blue-600 text-base">LegalGraph AI</span>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">
          <ChevronLeft size={16} />
        </button>
      </div>
      
    
      <div className="px-4 mb-5">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-3 flex items-center justify-center gap-2 transition-colors shadow-sm">
          <span className="text-sm font-medium">Review documents</span>
          <Plus size={18} strokeWidth={2.5} />
        </button>
      </div>

     
      <nav className="px-4 space-y-2">
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors group">
          <FileText size={20} className="text-gray-500 group-hover:text-gray-600" strokeWidth={1.5} />
          <span className="text-sm font-normal">Contract Vault</span>
        </a>
        
        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl">
          <FileText size={20} className="text-blue-500" strokeWidth={1.5} />
          <span className="text-sm font-medium">COI Dashboard</span>
        </a>
        
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors group">
          <BarChart3 size={20} className="text-gray-500 group-hover:text-gray-600" strokeWidth={1.5} />
          <span className="text-sm font-normal">Analysis Results</span>
        </a>
        
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors group">
          <Settings size={20} className="text-gray-500 group-hover:text-gray-600" strokeWidth={1.5} />
          <span className="text-sm font-normal">Setting</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;