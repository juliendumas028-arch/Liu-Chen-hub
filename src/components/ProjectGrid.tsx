import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  Film, 
  List, 
  Play, 
  Tag, 
  Calendar, 
  User, 
  MapPin, 
  BookOpen, 
  Sparkles, 
  X,
  SlidersHorizontal,
  Eye
} from 'lucide-react';
import { ProjectItem, ProjectCategory, Language, ThemeMode, ViewMode } from '../types';
import { translations } from '../data/translations';

interface ProjectGridProps {
  projects: ProjectItem[];
  currentLang: Language;
  theme: ThemeMode;
  activeCategory: ProjectCategory;
  onSelectCategory: (cat: ProjectCategory) => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenPdfPage: (pageNumber: number) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  currentLang,
  theme,
  activeCategory,
  onSelectCategory,
  onSelectProject,
  onOpenPdfPage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const t = translations[currentLang];

  const categories = [
    { id: 'all' as ProjectCategory, label: t.nav.all },
    { id: 'brand-commercial' as ProjectCategory, label: t.nav.brand },
    { id: 'fashion-beauty' as ProjectCategory, label: t.nav.fashion },
    { id: 'interviews-designers' as ProjectCategory, label: t.nav.interviews },
    { id: 'events-exhibitions' as ProjectCategory, label: t.nav.events },
    { id: 'cinema-fiction' as ProjectCategory, label: t.nav.cinema },
  ];

  const years = ['all', '2026', '2025', '2024', '2023', '2022', '2019-2022'];

  const popularTags = [
    '#Mode', '#Beauté', '#Versace', '#Dior', '#Guerlain', '#GongLi', 
    '#SophieMarceau', '#Cannes', '#Drone', '#Backstage', '#MakingOf', '#Interview'
  ];

