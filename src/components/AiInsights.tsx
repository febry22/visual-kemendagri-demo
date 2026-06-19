import { BrainCircuit, Zap, Send } from 'lucide-react';

interface AiInsightsProps {
  activeProvince: string | null;
  userRole?: 'operator' | 'pimpinan';
}

export function AiInsights({ activeProvince, userRole = 'operator' }: AiInsightsProps) {
  const isProv = activeProvince !== null;
  const name = isProv ? activeProvince : 'Nasional';

  return (
    <div className="bg-brand-card/80 backdrop-blur-md border border-blue-500/30 rounded-2xl p-5 flex flex-col gap-4 shadow-lg shadow-blue-500/10 transition-colors h-full">
      <div className="flex items-center gap-3 mb-1">
        <BrainCircuit className="w-6 h-6 text-blue-500" />
        <div className="flex flex-col">
          <h3 className="font-bold text-brand-text tracking-wide uppercase text-sm">
            AI Insight & Rekomendasi
          </h3>
          <p className="text-[10px] text-brand-textMuted uppercase mt-0.5 font-semibold text-cyan-500">
            Analisis: {name}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <ul className="flex flex-col gap-3">
          {[
            isProv ? `Data ${name} menunjukkan korelasi kuat antara kemiskinan dan kapasitas fiskal.` : 'Provinsi prioritas menunjukkan korelasi antara kemiskinan, stunting, dan kapasitas fiskal.',
            isProv ? `Indeks SPBE di ${name} menunjukkan tren positif dibanding tahun lalu.` : 'Daerah dengan skor SPBE tinggi cenderung memiliki kualitas layanan publik lebih baik.',
            isProv ? `Perlu atensi khusus pada daerah padat penduduk di ${name}.` : 'Perlu intervensi terarah pada wilayah dengan TPT tinggi dan pertumbuhan ekonomi melambat.',
            'Replikasi inovasi daerah potensial pada sektor pelayanan publik dan digital governance.'
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <p className="text-sm text-brand-textMuted leading-relaxed font-medium">
                {item}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-4 border border-amber-500/50 bg-amber-500/10 rounded-xl p-4 flex gap-4">
          <div className="w-10 h-10 shrink-0 bg-amber-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.4)]">
            <Zap className="w-6 h-6 text-black fill-black" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-amber-500 font-bold text-sm tracking-wide mb-2 uppercase">
              Rekomendasi Cepat
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                isProv ? `Fokuskan dukungan pada kab/kota berisiko di ${name}` : 'Fokuskan dukungan pada daerah berisiko tinggi',
                'Dorong replikasi inovasi yang terbukti berhasil',
                'Lakukan monitoring berkala berbasis data real-time'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 shrink-0 bg-amber-400 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {i + 1}
                  </div>
                  <span className="text-xs text-brand-text font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
