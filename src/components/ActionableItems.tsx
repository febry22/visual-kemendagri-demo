import { useMemo } from 'react';
import { provincesData } from '../data/regionsData';
import { AlertCircle, ChevronRight } from 'lucide-react';

export const ActionableItems: React.FC = () => {
  const recommendations = useMemo(() => {
    // Sort provinces by national rank descending (worst performing first)
    const sorted = [...provincesData].sort((a, b) => b.rankNasional - a.rankNasional);
    
    // Take the top 5 lagging provinces
    const lagging = sorted.slice(0, 5);
    
    return lagging.map((p, idx) => {
      // Find the lowest score among the four indices
      const scores = [
        { name: 'IPM', val: p.skorIpm, label: 'Layanan Dasar & IPM' },
        { name: 'IKF', val: p.skorIkf, label: 'Ketimpangan Fiskal (IKF)' },
        { name: 'TIK', val: p.skorTik, label: 'Infrastruktur TIK' },
        { name: 'IDI', val: p.skorIdi, label: 'Demokrasi & Birokrasi (IDI)' }
      ];
      scores.sort((a, b) => a.val - b.val);
      const weakest = scores[0];

      let actionText = '';
      if (weakest.name === 'IPM') {
        actionText = 'Peningkatan Kualitas Pendidikan & Layanan Kesehatan Dasar';
      } else if (weakest.name === 'IKF') {
        actionText = 'Evaluasi Indeks Kemahalan & Efisiensi Distribusi Logistik';
      } else if (weakest.name === 'TIK') {
        actionText = 'Akselerasi Program Transformasi Digital Desa & Infrastruktur Jaringan';
      } else {
        actionText = 'Implementasi Reformasi Birokrasi & Transparansi Anggaran Publik';
      }

      return {
        id: `rec-${idx}-${p.no}`,
        province: p.name,
        action: actionText,
        metric: weakest.name
      };
    });
  }, []);

  return (
    <div className="glass-panel rounded-xl p-4 flex flex-col h-[280px]">
      <div className="flex items-center gap-2 mb-3 border-b border-brand-border pb-2">
        <AlertCircle className="w-4 h-4 text-orange-400" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-textMuted">
          Actionable Items: Rekomendasi
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="p-2.5 rounded bg-brand-bg/40 border border-brand-border/40 hover:border-brand-border hover:bg-brand-bg/60 transition-all flex items-center justify-between gap-3 cursor-pointer group"
          >
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wide block">
                [{item.province}]
              </span>
              <p className="text-[11px] font-medium text-gray-800 dark:text-gray-200 leading-tight group-hover:text-black dark:group-hover:text-white transition-colors">
                {item.action}
              </p>
              <span className="text-[9px] text-gray-500 dark:text-gray-400 block">
                Fokus Utama: Indikator {item.metric}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-600 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
