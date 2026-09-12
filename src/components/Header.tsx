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
    { id: 'tv', label: { en: 'TV / Corporate and Social Media Works', fr: 'TV / Corporate and Social Media Works', cn: '电视/商业片' } },
    { id: 'photography', label: { en: 'Photography', fr: 'Photography', cn: '摄影' } },
    { id: 'about', label: { en: 'About', fr: 'About', cn: '关于' } },
    { id: 'contact', label: { en: 'Contact', fr: 'Contact', cn: '联系' } },
  ];

  return (
    <header className="flex flex-col items-center pt-8 pb-16 relative bg-white">
      {/* Ultra subtle language toggle in top right */}
      <div className="absolute top-4 right-6 flex gap-2 text-[10px] text-neutral-400 font-sans tracking-widest uppercase">
        <button 
          onClick={() => onLangChange('en')} 
          className={lang === 'en' ? 'text-neutral-800 font-medium' : 'hover:text-neutral-600 transition-colors'}
        >
          EN
        </button>
        <span className="text-neutral-200">|</span>
        <button 
          onClick={() => onLangChange('fr')} 
          className={lang === 'fr' ? 'text-neutral-800 font-medium' : 'hover:text-neutral-600 transition-colors'}
        >
          FR
        </button>
        <span className="text-neutral-200">|</span>
        <button 
          onClick={() => onLangChange('cn')} 
          className={lang === 'cn' ? 'text-neutral-800 font-medium' : 'hover:text-neutral-600 transition-colors'}
        >
          中文
        </button>
      </div>

      {/* Centered logo / profile picture (B&W) */}
      <div className="w-16 h-16 mb-4 overflow-hidden grayscale">
        <img 
          src="https://images.unsplash.com/photo-1596726880053-8321e16f3964?auto=format&fit=crop&w=200&q=80" 
          alt="Liu Chen Logo" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Phone number */}
      <p className="text-neutral-400 text-[13px] mb-12">
        Tel : + 33 6 64 21 39 17 (Paris)
      </p>

      {/* Navigation menu */}
      <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 px-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`text-[14px] transition-colors ${
              currentTab === tab.id 
                ? 'text-neutral-800' 
                : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            {tab.label[lang]}
          </button>
        ))}
      </nav>
    </header>
  );
};
