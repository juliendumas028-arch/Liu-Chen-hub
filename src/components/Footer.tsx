import React from 'react';
import { Film, ArrowUp, Mail, Phone, Globe, Heart } from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  currentLang: Language;
  theme: ThemeMode;
  onScrollToTop: () => void;
  onOpenPdfBook: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  theme,
  onScrollToTop,
  onOpenPdfBook,
}) => {
  const t = translations[currentLang];

  return (
    <footer className="bg-[#060708] text-neutral-400 text-xs border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand and Domain */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ff3b1e] flex items-center justify-center text-white font-bold">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-white text-sm uppercase tracking-wider">
                  LIU CHEN
                </span>
                <span className="text-[#ff3b1e] font-script text-lg font-bold">
                  Film
                </span>
              </div>
              <p className="text-[11px] font-mono text-neutral-500">
                www.cielisea.com • Portfolio 2025 • Paris
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <button
              onClick={onOpenPdfBook}
              className="text-neutral-300 hover:text-[#ff3b1e] transition-colors"
            >
              Book PDF (86 Pages)
            </button>
            <a 
              href="mailto:cielisea@gmail.com" 
              className="text-neutral-300 hover:text-[#ff3b1e] transition-colors"
            >
              cielisea@gmail.com
            </a>
            <a 
              href="tel:+33664213917" 
              className="text-neutral-300 hover:text-[#ff3b1e] transition-colors"
            >
              +33 664213917
            </a>
            <span className="text-neutral-500">
              Bilibili: LiuChenFilm
            </span>
          </div>

          {/* Back to top */}
          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#ff3b1e] text-white transition-all text-xs font-semibold"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

        {/* Legal and Slogan */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>{t.footer.rights}</p>
          <p className="italic text-neutral-400">
            {currentLang === 'cn' ? '摄像机为笔，光影为墨。' : 'Caméra pour plume, lumière et ombre pour encre.'}
          </p>
        </div>

      </div>
    </footer>
  );
};
