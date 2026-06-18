import { useState } from 'react';
import { LayoutDashboard, Users, Map, Settings, HelpCircle, FileText, Database, ChevronLeft, ChevronRight } from 'lucide-react';

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard Utama', active: true },
    { icon: Map, label: 'Peta Interkoneksi', active: false },
    { icon: Database, label: 'Data Indikator', active: false },
    { icon: Users, label: 'Demografi & Sosial', active: false },
    { icon: FileText, label: 'Laporan Wilayah', active: false },
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
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          {isExpanded && (
            <span className="font-bold tracking-wide text-lg whitespace-nowrap overflow-hidden transition-colors">
              KEMENDAGRI
            </span>
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
