import React from 'react';
import { nationalAverages } from '../data/regionsData';
import { Compass } from 'lucide-react';

export const MetricsPanel: React.FC = () => {
  // Format numbers nicely
  const formatNum = (num: number) => num.toFixed(2);
  
  // Calculate a generic Target Met percent based on national average score (e.g. average score / 100 * 100)
  const targetMet = nationalAverages.avgSkor; 
  const totalDataPoints = nationalAverages.totalProvinces * 4 + nationalAverages.totalKabKota * 4;

  return (
    <div className="glass-panel rounded-xl p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-3 border-b border-brand-border pb-2">
        <Compass className="w-4 h-4 text-cyan-400" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-textMuted">
          Performance Metrics: Nasional
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-brand-bg/30 border border-brand-border/40 p-2.5 rounded flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-medium">Total Indikator</span>
            <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mt-1">4 Utama</div>
          </div>
          <span className="text-[9px] text-gray-600 dark:text-gray-400 leading-none">IPM, IKF, TIK, IDI</span>
        </div>

        <div className="bg-brand-bg/30 border border-brand-border/40 p-2.5 rounded flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-medium">Total Data Points</span>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{totalDataPoints}</div>
          </div>
          <span className="text-[9px] text-gray-600 dark:text-gray-400 leading-none">Provinsi & Kab/Kota</span>
        </div>

        <div className="bg-brand-bg/30 border border-brand-border/40 p-2.5 rounded flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-medium">% Skor Rata-Rata</span>
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-1">{formatNum(targetMet)}%</div>
          </div>
          {/* Custom progress bar */}
          <div className="w-full bg-brand-border h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-purple-500 h-full shadow-glow-purple" 
              style={{ width: `${targetMet}%` }}
            />
          </div>
        </div>

        <div className="bg-brand-bg/30 border border-brand-border/40 p-2.5 rounded flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-medium">Nasional Rangk.</span>
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400 mt-1">{nationalAverages.totalProvinces} Prov</div>
          </div>
          <span className="text-[9px] text-gray-600 dark:text-gray-400 leading-none">Diperbarui Q2 2025</span>
        </div>
      </div>
    </div>
  );
};
