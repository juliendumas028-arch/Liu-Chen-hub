import React from 'react';
import { Tab, Language } from '../App';

interface HeaderProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onTabChange, lang, onLangChange }) => {
  const tabs: { id: Tab; label: Record<Language, string> }[] = [
    { id: 'home', label: { en: 'Home', fr: 'Home', cn: '首页' } },
    { id: 'works', label: { en: 'Works', fr: 'Works', cn: '作品' } },
    { id: 'about', label: { en: 'About', fr: 'About', cn: '关于' } },
    { id: 'contact', label: { en: 'Contact', fr: 'Contact', cn: '联系' } },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-100 pt-5 pb-4 px-4 sm:px-8 transition-all">
      <div className="max-w-[1600px] mx-auto flex flex-col items-center relative">
        
        {/* Discreet language toggle in top right */}
        <div className="sm:absolute sm:top-1 sm:right-0 flex items-center gap-2 text-[10px] text-neutral-400 font-sans tracking-widest uppercase mb-2 sm:mb-0">
          <button 
            onClick={() => onLangChange('en')} 
            className={`transition-colors py-1 ${lang === 'en' ? 'text-neutral-900 font-semibold' : 'hover:text-neutral-600'}`}
          >
            EN
          </button>
          <span className="text-neutral-200">|</span>
          <button 
            onClick={() => onLangChange('fr')} 
            className={`transition-colors py-1 ${lang === 'fr' ? 'text-neutral-900 font-semibold' : 'hover:text-neutral-600'}`}
          >
            FR
          </button>
          <span className="text-neutral-200">|</span>
          <button 
            onClick={() => onLangChange('cn')} 
            className={`transition-colors py-1 ${lang === 'cn' ? 'text-neutral-900 font-semibold' : 'hover:text-neutral-600'}`}
          >
            中文
          </button>
        </div>

        {/* Clean Typographic Logo "Liu Chen" in bold */}
        <button
          onClick={() => {
            onTabChange('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex flex-col items-center text-center cursor-pointer mb-2 transition-transform active:scale-98"
          title="Liu Chen - Retour à l'accueil"
        >
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-[0.18em] uppercase text-neutral-900 group-hover:text-neutral-600 transition-colors select-none font-serif">
            Liu Chen
          </h1>
          <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-neutral-400 mt-0.5">
            {lang === 'cn' ? '摄影指导 • 巴黎' : 'Directrice de la Photographie • Paris'}
          </span>
        </button>

        {/* Navigation bar: Home / Works / About / Contact */}
        <nav className="flex items-center justify-center gap-8 sm:gap-12 mt-2 pt-2 border-t border-neutral-100/60 w-full max-w-md">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                onTabChange(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-[13px] sm:text-[14px] font-sans tracking-wider transition-all relative py-1 ${
                currentTab === tab.id 
                  ? 'text-neutral-900 font-medium' 
                  : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              <span>{tab.label[lang]}</span>
              {currentTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-900" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
