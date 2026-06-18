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
import { Database, ShieldAlert, Sun, Moon } from 'lucide-react';
function App() {
  const [time, setTime] = useState<string>('');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'light'; // Default theme
  });

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
      <Sidebar />
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
      <main className="flex-1 p-6 flex flex-col gap-6 max-w-[1800px] mx-auto w-full">
        
        {/* Top Metrics Row */}
        <TopMetricsRow />

        <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-4 gap-6 w-full">
          {/* Column 1: Left Widgets (Hidden temporarily) */}
          {/* <div className="flex flex-col gap-6 lg:col-span-1 xl:col-span-3">
            <MetricsPanel />
            <LiveFeed />
          </div> */}

        {/* Column 2: Main Map Panel */}
        <div className="lg:col-span-3 xl:col-span-9 flex flex-col min-h-[500px]">
          <IndonesiaMap theme={theme} />
        </div>

        {/* Column 3: Right Widgets */}
        <div className="flex flex-col gap-6 lg:col-span-1 xl:col-span-3">
          <AiInsights />
          {/* <StatusCharts />
          <TopContributors />
          <ActionableItems /> */}
        </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="py-4 border-t border-brand-border/40 bg-brand-card/20 text-center text-[10px] text-brand-textMuted transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto px-6 flex justify-between items-center">
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
