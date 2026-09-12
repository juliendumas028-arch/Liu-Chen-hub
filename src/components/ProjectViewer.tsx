import React, { useEffect, useState } from 'react';
import { ProjectItem } from '../types';
import { Language } from '../App';
import { getBilibiliEmbedUrl } from '../utils/bilibili';

interface ProjectViewerProps {
  project: ProjectItem | null;
  allProjects: ProjectItem[];
  lang: Language;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({ 
  project, 
  allProjects,
  lang, 
  onClose,
  onSelectProject
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const title = lang === 'cn' ? project.titleCn : lang === 'fr' ? project.titleFr : project.title;
  const roles = lang === 'cn' ? project.rolesCn : lang === 'fr' ? project.rolesFr : project.roles;
  const description = lang === 'cn' ? project.descriptionCn : lang === 'fr' ? project.descriptionFr : project.descriptionEn;
  const embedUrl = getBilibiliEmbedUrl(project.bilibiliUrl || project.videoUrl || project.bvid);

  const handleCopyLink = () => {
    const directUrl = `${window.location.origin}${window.location.pathname}#${project.id}`;
    navigator.clipboard.writeText(directUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-6 md:p-8 animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Single Page / Video Modal */}
      <div className="relative z-10 w-full max-w-5xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Minimal Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-white">
          {/* Navigation Prev / Next */}
          <div className="flex items-center gap-4 text-[12px] font-sans text-neutral-400">
            <button
              onClick={() => onSelectProject(prevProject)}
              className="hover:text-neutral-900 transition-colors"
              title="Previous project"
            >
              ← {lang === 'cn' ? '上一个' : lang === 'fr' ? 'précédent' : 'prev'}
            </button>
            <span className="text-neutral-200">/</span>
            <button
              onClick={() => onSelectProject(nextProject)}
              className="hover:text-neutral-900 transition-colors"
              title="Next project"
            >
              {lang === 'cn' ? '下一个' : lang === 'fr' ? 'suivant' : 'next'} →
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-[13px] text-neutral-400 hover:text-neutral-900 transition-colors lowercase font-sans px-2 py-1"
          >
            {lang === 'cn' ? '返回列表' : lang === 'fr' ? 'fermer' : 'close'} ✕
          </button>
        </div>

        {/* Media Player Container */}
        <div className="overflow-y-auto p-4 sm:p-6 bg-white space-y-6">
          
          {/* 16:9 Bilibili HD Video Player */}
          {embedUrl ? (
            <div className="w-full aspect-[16/9] bg-black relative shadow-inner overflow-hidden">
              <iframe
                src={embedUrl}
                title={title}
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups"
              />
            </div>
          ) : (
            <div className="w-full aspect-[16/9] bg-neutral-100 overflow-hidden">
              <img
                src={project.coverImage}
                alt={title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Project Details & Metadata Header */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-100 pb-4">
              <div>
                <h1 className="text-xl sm:text-2xl text-neutral-900 font-serif font-normal">
                  {title}
                </h1>
                <p className="text-[13px] text-neutral-400 font-serif mt-1">
                  {project.subtitle || project.client}
                </p>
              </div>

              {/* Action Buttons: Share & Direct Bilibili */}
              <div className="flex items-center gap-3 pt-2 sm:pt-0 text-[12px] font-sans text-neutral-500">
                <button
                  onClick={handleCopyLink}
                  className="hover:text-neutral-900 transition-colors underline"
                >
                  {copied 
                    ? (lang === 'cn' ? '已复制链接！' : lang === 'fr' ? 'Lien copié !' : 'Link copied!') 
                    : (lang === 'cn' ? '分享此页面 🔗' : lang === 'fr' ? 'Partager ce projet 🔗' : 'Share 🔗')}
                </button>
                
                {project.bilibiliUrl && (
                  <>
                    <span className="text-neutral-200">|</span>
                    <a
                      href={project.bilibiliUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-neutral-900 transition-colors underline"
                    >
                      Bilibili ↗
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Structured Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 text-[12px] text-neutral-600 font-serif">
              <div>
                <span className="block text-neutral-400 text-[10px] uppercase font-sans tracking-wider mb-0.5">
                  {lang === 'cn' ? '年份 / 时长' : lang === 'fr' ? 'Année / Durée' : 'Year / Duration'}
                </span>
                <span>{project.year} {project.videoDuration ? `(${project.videoDuration})` : ''}</span>
              </div>

              <div>
                <span className="block text-neutral-400 text-[10px] uppercase font-sans tracking-wider mb-0.5">
                  {lang === 'cn' ? '客户 / 品牌' : lang === 'fr' ? 'Client / Marque' : 'Client'}
                </span>
                <span>{project.client || '-'}</span>
              </div>

              <div>
                <span className="block text-neutral-400 text-[10px] uppercase font-sans tracking-wider mb-0.5">
                  {lang === 'cn' ? '主创角色' : lang === 'fr' ? 'Rôle / Crédits' : 'Role'}
                </span>
                <span>{roles && roles.length > 0 ? roles.join(', ') : 'Director of Photography'}</span>
              </div>

              <div>
                <span className="block text-neutral-400 text-[10px] uppercase font-sans tracking-wider mb-0.5">
                  {lang === 'cn' ? '拍摄地点' : lang === 'fr' ? 'Lieu' : 'Location'}
                </span>
                <span>{project.location || 'Paris, France'}</span>
              </div>
            </div>

            {/* Custom Description */}
            {description && (
              <div className="pt-2 text-[13px] text-neutral-700 leading-relaxed font-serif bg-neutral-50 p-4 border border-neutral-100">
                <p>{description}</p>
              </div>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-[11px] text-neutral-400 font-sans">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
