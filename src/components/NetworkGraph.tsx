import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { regionalsData } from '../data/regionsData';
import type { Province } from '../data/regionsData';
import { Filter, Layers, Zap } from 'lucide-react';

interface NetworkGraphProps {
  theme: 'dark' | 'light';
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'IPM' | 'IKF' | 'TIK' | 'IDI'>('ALL');

  useEffect(() => {
    if (!containerRef.current) return;

    const isLight = theme === 'light';
    const nodeBgColor = isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 22, 38, 0.85)';
    const labelColor = isLight ? '#0f172a' : '#ffffff';
    const indicatorColor = isLight ? '#475569' : '#94a3b8';
    const edgeOpacity = isLight ? 0.65 : 0.45;
    const highlightBg = isLight ? '#f1f5f9' : '#1e293b';

    // 1. Prepare Nodes and Edges
    const elements: cytoscape.ElementDefinition[] = [];

    // Center coordinates based on an assumed 700x550 canvas size
    const centerX = 350;
    const centerY = 270;

    // Regional Nodes (Inner ring)
    const regionalNodes = regionalsData.map((reg, idx) => {
      const angle = (idx / regionalsData.length) * 2 * Math.PI;
      const radius = 80;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      return {
        data: {
          id: `reg-${reg.name}`,
          label: `${reg.name} REGION`,
          type: 'regional',
          color: reg.name === 'JAWA' ? '#a855f7' : reg.name === 'SUMATERA' ? '#3b82f6' : reg.name === 'SULAWESI' ? '#10b981' : '#f59e0b'
        },
        position: { x, y }
      };
    });

    elements.push(...regionalNodes);

    // Selected Provinces (Middle ring)
    const selectedProvinces: Province[] = [];
    regionalsData.forEach(reg => {
      // Sort by rank and take top 2 provinces to avoid clutter
      const sorted = [...reg.provinces].sort((a, b) => a.rankNasional - b.rankNasional);
      selectedProvinces.push(...sorted.slice(0, 2));
    });

    const provinceNodes = selectedProvinces.map((prov, idx) => {
      const angle = (idx / selectedProvinces.length) * 2 * Math.PI;
      const radius = 180;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // Determine color based on national ranking
      let nodeColor = '#3b82f6'; // Average
      if (prov.rankNasional <= 10) nodeColor = '#10b981'; // Good
      if (prov.rankNasional > 25) nodeColor = '#ef4444'; // Lagging

      return {
        data: {
          id: `prov-${prov.name}`,
          label: prov.name,
          type: 'province',
          color: nodeColor,
          details: prov
        },
        position: { x, y }
      };
    });

    elements.push(...provinceNodes);

    // Connect Provinces to their Regionals
    selectedProvinces.forEach(prov => {
      let lineColor = '#64748b';
      if (prov.rankNasional <= 10) lineColor = '#10b981';
      else if (prov.rankNasional > 25) lineColor = '#ef4444';
      else lineColor = '#f59e0b';

      elements.push({
        data: {
          id: `edge-reg-${prov.name}`,
          source: `reg-${prov.regional}`,
          target: `prov-${prov.name}`,
          color: lineColor,
          type: 'reg-to-prov',
          weight: 2
        }
      });
    });

    // Outer indicators (Outer ring)
    const outerIndicators = ['IPM Index', 'IKF Index', 'TIK Index', 'IDI Index', 'Economic Growth', 'Gini Ratio', 'Gap Kemiskinan', 'OCG Ratio'];
    
    const indicatorNodes = outerIndicators.map((ind, idx) => {
      const angle = (idx / outerIndicators.length) * 2 * Math.PI;
      const radius = 260;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      return {
        data: {
          id: `ind-${ind}`,
          label: `[${ind.toUpperCase()}]`,
          type: 'indicator',
          color: isLight ? '#64748b' : '#475569'
        },
        position: { x, y }
      };
    });

    elements.push(...indicatorNodes);

    // Connect selected provinces to outer indicators
    selectedProvinces.forEach((prov) => {
      // Connect to 2 random indicators
      const randomInds = [...outerIndicators].sort(() => 0.5 - Math.random()).slice(0, 2);
      
      randomInds.forEach(ind => {
        let edgeColor = isLight ? '#cbd5e1' : '#1e293b';
        if (prov.rankNasional <= 10) edgeColor = isLight ? '#a7f3d0' : '#065f46';
        else if (prov.rankNasional > 25) edgeColor = isLight ? '#fecaca' : '#991b1b';
        else edgeColor = isLight ? '#fed7aa' : '#78350f';

        elements.push({
          data: {
            id: `edge-ind-${prov.name}-${ind}`,
            source: `prov-${prov.name}`,
            target: `ind-${ind}`,
            color: edgeColor,
            type: 'prov-to-ind',
            weight: 1
          }
        });
      });
    });

    // Interconnect regional nodes
    for (let i = 0; i < regionalNodes.length; i++) {
      const nextIdx = (i + 1) % regionalNodes.length;
      elements.push({
        data: {
          id: `edge-interreg-${i}`,
          source: regionalNodes[i].data.id,
          target: regionalNodes[nextIdx].data.id,
          color: isLight ? 'rgba(15, 23, 42, 0.15)' : 'rgba(59, 130, 246, 0.25)',
          type: 'interregional',
          weight: 1.5
        }
      });
    }

    // 2. Initialize Cytoscape
    const cy = cytoscape({
      container: containerRef.current,
      elements: elements,
      style: [
        {
          selector: 'node',
          style: {
            'content': 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'color': labelColor,
            'font-family': 'Outfit, Inter, sans-serif',
            'font-weight': 'bold',
            'font-size': '9px',
            'background-color': nodeBgColor,
            'border-width': '2px',
            'border-color': 'data(color)',
            'width': '38px',
            'height': '38px',
            'shape': 'ellipse',
            'transition-property': 'background-color border-color border-width width height font-size',
            'transition-duration': 0.2,
            'text-wrap': 'wrap',
            'text-max-width': '65px'
          }
        },
        {
          selector: 'node[type="regional"]',
          style: {
            'width': '60px',
            'height': '60px',
            'font-size': '8px',
            'border-width': '3px',
          }
        },
        {
          selector: 'node[type="indicator"]',
          style: {
            'width': '28px',
            'height': '28px',
            'font-size': '7.5px',
            'border-width': '1.5px',
            'border-color': isLight ? '#cbd5e1' : '#475569',
            'color': indicatorColor
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 'data(weight)',
            'line-color': 'data(color)',
            'curve-style': 'straight',
            'opacity': edgeOpacity,
            'transition-property': 'line-color width opacity',
            'transition-duration': 0.2
          }
        },
        {
          selector: 'edge[type="interregional"]',
          style: {
            'line-style': 'dashed',
            'opacity': isLight ? 0.35 : 0.25
          }
        },
        {
          selector: '.highlighted-node',
          style: {
            'background-color': highlightBg,
            'border-width': '4px',
            'width': '70px',
            'height': '70px',
            'font-size': '10px',
            'z-index': 9999
          }
        },
        {
          selector: '.dimmed',
          style: {
            'opacity': 0.15,
            'z-index': 0
          }
        },
        {
          selector: '.highlighted-edge',
          style: {
            'width': '4.5px',
            'opacity': 1,
            'z-index': 999
          }
        }
      ],
      layout: {
        name: 'preset',
        fit: true,
        padding: 30
      },
      userZoomingEnabled: false,
      userPanningEnabled: false,
      boxSelectionEnabled: false
    });

    cyRef.current = cy;

    // Trigger explicit sizing calculations
    cy.ready(() => {
      cy.resize();
      cy.fit();
    });

    // 3. Hover Interactions
    cy.on('mouseover', 'node', (evt) => {
      const node = evt.target;
      const type = node.data('type');

      if (type === 'province') {
        setSelectedNodeInfo(node.data('details'));
      } else {
        setSelectedNodeInfo({
          name: node.data('label'),
          type: node.data('type'),
          custom: true
        });
      }

      cy.elements().addClass('dimmed');
      
      node.removeClass('dimmed');
      node.addClass('highlighted-node');

      const connectedEdges = node.connectedEdges();
      connectedEdges.removeClass('dimmed');
      connectedEdges.addClass('highlighted-edge');

      const neighbors = node.neighborhood('node');
      neighbors.removeClass('dimmed');
    });

    cy.on('mouseout', 'node', (evt) => {
      const node = evt.target;
      cy.elements().removeClass('dimmed');
      node.removeClass('highlighted-node');
      
      const connectedEdges = node.connectedEdges();
      connectedEdges.removeClass('highlighted-edge');
      
      setSelectedNodeInfo(null);
    });

  }, [theme]);

  // Filter effect
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    if (activeFilter === 'ALL') {
      cy.nodes().removeClass('dimmed-filter');
      return;
    }

    cy.nodes().forEach(node => {
      const type = node.data('type');
      if (type === 'province') {
        const details = node.data('details') as Province;
        const scores = [
          { name: 'IPM', val: details.skorIpm },
          { name: 'IKF', val: details.skorIkf },
          { name: 'TIK', val: details.skorTik },
          { name: 'IDI', val: details.skorIdi }
        ];
        scores.sort((a, b) => b.val - a.val);
        
        if (scores[0].name === activeFilter) {
          node.removeClass('dimmed-filter');
        } else {
          node.addClass('dimmed-filter');
        }
      } else if (type === 'regional' || type === 'indicator') {
        // Keep them semi-visible
      }
    });

  }, [activeFilter]);

  return (
    <div className="flex flex-col flex-1 h-full min-h-[500px]">
      {/* Top Filter and Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 bg-brand-card/45 border border-brand-border/60 p-3 rounded-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" />
          <h2 className="text-sm font-bold tracking-wide text-gray-800 dark:text-gray-100">
            ALIRAN DATA & INTERKONEKSI WILAYAH
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-brand-textMuted mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter Utama:
          </span>
          {(['ALL', 'IPM', 'IKF', 'TIK', 'IDI'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-2.5 py-1 rounded font-bold uppercase transition-all text-[10px] cursor-pointer ${
                activeFilter === filter
                  ? 'bg-purple-600/80 text-white shadow-glow-purple border border-purple-500/50'
                  : 'bg-brand-bg/40 text-brand-textMuted border border-brand-border/40 hover:border-brand-border'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Graph Canvas area */}
      <div className="relative h-[550px] w-full bg-brand-bg/25 border border-brand-border/60 rounded-xl overflow-hidden map-bg">
        
        {/* Indonesian Map Outline Image overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center z-0">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/8/84/Indonesia_blank_map.svg" 
            alt="Peta Indonesia" 
            className="w-4/5 h-4/5 object-contain filter invert opacity-60"
            style={{ opacity: 'var(--map-opacity)' }}
          />
        </div>

        {/* Cytoscape Canvas Container */}
        <div ref={containerRef} className="w-full h-full z-10 relative" />

        {/* Floating Tooltip/Detail Panel when Hovering */}
        {selectedNodeInfo && (
          <div className="absolute bottom-4 left-4 z-20 glass-panel p-4 rounded-xl max-w-[280px] shadow-2xl border-purple-500/40 animate-fade-in">
            <div className="flex items-center gap-1.5 mb-2 border-b border-brand-border pb-1.5">
              <Zap className="w-4 h-4 text-purple-400" />
              <h4 className="text-xs font-bold text-gray-100 dark:text-gray-900 uppercase tracking-wide">
                {selectedNodeInfo.name}
              </h4>
            </div>
            
            {selectedNodeInfo.custom ? (
              <div className="text-[11px] text-brand-textMuted">
                Tipe: <span className="font-bold text-gray-300 dark:text-gray-700 capitalize">{selectedNodeInfo.type}</span>
                <p className="mt-1 text-gray-400 dark:text-gray-600">Hub data regional penampung indikator daerah.</p>
              </div>
            ) : (
              <div className="space-y-2 text-[11px]">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-300 dark:text-gray-700">
                  <span>IPM: <strong className="text-emerald-400 dark:text-emerald-600">{selectedNodeInfo.ipm}</strong></span>
                  <span>IKF: <strong className="text-orange-400 dark:text-orange-600">{selectedNodeInfo.ikf}</strong></span>
                  <span>TIK: <strong className="text-blue-400 dark:text-blue-600">{selectedNodeInfo.tik}</strong></span>
                  <span>IDI: <strong className="text-purple-400 dark:text-purple-600">{selectedNodeInfo.idi}</strong></span>
                </div>
                <div className="border-t border-brand-border/40 pt-1.5 flex justify-between text-[10px] text-brand-textMuted">
                  <span>Rank Nas: <strong className="text-gray-200 dark:text-gray-800">#{selectedNodeInfo.rankNasional}</strong></span>
                  <span>Avg Skor: <strong className="text-purple-300 dark:text-purple-700">{selectedNodeInfo.avgSkor.toFixed(1)}%</strong></span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Legend Overlay bottom right */}
        <div className="absolute bottom-4 right-4 z-20 bg-brand-card/85 border border-brand-border/40 p-2.5 rounded-lg text-[9px] space-y-1.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-0.5 bg-emerald-400 inline-block rounded" />
            <span className="text-gray-400 dark:text-gray-600">Responded Policy (Rank 1-10)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-0.5 bg-amber-400 inline-block rounded" />
            <span className="text-gray-400 dark:text-gray-600">Pending Policy Review (Rank 11-25)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-0.5 bg-rose-400 inline-block rounded" />
            <span className="text-gray-400 dark:text-gray-600">Critical Policy Gap (Rank &gt; 25)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
