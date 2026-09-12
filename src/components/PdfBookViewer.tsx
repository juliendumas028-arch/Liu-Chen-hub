import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  BookOpen, 
  Sparkles, 
  Film, 
  Download, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { pdfSpreadsData } from '../data/projectsData';
import { Language, ThemeMode } from '../types';
import { translations } from '../data/translations';

interface PdfBookViewerProps {
  isOpen: boolean;
  initialPage?: number;
  currentLang: Language;
  theme: ThemeMode;
  onClose: () => void;
  onSelectProjectById?: (projectId: string) => void;
}

export const PdfBookViewer: React.FC<PdfBookViewerProps> = ({
  isOpen,
  initialPage = 1,
  currentLang,
  theme,
  onClose,
  onSelectProjectById,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const t = translations[currentLang];

  useEffect(() => {
    if (initialPage) {
      setCurrentPage(initialPage);
    }
  }, [initialPage, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPage]);

  if (!isOpen) return null;

  const totalPages = 86;

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));

  // Find corresponding spread data or fallback
  const spreadItem = pdfSpreadsData.find(s => s.pageNumber === currentPage) || {
    pageNumber: currentPage,
    title: `Page ${currentPage} - Portfolio Liu Chen 2025`,
    category: currentPage <= 3 ? 'about' : currentPage <= 50 ? 'brand' : currentPage <= 62 ? 'designers' : currentPage <= 85 ? 'events' : 'contact',
    thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=75',
    fullImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85',
    ocrText: `Liu Chen • 影视广告与时尚创作 • Page ${currentPage}/86 • www.cielisea.com`
  };

  const chapters = [
    { label: t.pdfViewer.sections.cover, page: 1 },
    { label: t.pdfViewer.sections.about, page: 3 },
    { label: t.pdfViewer.sections.brand, page: 4 },
    { label: t.pdfViewer.sections.designers, page: 51 },
    { label: t.pdfViewer.sections.events, page: 63 },
    { label: t.pdfViewer.sections.contact, page: 86 },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/95 backdrop-blur-2xl flex flex-col animate-fadeIn">
      
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-neutral-900/90 border-b border-white/15 text-white flex-shrink-0 z-20">
        
        {/* Left: Book Title & Page Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#ff3b1e] flex items-center justify-center text-white font-bold">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-white flex items-center gap-2">
              <span>{t.pdfViewer.title}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-[#ff6b4a]">
                p.{currentPage} / {totalPages}
              </span>
            </h3>
            <p className="text-[11px] text-neutral-400 truncate max-w-xs sm:max-w-md">
              {spreadItem.title}
            </p>
          </div>
        </div>

        {/* Center: Quick Chapter Tabs (Hidden on small mobile) */}
        <div className="hidden lg:flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
          {chapters.map((ch, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(ch.page)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                currentPage >= ch.page && (i === chapters.length - 1 || currentPage < chapters[i + 1].page)
                  ? 'bg-[#ff3b1e] text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {ch.label.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Right: Zoom & Close Controls */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 bg-white/10 p-1 rounded-lg">
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:bg-white/20 rounded text-neutral-300 hover:text-white"
              title={t.pdfViewer.zoomOut}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-1">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-white/20 rounded text-neutral-300 hover:text-white"
              title={t.pdfViewer.zoomIn}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/15 hover:bg-[#ff3b1e] text-white transition-all ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Spread Presentation Stage */}
      <div className="flex-1 relative overflow-auto flex items-center justify-center p-4 sm:p-8">
        
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          disabled={currentPage <= 1}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#ff3b1e] text-white backdrop-blur-md border border-white/20 transition-all ${
            currentPage <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
          }`}
          title={t.pdfViewer.prevPage}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#ff3b1e] text-white backdrop-blur-md border border-white/20 transition-all ${
            currentPage >= totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
          }`}
          title={t.pdfViewer.nextPage}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Digital Spread Canvas replicating the PDF visual */}
        <div 
          className="relative max-w-5xl w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-neutral-900 transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Top Page Header bar matching PDF */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between text-xs font-mono text-white/80 z-20 pointer-events-none">
            <span className="font-bold tracking-wider">Portfolio Liu Chen</span>
            <span className="text-[#ff6b4a] font-bold">www.cielisea.com</span>
          </div>

          {/* Spread Main Visual & Text Layout */}
          <div className="w-full h-full relative flex items-center justify-center bg-[#111315]">
            <img 
              src={spreadItem.fullImage} 
              alt={spreadItem.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            {/* Dark & Editorial Overlays matching the spread */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Bottom Content Card on Spread */}
            <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-6 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 text-white flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ff3b1e] text-white uppercase">
                  Page {currentPage} / {totalPages} • {spreadItem.category.toUpperCase()}
                </span>
                <h4 className="font-display font-bold text-base sm:text-xl text-white">
                  {spreadItem.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl">
                  {spreadItem.ocrText}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end">
                <a
                  href="mailto:cielisea@gmail.com?subject=Demande%20de%20collaboration%20-%20Book%20PDF"
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#ff3b1e] text-white hover:bg-[#e63216] transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentLang === 'cn' ? '咨询本项目' : 'Contacter'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Page Footer bar matching PDF */}
          <div className="absolute bottom-1 left-0 right-0 px-6 py-1 flex items-center justify-between text-[10px] font-mono text-white/50 z-20 pointer-events-none">
            <span>Portfolio Liu Chen 2025</span>
            <span>www.cielisea.com</span>
          </div>
        </div>

      </div>

      {/* Bottom Thumbnail Scrubber & Page Selector */}
      <div className="p-3 bg-neutral-900/90 border-t border-white/15 flex-shrink-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Page Range Scrubber */}
          <div className="flex-1 flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-400">p.1</span>
            <input 
              type="range"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="w-full accent-[#ff3b1e] cursor-pointer"
            />
            <span className="text-xs font-mono text-neutral-400">p.86</span>
          </div>

          {/* Direct page jump box */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 hidden sm:inline">{t.pdfViewer.jumpToPage} :</span>
            <input 
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 1 && val <= totalPages) setCurrentPage(val);
              }}
              className="w-14 py-1 px-2 rounded-lg bg-black/60 border border-white/20 text-xs text-white text-center font-mono"
            />
          </div>

        </div>
      </div>

    </div>
  );
};
