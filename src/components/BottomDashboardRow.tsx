import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  BarChart, Bar,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell
} from 'recharts';
import { AlertTriangle, Server, PieChart as PieIcon, Target, Users } from 'lucide-react';

const trenData = [
  { name: 'Des 2024', kemiskinan: 7.5, stunting: 52, tpt: 20, ipm: 78 },
  { name: 'Jan 2025', kemiskinan: 7.2, stunting: 50, tpt: 19, ipm: 78.5 },
  { name: 'Feb 2025', kemiskinan: 7.0, stunting: 48, tpt: 18, ipm: 79 },
  { name: 'Mar 2025', kemiskinan: 6.8, stunting: 46, tpt: 17, ipm: 79.5 },
  { name: 'Apr 2025', kemiskinan: 6.6, stunting: 44, tpt: 16, ipm: 80 },
  { name: 'Mei 2025', kemiskinan: 6.5, stunting: 43, tpt: 15, ipm: 80.2 },
];

const perbandinganData = [
  { name: 'DKI Jakarta', ipm: 82, spbe: 58, fiskal: 70 },
  { name: 'Jawa Barat', ipm: 75, spbe: 52, fiskal: 68 },
  { name: 'Jawa Tengah', ipm: 73, spbe: 48, fiskal: 65 },
  { name: 'DI Yogyakarta', ipm: 80, spbe: 60, fiskal: 62 },
  { name: 'Jawa Timur', ipm: 74, spbe: 50, fiskal: 66 },
  { name: 'Sulawesi Selatan', ipm: 72, spbe: 45, fiskal: 60 },
];

const profilData = [
  { subject: 'Kemiskinan', A: 80, B: 60, fullMark: 100 },
  { subject: 'Stunting', A: 90, B: 70, fullMark: 100 },
  { subject: 'TPT', A: 75, B: 85, fullMark: 100 },
  { subject: 'IPM', A: 85, B: 75, fullMark: 100 },
  { subject: 'SPBE', A: 70, B: 60, fullMark: 100 },
  { subject: 'Kinerja Fiskal', A: 65, B: 55, fullMark: 100 },
];

const inovasiData = [
  { name: 'Replikasi Nasional', value: 147, color: '#22c55e' },
  { name: 'Proses Replikasi', value: 186, color: '#3b82f6' },
  { name: 'Dalam Inovasi', value: 143, color: '#eab308' },
  { name: 'Belum Dilaporkan', value: 66, color: '#ef4444' },
];

interface BottomDashboardRowProps {
  activeProvince: string | null;
}

