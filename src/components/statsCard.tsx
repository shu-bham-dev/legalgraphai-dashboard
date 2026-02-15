import React from 'react';
import { FileSearch, FileCheck, FileX, Clock } from 'lucide-react';
import type { COIStats } from '../types/coi.types';

interface StatsCardsProps {
  stats: COIStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-50 rounded-2xl p-6">
        <div className="text-neutral-900 text-base font-medium mb-6">Total COI Processed</div>
        <div className="flex items-center gap-3 bg-white p-3.5 rounded-lg">
          <FileSearch className="text-blue-500" size={28} strokeWidth={1.5} />
          <span className="text-4xl font-bold text-gray-900">{stats.total}</span>
        </div>
      </div>

      <div className="bg-emerald-50 rounded-2xl p-6">
         <div className="text-neutral-900 text-base font-medium mb-6">Accepted</div>
         <div className="flex items-center gap-3 bg-white p-3.5 rounded-lg">
          <FileCheck className="text-emerald-500" size={28} strokeWidth={1.5} />
          <span className="text-4xl font-bold text-gray-900">{stats.accepted}</span>
        </div>
      </div>

      <div className="bg-red-50 rounded-2xl p-6">
        <div className="text-neutral-900 text-base font-medium mb-6">Rejected</div>
         <div className="flex items-center gap-3 bg-white p-3.5 rounded-lg">
          <FileX className="text-red-400" size={28} strokeWidth={1.5} />
          <span className="text-4xl font-bold text-gray-900">{stats.rejected}</span>
        </div>
      </div>

      <div className="bg-orange-50 rounded-2xl p-6">
         <div className="text-neutral-900 text-base font-medium mb-6">Expiring in 30 days</div>
         <div className="flex items-center gap-3 bg-white p-3.5 rounded-lg">
          <Clock className="text-orange-400" size={28} strokeWidth={1.5} />
          <span className="text-4xl font-bold text-gray-900">{stats.expiringSoon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;