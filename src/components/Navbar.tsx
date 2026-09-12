import React, { useState, useEffect } from 'react';
import { 
  Film, 
  BookOpen, 
  Mail, 
  Globe, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles,
  Layers,
  ChevronDown
} from 'lucide-react';
import { Language, ThemeMode, ProjectCategory } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  activeCategory: ProjectCategory;
  onSelectCategory: (cat: ProjectCategory) => void;
  onOpenPdfBook: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  theme,
  onToggleTheme,
  activeCategory,
  onSelectCategory,
  onOpenPdfBook,
  onScrollToSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'all', label: t.nav.all, type: 'category' as const, cat: 'all' as ProjectCategory },
    { id: 'brand-commercial', label: t.nav.brand, type: 'category' as const, cat: 'brand-commercial' as ProjectCategory },
    { id: 'fashion-beauty', label: t.nav.fashion, type: 'category' as const, cat: 'fashion-beauty' as ProjectCategory },
    { id: 'interviews-designers', label: t.nav.interviews, type: 'category' as const, cat: 'interviews-designers' as ProjectCategory },
    { id: 'events-exhibitions', label: t.nav.events, type: 'category' as const, cat: 'events-exhibitions' as ProjectCategory },
    { id: 'cinema-fiction', label: t.nav.cinema, type: 'category' as const, cat: 'cinema-fiction' as ProjectCategory },
  ];

  const handleNavClick = (cat: ProjectCategory) => {
    onSelectCategory(cat);
    onScrollToSection('projects-section');
    setMobileMenuOpen(false);
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? theme === 'dark'
            ? 'bg-[#0c0d0e]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
            : 'bg-[#f7f7f5]/90 backdrop-blur-md border-b border-black/10 shadow-sm py-3'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo with Handwriting Signature */}
        <div 
          onClick={() => { onScrollToSection('hero-section'); }}
          className="cursor-pointer group flex items-center gap-3"
          id="navbar-brand-logo"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff3b1e] to-[#ff6b4a] flex items-center justify-center text-white font-bold shadow-lg shadow-[#ff3b1e]/25 group-hover:scale-105 transition-transform">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-display font-extrabold tracking-wider text-lg uppercase ${
                theme === 'dark' || !isScrolled ? 'text-white' : 'text-neutral-900'
              }`}>
                LIU CHEN
              </span>
              <span className="text-[#ff3b1e] font-script text-xl font-bold -rotate-6 group-hover:rotate-0 transition-transform">
                Film
              </span>
            </div>
            <p className="text-[11px] font-mono tracking-widest text-neutral-400 -mt-1 flex items-center gap-1.5">
              <span>cielisea.com</span>
              <span className="w-1 h-1 rounded-full bg-[#ff3b1e]"></span>
              <span>Paris</span>
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => {
            const isActive = activeCategory === link.cat;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#ff3b1e] text-white shadow-md shadow-[#ff3b1e]/30 font-semibold'
                    : theme === 'dark' || !isScrolled
                      ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                      : 'text-neutral-700 hover:text-black hover:bg-black/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          <button
            id="nav-about-btn"
            onClick={() => { onScrollToSection('about-section'); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
              theme === 'dark' || !isScrolled
                ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                : 'text-neutral-700 hover:text-black hover:bg-black/5'
            }`}
          >
            {t.nav.about}
          </button>
        </nav>

        {/* Action Controls: PDF Book, Language, Theme, Contact */}
        <div className="hidden sm:flex items-center space-x-3">
          
          {/* PDF Book Mode Quick Jump */}
          <button
            id="navbar-pdf-book-btn"
            onClick={onOpenPdfBook}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#ff3b1e]/15 border border-[#ff3b1e]/40 text-[#ff3b1e] hover:bg-[#ff3b1e] hover:text-white transition-all shadow-sm group"
            title="Ouvrir le Catalogue PDF (86 Pages)"
          >
            <BookOpen className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">{t.nav.pdfBook}</span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              id="navbar-lang-toggle"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                theme === 'dark' || !isScrolled
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-black/5 hover:bg-black/10 text-neutral-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[#ff3b1e]" />
              <span className="uppercase font-semibold">{currentLang}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {langDropdownOpen && (
              <div className={`absolute right-0 mt-2 w-32 py-1.5 rounded-xl shadow-2xl border transition-all z-50 ${
                theme === 'dark' 
                  ? 'bg-[#141618] border-white/15 text-white' 
                  : 'bg-white border-neutral-200 text-neutral-900'
              }`}>
                {[
                  { code: 'fr' as Language, label: 'Français (FR)' },
                  { code: 'cn' as Language, label: '中文 (CN)' },
                  { code: 'en' as Language, label: 'English (EN)' },
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      onLanguageChange(item.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#ff3b1e]/15 ${
                      currentLang === item.code ? 'text-[#ff3b1e] font-bold' : ''
                    }`}
                  >
                    <span>{item.label}</span>
                    {currentLang === item.code && <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b1e]"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle (Dark / Light) */}
          <button
            id="navbar-theme-toggle"
            onClick={onToggleTheme}
            className={`p-2 rounded-full transition-all ${
              theme === 'dark' || !isScrolled
                ? 'bg-white/10 hover:bg-white/20 text-yellow-400'
                : 'bg-black/5 hover:bg-black/10 text-neutral-700'
            }`}
            title="Changer de thème visuel"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Let's Work CTA */}
          <button
            id="navbar-contact-cta"
            onClick={() => onScrollToSection('contact-section')}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#ff3b1e] text-white hover:bg-[#e63216] transition-all shadow-md shadow-[#ff3b1e]/30 hover:scale-105 active:scale-95"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{t.nav.contact}</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-full ${
              theme === 'dark' || !isScrolled ? 'text-yellow-400' : 'text-neutral-800'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg ${
              theme === 'dark' || !isScrolled ? 'text-white hover:bg-white/10' : 'text-neutral-900 hover:bg-black/5'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b transition-all px-4 pt-3 pb-6 space-y-3 ${
          theme === 'dark' 
            ? 'bg-[#0c0d0e] border-white/10 text-white' 
            : 'bg-[#f7f7f5] border-black/10 text-neutral-900'
        }`}>
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.cat)}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium ${
                  activeCategory === link.cat 
                    ? 'bg-[#ff3b1e] text-white' 
                    : theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center justify-between pt-1">
            <button
              onClick={() => {
                onOpenPdfBook();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#ff3b1e]/15 text-[#ff3b1e] border border-[#ff3b1e]/30"
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.nav.pdfBook}</span>
            </button>

            <button
              onClick={() => {
                onScrollToSection('about-section');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-lg text-xs font-medium bg-white/10"
            >
              {t.nav.about}
            </button>

            <div className="flex items-center gap-1">
              {(['fr', 'cn', 'en'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2.5 py-1 rounded text-xs uppercase font-bold ${
                    currentLang === lang ? 'bg-[#ff3b1e] text-white' : 'text-neutral-400'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              onScrollToSection('contact-section');
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 rounded-xl text-center text-xs font-bold bg-[#ff3b1e] text-white shadow-lg shadow-[#ff3b1e]/30"
          >
            {t.nav.contact}
          </button>
        </div>
      )}
    </header>
  );
};
