import { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import geoData from '../data/indonesia.json';

// Generate mock data for provinces to create a heatmap effect
const generateMockData = () => {
  const data: Record<string, number> = {};
  if (geoData && geoData.features) {
    geoData.features.forEach((feature: any) => {
      const provinceName = feature.properties.Propinsi || feature.properties.state || feature.properties.name || "Unknown";
      // Random value between 60 and 85 (simulating IPM)
      data[provinceName] = Math.floor(Math.random() * 25) + 60;
    });
  }
  return data;
};

interface IndonesiaMapProps {
  theme: 'dark' | 'light';
}

export function IndonesiaMap({ theme }: IndonesiaMapProps) {
  const [tooltipContent, setTooltipContent] = useState('');
  
  const data = useMemo(() => generateMockData(), []);

  // Scale for heatmap colors (from light blue/amber to dark blue/amber depending on theme)
  const colorScale = scaleLinear<string>()
    .domain([60, 85])
    .range(
      theme === 'dark' 
        ? ['#1e1b4b', '#6366f1'] // Dark theme: Deep Indigo to Bright Indigo
        : ['#ffedd5', '#f97316'] // Light theme: Light Orange to Orange
    );

  return (
    <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center bg-brand-card/40 backdrop-blur-sm border border-brand-border/50 rounded-2xl p-4 relative overflow-hidden">
      
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h2 className="text-xl font-bold drop-shadow-sm transition-colors">
          PETA PRIORITAS NASIONAL
        </h2>
      </div>

      <div className="w-full h-full flex-1">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 950,
            center: [117, -2], // Centered on Indonesia
          }}
          width={800}
          height={400}
          className="w-full h-full outline-none"
        >
          <ZoomableGroup center={[117, -2]} zoom={1} minZoom={1} maxZoom={4}>
            <Geographies geography={geoData as any}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const provinceName = geo.properties.Propinsi || geo.properties.state || geo.properties.name || "Unknown";
                  const value = data[provinceName];
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltipContent(`${provinceName} - Nilai: ${value}`);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent('');
                      }}
                      style={{
                        default: {
                          fill: value ? colorScale(value) : (theme === 'dark' ? '#334155' : '#e2e8f0'),
                          stroke: theme === 'dark' ? '#0f172a' : '#ffffff',
                          strokeWidth: 0.5,
                          outline: 'none',
                          transition: 'all 250ms',
                        },
                        hover: {
                          fill: theme === 'dark' ? '#818cf8' : '#fb923c',
                          stroke: theme === 'dark' ? '#ffffff' : '#000000',
                          strokeWidth: 1.5,
                          outline: 'none',
                          cursor: 'pointer',
                          transition: 'all 250ms',
                        },
                        pressed: {
                          fill: theme === 'dark' ? '#4f46e5' : '#f97316',
                          outline: 'none',
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {tooltipContent && (
        <div className="absolute top-6 right-6 bg-gray-900/90 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold pointer-events-none border border-gray-700/50 backdrop-blur-md animate-in fade-in zoom-in duration-200">
          {tooltipContent}
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 bg-brand-card/80 p-4 rounded-xl border border-brand-border/60 shadow-lg backdrop-blur-md">
        <div className="text-xs font-bold text-brand-textMuted text-center uppercase tracking-wider">Nilai Indikator</div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-brand-textMuted">Rendah</span>
          <div className="w-32 h-3 rounded-full shadow-inner" style={{
            background: `linear-gradient(to right, ${colorScale(60)}, ${colorScale(85)})`
          }}></div>
          <span className="text-xs font-semibold text-brand-textMuted">Tinggi</span>
        </div>
      </div>

    </div>
  );
}
