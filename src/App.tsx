import { useState, useEffect } from 'react';
// import { LiveFeed } from './components/LiveFeed';
// import { MetricsPanel } from './components/MetricsPanel';
// import { TopContributors } from './components/TopContributors';
import { IndonesiaMap } from './components/IndonesiaMap';
// import { StatusCharts } from './components/StatusCharts';
// import { ActionableItems } from './components/ActionableItems';
import { Sidebar } from './components/Sidebar';
import { TopMetricsRow } from './components/TopMetricsRow';
import { AiInsights } from './components/AiInsights';
import { BottomDashboardRow } from './components/BottomDashboardRow';
import { IntegratedDataFilter } from './components/IntegratedDataFilter';
import { Database, ShieldAlert, Sun, Moon, Calendar } from 'lucide-react';
function App() {
  const [time, setTime] = useState<string>('');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'light'; // Default theme
  });
  const [activeProvince, setActiveProvince] = useState<string | null>(null);
  const [mapColorDark, setMapColorDark] = useState<string>('#6366f1'); // Default dark
  const [mapColorLight, setMapColorLight] = useState<string>('#f97316'); // Default light
  const [timeRange, setTimeRange] = useState<string>('1M'); // Default 1 Month
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }) + 
        ' | ' + 
        now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update HTML root element class when theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-brand-bg flex font-sans transition-colors duration-300">
      <Sidebar 
        mapColorDark={mapColorDark} setMapColorDark={setMapColorDark} 
        mapColorLight={mapColorLight} setMapColorLight={setMapColorLight} 
      />
      <div className="flex-1 flex flex-col min-w-0">
      {/* Premium Futuristic Header */}
      <header className="px-6 py-4 md:py-0 md:h-[73px] border-b border-brand-border/60 bg-brand-card/45 backdrop-blur-md sticky top-0 z-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Database className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-black tracking-wider transition-colors uppercase">
              STRADA-AI BSKDN
            </h1>
            <p className="text-[10px] md:text-[11px] text-brand-textMuted font-semibold tracking-wide">
              Sistem Terpadu Rekomendasi Strategis Kebijakan Berbasis Artificial Intelligence
            </p>
            <p className="text-[9px] md:text-[10px] text-blue-600 dark:text-blue-400 font-medium tracking-wide mt-0.5">
              Dashboard Strategis untuk Mendukung Rekomendasi Kebijakan Dalam Negeri
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          {/* Theme Toggle Slider */}
          <div className="flex items-center gap-1.5 bg-brand-border/30 p-1 rounded-full border border-brand-border/50">
            <button
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-brand-textMuted hover:text-gray-700 dark:hover:text-gray-200'
              }`}
              title="Mode Terang"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'text-brand-textMuted hover:text-gray-700 dark:hover:text-gray-200'
              }`}
              title="Mode Gelap"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Status Indicator (Static) */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 text-[10px] font-bold tracking-wider uppercase select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            Database Terkoneksi
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-border/40 text-brand-textMuted border border-brand-border text-[10px] font-semibold tracking-wide">
            {time}
          </div>
        </div>
      </header>

      {/* Main Responsive Grid Layout */}
      <main className="flex-1 p-6 flex flex-col gap-6 w-full mx-auto">
        
        {/* Dashboard Header & Time Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 w-full relative z-[60]">
          <div>
            <h2 className="text-xl font-bold text-brand-text tracking-tight">Ringkasan Eksekutif</h2>
            <p className="text-xs text-brand-textMuted mt-1">Pantauan metrik utama secara real-time dan terintegrasi.</p>
          </div>
          
          <div className="flex items-center gap-1.5 bg-brand-card/60 backdrop-blur-sm p-1 rounded-lg border border-brand-border/60 shadow-sm w-fit">
            {['1D', '1W', '1M', '1Y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  timeRange === range
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-brand-textMuted hover:text-brand-text hover:bg-brand-border/30'
                }`}
              >
                {range}
              </button>
            ))}
            <div className="w-px h-5 bg-brand-border/60 mx-1"></div>
            
            <div className="relative">
              <button
                onClick={() => {
                  setTimeRange('custom');
                  setIsDatePickerOpen(!isDatePickerOpen);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  timeRange === 'custom' || isDatePickerOpen
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-brand-textMuted hover:text-brand-text hover:bg-brand-border/30'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Custom</span>
              </button>

              {/* Custom Date Range Picker Popover */}
              {isDatePickerOpen && (
                <div className="absolute top-full mt-2 right-0 w-72 bg-brand-card/95 backdrop-blur-xl border border-brand-border rounded-xl shadow-2xl p-4 z-[70] animate-in slide-in-from-top-2 fade-in duration-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text mb-3">Pilih Rentang Waktu</h4>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold text-brand-textMuted uppercase">Mulai Tanggal</label>
                      <input 
                        type="date" 
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="bg-brand-bg/50 border border-brand-border/80 text-brand-text text-xs rounded-lg px-3 py-2 outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold text-brand-textMuted uppercase">Sampai Tanggal</label>
                      <input 
                        type="date" 
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="bg-brand-bg/50 border border-brand-border/80 text-brand-text text-xs rounded-lg px-3 py-2 outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <button 
                      onClick={() => setIsDatePickerOpen(false)}
                      className="mt-2 w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-2 rounded-lg transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
                    >
                      Terapkan Filter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Metrics Row */}
        <TopMetricsRow activeProvince={activeProvince} timeRange={timeRange} />

        <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-4 gap-6 w-full">
          {/* Column 1: Left Widgets (Hidden temporarily) */}
          {/* <div className="flex flex-col gap-6 lg:col-span-1 xl:col-span-3">
            <MetricsPanel />
            <LiveFeed />
          </div> */}

        <div className="lg:col-span-3 xl:col-span-9 flex flex-col min-h-[500px]">
          <IndonesiaMap 
            theme={theme} 
            activeProvince={activeProvince} 
            setActiveProvince={setActiveProvince}
            mapColorDark={mapColorDark}
            mapColorLight={mapColorLight}
          />
        </div>

        {/* Column 3: Right Widgets */}
        <div className="flex flex-col gap-6 lg:col-span-1 xl:col-span-3">
          <AiInsights activeProvince={activeProvince} />
          {/* <StatusCharts />
          <TopContributors />
          <ActionableItems /> */}
        </div>
        </div>
        
        {/* Bottom Metrics Row */}
        <BottomDashboardRow activeProvince={activeProvince} />

        {/* Integrated Data Filter */}
        <IntegratedDataFilter />
      </main>

      {/* Bottom Footer */}
      <footer className="py-4 border-t border-brand-border/40 bg-brand-card/20 text-center text-[10px] text-brand-textMuted transition-colors duration-300">
        <div className="w-full mx-auto px-6 flex justify-between items-center">
          <span>Kementerian Dalam Negeri RI © 2026 - Demo Dashboard Interkoneksi Wilayah</span>
          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-500 font-semibold uppercase">
            <ShieldAlert className="w-3.5 h-3.5" />
            Tingkat Uji Coba / Demo Publik
          </div>
        </div>
      </footer>

    </div>
    </div>
  );
}

export default App;
