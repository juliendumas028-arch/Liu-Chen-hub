import React from 'react';
import { 
  Award, 
  GraduationCap, 
  Film, 
  Sparkles, 
  Tv, 
  Camera, 
  Scissors, 
  Languages, 
  Compass, 
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { clientLogos } from '../data/projectsData';
import { Language, ThemeMode } from '../types';
import { translations } from '../data/translations';

interface AboutSectionProps {
  currentLang: Language;
  theme: ThemeMode;
  onOpenPdfBook: () => void;
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  currentLang,
  theme,
  onOpenPdfBook,
  onContactClick,
}) => {
  const t = translations[currentLang];

  return (
    <section 
      id="about-section"
      className={`py-20 border-t transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-[#0f1114] border-white/10 text-white' 
          : 'bg-[#f4f3ef] border-black/10 text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header with Bilingual Title matching PDF page 3 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#ff3b1e] text-xs font-mono tracking-widest uppercase mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>MASTER ENS CINÉMA • 14 ANS EN FRANCE</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight flex items-baseline gap-3">
              <span>{t.about.title}</span>
              <span className="text-xl sm:text-2xl text-neutral-400 font-sans-body font-normal">
                {currentLang === 'fr' ? '• Profil & Bio' : '• 关于我'}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPdfBook}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#ff3b1e]/15 border border-[#ff3b1e]/30 text-[#ff3b1e] hover:bg-[#ff3b1e] hover:text-white transition-all shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Voir Page 3 du Book</span>
            </button>
          </div>
        </div>

        {/* Profile Bio Card with ENS credentials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Filmmaker Portrait & Signature */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/15 bg-neutral-950 shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85" 
                alt="Liu Chen Filmmaker"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Vignette & Bottom Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="text-[#ff3b1e] font-script text-3xl sm:text-4xl font-bold block -rotate-2">
                  Liuchen Film
                </span>
                <p className="text-xs text-neutral-300 font-mono">
                  1988年出生于西安 • 常驻巴黎 • 旅法14年
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#ff3b1e] text-white">
                    ENS Master Cinéma
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/20 text-white backdrop-blur-md">
                    Paris / Worldwide
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Full Narrative & Master Credentials */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#ff3b1e] font-bold tracking-wider uppercase">
                {t.about.introRole}
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl">
                Liu Chen (刘晨)
              </h3>
              <p className="text-sm sm:text-base font-semibold text-[#ff6b4a]">
                {t.about.degrees}
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans-body">
              <p className="border-l-2 border-[#ff3b1e] pl-4 italic text-neutral-200">
                "{t.hero.quote}"
              </p>
              <p>{t.about.bio1}</p>
              <p>{t.about.bio2}</p>
            </div>

            {/* Trilingual Mastery & Production Assets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-neutral-900/60 border-white/10' : 'bg-white border-neutral-200'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                  <Languages className="w-4 h-4 text-[#ff3b1e]" />
                  <span>Trilingue Français / 中文 / English</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Idéal pour la coordination de plateaux internationaux, traductions de scénarios et relations presse.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-neutral-900/60 border-white/10' : 'bg-white border-neutral-200'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                  <Camera className="w-4 h-4 text-[#ff3b1e]" />
                  <span>Production 4K & Drone Homologué</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Prises de vues au sol et aériennes à Paris et en Europe avec autorisations préfectorales.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Professional Pillar Cards matching Page 3 of PDF */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-mono text-[#ff3b1e] uppercase tracking-widest font-bold">
              DOMAINES D'EXPERTISE
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase">
              {currentLang === 'cn' ? '四大核心业务板块' : '4 Domaines d\'Intervention'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Brand Commercials */}
            <div className={`p-6 rounded-2xl border space-y-3 transition-all hover:border-[#ff3b1e]/50 ${
              theme === 'dark' ? 'bg-neutral-900/70 border-white/10' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-3 text-[#ff3b1e]">
                <div className="p-2.5 rounded-xl bg-[#ff3b1e]/15">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  {t.about.pillars.brand.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {t.about.pillars.brand.desc}
              </p>
            </div>

            {/* 2. Fashion & Beauty */}
            <div className={`p-6 rounded-2xl border space-y-3 transition-all hover:border-[#ff3b1e]/50 ${
              theme === 'dark' ? 'bg-neutral-900/70 border-white/10' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-3 text-[#ff3b1e]">
                <div className="p-2.5 rounded-xl bg-[#ff3b1e]/15">
                  <Camera className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  {t.about.pillars.fashion.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {t.about.pillars.fashion.desc}
              </p>
            </div>

            {/* 3. Cinema & Fiction */}
            <div className={`p-6 rounded-2xl border space-y-3 transition-all hover:border-[#ff3b1e]/50 ${
              theme === 'dark' ? 'bg-neutral-900/70 border-white/10' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-3 text-[#ff3b1e]">
                <div className="p-2.5 rounded-xl bg-[#ff3b1e]/15">
                  <Film className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  {t.about.pillars.cinema.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {t.about.pillars.cinema.desc}
              </p>
            </div>

            {/* 4. TV & Media Broadcast */}
            <div className={`p-6 rounded-2xl border space-y-3 transition-all hover:border-[#ff3b1e]/50 ${
              theme === 'dark' ? 'bg-neutral-900/70 border-white/10' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-3 text-[#ff3b1e]">
                <div className="p-2.5 rounded-xl bg-[#ff3b1e]/15">
                  <Tv className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  {t.about.pillars.tv.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {t.about.pillars.tv.desc}
              </p>
            </div>

          </div>
        </div>

        {/* Skills Matrix */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="font-display font-bold text-xl flex items-center gap-2">
            <Scissors className="w-5 h-5 text-[#ff3b1e]" />
            <span>{t.about.skillsTitle}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {t.about.skillsList.map((skill, idx) => (
              <div 
                key={idx}
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-medium ${
                  theme === 'dark' ? 'bg-neutral-900/50 border-white/10 text-neutral-300' : 'bg-white border-neutral-200 text-neutral-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-[#ff3b1e] flex-shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Wall Grid */}
        <div className="space-y-6 pt-6 border-t border-white/10">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono text-[#ff3b1e] uppercase tracking-widest font-bold">
              COLLABORATIONS & CLIENTS
            </span>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl uppercase">
              {t.about.clientWallTitle}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {clientLogos.map((client, i) => (
              <div 
                key={i}
                className={`p-4 rounded-xl border text-center flex items-center justify-center transition-all hover:scale-105 hover:border-[#ff3b1e]/50 ${
                  theme === 'dark' ? 'bg-neutral-900/40 border-white/10 text-neutral-400 hover:text-white' : 'bg-white border-neutral-200 text-neutral-700 shadow-sm'
                }`}
              >
                <span className="font-display font-extrabold text-xs tracking-wider uppercase">
                  {client.logo}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
