import React from 'react';
import { ChevronDown, Info } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5.5 bg-white gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-0.5">COI Review Dashboard</h1>
        <p className="text-gray-600 text-sm font-normal">Overview of all Certificate of insurance</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 justify-end w-full md:w-auto">
        <button className="px-5 py-2.5 bg-white border border-gray-300 text-blue-500 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 font-medium text-sm">
          <span>Send Bulk Reminder</span>
          <ChevronDown size={16} className="text-gray-500" />
        </button>
        
        <button className="px-4 py-2.5 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 font-medium text-sm border border-gray-200">
          <span className="text-base">✨</span>
          <span>Ask LegalGraph AI</span>
        </button>
        
        <button className="px-4 py-2.5 text-blue-500 rounded-lg border border-blue-500 transition-colors flex items-center gap-2 font-medium text-sm">
          <Info size={16} />
          <span>Help</span>
        </button>
        
        <div className="flex items-center gap-3 pl-0 md:pl-4 border-t md:border-t-0 md:border-l border-gray-200 mt-3 md:mt-0">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-base">S</span>
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-gray-900 text-sm">Shubham</div>
            <div className="text-gray-500 text-xs">shubham@gmail.com</div>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Header;