  // Filtering logic
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category match
      if (activeCategory !== 'all' && project.category !== activeCategory) {
        return false;
      }
      // Year match
      if (selectedYear !== 'all' && !project.year.includes(selectedYear)) {
        return false;
      }
      // Tag match
      if (selectedTag && !project.tags.includes(selectedTag)) {
        return false;
      }
      // Role match
      if (selectedRole !== 'all') {
        const hasRole = project.roles.some(r => r.toLowerCase().includes(selectedRole.toLowerCase())) ||
                        project.rolesFr.some(r => r.toLowerCase().includes(selectedRole.toLowerCase())) ||
                        project.rolesCn.some(r => r.toLowerCase().includes(selectedRole.toLowerCase()));
        if (!hasRole) return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = project.title.toLowerCase().includes(query) ||
                        project.titleCn.toLowerCase().includes(query) ||
                        project.titleFr.toLowerCase().includes(query);
        const inClient = project.client.toLowerCase().includes(query);
        const inTags = project.tags.some(t => t.toLowerCase().includes(query));
        const inLocation = (project.location || '').toLowerCase().includes(query);
        const inCollaborators = (project.collaborators || '').toLowerCase().includes(query);

        return inTitle || inClient || inTags || inLocation || inCollaborators;
      }
      return true;
    });
  }, [projects, activeCategory, selectedYear, selectedTag, selectedRole, searchQuery]);

  const resetFilters = () => {
    onSelectCategory('all');
    setSelectedYear('all');
    setSelectedRole('all');
    setSelectedTag(null);
    setSearchQuery('');
  };

  const isFilterActive = activeCategory !== 'all' || selectedYear !== 'all' || selectedTag !== null || selectedRole !== 'all' || searchQuery !== '';

  return (
    <section 
      id="projects-section" 
      className={`py-16 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#0c0d0e] text-white' : 'bg-[#f7f7f5] text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#ff3b1e] text-xs font-mono tracking-widest uppercase mb-1">
              <Film className="w-3.5 h-3.5" />
              <span>CATALOGUE & FILMOGRAPHY</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight">
              {currentLang === 'cn' ? '精选影视作品与大片' : currentLang === 'fr' ? 'Projets Audiovisuels & Créations' : 'Selected Works & Filmography'}
            </h2>
          </div>

          {/* View mode buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 mr-1 hidden sm:inline">{t.filters.viewMode} :</span>
            <div className={`flex items-center p-1 rounded-xl border ${
              theme === 'dark' ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-[#ff3b1e] text-white font-bold' 
                    : 'text-neutral-400 hover:text-white'
                }`}
                title={t.filters.grid}
              >
                <Grid className="w-4 h-4" />
                <span className="hidden md:inline">{t.filters.grid}</span>
              </button>

              <button
                onClick={() => setViewMode('filmstrip')}
                className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-all ${
                  viewMode === 'filmstrip' 
                    ? 'bg-[#ff3b1e] text-white font-bold' 
                    : 'text-neutral-400 hover:text-white'
                }`}
                title={t.filters.filmstrip}
              >
                <Film className="w-4 h-4" />
                <span className="hidden md:inline">{t.filters.filmstrip}</span>
              </button>

              <button
                onClick={() => setViewMode('compact')}
                className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-all ${
                  viewMode === 'compact' 
                    ? 'bg-[#ff3b1e] text-white font-bold' 
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Liste détaillée"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Navigation & Search Bar */}
        <div className="space-y-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const count = cat.id === 'all' 
                ? projects.length 
                : projects.filter(p => p.category === cat.id).length;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  id={`cat-filter-${cat.id}`}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#ff3b1e] text-white shadow-lg shadow-[#ff3b1e]/30 scale-105'
                      : theme === 'dark'
                        ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10'
                        : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 shadow-sm'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-neutral-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search, Year & Role Filter Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.filters.searchPlaceholder}
                className={`w-full pl-10 pr-9 py-2.5 rounded-xl text-xs outline-none transition-all ${
                  theme === 'dark'
                    ? 'bg-neutral-900/80 border border-white/15 text-white placeholder-neutral-500 focus:border-[#ff3b1e] focus:ring-1 focus:ring-[#ff3b1e]'
                    : 'bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-[#ff3b1e] shadow-sm'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Year Selector */}
            <div className="md:col-span-3 flex items-center gap-1 overflow-x-auto">
              <span className="text-[11px] text-neutral-400 mr-1 hidden lg:inline">Année:</span>
              <div className="flex items-center gap-1">
                {years.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedYear === yr
                        ? 'bg-[#ff3b1e] text-white font-bold'
                        : theme === 'dark'
                          ? 'bg-white/5 hover:bg-white/10 text-neutral-400'
                          : 'bg-white border border-neutral-200 text-neutral-600'
                    }`}
                  >
                    {yr === 'all' ? (currentLang === 'cn' ? '全部' : 'Tous') : yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Role Filter Dropdown */}
            <div className="md:col-span-3 flex items-center justify-end gap-2">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className={`w-full py-2.5 px-3 rounded-xl text-xs outline-none transition-all ${
                  theme === 'dark'
                    ? 'bg-neutral-900 border border-white/15 text-white'
                    : 'bg-white border border-neutral-300 text-neutral-800 shadow-sm'
                }`}
              >
                <option value="all">
                  {currentLang === 'cn' ? '全部担任职务' : currentLang === 'fr' ? 'Toutes les fonctions' : 'All Roles & Functions'}
                </option>
                <option value="réalisatrice">Réalisatrice / 导演</option>
                <option value="vidéo">Opératrice Vidéo / 视频摄影</option>
                <option value="assistant">Assistant Réalisateur / 副导演</option>
                <option value="drone">Drone / 航拍</option>
                <option value="montage">Montage / 剪辑</option>
                <option value="storyboard">Storyboard / 故事版</option>
              </select>
            </div>
          </div>

          {/* Popular Tag Pills & Active Filter Indicator */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-neutral-500 flex items-center gap-1">
              <Tag className="w-3 h-3 text-[#ff3b1e]" />
              <span>{t.filters.tagCloud}:</span>
            </span>

            {popularTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                    isSelected
                      ? 'bg-[#ff3b1e] text-white font-bold'
                      : theme === 'dark'
                        ? 'bg-white/5 hover:bg-white/15 text-neutral-300'
                        : 'bg-neutral-200/80 hover:bg-neutral-300 text-neutral-800'
                  }`}
                >
                  {tag}
                </button>
              );
            })}

            {isFilterActive && (
              <button
                onClick={resetFilters}
                className="ml-auto text-xs text-[#ff3b1e] hover:underline flex items-center gap-1 font-semibold"
              >
                <X className="w-3 h-3" />
                <span>{t.filters.reset} ({filteredProjects.length} {t.filters.showing})</span>
              </button>
            )}
          </div>
        </div>

        {/* Projects Display View */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center space-y-4 border border-dashed border-white/15 rounded-3xl p-8">
            <Film className="w-12 h-12 text-neutral-500 mx-auto" />
            <p className="text-base text-neutral-400">
              {currentLang === 'cn' ? '未找到符合条件的作品。' : currentLang === 'fr' ? 'Aucun projet ne correspond à vos filtres.' : 'No projects matched your filters.'}
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-full bg-[#ff3b1e] text-white text-xs font-bold"
            >
              {t.filters.reset}
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const displayTitle = currentLang === 'cn' ? project.titleCn : currentLang === 'fr' ? project.titleFr : project.title;
              const displayRoles = currentLang === 'cn' ? project.rolesCn : currentLang === 'fr' ? project.rolesFr : project.roles;

              return (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  onClick={() => onSelectProject(project)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                    theme === 'dark'
                      ? 'bg-neutral-900/90 border-white/10 hover:border-[#ff3b1e]/60 hover:shadow-[#ff3b1e]/15'
                      : 'bg-white border-neutral-200 hover:border-[#ff3b1e]/60 hover:shadow-xl'
                  }`}
                >
                  {/* Card Cover Image with Cinema ratio */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                    <img 
                      src={project.coverImage} 
                      alt={displayTitle}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    {/* Top Chips */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {project.year}
                      </span>
                      {project.pdfPages && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenPdfPage(project.pdfPages![0]);
                          }}
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#ff3b1e]/90 text-white backdrop-blur-md flex items-center gap-1 hover:bg-[#ff3b1e] transition-colors"
                          title="Voir dans le Book PDF"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>p.{project.pdfPages[0]}</span>
                        </button>
                      )}
                    </div>

                    {/* Play Hover Action */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <div className="w-12 h-12 rounded-full bg-[#ff3b1e] text-white flex items-center justify-center shadow-lg shadow-[#ff3b1e]/60 transform scale-75 group-hover:scale-100 transition-transform">
                        <Play className="w-5 h-5 ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom Client & Tag info */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[11px] font-mono tracking-wider text-[#ff6b4a] uppercase font-bold block mb-0.5">
                        {project.client}
                      </span>
                      <h3 className="font-display font-bold text-base text-white line-clamp-1 leading-tight">
                        {displayTitle}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-4 space-y-3">
                    
                    {/* Roles Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {displayRoles.slice(0, 3).map((r, i) => (
                        <span 
                          key={i}
                          className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                            theme === 'dark' 
                              ? 'bg-white/10 text-neutral-300' 
                              : 'bg-neutral-100 text-neutral-800'
                          }`}
                        >
                          {r}
                        </span>
                      ))}
                    </div>

                    {/* Description excerpt */}
                    <p className={`text-xs line-clamp-2 leading-relaxed ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                      {currentLang === 'cn' ? project.descriptionCn : currentLang === 'fr' ? project.descriptionFr : project.descriptionEn}
                    </p>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px]">
                      <span className="text-neutral-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#ff3b1e]" />
                        <span className="truncate max-w-[150px]">{project.location || 'Paris'}</span>
                      </span>
                      <span className="text-[#ff3b1e] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>{currentLang === 'cn' ? '查看详情' : currentLang === 'fr' ? 'Explorer' : 'Details'}</span>
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : viewMode === 'filmstrip' ? (
          /* Filmstrip Storyboard Layout */
          <div className="space-y-6">
            {filteredProjects.map((project, idx) => {
              const displayTitle = currentLang === 'cn' ? project.titleCn : currentLang === 'fr' ? project.titleFr : project.title;
              const displayRoles = currentLang === 'cn' ? project.rolesCn : currentLang === 'fr' ? project.rolesFr : project.roles;

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className={`rounded-2xl overflow-hidden border p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:border-[#ff3b1e]/60 hover:shadow-xl ${
                    theme === 'dark' ? 'bg-neutral-900/80 border-white/10' : 'bg-white border-neutral-200'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    
                    {/* Left: Metadata & Titles */}
                    <div className="lg:col-span-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#ff3b1e] font-bold">
                          #{String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-neutral-500"></span>
                        <span className="text-xs font-mono uppercase text-neutral-400">{project.year}</span>
                        <span className="w-1 h-1 rounded-full bg-neutral-500"></span>
                        <span className="text-xs font-mono font-bold text-[#ff6b4a] uppercase">{project.client}</span>
                      </div>

                      <h3 className="font-display font-bold text-xl leading-tight">
                        {displayTitle}
                      </h3>

                      <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                        {currentLang === 'cn' ? project.descriptionCn : currentLang === 'fr' ? project.descriptionFr : project.descriptionEn}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {displayRoles.map((r, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#ff3b1e]/15 text-[#ff3b1e] font-semibold">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Multi-frame Filmstrip Horizontal */}
                    <div className="lg:col-span-8 grid grid-cols-3 gap-2">
                      {project.galleryImages.slice(0, 3).map((img, imgIdx) => (
                        <div 
                          key={imgIdx} 
                          className="relative aspect-[16/10] rounded-lg overflow-hidden bg-neutral-950 group/img"
                        >
                          <img 
                            src={img.url} 
                            alt={img.caption || displayTitle}
                            className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors" />
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-black/70 text-white">
                            Frame 0{imgIdx + 1}
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Compact List Layout */
          <div className={`rounded-2xl border divide-y overflow-hidden ${
            theme === 'dark' ? 'bg-neutral-900/60 border-white/10 divide-white/10' : 'bg-white border-neutral-200 divide-neutral-100 shadow-sm'
          }`}>
            {filteredProjects.map((project) => {
              const displayTitle = currentLang === 'cn' ? project.titleCn : currentLang === 'fr' ? project.titleFr : project.title;
              const displayRoles = currentLang === 'cn' ? project.rolesCn : currentLang === 'fr' ? project.rolesFr : project.roles;

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#ff3b1e]/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={project.coverImage} 
                      alt={displayTitle}
                      className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#ff3b1e] uppercase">{project.client}</span>
                        <span className="text-xs text-neutral-400">• {project.year}</span>
                      </div>
                      <h4 className="font-display font-bold text-sm sm:text-base">
                        {displayTitle}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="hidden md:flex gap-1.5">
                      {displayRoles.slice(0, 2).map((r, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-neutral-400">
                          {r}
                        </span>
                      ))}
                    </div>
                    <button className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#ff3b1e] text-white flex items-center gap-1">
                      <span>{currentLang === 'cn' ? '详情' : 'Détails'}</span>
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
