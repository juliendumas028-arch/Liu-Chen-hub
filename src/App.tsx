import React, { useState, useEffect } from 'react';
import { Welcome } from './components/Welcome';
import { Header } from './components/Header';
import { MinimalGrid } from './components/MinimalGrid';
import { ProjectViewer } from './components/ProjectViewer';
import { ProjectCurator } from './components/ProjectCurator';
import { ProjectEditModal } from './components/ProjectEditModal';
import { getStoredProjects, saveStoredProjects, resetStoredProjects } from './utils/curatorStorage';
import { ProjectItem } from './types';
import { Sliders } from 'lucide-react';

export type Tab = 'home' | 'tv' | 'photography' | 'about' | 'contact';
export type Language = 'en' | 'fr' | 'cn';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [lang, setLang] = useState<Language>('fr');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Dynamic curated projects state (synced with localStorage)
  const [projects, setProjects] = useState<ProjectItem[]>(() => getStoredProjects());
  const [isCuratorOpen, setIsCuratorOpen] = useState(false);
  const [isGridCurationActive, setIsGridCurationActive] = useState(false);
  const [editingProjectDirect, setEditingProjectDirect] = useState<ProjectItem | null>(null);

  // Option A Security: visible in Google AI Studio or localhost, or with secret param (?curator or ?admin)
  // Completely hidden from regular visitors on GitHub Pages / custom domain
  const [canAccessCurator, setCanAccessCurator] = useState(false);

  useEffect(() => {
    const host = window.location.hostname;
    const search = window.location.search;
    const hash = window.location.hash;

    const isDevOrStudio = host.includes('run.app') || host.includes('localhost') || host.includes('127.0.0.1');
    const hasSecretKey = search.includes('curator') || search.includes('admin') || hash === '#curator';

    if (hasSecretKey) {
      sessionStorage.setItem('curator_auth', 'true');
      setCanAccessCurator(true);
    } else if (sessionStorage.getItem('curator_auth') === 'true') {
      setCanAccessCurator(true);
    } else {
      setCanAccessCurator(isDevOrStudio);
    }
  }, []);

  // Handle Deep Linking (#video-id)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const found = projects.find(p => p.id === hash || p.bvid === hash);
        if (found) {
          setHasEntered(true);
          setSelectedProject(found);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [projects]);

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProject(project);
    window.location.hash = project.id;
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleUpdateProjects = (newProjects: ProjectItem[]) => {
    setProjects(newProjects);
    saveStoredProjects(newProjects);
  };

  const handleResetProjects = () => {
    const defaultList = resetStoredProjects();
    setProjects(defaultList);
  };

  const handleMoveProject = (project: ProjectItem, direction: 'left' | 'right' | 'top') => {
    const index = projects.findIndex(p => p.id === project.id);
    if (index === -1) return;

    const list = [...projects];
    if (direction === 'top') {
      if (index === 0) return;
      const [moved] = list.splice(index, 1);
      list.unshift(moved);
    } else if (direction === 'left') {
      if (index <= 0) return;
      const temp = list[index - 1];
      list[index - 1] = list[index];
      list[index] = temp;
    } else if (direction === 'right') {
      if (index >= list.length - 1) return;
      const temp = list[index + 1];
      list[index + 1] = list[index];
      list[index] = temp;
    }

    handleUpdateProjects(list);
  };

  const handleSaveDirectProject = (updated: ProjectItem) => {
    const list = projects.map(p => p.id === updated.id ? updated : p);
    handleUpdateProjects(list);
  };

  if (!hasEntered) {
    return <Welcome onEnter={() => setHasEntered(true)} />;
  }

  const aboutContent = {
    en: 'Liu Chen is a director and cinematographer with 14 years of experience in France, holding a Master in Cinema from ENS. Dedicated to the creative execution of commercial films and fashion editorials, combining cinematic light and shadow with an elegant visual aesthetic.',
    fr: 'Liu Chen est réalisatrice et directrice de la photographie avec 14 ans d\'expérience en France, titulaire d\'un Master en Cinéma de l\'ENS. Dédiée à la réalisation créative de films publicitaires et d\'éditoriaux de mode, alliant ombre et lumière cinématographiques à une esthétique visuelle élégante.',
    cn: '刘晨，旅法14年，法国高等师范学院电影硕士。致力于影视广告与时尚大片的创意执行，以电影级的光影语言诠释优雅的视觉美学。'
  };

  return (
    <div className="min-h-screen bg-white relative">
      <Header 
        currentTab={currentTab} 
        onTabChange={setCurrentTab} 
        lang={lang} 
        onLangChange={setLang} 
      />
      
      <main className="pb-24">
        {currentTab === 'home' || currentTab === 'tv' || currentTab === 'photography' ? (
          <MinimalGrid 
            tab={currentTab} 
            lang={lang} 
            projects={projects} 
            onSelectProject={handleSelectProject}
            isGridCurationActive={canAccessCurator && isGridCurationActive}
            onMoveProject={handleMoveProject}
            onEditProject={(p) => setEditingProjectDirect(p)}
            onOpenCurator={() => setIsCuratorOpen(true)}
          />
        ) : currentTab === 'about' ? (
          <div className="max-w-2xl mx-auto px-4 text-center text-neutral-600 leading-relaxed text-[14px] pt-12">
            <p className="mb-4">{aboutContent[lang]}</p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto px-4 text-center text-neutral-600 text-[14px] pt-12 space-y-4">
            <p>
              <a href="mailto:cielisea@gmail.com" className="hover:text-neutral-900 transition-colors">
                cielisea@gmail.com
              </a>
            </p>
            <p>
              <a href="tel:+33664213917" className="hover:text-neutral-900 transition-colors">
                +33 6 64 21 39 17 (Paris)
              </a>
            </p>
            <p className="pt-4 text-neutral-400 text-xs">
              www.cielisea.com
            </p>
          </div>
        )}
      </main>

      {/* 1 Video = 1 Page Dedicated Viewer */}
      <ProjectViewer
        project={selectedProject}
        allProjects={projects}
        lang={lang}
        onClose={handleCloseProject}
        onSelectProject={handleSelectProject}
      />

      {/* Floating Discreet Curator Button (Option A: visible in AI Studio / localhost or secret param) */}
      {canAccessCurator && (
        <>
          <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
            <button
              onClick={() => setIsCuratorOpen(true)}
              className="bg-neutral-900/95 hover:bg-black text-white text-xs px-3.5 py-2 shadow-xl backdrop-blur-xs flex items-center gap-2 transition-all group border border-neutral-700/50"
              title="Ouvrir le studio d'organisation de l'ordre et des textes des projets"
            >
              <Sliders size={13} className="text-amber-400 group-hover:rotate-45 transition-transform" />
              <span className="font-sans font-medium">Studio Curation ({projects.length})</span>
            </button>
          </div>

          {/* Main Studio Curator Slide-Over */}
          <ProjectCurator
            isOpen={isCuratorOpen}
            onClose={() => setIsCuratorOpen(false)}
            projects={projects}
            onUpdateProjects={handleUpdateProjects}
            onResetProjects={handleResetProjects}
            isGridCurationActive={isGridCurationActive}
            onToggleGridCuration={() => setIsGridCurationActive(!isGridCurationActive)}
          />

          {/* Direct Edit Modal for On-Grid editing */}
          <ProjectEditModal
            project={editingProjectDirect}
            isOpen={Boolean(editingProjectDirect)}
            onClose={() => setEditingProjectDirect(null)}
            onSave={handleSaveDirectProject}
          />
        </>
      )}
    </div>
  );
}
