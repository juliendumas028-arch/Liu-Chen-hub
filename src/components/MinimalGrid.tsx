import React, { useState } from 'react';
import { Tab, Language } from '../App';
import { ProjectItem, ProjectCategory } from '../types';
import { ArrowLeft, ArrowRight, Sparkles, Edit3, Sliders } from 'lucide-react';

interface MinimalGridProps {
  tab: Tab;
  lang: Language;
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  isGridCurationActive?: boolean;
  onMoveProject?: (project: ProjectItem, direction: 'left' | 'right' | 'top') => void;
  onEditProject?: (project: ProjectItem) => void;
  onOpenCurator?: () => void;
}

export const MinimalGrid: React.FC<MinimalGridProps> = ({ 
  tab, 
  lang, 
  projects, 
  onSelectProject,
  isGridCurationActive = false,
  onMoveProject,
  onEditProject,
  onOpenCurator
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');

  const filterCategories: { id: ProjectCategory; label: Record<Language, string> }[] = [
    { id: 'all', label: { en: 'All Works', fr: 'Tous', cn: '全部作品' } },
    { id: 'fashion-beauty', label: { en: 'Fashion & Beauty', fr: 'Mode & Beauté', cn: '时尚与美妆' } },
    { id: 'interviews-designers', label: { en: 'Celebrities & Interviews', fr: 'Célébrités & Interviews', cn: '名人与专访' } },
    { id: 'brand-commercial', label: { en: 'Brands & Commercials', fr: 'Marques & Publicités', cn: '品牌与商业片' } },
    { id: 'events-exhibitions', label: { en: 'Travel & Expeditions', fr: 'Voyages & Salons', cn: '文旅与大型活动' } },
    { id: 'cinema-fiction', label: { en: 'Cinema & Fiction', fr: 'Cinéma & Fiction', cn: '电影与纪录片' } }
  ];

  let displayProjects = projects;
  
  if (tab === 'tv') {
    // Under TV tab, filter by selectedCategory
    if (selectedCategory !== 'all') {
      displayProjects = projects.filter(p => p.category === selectedCategory);
    }
  } else if (tab === 'photography') {
    displayProjects = projects.filter(p => p.category === 'fashion-beauty' || p.category === 'interviews-designers');
  } else if (tab === 'home') {
    // Show all or top featured works
    displayProjects = projects;
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8">
      {/* Curation Mode Active Bar */}
      {isGridCurationActive && (
        <div className="mb-8 p-3 bg-neutral-900 text-white flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
          <div className="flex items-center gap-2">
            <Sliders size={14} className="text-amber-400" />
            <span className="font-medium">Mode Curation Grille Actif :</span>
            <span className="text-neutral-300">
              Déplacez les projets avec ← / → ou cliquez sur "Éditer" pour modifier les textes instantanément.
            </span>
          </div>
          {onOpenCurator && (
            <button
              onClick={onOpenCurator}
              className="px-3 py-1 bg-white text-neutral-900 hover:bg-neutral-100 font-medium transition-colors text-[11px]"
            >
              Ouvrir l'Atelier Studio Complet
            </button>
          )}
        </div>
      )}

      {/* Discreet Filter Sub-bar for TV / Commercial Works */}
      {tab === 'tv' && (
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-12 text-[12px] font-sans text-neutral-400">
          {filterCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`transition-colors uppercase tracking-wider py-1 ${
                selectedCategory === cat.id
                  ? 'text-neutral-900 border-b border-neutral-900 font-medium'
                  : 'hover:text-neutral-700'
              }`}
            >
              {cat.label[lang]}
            </button>
          ))}
        </div>
      )}

      {/* 3 columns, very small gap horizontally (2px) to match screenshot, large gap vertically */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[2px] gap-y-16">
        {displayProjects.map((project, idx) => {
          const title = lang === 'cn' ? project.titleCn : lang === 'fr' ? project.titleFr : project.title;
          const globalRank = projects.findIndex(p => p.id === project.id) + 1;
          
          return (
            <div 
              key={project.id || idx} 
              onClick={() => onSelectProject(project)}
              className="flex flex-col items-center text-center group cursor-pointer relative"
            >
              {/* Full width image matching cinematic ratio */}
              <div className="w-full aspect-[21/9] sm:aspect-[16/9] overflow-hidden bg-neutral-50 mb-6 relative">
                <img 
                  src={project.coverImage} 
                  alt={title}
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-85"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle Duration Badge matching video player */}
                {project.videoDuration && !isGridCurationActive && (
                  <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-1.5 py-0.5 rounded-none">
                    {project.videoDuration}
                  </span>
                )}

                {/* Curation Overlay Controls */}
                {isGridCurationActive && (
                  <>
                    {/* Rank Badge */}
                    <div className="absolute top-2 left-2 bg-neutral-900/90 text-white font-mono text-[11px] px-2 py-0.5 z-10 shadow-sm flex items-center gap-1">
                      <span>#{globalRank}</span>
                      {project.featured && <span className="text-amber-400">★</span>}
                    </div>

                    {/* Quick Move / Edit Actions Bar */}
                    <div 
                      className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white z-10"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-1">
                        <button
                          title="Déplacer vers la gauche / avant"
                          onClick={() => onMoveProject && onMoveProject(project, 'left')}
                          className="p-1.5 bg-black/70 hover:bg-neutral-800 text-white transition-colors"
                        >
                          <ArrowLeft size={13} />
                        </button>
                        <button
                          title="Mettre en 1ère position (Top 1)"
                          onClick={() => onMoveProject && onMoveProject(project, 'top')}
                          className="p-1.5 bg-black/70 hover:bg-amber-600 text-amber-300 transition-colors"
                        >
                          <Sparkles size={13} />
                        </button>
                        <button
                          title="Déplacer vers la droite / après"
                          onClick={() => onMoveProject && onMoveProject(project, 'right')}
                          className="p-1.5 bg-black/70 hover:bg-neutral-800 text-white transition-colors"
                        >
                          <ArrowRight size={13} />
                        </button>
                      </div>

                      <button
                        onClick={() => onEditProject && onEditProject(project)}
                        className="px-2 py-1 bg-white text-neutral-900 hover:bg-neutral-200 text-[11px] font-sans font-medium flex items-center gap-1 transition-colors"
                      >
                        <Edit3 size={11} />
                        <span>Éditer</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
              
              {/* Minimal text centered below */}
              <h3 className="text-[14px] text-neutral-800 mb-1 leading-snug max-w-[85%] font-serif">
                {title}
              </h3>
              
              <p className="text-[11px] text-neutral-400 font-serif">
                {project.year} {project.client ? `• ${project.client}` : ''}
              </p>
            </div>
          );
        })}
      </div>

      {displayProjects.length === 0 && (
        <div className="text-center py-20 text-neutral-400 text-[13px] font-serif">
          {lang === 'cn' ? '该分类下暂无项目' : lang === 'fr' ? 'Aucun projet dans cette catégorie' : 'No projects in this category'}
        </div>
      )}
    </div>
  );
};
