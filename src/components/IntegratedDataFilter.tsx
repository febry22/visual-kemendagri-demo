import { useState } from 'react';
import { 
  Database, Wallet, Landmark, CircleDollarSign, Users, Baby, Briefcase, 
  TrendingUp, Coins, LineChart, Shield, FileBarChart, Lightbulb, 
  ClipboardList, Building, MonitorSmartphone, Smile, FileCheck, 
  AlertTriangle, Globe, UserMinus, ShoppingCart, Trophy, Zap
} from 'lucide-react';

const initialDataSources = [
  { id: 'apbd', label: 'APBD', icon: Wallet, active: true },
  { id: 'pad', label: 'PAD', icon: Landmark, active: true },
  { id: 'dana-transfer', label: 'Dana Transfer', icon: CircleDollarSign, active: true },
  { id: 'kemiskinan', label: 'Kemiskinan', icon: Users, active: true },
  { id: 'stunting', label: 'Stunting', icon: Baby, active: true },
  { id: 'tpt', label: 'TPT', icon: Briefcase, active: true },
  { id: 'pertumbuhan', label: 'Pertumbuhan Ekonomi', icon: TrendingUp, active: true },
  { id: 'pdrb', label: 'PDRB per Kapita', icon: Coins, active: true },
  { id: 'ipm', label: 'IPM', icon: LineChart, active: true },
  { id: 'idsd', label: 'IDSD', icon: Shield, active: true },
  { id: 'ipkd', label: 'IPKD', icon: FileBarChart, active: true },
  { id: 'iid', label: 'IID', icon: Lightbulb, active: true },
  { id: 'eppd', label: 'EPPD', icon: ClipboardList, active: true },
  { id: 'ikkd', label: 'IKKD', icon: Building, active: true },
  { id: 'spbe', label: 'SPBE', icon: MonitorSmartphone, active: true },
  { id: 'ikm', label: 'IKM', icon: Smile, active: true },
  { id: 'perizinan', label: 'MPP/Perizinan', icon: FileCheck, active: true },
  { id: 'bencana', label: 'Risiko Bencana', icon: AlertTriangle, active: true },
  { id: 'sdgs', label: 'SDGs Daerah', icon: Globe, active: true },
  { id: 'penduduk', label: 'Penduduk BPS', icon: Users, active: true },
  { id: 'ekstrem', label: 'Kemiskinan Ekstrem', icon: UserMinus, active: true },
  { id: 'pangan', label: 'Harga Pangan', icon: ShoppingCart, active: true },
  { id: 'daya-saing', label: 'Daya Saing Daerah', icon: Trophy, active: true },
  { id: 'inovasi', label: 'Inovasi Daerah', icon: Zap, active: true },
];

export function IntegratedDataFilter() {
  const [sources, setSources] = useState(initialDataSources);

  const toggleSource = (id: string) => {
    setSources(sources.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <div className="w-full bg-brand-card/60 backdrop-blur-md border border-brand-border/60 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-6 items-start md:items-center shadow-lg transition-colors overflow-hidden relative">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[100px] bg-blue-500/10 blur-[80px] pointer-events-none rounded-full" />

      {/* Left Icon & Title */}
      <div className="flex flex-col gap-2 shrink-0 relative z-10 w-full md:w-auto">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 blur-md opacity-30 dark:opacity-50 rounded-full" />
            <Database className="w-10 h-10 text-cyan-500 relative z-10" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-brand-text tracking-widest uppercase text-sm flex items-center gap-2">
              Data Terintegrasi 
              <span className="text-cyan-500 font-black">V1.0</span>
            </h3>
            <div className="h-px w-full bg-gradient-to-r from-cyan-500/50 to-transparent mt-1" />
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex-1 flex flex-wrap gap-2 sm:gap-2.5 relative z-10 justify-start md:justify-end lg:justify-start">
        {sources.map((source) => (
          <button
            key={source.id}
            onClick={() => toggleSource(source.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] sm:text-xs font-medium transition-all duration-300 cursor-pointer ${
              source.active
                ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-600 dark:text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)] hover:bg-cyan-500/20'
                : 'bg-brand-card/50 border-brand-border/50 text-brand-textMuted hover:border-gray-400 hover:text-brand-text'
            }`}
          >
            <source.icon 
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${source.active ? 'text-cyan-500' : 'text-brand-textMuted'}`} 
            />
            <span className="whitespace-nowrap">{source.label}</span>
          </button>
        ))}
      </div>
      
    </div>
  );
}
