import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Users, 
  Tag, 
  Film, 
  ExternalLink,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ProjectItem, Language, ThemeMode } from '../types';
import { translations } from '../data/translations';
import { StoryboardComparison } from './StoryboardComparison';

interface ProjectModalProps {
  project: ProjectItem | null;
  projectsList: ProjectItem[];
  currentLang: Language;
  theme: ThemeMode;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenPdfPage: (pageNumber: number) => void;
  onInquireAboutProject: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  projectsList,
  currentLang,
  theme,
  onClose,
  onSelectProject,
  onOpenPdfPage,
  onInquireAboutProject,
}) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isPlayingTeaser, setIsPlayingTeaser] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const t = translations[currentLang];

  useEffect(() => {
    setActiveMediaIndex(0);
    setIsPlayingTeaser(false);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, projectsList]);

  if (!project) return null;

  const currentIndex = projectsList.findIndex(p => p.id === project.id);
  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + projectsList.length) % projectsList.length;
    onSelectProject(projectsList[prevIdx]);
  };
  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % projectsList.length;
    onSelectProject(projectsList[nextIdx]);
  };

  const displayTitle = currentLang === 'cn' ? project.titleCn : currentLang === 'fr' ? project.titleFr : project.title;
  const displayRoles = currentLang === 'cn' ? project.rolesCn : currentLang === 'fr' ? project.rolesFr : project.roles;
  const displayDesc = currentLang === 'cn' ? project.descriptionCn : currentLang === 'fr' ? project.descriptionFr : project.descriptionEn;

  const currentMedia = project.galleryImages[activeMediaIndex] || {
    url: project.coverImage,
    caption: displayTitle
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Modal Container */}
      <div 
        className={`relative z-10 w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border transition-all my-auto max-h-[92vh] flex flex-col ${
          theme === 'dark' 
            ? 'bg-[#0e1012] border-white/15 text-white' 
            : 'bg-[#fafaf8] border-neutral-300 text-neutral-900'
        }`}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0 bg-neutral-950/70 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b1e] animate-pulse"></span>
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#ff6b4a] uppercase font-bold">
                {project.client} • {project.year}
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg truncate max-w-md text-white">
                {displayTitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {project.pdfPages && (
              <button
                onClick={() => onOpenPdfPage(project.pdfPages![0])}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#ff3b1e]/20 text-[#ff3b1e] border border-[#ff3b1e]/40 hover:bg-[#ff3b1e] hover:text-white transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Book PDF</span>
                <span>p.{project.pdfPages.join('-')}</span>
              </button>
            )}

            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              title={t.projectModal.prev}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              title={t.projectModal.next}
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/15 hover:bg-[#ff3b1e] text-white transition-all ml-2"
              title={t.projectModal.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 flex-1">
          
          {/* Main Visual Stills / Video Player Display */}
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-neutral-950 border border-white/15 shadow-2xl group">
              <img 
                src={currentMedia.url} 
                alt={currentMedia.caption || displayTitle}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Cinema Viewfinder HUD */}
              <div className="absolute inset-4 border border-white/15 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="absolute top-2 left-2 text-[10px] font-mono text-white/80">RAW 4K • LOG3</span>
                <span className="absolute top-2 right-2 text-[10px] font-mono text-[#ff3b1e]">{project.videoDuration || '02:30'}</span>
                <span className="absolute bottom-2 left-2 text-[10px] font-mono text-white/80">FRAME {activeMediaIndex + 1}/{project.galleryImages.length}</span>
              </div>

              {/* Ambient play overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4 sm:p-6">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-white/95">
                    {currentLang === 'cn' ? currentMedia.captionCn || currentMedia.caption : currentLang === 'fr' ? currentMedia.captionFr || currentMedia.caption : currentMedia.caption}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-black"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnails Navigation Row */}
            {project.galleryImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {project.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMediaIndex(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-[16/10] w-24 sm:w-28 flex-shrink-0 border-2 transition-all ${
                      activeMediaIndex === idx 
                        ? 'border-[#ff3b1e] scale-95 ring-2 ring-[#ff3b1e]/40' 
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={`Thumb ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <span className="absolute bottom-0.5 right-1 text-[9px] font-mono text-white bg-black/70 px-1 rounded">
                      0{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Storyboard Comparison Block (If applicable) */}
          {project.storyboardComparison && project.storyboardComparison.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-mono text-[#ff3b1e] tracking-wider uppercase font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>{t.projectModal.storyboardSection}</span>
              </h4>
              {project.storyboardComparison.map((comp, idx) => (
                <StoryboardComparison
                  key={idx}
                  storyboardUrl={comp.storyboard}
                  actualShotUrl={comp.actualShot}
                  title={comp.title}
                />
              ))}
            </div>
          )}

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/10 pt-6">
            
            {/* Left: Narrative Description */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="font-display font-bold text-lg">
                {currentLang === 'cn' ? '项目简介与拍摄构思' : currentLang === 'fr' ? 'À propos de cette réalisation' : 'Project Overview & Concept'}
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-neutral-300 font-sans-body">
                {displayDesc}
              </p>

              {/* Tags Cloud */}
              <div className="space-y-2 pt-2">
                <span className="text-xs text-neutral-400 font-mono block">
                  {t.projectModal.tags} :
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tg, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/10 text-neutral-300">
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Key Facts & Credits Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className={`p-5 rounded-2xl border space-y-4 ${
                theme === 'dark' ? 'bg-neutral-900/90 border-white/15' : 'bg-neutral-100 border-neutral-200'
              }`}>
                
                {/* Roles / Functions */}
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#ff3b1e] uppercase font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{t.projectModal.role}</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {displayRoles.map((r, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#ff3b1e] text-white">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Client & Year */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                  <div>
                    <span className="text-[11px] text-neutral-400 font-mono block">{t.projectModal.client}</span>
                    <span className="text-xs font-bold block">{project.client}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-400 font-mono block">{t.projectModal.year}</span>
                    <span className="text-xs font-bold block">{project.year}</span>
                  </div>
                </div>

                {/* Location */}
                {project.location && (
                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[11px] text-neutral-400 font-mono block">{t.projectModal.location}</span>
                    <span className="text-xs font-medium block flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#ff3b1e]" />
                      <span>{project.location}</span>
                    </span>
                  </div>
                )}

                {/* Collaborators */}
                {project.collaborators && (
                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[11px] text-neutral-400 font-mono block">{t.projectModal.collaborators}</span>
                    <span className="text-xs text-neutral-300 block">{project.collaborators}</span>
                  </div>
                )}

                {/* Inquiry Button */}
                <button
                  onClick={() => {
                    onClose();
                    onInquireAboutProject(displayTitle);
                  }}
                  className="w-full py-3 rounded-xl text-xs font-bold bg-white text-black hover:bg-[#ff3b1e] hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg group"
                >
                  <span>
                    {currentLang === 'cn' ? '咨询类似项目拍摄' : currentLang === 'fr' ? 'Initier un projet similaire' : 'Inquire for Similar Project'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