export function BottomDashboardRow({ activeProvince }: BottomDashboardRowProps) {
  const isProv = activeProvince !== null;
  const name = isProv ? activeProvince : 'Nasional';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      {/* 1. TREN INDIKATOR STRATEGIS */}
      <div className="lg:col-span-3 bg-brand-card/60 backdrop-blur-md border border-brand-border/60 rounded-2xl p-4 flex flex-col shadow-lg shadow-black/5 transition-colors">
        <h3 className="text-xs font-bold text-center uppercase tracking-widest text-brand-textMuted mb-4">Tren Indikator Strategis <span className="text-cyan-500 font-bold ml-1">{isProv ? `(${name})` : ''}</span></h3>
        <div className="flex-1 min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trenData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <RechartsTooltip contentStyle={{ backgroundColor: 'var(--card-color)', borderColor: 'var(--border-color)', fontSize: '11px', color: 'var(--text-color)', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '9px', marginTop: '10px' }} iconType="circle" iconSize={6} />
              <Line type="monotone" dataKey="kemiskinan" name="Kemiskinan (%)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, strokeWidth: 0 }} />
              <Line type="monotone" dataKey="stunting" name="Stunting (%)" stroke="#10b981" strokeWidth={2} dot={{ r: 3, strokeWidth: 0 }} />
              <Line type="monotone" dataKey="tpt" name="TPT (%)" stroke="#eab308" strokeWidth={2} dot={{ r: 3, strokeWidth: 0 }} />
              <Line type="monotone" dataKey="ipm" name="IPM" stroke="#ef4444" strokeWidth={2} dot={{ r: 3, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. PERBANDINGAN ANTAR DAERAH */}
      <div className="lg:col-span-3 bg-brand-card/60 backdrop-blur-md border border-brand-border/60 rounded-2xl p-4 flex flex-col shadow-lg shadow-black/5 transition-colors">
        <h3 className="text-xs font-bold text-center uppercase tracking-widest text-brand-textMuted mb-4">Perbandingan Antar Daerah</h3>
        <div className="flex-1 min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={perbandinganData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 8, fill: '#64748b' }} axisLine={false} tickLine={false} interval={0} angle={-25} textAnchor="end" height={40} />
              <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <RechartsTooltip cursor={{ fill: 'rgba(100,116,139,0.1)' }} contentStyle={{ backgroundColor: 'var(--card-color)', borderColor: 'var(--border-color)', fontSize: '11px', color: 'var(--text-color)', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '9px', marginTop: '-10px' }} iconType="square" iconSize={8} />
              <Bar dataKey="ipm" name="IPM" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={8} />
              <Bar dataKey="spbe" name="SPBE" fill="#10b981" radius={[2, 2, 0, 0]} barSize={8} />
              <Bar dataKey="fiskal" name="Kinerja Fiskal (%)" fill="#eab308" radius={[2, 2, 0, 0]} barSize={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. PROFIL KINERJA DAERAH */}
      <div className="lg:col-span-2 bg-brand-card/60 backdrop-blur-md border border-brand-border/60 rounded-2xl p-4 flex flex-col shadow-lg shadow-black/5 transition-colors">
        <h3 className="text-xs font-bold text-center uppercase tracking-widest text-brand-textMuted mb-0">Profil Kinerja Daerah</h3>
        <div className="flex-1 min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={profilData}>
              <PolarGrid stroke="#64748b" strokeOpacity={0.4} />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 8 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <RechartsTooltip contentStyle={{ backgroundColor: 'var(--card-color)', borderColor: 'var(--border-color)', fontSize: '11px', color: 'var(--text-color)', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '9px' }} iconType="circle" iconSize={6} />
              <Radar name="Daerah Anda" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
              <Radar name="Rata-rata Provinsi" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. STATUS INOVASI DAERAH */}
      <div className="lg:col-span-2 bg-brand-card/60 backdrop-blur-md border border-brand-border/60 rounded-2xl p-4 flex flex-col shadow-lg shadow-black/5 transition-colors">
        <h3 className="text-xs font-bold text-center uppercase tracking-widest text-brand-textMuted mb-2">Status Inovasi Daerah</h3>
        <div className="flex-1 min-h-[220px] flex items-center">
          <div className="w-[50%] h-full min-h-[200px] relative flex flex-col justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inovasiData}
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="85%"
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {inovasiData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: 'var(--card-color)', borderColor: 'var(--border-color)', fontSize: '11px', color: 'var(--text-color)', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mt-0">
              <span className="block text-[8px] text-brand-textMuted font-semibold">Total</span>
              <span className="block text-xl font-black text-brand-text leading-tight">542</span>
              <span className="block text-[8px] text-brand-textMuted">Inovasi</span>
            </div>
          </div>
          
          <div className="w-[50%] flex flex-col gap-2.5 justify-center pr-1">
            {inovasiData.map((entry, idx) => (
              <div key={idx} className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="text-[10px] text-brand-textMuted font-medium truncate">{entry.name}</span>
                </div>
                <div className="pl-4 text-[11px] font-bold text-brand-text">
                  {entry.value} <span className="text-[9px] font-normal text-brand-textMuted">({((entry.value/542)*100).toFixed(1)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. ALERTS & FEATURES */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        {/* Early Warning */}
        <div className="flex-1 bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex flex-col shadow-lg transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h3 className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Early Warning Alert</h3>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="p-1 rounded bg-red-500/20 shrink-0"><Users className="w-3 h-3 text-red-500" /></div>
                <span className="text-[9px] text-brand-text font-medium truncate">Kemiskinan ekstrem meningkat</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                <span className="text-[8px] text-red-500 font-bold uppercase">Tinggi</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="p-1 rounded bg-red-500/20 shrink-0"><Target className="w-3 h-3 text-red-500" /></div>
                <span className="text-[9px] text-brand-text font-medium truncate">Stunting di atas target</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                <span className="text-[8px] text-red-500 font-bold uppercase">Tinggi</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="p-1 rounded bg-amber-500/20 shrink-0"><PieIcon className="w-3 h-3 text-amber-500" /></div>
                <span className="text-[9px] text-brand-text font-medium truncate">Belanja pegawai terlalu tinggi</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_5px_rgba(251,191,36,0.8)]" />
                <span className="text-[8px] text-amber-500 font-bold uppercase">Sedang</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fitur Utama */}
        <div className="flex-1 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-4 flex flex-col shadow-lg transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <Server className="w-4 h-4 text-cyan-600" />
            <h3 className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest">Fitur Utama</h3>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-2.5">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-cyan-500" />
              <span className="text-[8px] text-brand-text font-medium whitespace-nowrap">Ringkasan AI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-cyan-500" />
              <span className="text-[8px] text-brand-text font-medium whitespace-nowrap">Monitoring Real-Time</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-cyan-500" />
              <span className="text-[8px] text-brand-text font-medium whitespace-nowrap">Komparasi Daerah</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-cyan-500" />
              <span className="text-[8px] text-brand-text font-medium whitespace-nowrap">Executive Summary</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-cyan-500" />
              <span className="text-[8px] text-brand-text font-medium whitespace-nowrap">Outlier Alert</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-cyan-500" />
              <span className="text-[8px] text-brand-text font-medium whitespace-nowrap">Command Center</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
