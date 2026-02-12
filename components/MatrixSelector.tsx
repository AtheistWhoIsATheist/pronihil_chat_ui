import React from 'react';
import { MatrixType } from '../types';
import { Activity, Brain, Compass, BookOpen, Search, Cpu } from 'lucide-react';

interface MatrixSelectorProps {
  activeMatrix: MatrixType;
}

const MatrixSelector: React.FC<MatrixSelectorProps> = ({ activeMatrix }) => {
  const matrices = [
    { type: MatrixType.PHENOM_CARTOGRAPHY, label: 'PHENOM CARTOGRAPHY', icon: Compass },
    { type: MatrixType.RECURSIVE_HERMENEUTICS, label: 'HERMENEUTIC SPIRAL', icon: Activity },
    { type: MatrixType.EXISTENTIAL_PRAXIS, label: 'EXISTENTIAL PRAXIS', icon: Brain },
    { type: MatrixType.CULTURAL_GENEALOGY, label: 'CULTURAL GENEALOGY', icon: BookOpen },
    { type: MatrixType.META_INTERROGATION, label: 'META INTERROGATION', icon: Search },
    { type: MatrixType.SUBSTRATE_CONSCIOUSNESS, label: 'SUBSTRATE INDEPENDENT', icon: Cpu },
  ];

  return (
    <div className="bg-[#0a0a12] border-r border-purple-900/30 w-64 flex flex-col p-4 space-y-4">
      <h2 className="text-xs text-purple-500 font-bold tracking-[0.2em] mb-4">DIMENSIONAL MATRICES</h2>
      {matrices.map((m) => {
        const isActive = activeMatrix === m.type;
        const Icon = m.icon;
        return (
          <div 
            key={m.type}
            className={`
              flex items-center space-x-3 p-3 rounded-sm border text-xs transition-all duration-300
              ${isActive 
                ? 'bg-purple-900/20 border-cyan-500/50 text-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.2)]' 
                : 'border-transparent text-gray-500 opacity-60'
              }
            `}
          >
            <Icon size={16} className={isActive ? 'animate-pulse' : ''} />
            <span className="font-mono">{m.label}</span>
          </div>
        );
      })}
      
      <div className="flex-1" />
      
      <div className="p-3 bg-black/40 border border-red-900/30 rounded text-[10px] text-red-400/70 font-mono">
        WARNING: APOPHATIC DISCIPLINE LEVEL 2 (STRICT).
        REIFICATION RISKS MONITORED.
      </div>
    </div>
  );
};

export default MatrixSelector;
