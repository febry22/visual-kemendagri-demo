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

interface SidebarProps {
  mapColorDark?: string;
  setMapColorDark?: (c: string) => void;
  mapColorLight?: string;
  setMapColorLight?: (c: string) => void;
  userRole?: 'operator' | 'pimpinan';
  setUserRole?: (role: 'operator' | 'pimpinan') => void;
  setIsChatGptLoginOpen?: (open: boolean) => void;
}

export function Sidebar({ 
  mapColorDark = '#6366f1', 
  setMapColorDark, 
  mapColorLight = '#f97316', 
  setMapColorLight,
  userRole = 'operator',
  setUserRole,
  setIsChatGptLoginOpen
}: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
      <div className={`h-[88px] flex items-center border-b border-brand-border/60 shrink-0 ${isExpanded ? 'px-6' : 'px-0 justify-center'}`}>
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
            className={`group flex items-center gap-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left cursor-pointer ${
              isExpanded ? 'px-3 w-full' : 'px-0 w-10 h-10 justify-center'
            } ${
              item.active 
                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-sm' 
                : 'text-brand-textMuted hover:bg-brand-border/30 border border-transparent'
            }`}
          >
            <item.icon className={`w-5 h-5 shrink-0 transition-colors ${item.active ? 'text-blue-600 dark:text-blue-400' : 'text-brand-textMuted group-hover:text-blue-500'}`} />
            {isExpanded && <span className={`whitespace-nowrap transition-colors ${!item.active ? 'group-hover:text-brand-text' : ''}`}>{item.label}</span>}
          </button>
        ))}
      </div>

      {/* Bottom Area */}
      <div className={`p-4 border-t border-brand-border/40 flex flex-col gap-2 shrink-0 ${isExpanded ? '' : 'items-center px-2'}`}>
        <div className="relative flex justify-center w-full">
          <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            title={!isExpanded ? "Pengaturan" : undefined}
            className={`group flex items-center gap-3 py-2.5 rounded-lg text-sm font-medium text-brand-textMuted hover:bg-brand-border/30 border border-transparent transition-all text-left cursor-pointer ${
              isExpanded ? 'px-3 w-full' : 'px-0 w-10 h-10 justify-center'
            } ${isSettingsOpen ? 'bg-brand-border/30 text-brand-text' : ''}`}
          >
            <Settings className={`w-5 h-5 shrink-0 transition-all ${isSettingsOpen ? 'text-blue-500 rotate-90' : 'group-hover:text-blue-500'}`} />
            {isExpanded && <span className="whitespace-nowrap transition-colors">Pengaturan</span>}
          </button>
          
          {/* Settings Popover */}
          {isSettingsOpen && (
            <div className={`absolute bottom-full mb-2 left-0 w-56 bg-brand-card/95 backdrop-blur-xl border border-brand-border rounded-xl shadow-2xl p-4 z-50 animate-in slide-in-from-bottom-2 fade-in duration-200 ${!isExpanded ? 'left-14' : ''}`}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text mb-3">Pewarnaan Peta</h4>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-brand-textMuted font-medium">Dark Mode</span>
                  <input 
                    type="color" 
                    value={mapColorDark} 
                    onChange={(e) => setMapColorDark?.(e.target.value)}
                    className="w-7 h-7 rounded cursor-pointer border border-brand-border/80 bg-transparent p-0 cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-brand-textMuted font-medium">Light Mode</span>
                  <input 
                    type="color" 
                    value={mapColorLight} 
                    onChange={(e) => setMapColorLight?.(e.target.value)}
                    className="w-7 h-7 rounded cursor-pointer border border-brand-border/80 bg-transparent p-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <button 
          title={!isExpanded ? "Pusat Bantuan" : undefined}
          className={`group flex items-center gap-3 py-2.5 rounded-lg text-sm font-medium text-brand-textMuted hover:bg-brand-border/30 border border-transparent transition-all text-left cursor-pointer ${
            isExpanded ? 'px-3 w-full' : 'px-0 w-10 h-10 justify-center'
          }`}
        >
          <HelpCircle className="w-5 h-5 shrink-0 transition-colors group-hover:text-blue-500" />
          {isExpanded && <span className="whitespace-nowrap transition-colors group-hover:text-brand-text">Pusat Bantuan</span>}
        </button>

        {/* User Role Switch */}
        <div className={`mt-2 flex ${isExpanded ? 'items-center gap-1 w-full' : 'flex-col gap-1 w-10'} bg-brand-border/30 p-1 rounded-xl border border-brand-border/50 shrink-0`}>
          <button
            onClick={() => setUserRole?.('operator')}
            title={!isExpanded ? "Role: Operator" : undefined}
            className={`flex-1 flex justify-center py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              userRole === 'operator'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-brand-textMuted hover:text-brand-text'
            }`}
          >
            {isExpanded ? 'Operator' : 'OP'}
          </button>
          <button
            onClick={() => {
              setUserRole?.('pimpinan');
              setIsChatGptLoginOpen?.(true);
            }}
            title={!isExpanded ? "Role: Pimpinan" : undefined}
            className={`flex-1 flex justify-center py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              userRole === 'pimpinan'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'text-brand-textMuted hover:text-brand-text'
            }`}
          >
            {isExpanded ? 'Pimpinan' : 'PM'}
          </button>
        </div>
      </div>
    </aside>
  );
}
