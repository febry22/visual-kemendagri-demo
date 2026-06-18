import { useState } from 'react';
import { 
  Home, 
  FileText, 
  BarChart3, 
  Users, 
  AlertTriangle, 
  Lightbulb, 
  BrainCircuit, 
  Radar, 
  ClipboardList, 
  Settings, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import logoKemendagri from '../assets/logo-kemendagri.png';

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { icon: Home, label: 'Beranda', active: true },
    { icon: FileText, label: 'Profil Daerah', active: false },
    { icon: BarChart3, label: 'Analitik Tematik', active: false },
    { icon: Users, label: 'Komparasi Daerah', active: false },
    { icon: AlertTriangle, label: 'Peringatan Dini', active: false },
    { icon: Lightbulb, label: 'Inovasi Daerah', active: false },
    { icon: BrainCircuit, label: 'Rekomendasi AI', active: false },
    { icon: Radar, label: 'Command Center', active: false },
    { icon: ClipboardList, label: 'Laporan Eksekutif', active: false },
  ];

  return (
    <aside 
      className={`${isExpanded ? 'w-64' : 'w-20'} bg-brand-card/60 backdrop-blur-md border-r border-brand-border/60 flex flex-col transition-all duration-300 hidden md:flex shrink-0 relative z-[60]`}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-4 top-6 w-8 h-8 flex items-center justify-center bg-white dark:bg-brand-card border border-brand-border/60 text-brand-textMuted hover:text-gray-800 dark:hover:text-gray-200 rounded-full z-10 transition-colors shadow-md cursor-pointer"
      >
        {isExpanded ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>

      {/* Logo Area */}
      <div className={`h-[73px] flex items-center border-b border-brand-border/60 shrink-0 ${isExpanded ? 'px-6' : 'px-0 justify-center'}`}>
        <div className="flex items-center gap-3">
          <img src={logoKemendagri} alt="Logo Kemendagri" className="w-8 h-8 object-contain shrink-0 drop-shadow-md" />
          {isExpanded && (
            <div className="flex flex-col overflow-hidden transition-colors">
              <span className="font-bold tracking-wide text-xs whitespace-nowrap">
                Kementerian Dalam Negeri
              </span>
              <span className="text-[10px] font-medium text-brand-textMuted whitespace-nowrap">
                Republik Indonesia
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Menu Area */}
      <div className={`flex-1 overflow-y-auto py-6 flex flex-col gap-2 ${isExpanded ? 'px-4' : 'px-2 items-center'}`}>
        {isExpanded && (
          <div className="text-[10px] uppercase font-bold text-brand-textMuted tracking-wider mb-2 px-2 whitespace-nowrap">
            Menu Navigasi
          </div>
        )}
        {menuItems.map((item, index) => (
          <button
            key={index}
            title={!isExpanded ? item.label : undefined}
            className={`flex items-center gap-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left cursor-pointer ${
              isExpanded ? 'px-3 w-full' : 'px-0 w-10 h-10 justify-center'
            } ${
              item.active 
                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-sm' 
                : 'text-brand-textMuted hover:bg-brand-border/30 hover:text-gray-800 dark:hover:text-gray-200 border border-transparent'
            }`}
          >
            <item.icon className={`w-5 h-5 shrink-0 ${item.active ? 'text-blue-600 dark:text-blue-400' : 'text-brand-textMuted'}`} />
            {isExpanded && <span className="whitespace-nowrap">{item.label}</span>}
          </button>
        ))}
      </div>

      {/* Bottom Area */}
      <div className={`p-4 border-t border-brand-border/40 flex flex-col gap-2 shrink-0 ${isExpanded ? '' : 'items-center px-2'}`}>
        <button 
          title={!isExpanded ? "Pengaturan" : undefined}
          className={`flex items-center gap-3 py-2.5 rounded-lg text-sm font-medium text-brand-textMuted hover:bg-brand-border/30 hover:text-gray-800 dark:hover:text-gray-200 transition-all text-left cursor-pointer ${
            isExpanded ? 'px-3 w-full' : 'px-0 w-10 h-10 justify-center'
          }`}
        >
          <Settings className="w-5 h-5 shrink-0" />
          {isExpanded && <span className="whitespace-nowrap">Pengaturan</span>}
        </button>
        <button 
          title={!isExpanded ? "Pusat Bantuan" : undefined}
          className={`flex items-center gap-3 py-2.5 rounded-lg text-sm font-medium text-brand-textMuted hover:bg-brand-border/30 hover:text-gray-800 dark:hover:text-gray-200 transition-all text-left cursor-pointer ${
            isExpanded ? 'px-3 w-full' : 'px-0 w-10 h-10 justify-center'
          }`}
        >
          <HelpCircle className="w-5 h-5 shrink-0" />
          {isExpanded && <span className="whitespace-nowrap">Pusat Bantuan</span>}
        </button>
      </div>
    </aside>
  );
}
