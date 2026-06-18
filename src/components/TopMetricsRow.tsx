import { 
  Users, 
  UserPlus, 
  Briefcase, 
  TrendingUp, 
  MonitorSmartphone, 
  Building2, 
  ShoppingCart, 
  CircleDollarSign,
  ArrowDown,
  ArrowUp
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

interface TopMetricsRowProps {
  activeProvince: string | null;
}

export function TopMetricsRow({ activeProvince }: TopMetricsRowProps) {
  // Mock data changes based on selected province
  const isProv = activeProvince !== null;
  const modifier = isProv ? 0.8 : 1; // Change data roughly to show filtering

  const metrics = [
    { id: 'kemiskinan', title: 'Kemiskinan', value: (9.21 * modifier).toFixed(2) + '%', change: '-0,35%', isPositive: true, period: 'vs Apr 2025', icon: Users, data: [9.6, 9.8, 9.3, 9.5, 9.25, 9.21] },
    { id: 'stunting', title: 'Stunting', value: (21.3 * modifier).toFixed(1) + '%', change: '-0,6%', isPositive: true, period: 'vs Apr 2025', icon: UserPlus, data: [22.2, 21.5, 21.8, 21.1, 21.6, 21.3] },
    { id: 'tpt', title: 'TPT', value: (5.32 * modifier).toFixed(2) + '%', change: '+0,18%', isPositive: false, period: 'vs Apr 2025', icon: Briefcase, data: [5.0, 5.3, 5.1, 5.4, 5.2, 5.32] },
    { id: 'ipm', title: 'IPM', value: (73.41 * (isProv ? 1.05 : 1)).toFixed(2), change: '+0,42', isPositive: true, period: 'vs Apr 2025', icon: TrendingUp, data: [72.5, 73.1, 72.8, 73.5, 73.2, 73.41] },
    { id: 'spbe', title: 'SPBE', value: (3.12 * (isProv ? 1.1 : 1)).toFixed(2), change: '+0,11', isPositive: true, period: 'vs Apr 2025', icon: MonitorSmartphone, data: [2.9, 3.1, 3.0, 3.2, 3.05, 3.12] },
    { id: 'iid', title: 'IID', value: (0.54 * modifier).toFixed(2), change: '+0,03', isPositive: true, period: 'vs Apr 2025', icon: Building2, data: [0.45, 0.51, 0.49, 0.55, 0.52, 0.54] },
    { id: 'inflasi', title: 'Inflasi', value: (2.84 * modifier).toFixed(2) + '%', change: '+0,19%', isPositive: false, period: 'vs Apr 2025', icon: ShoppingCart, data: [2.5, 2.8, 2.6, 2.9, 2.7, 2.84] },
    { id: 'fiskal', title: 'Kinerja Fiskal', value: (73.6 * (isProv ? 1.02 : 1)).toFixed(1) + '%', change: '+1,2%', isPositive: true, period: 'vs Apr 2025', icon: CircleDollarSign, data: [71, 73, 72, 74, 72.5, 73.6] },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 w-full">
      {metrics.map((item) => {
        const Icon = item.icon;
        const colorClass = item.isPositive ? 'text-emerald-500' : 'text-red-500';
        const chartColor = item.isPositive ? '#10b981' : '#ef4444';

        return (
          <div key={item.id} className="bg-brand-card/40 border border-brand-border/60 rounded-xl pt-3 px-3 pb-0 flex flex-col overflow-hidden backdrop-blur-sm transition-all hover:bg-brand-card/60 min-h-[115px]">
            <div className="flex items-start justify-between gap-2 relative z-10">
              <div className="p-1.5 bg-blue-500/10 rounded-lg shrink-0">
                <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex flex-col items-end min-w-0">
                <span className="text-[11px] font-semibold text-brand-textMuted whitespace-nowrap overflow-hidden text-ellipsis w-full text-right">{item.title}</span>
                <span className="text-lg font-black tracking-tight mt-0.5">{item.value}</span>
              </div>
            </div>
            
            <div className="flex items-end justify-between mt-auto mb-1 relative z-10">
              <div className="flex flex-col">
                <span className="text-[9px] text-brand-textMuted mb-0.5 font-medium">{item.period}</span>
                <div className={`flex items-center gap-1 text-[11px] font-bold ${colorClass}`}>
                  {item.change.startsWith('+') ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {item.change.replace(/[+-]/, '')}
                </div>
              </div>
            </div>
            
            {/* Sparkline with Area Fill */}
            <div className="-mx-3 h-10 opacity-80 pointer-events-none mt-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={item.data.map((val, i) => ({ value: val, index: i }))} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`gradient-${item.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={chartColor} 
                    strokeWidth={2} 
                    fill={`url(#gradient-${item.id})`}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}
