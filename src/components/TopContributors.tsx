
import { provincesData } from '../data/regionsData';
import { BarChart3 } from 'lucide-react';

export const TopContributors: React.FC = () => {
  // Calculate average scores for each of the 4 indicators
  const count = provincesData.length;
  
  const avgSkorIpm = provincesData.reduce((sum, p) => sum + p.skorIpm, 0) / count;
  const avgSkorIkf = provincesData.reduce((sum, p) => sum + p.skorIkf, 0) / count;
  const avgSkorTik = provincesData.reduce((sum, p) => sum + p.skorTik, 0) / count;
  const avgSkorIdi = provincesData.reduce((sum, p) => sum + p.skorIdi, 0) / count;

  const indices = [
    { name: 'INDEKS DEMOKRASI (IDI)', score: avgSkorIdi, color: 'bg-purple-500 shadow-glow-purple', text: 'text-purple-400' },
    { name: 'INDEKS PEMBANGUNAN MANUSIA (IPM)', score: avgSkorIpm, color: 'bg-emerald-500 shadow-glow-green', text: 'text-emerald-400' },
    { name: 'TEKNOLOGI INFORMASI & KOMUNIKASI (TIK)', score: avgSkorTik, color: 'bg-blue-500 shadow-glow-blue', text: 'text-blue-400' },
    { name: 'INDEKS KEMAHALAN KONSTRUKSI (IKF)', score: avgSkorIkf, color: 'bg-orange-500 shadow-glow-orange', text: 'text-orange-400' },
  ];

  // Sort them by score desc
  indices.sort((a, b) => b.score - a.score);

  return (
    <div className="glass-panel rounded-xl p-4 flex flex-col h-[280px]">
      <div className="flex items-center gap-2 mb-3 border-b border-brand-border pb-2">
        <BarChart3 className="w-4 h-4 text-purple-400" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-textMuted">
          Top Kontributor Indeks (Nasional)
        </h3>
      </div>
      <div className="flex-1 flex flex-col justify-around">
        {indices.map((ind, idx) => (
          <div key={ind.name} className="space-y-1.5">
            <div className="flex justify-between items-center text-[11px]">
              <span className="font-semibold text-gray-800 dark:text-gray-300 flex items-center gap-1.5">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center bg-brand-border text-[9px] font-bold text-gray-500 dark:text-gray-400`}>
                  {idx + 1}
                </span>
                {ind.name}
              </span>
              <span className={`font-bold ${ind.text}`}>{ind.score.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-brand-bg h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${ind.color}`}
                style={{ width: `${ind.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
