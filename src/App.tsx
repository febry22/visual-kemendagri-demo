import { useState, useEffect } from 'react';
import { LiveFeed } from './components/LiveFeed';
import { MetricsPanel } from './components/MetricsPanel';
import { TopContributors } from './components/TopContributors';
import { NetworkGraph } from './components/NetworkGraph';
import { StatusCharts } from './components/StatusCharts';
import { ActionableItems } from './components/ActionableItems';
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
    <div className="min-h-screen bg-brand-bg flex flex-col font-sans transition-colors duration-300">
      
      {/* Premium Futuristic Header */}
      <header className="px-6 py-4 border-b border-brand-border/60 bg-brand-card/45 backdrop-blur-md sticky top-0 z-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Database className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-gray-300">
              DASHBOARD VISUALISASI KEMENDAGRI
            </h1>
            <p className="text-[10px] md:text-xs text-brand-textMuted font-medium tracking-wide">
              Sistem Analisis Interkoneksi & Indikator Kinerja Wilayah (Demo)
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
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-[1600px] mx-auto w-full">
        
        {/* Column 1: Left Widgets */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <LiveFeed />
          <MetricsPanel />
          <TopContributors />
        </div>

        {/* Column 2 & 3: Main Graph Panel */}
        <div className="lg:col-span-2 flex flex-col">
          <NetworkGraph theme={theme} />
        </div>

        {/* Column 4: Right Widgets */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <StatusCharts />
          <ActionableItems />
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
  );
}

export default App;
