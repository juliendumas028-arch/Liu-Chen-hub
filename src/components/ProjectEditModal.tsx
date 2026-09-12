import React, { useState } from 'react';
import { ProjectItem, ProjectCategory } from '../types';
import { X, Check, Eye, Film, Calendar, Tag, User, Globe } from 'lucide-react';

interface ProjectEditModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProject: ProjectItem) => void;
}

const CATEGORY_OPTIONS: { id: ProjectCategory; label: string }[] = [
  { id: 'fashion-beauty', label: 'Mode & Beauté (Fashion & Beauty)' },
  { id: 'interviews-designers', label: 'Célébrités & Interviews (Celebrities)' },
  { id: 'brand-commercial', label: 'Marques & Publicités (Brand & Commercial)' },
  { id: 'events-exhibitions', label: 'Voyages & Salons (Events & Exhibitions)' },
  { id: 'cinema-fiction', label: 'Cinéma & Fiction (Cinema)' }
];

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({
  project,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen || !project) return null;

  const [formData, setFormData] = useState<ProjectItem>({
    ...project,
    titleCn: project.titleCn || '',
    titleFr: project.titleFr || '',
    title: project.title || '',
    subtitle: project.subtitle || '',
    client: project.client || '',
    year: project.year || '2024',
    category: project.category || 'fashion-beauty',
    descriptionFr: project.descriptionFr || '',
    descriptionCn: project.descriptionCn || '',
    descriptionEn: project.descriptionEn || '',
    rolesFr: project.rolesFr || ['Directrice de la Photographie'],
    rolesCn: project.rolesCn || ['摄影指导'],
    roles: project.roles || ['Director of Photography'],
    tags: project.tags || [],
    coverImage: project.coverImage || '',
    featured: project.featured || false
  });

  const [tagInput, setTagInput] = useState(formData.tags.join(', '));
  const [activeTab, setActiveTab] = useState<'info' | 'texts' | 'media'>('info');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ProjectItem = {
      ...formData,
      tags: tagInput.split(',').map(t => t.trim()).filter(Boolean)
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl bg-white shadow-2xl border border-neutral-200 flex flex-col my-8 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/70">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-mono">
              Édition Métadonnées Projet
            </span>
            <h2 className="text-[16px] font-serif text-neutral-900 truncate max-w-md">
              {formData.titleFr || formData.titleCn || 'Sans titre'}
            </h2>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs for fast switching */}
        <div className="flex border-b border-neutral-100 px-6 gap-6 text-[13px] font-sans">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`py-3 transition-colors border-b-2 ${
              activeTab === 'info'
                ? 'border-neutral-900 text-neutral-900 font-medium'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Informations Générales
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('texts')}
            className={`py-3 transition-colors border-b-2 ${
              activeTab === 'texts'
                ? 'border-neutral-900 text-neutral-900 font-medium'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Titres & Textes (FR / 中文 / EN)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('media')}
            className={`py-3 transition-colors border-b-2 ${
              activeTab === 'media'
                ? 'border-neutral-900 text-neutral-900 font-medium'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Vignette & Vidéo Bilibili
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-[13px]">
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-600 font-medium mb-1 flex items-center gap-1.5">
                    <User size={14} className="text-neutral-400" /> Client / Marque
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={e => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Ex: Sophie Marceau, YSL, Cartier..."
                    className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 font-medium mb-1 flex items-center gap-1.5">
                    <Calendar size={14} className="text-neutral-400" /> Année
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2024"
                    className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 font-medium mb-1 flex items-center gap-1.5">
                  <Film size={14} className="text-neutral-400" /> Catégorie principale dans la grille
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
                  className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none bg-white"
                >
                  {CATEGORY_OPTIONS.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-600 font-medium mb-1">
                  Rôle (Français)
                </label>
                <input
                  type="text"
                  value={formData.rolesFr.join(', ')}
                  onChange={e => setFormData({ ...formData, rolesFr: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="Directrice de la Photographie, Réalisatrice"
                  className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-medium mb-1 flex items-center gap-1.5">
                  <Tag size={14} className="text-neutral-400" /> Tags (séparés par virgule)
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  placeholder="#Paris, #Commercial, #Fashion, #2024"
                  className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={Boolean(formData.featured)}
                  onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded text-neutral-900 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="featured-checkbox" className="text-neutral-700 cursor-pointer select-none">
                  Mettre en avant sur la page d'accueil (Top Highlight)
                </label>
              </div>
            </div>
          )}

          {activeTab === 'texts' && (
            <div className="space-y-4">
              <div className="border-l-2 border-neutral-900 pl-3">
                <span className="text-[11px] font-mono text-neutral-400 block mb-1 uppercase tracking-wider">
                  🇫🇷 Français (Affichage principal)
                </span>
                <input
                  type="text"
                  value={formData.titleFr}
                  onChange={e => setFormData({ ...formData, titleFr: e.target.value })}
                  placeholder="Titre en français pour la grille..."
                  className="w-full px-3 py-2 mb-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none font-medium"
                />
                <textarea
                  rows={2}
                  value={formData.descriptionFr}
                  onChange={e => setFormData({ ...formData, descriptionFr: e.target.value })}
                  placeholder="Description ou notes d'intention en français..."
                  className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none text-[12px]"
                />
              </div>

              <div className="border-l-2 border-neutral-300 pl-3 pt-2">
                <span className="text-[11px] font-mono text-neutral-400 block mb-1 uppercase tracking-wider">
                  🇨🇳 中文 (Chinese)
                </span>
                <input
                  type="text"
                  value={formData.titleCn}
                  onChange={e => setFormData({ ...formData, titleCn: e.target.value })}
                  placeholder="中文标题..."
                  className="w-full px-3 py-2 mb-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none font-medium"
                />
                <textarea
                  rows={2}
                  value={formData.descriptionCn}
                  onChange={e => setFormData({ ...formData, descriptionCn: e.target.value })}
                  placeholder="中文项目介绍/创作说明..."
                  className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none text-[12px]"
                />
              </div>

              <div className="border-l-2 border-neutral-300 pl-3 pt-2">
                <span className="text-[11px] font-mono text-neutral-400 block mb-1 uppercase tracking-wider">
                  🇬🇧 English (International)
                </span>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="English title..."
                  className="w-full px-3 py-2 mb-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none font-medium"
                />
                <textarea
                  rows={2}
                  value={formData.descriptionEn}
                  onChange={e => setFormData({ ...formData, descriptionEn: e.target.value })}
                  placeholder="English project overview..."
                  className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none text-[12px]"
                />
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-4">
              <div>
                <label className="block text-neutral-600 font-medium mb-1">
                  Image de couverture (URL)
                </label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="URL https://..."
                  className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none font-mono text-xs"
                />
                <p className="text-[11px] text-neutral-400 mt-1">
                  Par défaut, la miniature officielle HD de Bilibili est utilisée. Vous pouvez coller ici n'importe quelle autre image.
                </p>
              </div>

              {formData.coverImage && (
                <div className="w-full max-w-sm aspect-[16/9] overflow-hidden bg-neutral-100 border border-neutral-200 relative">
                  <img
                    src={formData.coverImage}
                    alt="Aperçu miniature"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5">
                    Aperçu actuel
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">
                    Code Bilibili BV
                  </label>
                  <input
                    type="text"
                    value={formData.bvid || ''}
                    onChange={e => setFormData({ ...formData, bvid: e.target.value })}
                    placeholder="BV1..."
                    className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">
                    Durée affichée
                  </label>
                  <input
                    type="text"
                    value={formData.videoDuration || ''}
                    onChange={e => setFormData({ ...formData, videoDuration: e.target.value })}
                    placeholder="01:30"
                    className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-neutral-500 hover:text-neutral-900 text-xs font-sans transition-colors"
            >
              Annuler
            </button>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-5 py-2 bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-sans transition-colors flex items-center gap-1.5"
              >
                <Check size={14} />
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
