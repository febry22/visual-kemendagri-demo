import { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { geoCentroid } from 'd3-geo';
import { ChevronLeft } from 'lucide-react';
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
  activeProvince: string | null;
  setActiveProvince: (province: string | null) => void;
}

export function IndonesiaMap({ theme, activeProvince, setActiveProvince }: IndonesiaMapProps) {
  const [tooltipContent, setTooltipContent] = useState('');
  const [position, setPosition] = useState({ coordinates: [117, -2] as [number, number], zoom: 1 });
  
  const data = useMemo(() => generateMockData(), []);

  // Scale for heatmap colors
  const colorScale = scaleLinear<string>()
    .domain([60, 85])
    .range(
      theme === 'dark' 
        ? ['#1e1b4b', '#6366f1'] // Dark theme: Deep Indigo to Bright Indigo
        : ['#ffedd5', '#f97316'] // Light theme: Light Orange to Orange
    );

  const handleProvinceClick = (geo: any) => {
    const provinceName = geo.properties.Propinsi || geo.properties.state || geo.properties.name || "Unknown";
    const centroid = geoCentroid(geo);
    
    // Zoom into the province
    setPosition({ coordinates: centroid as [number, number], zoom: 4 });
    setActiveProvince(provinceName);
  };

  const handleResetMap = () => {
    setPosition({ coordinates: [117, -2], zoom: 1 });
    setActiveProvince(null);
  };

  return (
    <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center bg-brand-card/40 backdrop-blur-sm border border-brand-border/50 rounded-2xl p-4 relative overflow-hidden">
      
      {/* Title & Breadcrumb */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none flex flex-col gap-2">
        <h2 className="text-xl font-bold drop-shadow-sm transition-colors">
          PETA PRIORITAS NASIONAL
        </h2>
        
        {activeProvince && (
          <div className="pointer-events-auto flex items-center gap-2 mt-1">
            <span className="text-xs font-semibold text-brand-textMuted bg-brand-card/80 px-2 py-1 rounded border border-brand-border/50">Nasional</span>
            <span className="text-brand-textMuted text-xs">/</span>
            <span className="text-xs font-bold text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/30">{activeProvince}</span>
            <button 
              onClick={handleResetMap}
              className="ml-2 flex items-center gap-1 text-[10px] bg-red-500/10 text-red-500 hover:bg-red-500/20 px-2 py-1 rounded border border-red-500/30 transition-colors"
            >
              <ChevronLeft className="w-3 h-3" /> Kembali
            </button>
          </div>
        )}
      </div>

      <div className="w-full h-full flex-1">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 950,
          }}
          width={800}
          height={400}
          className="w-full h-full outline-none"
        >
          <ZoomableGroup 
            center={position.coordinates} 
            zoom={position.zoom} 
            minZoom={1} 
            maxZoom={8}
            onMoveEnd={(newPos) => setPosition(newPos)}
          >
            <Geographies geography={geoData as any}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const provinceName = geo.properties.Propinsi || geo.properties.state || geo.properties.name || "Unknown";
                  const value = data[provinceName];
                  const isActive = activeProvince === provinceName;
                  const isMuted = activeProvince !== null && !isActive;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => handleProvinceClick(geo)}
                      onMouseEnter={() => {
                        setTooltipContent(`${provinceName} - Nilai: ${value}`);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent('');
                      }}
                      style={{
                        default: {
                          fill: value ? colorScale(value) : (theme === 'dark' ? '#334155' : '#e2e8f0'),
                          stroke: isActive ? '#06b6d4' : (theme === 'dark' ? '#0f172a' : '#ffffff'),
                          strokeWidth: isActive ? 1.5 : 0.5,
                          outline: 'none',
                          opacity: isMuted ? 0.3 : 1,
                          transition: 'all 250ms',
                        },
                        hover: {
                          fill: theme === 'dark' ? '#818cf8' : '#fb923c',
                          stroke: theme === 'dark' ? '#ffffff' : '#000000',
                          strokeWidth: 1.5,
                          outline: 'none',
                          cursor: 'pointer',
                          opacity: 1,
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
        <div className="absolute top-6 right-6 bg-gray-900/90 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold pointer-events-none border border-gray-700/50 backdrop-blur-md animate-in fade-in zoom-in duration-200 z-50">
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
