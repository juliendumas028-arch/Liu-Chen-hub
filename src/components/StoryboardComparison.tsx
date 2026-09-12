import React, { useState } from 'react';
import { Sliders, Eye, Sparkles, SplitSquareVertical } from 'lucide-react';

interface StoryboardComparisonProps {
  storyboardUrl: string;
  actualShotUrl: string;
  title: string;
}

export const StoryboardComparison: React.FC<StoryboardComparisonProps> = ({
  storyboardUrl,
  actualShotUrl,
  title,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');

  return (
    <div className="rounded-2xl overflow-hidden border border-white/15 bg-neutral-950 p-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff3b1e] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Étude de Réalisation • Storyboard Aquarelle vs Prise de Vue</span>
          </div>
          <h4 className="font-display font-bold text-sm sm:text-base text-white">
            {title}
          </h4>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setViewMode('slider')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'slider' 
                ? 'bg-[#ff3b1e] text-white font-bold' 
                : 'bg-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            Curseur Comparatif
          </button>
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'side-by-side' 
                ? 'bg-[#ff3b1e] text-white font-bold' 
                : 'bg-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            Côte à Côte
          </button>
        </div>
      </div>

      {viewMode === 'slider' ? (
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden select-none cursor-ew-resize border border-white/20">
          
          {/* Background: Actual Film Shot */}
          <img 
            src={actualShotUrl} 
            alt="Film Frame"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[11px] font-mono text-white z-10">
            Prise de Vue Réelle (Gong Li)
          </span>

          {/* Foreground: Storyboard Watercolor Cropped */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src={storyboardUrl} 
              alt="Storyboard Watercolor"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: '100%', height: '100%' }}
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-[#ff3b1e]/90 text-[11px] font-mono text-white z-10">
              Storyboard Aquarelle (Liu Chen)
            </span>
          </div>

          {/* Slider Line & Handle */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-2xl border-2 border-[#ff3b1e]">
              <SplitSquareVertical className="w-4 h-4 text-[#ff3b1e]" />
            </div>
          </div>

          {/* Range input for mobile drag accessibility */}
          <input 
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-[#ff3b1e] font-bold block">
              1. Storyboard Original (Aquarelle Bleue)
            </span>
            <div className="aspect-[16/9] rounded-xl overflow-hidden border border-white/10 bg-neutral-900">
              <img src={storyboardUrl} alt="Storyboard" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-mono text-neutral-300 font-bold block">
              2. Plan Cinéma Tourné (Christopher Doyle & Gong Li)
            </span>
            <div className="aspect-[16/9] rounded-xl overflow-hidden border border-white/10 bg-neutral-900">
              <img src={actualShotUrl} alt="Actual Shot" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-neutral-400 italic">
        * Déplacez le curseur pour explorer la précision de composition entre le découpage graphique original et le rendu caméra final.
      </p>
    </div>
  );
};
