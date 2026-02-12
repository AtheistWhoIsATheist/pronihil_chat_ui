import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Metrics } from '../types';

interface MetricsPanelProps {
  metrics: Metrics;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics }) => {
  const data = [
    { name: 'RIG', value: metrics.rigor, full: 'Rigor' },
    { name: 'PHE', value: metrics.phenomFidelity, full: 'Phenomenological Fidelity' },
    { name: 'HER', value: metrics.hermeneuticFidelity, full: 'Hermeneutic Fidelity' },
    { name: 'SYN', value: metrics.synthesisDiscipline, full: 'Synthesis Discipline' },
    { name: 'COU', value: metrics.existentialCourage, full: 'Existential Courage' },
    { name: 'EVI', value: metrics.evidenceDensity, full: 'Evidence Density' },
    { name: 'ANT', value: metrics.antiReification, full: 'Anti-Reification' },
    { name: 'APO', value: metrics.apophaticDiscipline, full: 'Apophatic Discipline' },
    { name: 'NOV', value: metrics.novelty, full: 'Novelty' },
    { name: 'COH', value: metrics.coherence, full: 'Coherence' },
  ];

  return (
    <div className="h-64 w-full bg-black/40 border border-purple-900/50 p-4 rounded-lg flex flex-col">
        <h3 className="text-xs text-cyan-400 font-bold mb-2 tracking-widest">EVALUATION LEDGER // METRICS</h3>
      <div className="flex-grow">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" stroke="#888" tick={{fontSize: 10}} />
          <YAxis stroke="#888" domain={[0, 1]} tick={{fontSize: 10}} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0a0a12', borderColor: '#7b1fa2' }} 
            itemStyle={{ color: '#00e5ff' }}
            cursor={{fill: '#ffffff10'}}
          />
          <Bar dataKey="value" fill="#7b1fa2" animationDuration={1000} />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricsPanel;
