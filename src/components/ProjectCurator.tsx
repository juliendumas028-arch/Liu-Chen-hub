import React, { useState } from 'react';
import { ProjectItem, ProjectCategory } from '../types';
import { 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  Edit3, 
  Search, 
  Download, 
  RotateCcw, 
  X, 
  Check, 
  Copy,
  Sliders,
  Layers,
  ChevronRight,
  GripVertical,
  Plus
} from 'lucide-react';
import { ProjectEditModal } from './ProjectEditModal';
import { NewProjectModal } from './NewProjectModal';

interface ProjectCuratorProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  onUpdateProjects: (newProjects: ProjectItem[]) => void;
  onResetProjects: () => void;
  isGridCurationActive: boolean;
  onToggleGridCuration: () => void;
}

export const ProjectCurator: React.FC<ProjectCuratorProps> = ({
  isOpen,
  onClose,
  projects,
  onUpdateProjects,
  onResetProjects,
  isGridCurationActive,
  onToggleGridCuration
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [targetPosInput, setTargetPosInput] = useState<{ [id: string]: string }>({});

  if (!isOpen) return null;

  // Filter projects by search and category for easy locating
  const filteredProjectsWithOriginalIndex = projects
    .map((item, originalIndex) => ({ item, originalIndex }))
    .filter(({ item }) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || 
        (item.titleCn && item.titleCn.toLowerCase().includes(q)) ||
        (item.titleFr && item.titleFr.toLowerCase().includes(q)) ||
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.client && item.client.toLowerCase().includes(q)) ||
        (item.year && item.year.includes(q)) ||
        (item.bvid && item.bvid.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });

  // Action: Move project to absolute index
  const moveToPosition = (fromOriginalIndex: number, toPosition: number) => {
    if (toPosition < 1 || toPosition > projects.length) return;
    const targetIdx = toPosition - 1;
    if (fromOriginalIndex === targetIdx) return;

    const list = [...projects];
    const [moved] = list.splice(fromOriginalIndex, 1);
    list.splice(targetIdx, 0, moved);
    onUpdateProjects(list);
  };

  // Action: Move project up
  const moveUp = (originalIndex: number) => {
    if (originalIndex <= 0) return;
    const list = [...projects];
    const temp = list[originalIndex - 1];
    list[originalIndex - 1] = list[originalIndex];
    list[originalIndex] = temp;
    onUpdateProjects(list);
  };

  // Action: Move project down
  const moveDown = (originalIndex: number) => {
    if (originalIndex >= projects.length - 1) return;
    const list = [...projects];
    const temp = list[originalIndex + 1];
    list[originalIndex + 1] = list[originalIndex];
    list[originalIndex] = temp;
    onUpdateProjects(list);
  };

  // Action: Pin to top (#1)
  const pinToTop = (originalIndex: number) => {
    if (originalIndex === 0) return;
    moveToPosition(originalIndex, 1);
  };

  // Drag & drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;
    moveToPosition(draggedIndex, dropIndex + 1);
    setDraggedIndex(null);
  };

  // Save single edited project
  const handleSaveProject = (updated: ProjectItem) => {
    const list = projects.map(p => p.id === updated.id ? updated : p);
    onUpdateProjects(list);
  };

  // Add new project
  const handleAddProject = (newProject: ProjectItem, position: 'top' | 'bottom') => {
    let list: ProjectItem[];
    if (position === 'top') {
      list = [newProject, ...projects];
    } else {
      list = [...projects, newProject];
    }
    onUpdateProjects(list);
  };

  // Copy full data to clipboard
  const handleCopyCode = () => {
    const jsonString = JSON.stringify(projects, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  // Download JSON file
  const handleDownloadJSON = () => {
    const jsonString = JSON.stringify(projects, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `liuchen_projects_ordered_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
      {/* Backdrop */}
      <div className="flex-1" onClick={onClose} />

      {/* Main Slide-over Panel */}
      <div className="relative w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col border-l border-neutral-200">
        
        {/* Top Control Bar */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-mono">
                Atelier Curation & Ordre
              </span>
              <span className="bg-neutral-200 text-neutral-700 text-[10px] px-2 py-0.5 font-mono">
                {projects.length} projets
              </span>
            </div>
            <h1 className="text-lg font-serif text-neutral-900 mt-0.5">
              Organiser la grille & Éditer les textes
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Add New Project button */}
            <button
              onClick={() => setNewProjectModalOpen(true)}
              className="px-3.5 py-1.5 text-xs bg-neutral-900 text-white hover:bg-black flex items-center gap-1.5 transition-colors font-medium shadow-xs"
              title="Ajouter une nouvelle vidéo Bilibili au portfolio"
            >
              <Plus size={13} className="text-amber-400" />
              <span>+ Nouveau Projet</span>
            </button>

            {/* Toggle direct visual mode on page */}
            <button
              onClick={onToggleGridCuration}
              className={`px-3 py-1.5 text-xs flex items-center gap-1.5 border transition-colors ${
                isGridCurationActive 
                  ? 'bg-neutral-800 text-white border-neutral-800 font-medium' 
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
              title="Affiche des commandes de déplacement directes sur la grille du site"
            >
              <Sliders size={13} />
              <span>{isGridCurationActive ? 'Mode grille actif' : 'Sur la grille'}</span>
            </button>

            {/* Export modal trigger */}
            <button
              onClick={() => setExportModalOpen(true)}
              className="px-3 py-1.5 text-xs bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400 flex items-center gap-1.5 transition-colors"
            >
              <Download size={13} />
              <span>Exporter</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-neutral-100 bg-white space-y-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher par star, marque, mot-clé (ex: Sophie Marceau, YSL, Ponant, AITO, 2024)..."
              className="w-full pl-9 pr-4 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none text-xs font-sans placeholder:text-neutral-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs"
              >
                Effacer
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 text-[11px] font-sans">
            {(['all', 'fashion-beauty', 'interviews-designers', 'brand-commercial', 'events-exhibitions', 'cinema-fiction'] as ProjectCategory[]).map(cat => {
              const labels: Record<ProjectCategory, string> = {
                'all': 'Tous',
                'fashion-beauty': 'Mode & Beauté',
                'interviews-designers': 'Interviews & Célébrités',
                'brand-commercial': 'Marques & Publicités',
                'events-exhibitions': 'Voyages & Salons',
                'cinema-fiction': 'Cinéma & Fiction'
              };
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-neutral-900 text-white font-medium' 
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {labels[cat]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tips banner */}
        <div className="px-6 py-2 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500 font-sans">
          <span>
            💡 Glissez-déposez les cartes, utilisez <span className="font-semibold text-neutral-800">★ En tête</span> ou tapez un numéro de position pour réordonner instantanément.
          </span>
          <span className="text-emerald-700 font-medium">
            ✓ Sauvegarde automatique active
          </span>
        </div>

        {/* Projects List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-neutral-100">
          {filteredProjectsWithOriginalIndex.map(({ item, originalIndex }) => {
            const rank = originalIndex + 1;
            const inputVal = targetPosInput[item.id] !== undefined ? targetPosInput[item.id] : '';

            return (
              <div
                key={item.id}
                draggable
                onDragStart={e => handleDragStart(e, originalIndex)}
                onDragOver={handleDragOver}
                onDrop={e => handleDrop(e, originalIndex)}
                className={`pt-2.5 pb-2.5 px-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors ${
                  draggedIndex === originalIndex ? 'bg-neutral-100 opacity-60' : 'hover:bg-neutral-50'
                }`}
              >
                {/* Left: Drag Handle, Rank Badge & Thumbnail */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="cursor-grab active:cursor-grabbing text-neutral-300 hover:text-neutral-600 p-1">
                    <GripVertical size={16} />
                  </div>

                  {/* Absolute position badge */}
                  <div className="w-8 h-8 flex items-center justify-center bg-neutral-900 text-white font-mono text-[11px] shrink-0 font-medium">
                    #{rank}
                  </div>

                  {/* Thumbnail */}
                  <div className="w-20 aspect-[16/9] bg-neutral-100 overflow-hidden relative shrink-0 border border-neutral-200">
                    <img
                      src={item.coverImage}
                      alt={item.titleFr || item.titleCn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {item.videoDuration && (
                      <span className="absolute bottom-0.5 right-0.5 bg-black/70 text-white text-[9px] font-mono px-1">
                        {item.videoDuration}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[13px] font-medium text-neutral-900 truncate font-serif">
                        {item.titleFr || item.titleCn}
                      </h4>
                      {item.featured && (
                        <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.2 font-sans">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400 font-sans truncate">
                      {item.titleCn !== item.titleFr ? `${item.titleCn} • ` : ''}
                      {item.client} • {item.year}
                    </p>
                  </div>
                </div>

                {/* Right: Reorder Actions & Edit */}
                <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0 text-xs font-sans">
                  {/* Pin to top */}
                  <button
                    onClick={() => pinToTop(originalIndex)}
                    title="Placer ce projet tout en haut (Position #1)"
                    disabled={originalIndex === 0}
                    className="p-1.5 text-neutral-500 hover:text-neutral-900 disabled:opacity-30 disabled:hover:text-neutral-500 hover:bg-neutral-100 transition-colors flex items-center gap-1"
                  >
                    <Sparkles size={13} className="text-amber-500" />
                    <span className="text-[10px] hidden md:inline">En tête</span>
                  </button>

                  {/* Move Up */}
                  <button
                    onClick={() => moveUp(originalIndex)}
                    disabled={originalIndex === 0}
                    title="Monter d'une place"
                    className="p-1.5 text-neutral-500 hover:text-neutral-900 disabled:opacity-30 disabled:hover:text-neutral-500 hover:bg-neutral-100 transition-colors"
                  >
                    <ArrowUp size={14} />
                  </button>

                  {/* Move Down */}
                  <button
                    onClick={() => moveDown(originalIndex)}
                    disabled={originalIndex === projects.length - 1}
                    title="Descendre d'une place"
                    className="p-1.5 text-neutral-500 hover:text-neutral-900 disabled:opacity-30 disabled:hover:text-neutral-500 hover:bg-neutral-100 transition-colors"
                  >
                    <ArrowDown size={14} />
                  </button>

                  {/* Direct Jump to Position Input */}
                  <div className="flex items-center gap-1 pl-1 pr-1 border-l border-neutral-200">
                    <span className="text-[10px] text-neutral-400 font-mono">Pos:</span>
                    <input
                      type="number"
                      min={1}
                      max={projects.length}
                      value={inputVal}
                      onChange={e => setTargetPosInput({ ...targetPosInput, [item.id]: e.target.value })}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && inputVal) {
                          moveToPosition(originalIndex, parseInt(inputVal, 10));
                          setTargetPosInput({ ...targetPosInput, [item.id]: '' });
                        }
                      }}
                      placeholder={`${rank}`}
                      className="w-12 px-1.5 py-1 text-[11px] font-mono border border-neutral-200 text-center focus:border-neutral-900 focus:outline-none"
                    />
                    {inputVal && (
                      <button
                        onClick={() => {
                          moveToPosition(originalIndex, parseInt(inputVal, 10));
                          setTargetPosInput({ ...targetPosInput, [item.id]: '' });
                        }}
                        className="px-1.5 py-1 bg-neutral-900 text-white text-[10px]"
                      >
                        OK
                      </button>
                    )}
                  </div>

                  {/* Edit button */}
                  <button
                    onClick={() => setEditingProject(item)}
                    className="px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800 text-xs flex items-center gap-1 transition-colors ml-1"
                  >
                    <Edit3 size={13} />
                    <span>Éditer texte</span>
                  </button>
                </div>
              </div>
            );
          })}

          {filteredProjectsWithOriginalIndex.length === 0 && (
            <div className="text-center py-16 text-neutral-400 text-xs font-sans">
              Aucun projet ne correspond à votre recherche.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs font-sans">
          <button
            onClick={() => {
              if (window.confirm('Voulez-vous vraiment réinitialiser l\'ordre et les textes aux valeurs par défaut ?')) {
                onResetProjects();
              }
            }}
            className="text-neutral-400 hover:text-red-600 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw size={13} />
            <span>Réinitialiser par défaut</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
            >
              Terminé & Fermer
            </button>
          </div>
        </div>
      </div>

      {/* Edit Single Project Modal */}
      <ProjectEditModal
        project={editingProject}
        isOpen={Boolean(editingProject)}
        onClose={() => setEditingProject(null)}
        onSave={handleSaveProject}
      />

      {/* Add New Project Modal */}
      <NewProjectModal
        isOpen={newProjectModalOpen}
        onClose={() => setNewProjectModalOpen(false)}
        onAddProject={handleAddProject}
      />

      {/* Export Code Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="fixed inset-0" onClick={() => setExportModalOpen(false)} />
          <div className="relative z-10 w-full max-w-2xl bg-white shadow-2xl p-6 border border-neutral-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <div>
                <h3 className="text-sm font-medium text-neutral-900">
                  Publication Git & Sauvegarde des Projets
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Vos ajouts et votre nouvel ordre sont immédiatement sauvegardés dans ce navigateur.
                </p>
              </div>
              <button onClick={() => setExportModalOpen(false)} className="text-neutral-400 hover:text-neutral-800">
                <X size={16} />
              </button>
            </div>

            <div className="mb-4 p-3 bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 space-y-1.5 font-sans">
              <div className="font-semibold text-neutral-900">Processus de publication Git :</div>
              <div className="flex items-start gap-2">
                <span className="font-mono bg-neutral-200 text-neutral-800 px-1 text-[10px]">1</span>
                <span>Ajoutez vos nouvelles vidéos Bilibili ou déplacez vos projets ici dans AI Studio.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono bg-neutral-200 text-neutral-800 px-1 text-[10px]">2</span>
                <span>Cliquez sur « Copier tout le JSON » ou « Télécharger ».</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono bg-neutral-200 text-neutral-800 px-1 text-[10px]">3</span>
                <span>Dans votre projet Git, demandez-moi simplement d'injecter ce JSON ou mettez à jour votre code pour publier sur GitHub !</span>
              </div>
            </div>

            <div className="relative mb-4">
              <textarea
                readOnly
                rows={10}
                value={JSON.stringify(projects, null, 2)}
                className="w-full p-3 font-mono text-[11px] bg-neutral-50 border border-neutral-200 focus:outline-none text-neutral-700"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handleDownloadJSON}
                className="px-3 py-2 border border-neutral-200 hover:border-neutral-900 text-xs text-neutral-800 flex items-center gap-1.5 transition-colors"
              >
                <Download size={13} />
                <span>Télécharger fichier JSON</span>
              </button>

              <button
                onClick={handleCopyCode}
                className="px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 text-xs flex items-center gap-1.5 transition-colors"
              >
                {copiedNotification ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedNotification ? 'Copié dans le presse-papier !' : 'Copier tout le JSON'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
