import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  ChevronRight, 
  Award, 
  Sparkles, 
  Film, 
  Maximize2,
  ArrowDown
} from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  currentLang: Language;
  theme: ThemeMode;
  onExploreClick: () => void;
  onOpenPdfBook: () => void;
  onContactClick: () => void;
  onSelectProject: (projectId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  theme,
  onExploreClick,
  onOpenPdfBook,
  onContactClick,
  onSelectProject,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTeaserIndex, setActiveTeaserIndex] = useState(0);

  const t = translations[currentLang];

  const featuredReelStills = [
    {
      id: 'ding-yuxi-versace-2025',
      title: 'Versace x Ding Yuxi',
      location: 'Milano Fashion Week 2025',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=90',
      tag: 'Scène Nocturne'
    },
    {
      id: 'w-christopher-doyle-gong-li-2024',
      title: 'Christopher Doyle x Gong Li',
      location: 'Cartier Fiction Short Paris',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=90',
      tag: 'Assistant Réalisateur'
    },
    {
      id: 'v-magazine-jolin-cai-2025',
      title: 'V Magazine x Jolin Cai',
      location: 'Paris Fashion Week 2025',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=90',
      tag: 'Interview & Mode'
    },
    {
      id: 'sophie-marceau-mafrance-2019-2022',
      title: 'Sophie Marceau & MaFrance',
      location: 'Opéra Garnier & Culture',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=90',
      tag: 'Réalisatrice'
    }
  ];

  return (
    <section 
      id="hero-section" 
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Dynamic Background Backdrop with Red Ambient Glow & Grain */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background Image Carousel for Cinematic Mood */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
          style={{
            backgroundImage: `url(${featuredReelStills[activeTeaserIndex].image})`,
            filter: 'brightness(0.35) contrast(1.15)'
          }}
        />

        {/* Dynamic Gradient Overlays matching PDF page 1 & 2 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-[#0c0d0e]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d0e]/95 via-[#0c0d0e]/70 to-[#ff3b1e]/20" />
        
        {/* Ambient Red/Orange Light Orbs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#ff3b1e]/25 blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-[#ff6b4a]/15 blur-[100px] pointer-events-none" />

        {/* Film grain effect */}
        <div className="absolute inset-0 film-grain-overlay opacity-30 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & Poetic Manifesto */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge matching PDF */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#ff3b1e] animate-ping" />
              <span>{t.hero.badge}</span>
              <span className="text-white/40">•</span>
              <span className="text-[#ff6b4a] font-semibold">www.cielisea.com</span>
            </div>

            {/* Main Bold Title */}
            <div className="space-y-1">
              <div className="flex items-baseline flex-wrap gap-x-3">
                <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.95]">
                  PORTFOLIO
                </h1>
                <span className="text-[#ff3b1e] font-script text-3xl sm:text-5xl font-bold tracking-normal transform -rotate-3 hover:rotate-0 transition-transform">
                  Liuchen Film
                </span>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <div className="h-0.5 w-12 bg-[#ff3b1e]"></div>
                <p className="text-sm sm:text-base font-mono tracking-widest text-[#ff6b4a] uppercase font-bold">
                  Liu Chen • 刘晨作品简介 2025
                </p>
              </div>
            </div>

            {/* Poetic Quote straight from PDF Page 2 */}
            <div className="relative pl-4 border-l-2 border-[#ff3b1e]/80 py-1 space-y-2 bg-gradient-to-r from-white/5 to-transparent pr-4 rounded-r-lg">
              <p className="text-sm sm:text-base text-neutral-200 font-serif-luxury italic leading-relaxed">
                "{t.hero.quote}"
              </p>
              <p className="text-xs text-neutral-400 font-sans-body">
                {t.hero.bioShort}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-explore-btn"
                onClick={onExploreClick}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff3b1e] text-white font-semibold text-sm hover:bg-[#e63216] transition-all shadow-xl shadow-[#ff3b1e]/30 hover:scale-105 active:scale-95 group"
              >
                <span>{t.hero.exploreBtn}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-pdf-book-btn"
                onClick={onOpenPdfBook}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 backdrop-blur-md transition-all hover:scale-105 group"
              >
                <BookOpen className="w-4 h-4 text-[#ff6b4a] group-hover:rotate-12 transition-transform" />
                <span>{t.hero.pdfBtn}</span>
              </button>

              <button
                id="hero-contact-btn"
                onClick={onContactClick}
                className="px-5 py-3 rounded-full bg-black/40 hover:bg-black/60 text-neutral-300 hover:text-white text-sm font-medium border border-white/10 transition-all"
              >
                {t.hero.contactBtn}
              </button>
            </div>

            {/* Key Statistics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              <div className="space-y-0.5">
                <span className="font-display font-black text-xl text-white block">
                  {t.hero.stats.experience}
                </span>
                <span className="text-[11px] text-neutral-400 block leading-tight">
                  {t.hero.stats.experienceLabel}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="font-display font-black text-xl text-[#ff6b4a] block">
                  {t.hero.stats.projects}
                </span>
                <span className="text-[11px] text-neutral-400 block leading-tight">
                  {t.hero.stats.projectsLabel}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="font-display font-black text-xl text-white block">
                  {t.hero.stats.clients}
                </span>
                <span className="text-[11px] text-neutral-400 block leading-tight">
                  {t.hero.stats.clientsLabel}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="font-display font-black text-xl text-[#ff6b4a] block">
                  {t.hero.stats.festivals}
                </span>
                <span className="text-[11px] text-neutral-400 block leading-tight">
                  {t.hero.stats.festivalsLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Cinema Teaser Player Screen */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-neutral-950/80 shadow-2xl shadow-black/80 group">
              
              {/* Top Viewfinder Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-black/70 border-b border-white/10 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-white font-semibold tracking-wider">REC • SHOWREEL</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>4K 24FPS</span>
                  <span className="text-neutral-500">|</span>
                  <span className="text-[#ff3b1e] font-mono">00:02:45:18</span>
                </div>
              </div>

              {/* Video Screen Area */}
              <div 
                className="relative aspect-[16/10] bg-cover bg-center cursor-pointer overflow-hidden"
                style={{
                  backgroundImage: `url(${featuredReelStills[activeTeaserIndex].image})`
                }}
                onClick={() => onSelectProject(featuredReelStills[activeTeaserIndex].id)}
              >
                {/* Visual Glitch/Grain & Viewfinder Crosshairs */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-4 border border-white/15 pointer-events-none flex items-center justify-center">
                  <div className="w-4 h-4 border-t border-l border-white/40 absolute top-0 left-0"></div>
                  <div className="w-4 h-4 border-t border-r border-white/40 absolute top-0 right-0"></div>
                  <div className="w-4 h-4 border-b border-l border-white/40 absolute bottom-0 left-0"></div>
                  <div className="w-4 h-4 border-b border-r border-white/40 absolute bottom-0 right-0"></div>
                  <div className="w-6 h-0.5 bg-white/30"></div>
                </div>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#ff3b1e]/90 text-white flex items-center justify-center shadow-lg shadow-[#ff3b1e]/50 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 ml-1" />
                  </div>
                </div>

                {/* Floating Bottom Project Tag */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/70 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {featuredReelStills[activeTeaserIndex].title}
                    </span>
                    <span className="text-[10px] text-neutral-300 block">
                      {featuredReelStills[activeTeaserIndex].location}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#ff3b1e] text-white">
                    {featuredReelStills[activeTeaserIndex].tag}
                  </span>
                </div>
              </div>

              {/* Teaser Reel Switcher Tabs */}
              <div className="grid grid-cols-4 gap-1 p-2 bg-neutral-900/90 border-t border-white/10">
                {featuredReelStills.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTeaserIndex(idx)}
                    className={`relative rounded-lg overflow-hidden aspect-[16/9] border transition-all ${
                      activeTeaserIndex === idx 
                        ? 'border-[#ff3b1e] ring-2 ring-[#ff3b1e]/30 scale-95' 
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <span className="absolute bottom-0.5 left-1 text-[9px] font-bold text-white truncate max-w-[90%]">
                      {idx + 1}. {item.title.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div 
        onClick={onExploreClick}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors animate-bounce"
      >
        <span className="text-[10px] uppercase font-mono tracking-widest">Scroll</span>
        <ArrowDown className="w-4 h-4 text-[#ff3b1e]" />
      </div>
    </section>
  );
};
