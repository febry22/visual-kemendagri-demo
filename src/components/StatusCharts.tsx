import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { regionalsData } from '../data/regionsData';
import { Activity } from 'lucide-react';

export const StatusCharts: React.FC = () => {
  // Process the excel data for the bar chart
  // Group provinces by regional and categorize as "Updated" (rankNasional <= 18) vs "Lagging" (rankNasional > 18)
  const data = regionalsData.map(reg => {
    const updated = reg.provinces.filter(p => p.rankNasional <= 18).length;
    const lagging = reg.provinces.filter(p => p.rankNasional > 18).length;
    
    // Shorten regional names for chart labels
    let shortName = reg.name;
    if (reg.name === 'BALI - NUSA TENGGARA') shortName = 'BALI-NUSA';
    if (reg.name === 'MALUKU & PAPUA' || reg.name === 'PAPUA' || reg.name === 'MALUKU - PAPUA') shortName = 'PAPUA';
    
    return {
      name: shortName,
      Updated: updated,
      Lagging: lagging,
    };
  });

  // Custom tooltip styles
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-brand-card/90 border border-brand-border p-2.5 rounded shadow-xl backdrop-blur-md text-xs">
          <p className="font-bold text-gray-800 dark:text-gray-200 mb-1">{label}</p>
          <p className="text-blue-600 dark:text-blue-400">Updated: {payload[0].value} Prov</p>
          <p className="text-orange-600 dark:text-orange-400">Lagging: {payload[1].value} Prov</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel rounded-xl p-4 flex flex-col h-[280px]">
      <div className="flex items-center gap-2 mb-2 border-b border-brand-border pb-2">
        <Activity className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-textMuted">
          Sumber Data Indeks & Status (Regional)
        </h3>
      </div>
      
      <div className="flex-1 w-full text-[10px]">
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
            barGap={4}
          >
            <XAxis 
              dataKey="name" 
              stroke="#64748b" 
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 9 }}
            />
            <YAxis 
              stroke="#64748b" 
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 9 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={24}
              iconSize={8}
              iconType="circle"
              wrapperStyle={{ fontSize: '10px', color: '#94a3b8', paddingBottom: '10px' }}
            />
            <Bar 
              dataKey="Updated" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]} 
              name="Updated" 
              maxBarSize={16}
            />
            <Bar 
              dataKey="Lagging" 
              fill="#f97316" 
              radius={[4, 4, 0, 0]} 
              name="Lagging" 
              maxBarSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
