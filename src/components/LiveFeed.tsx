import React, { useEffect, useState } from 'react';
import { Radio } from 'lucide-react';

interface FeedItem {
  id: string;
  region: string;
  province: string;
  metric: string;
  change: string;
  isPositive: boolean;
  time: string;
}

export const LiveFeed: React.FC = () => {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);

  // Initial feed data from real provinces (representing historical updates)
  useEffect(() => {
    const initialItems: FeedItem[] = [
      {
        id: '1',
        region: 'BALI - NUSA TENGGARA',
        province: 'BALI',
        metric: 'IPM',
        change: '+0.2%',
        isPositive: true,
        time: '2 jam lalu'
      },
      {
        id: '2',
        region: 'JAWA',
        province: 'JAWA TIMUR',
        metric: 'Skor IKF',
        change: '-3.1%',
        isPositive: false,
        time: '4 jam lalu'
      },
      {
        id: '3',
        region: 'SUMATERA',
        province: 'DAERAH KHUSUS JAKARTA',
        metric: 'Skor IDI',
        change: '+1.5%',
        isPositive: true,
        time: '1 hari lalu'
      },
      {
        id: '4',
        region: 'SULAWESI',
        province: 'SULAWESI UTARA',
        metric: 'TIK',
        change: '+0.8%',
        isPositive: true,
        time: '2 hari lalu'
      }
    ];
    setFeeds(initialItems);
  }, []);

  return (
    <div className="glass-panel rounded-xl p-4 flex flex-col h-[280px]">
      <div className="flex items-center gap-2 mb-3 border-b border-brand-border pb-2">
        <Radio className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-textMuted">
          Log Pembaruan Terakhir
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {feeds.map((feed) => (
          <div
            key={feed.id}
            className="p-2.5 rounded bg-brand-bg/40 border border-brand-border/40 hover:border-brand-border transition-all flex items-start justify-between gap-2"
          >
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-blue-500 dark:text-blue-400 block tracking-wide">
                [{feed.region}]
              </span>
              <span className="text-[11px] font-medium text-gray-800 dark:text-gray-300 block leading-tight">
                {feed.province}
              </span>
              <p className="text-[11px] text-gray-600 dark:text-gray-400">
                {feed.isPositive ? 'Peningkatan' : 'Penurunan'} {feed.metric}{' '}
                <span className={feed.isPositive ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-rose-600 dark:text-rose-400 font-bold'}>
                  ({feed.change})
                </span>
              </p>
            </div>
            <span className="text-[9px] text-gray-555 dark:text-gray-500 whitespace-nowrap pt-0.5">
              {feed.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
