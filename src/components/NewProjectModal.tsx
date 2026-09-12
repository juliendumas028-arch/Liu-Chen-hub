import React, { useState } from 'react';
import { ProjectItem, ProjectCategory } from '../types';
import { X, Plus, Sparkles, Film, Calendar, User, Globe, Link2, Image, Check, AlertCircle, Loader2 } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (newProject: ProjectItem, position: 'top' | 'bottom') => void;
}

const CATEGORY_OPTIONS: { id: ProjectCategory; label: string }[] = [
  { id: 'fashion-beauty', label: 'Mode & Beauté (Fashion & Beauty)' },
  { id: 'interviews-designers', label: 'Célébrités & Interviews (Celebrities)' },
  { id: 'brand-commercial', label: 'Marques & Publicités (Brand & Commercial)' },
  { id: 'events-exhibitions', label: 'Voyages & Salons (Events & Exhibitions)' },
  { id: 'cinema-fiction', label: 'Cinéma & Fiction (Cinema)' }
];

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onAddProject
}) => {
  if (!isOpen) return null;

  const [urlOrBvid, setUrlOrBvid] = useState('');
  const [detectedBvid, setDetectedBvid] = useState('');
  const [titleFr, setTitleFr] = useState('');
  const [titleCn, setTitleCn] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [client, setClient] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [category, setCategory] = useState<ProjectCategory>('fashion-beauty');
  const [coverImage, setCoverImage] = useState('');
  const [duration, setDuration] = useState('');
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const [isLoadingBili, setIsLoadingBili] = useState(false);
  const [biliStatus, setBiliStatus] = useState<string | null>(null);

  // Extract BV ID automatically whenever URL or text changes
  const handleUrlChange = (value: string) => {
    setUrlOrBvid(value);
    const match = value.match(/BV[a-zA-Z0-9]+/);
    if (match) {
      setDetectedBvid(match[0]);
    } else {
      setDetectedBvid('');
    }
  };

  // Attempt to fetch metadata from Bilibili API
  const handleFetchBilibili = async () => {
    const bvid = detectedBvid;
    if (!bvid) {
      setBiliStatus('Veuillez entrer une URL valide contenant un code BV (ex: BV1Lk1yBaELo)');
      return;
    }

    setIsLoadingBili(true);
    setBiliStatus('Interrogation de l\'API Bilibili...');

    try {
      const res = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`);
      const data = await res.json();
      if (data && data.data) {
        const biliData = data.data;
        if (biliData.title) {
          setTitleCn(biliData.title);
          if (!titleFr) setTitleFr(biliData.title);
          if (!titleEn) setTitleEn(biliData.title);
        }
        if (biliData.pic) {
          let picUrl = biliData.pic;
          if (picUrl.startsWith('http:')) {
            picUrl = picUrl.replace('http:', 'https:');
          }
          setCoverImage(picUrl);
        }
        if (biliData.duration) {
          const m = Math.floor(biliData.duration / 60);
          const s = biliData.duration % 60;
          setDuration(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
        }
        setBiliStatus('✓ Données et miniature HD récupérées avec succès de Bilibili !');
      } else {
        setBiliStatus('Informations non trouvées via l\'API, vous pouvez saisir les détails manuellement.');
      }
    } catch (err) {
      // Typically browser CORS blocks direct api.bilibili.com from client-side
      setBiliStatus('Code Bilibili reconnu ! Vous pouvez saisir le titre et l\'image de couverture ci-dessous.');
    } finally {
      setIsLoadingBili(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bvid = detectedBvid || (urlOrBvid.startsWith('BV') ? urlOrBvid : '');
    const cleanSlug = (titleFr || titleCn || 'projet')
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    const slug = `${cleanSlug}-${Date.now().toString().slice(-4)}`;

    // Default fallback image if none provided
    const fallbackImage = coverImage || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80';

    const newProject: ProjectItem = {
      id: slug,
      title: titleEn || titleFr || titleCn || 'Nouveau Projet',
      titleCn: titleCn || titleFr || '新作品',
      titleFr: titleFr || titleCn || 'Nouveau Projet',
      subtitle: `${client || 'Production'} • ${year}`,
      client: client || 'Production & Réalisation',
      year: year || '2025',
      category: category,
      roles: ['Director of Photography', 'Cinematographer'],
      rolesFr: ['Directrice de la Photographie', 'Réalisatrice'],
      rolesCn: ['摄影指导', '主掌镜'],
      tags: [`#${year}`, `#${category}`, `#Paris`, `#Bilibili`],
      coverImage: fallbackImage,
      galleryImages: [],
      descriptionEn: `Cinematographic project: ${titleEn || titleFr}. Directed and photographed by Liu Chen.`,
      descriptionFr: `Projet cinématographique et publicitaire : ${titleFr || titleCn}. Réalisation et direction de la photographie par Liu Chen.`,
      descriptionCn: `影视作品：《${titleCn || titleFr}》。刘晨旅法摄影与执导创作。`,
      location: 'Paris / Europe',
      bilibiliUrl: bvid ? `https://www.bilibili.com/video/${bvid}` : urlOrBvid,
      bvid: bvid,
      videoDuration: duration || 'HD Video',
      featured: position === 'top'
    };

    onAddProject(newProject, position);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-white shadow-2xl border border-neutral-200 flex flex-col my-8 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/80">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-mono">
              Nouveau Projet Cinéma / TV
            </span>
            <h2 className="text-[17px] font-serif text-neutral-900">
              Ajouter une nouvelle vidéo Bilibili
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-[13px]">
          
          {/* Step 1: Bilibili URL / BV code */}
          <div className="p-4 bg-neutral-50 border border-neutral-200 space-y-3">
            <label className="block text-neutral-800 font-medium flex items-center gap-2">
              <Link2 size={15} className="text-neutral-500" />
              <span>Lien de la vidéo Bilibili ou Code BV</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={urlOrBvid}
                onChange={e => handleUrlChange(e.target.value)}
                placeholder="Ex: https://www.bilibili.com/video/BV1Lk1yBaELo ou BV1Lk1yBaELo"
                className="flex-1 px-3 py-2 border border-neutral-300 focus:border-neutral-900 focus:outline-none bg-white font-mono text-xs"
              />
              <button
                type="button"
                onClick={handleFetchBilibili}
                disabled={!detectedBvid || isLoadingBili}
                className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 text-white text-xs font-sans flex items-center gap-1.5 transition-colors shrink-0"
              >
                {isLoadingBili ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} className="text-amber-400" />}
                <span>Auto-détecter</span>
              </button>
            </div>

            {detectedBvid && (
              <div className="flex items-center gap-2 text-xs text-neutral-600 font-mono">
                <span className="text-neutral-400">Code BV reconnu :</span>
                <span className="bg-neutral-200 text-neutral-900 px-1.5 py-0.5 font-bold">
                  {detectedBvid}
                </span>
              </div>
            )}

            {biliStatus && (
              <p className="text-[12px] text-neutral-600 font-sans">
                {biliStatus}
              </p>
            )}
          </div>

          {/* Step 2: Titles & Client */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-700 font-medium mb-1">
                  🇫🇷 Titre en Français (principal)
                </label>
                <input
                  type="text"
                  required
                  value={titleFr}
                  onChange={e => setTitleFr(e.target.value)}
                  placeholder="Ex: Campagne Haute Joaillerie 2025"
                  className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-1">
                  🇨🇳 Titre Chinois (Bilibili original)
                </label>
                <input
                  type="text"
                  value={titleCn}
                  onChange={e => setTitleCn(e.target.value)}
                  placeholder="Ex: 巴黎高定大片"
                  className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-neutral-700 font-medium mb-1 flex items-center gap-1.5">
                  <User size={13} className="text-neutral-400" /> Client / Marque
                </label>
                <input
                  type="text"
                  value={client}
                  onChange={e => setClient(e.target.value)}
                  placeholder="Ex: Dior, YSL, Ponant..."
                  className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-neutral-700 font-medium mb-1 flex items-center gap-1.5">
                  <Calendar size={13} className="text-neutral-400" /> Année
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  placeholder="2025"
                  className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-neutral-700 font-medium mb-1">
                  Durée (ex: 01:30)
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  placeholder="01:30"
                  className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-700 font-medium mb-1 flex items-center gap-1.5">
                <Film size={13} className="text-neutral-400" /> Catégorie de la grille
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ProjectCategory)}
                className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none bg-white"
              >
                {CATEGORY_OPTIONS.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 3: Cover Thumbnail */}
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <label className="block text-neutral-700 font-medium flex items-center gap-1.5">
              <Image size={14} className="text-neutral-400" /> URL Image de Couverture / Miniature
            </label>
            <input
              type="text"
              value={coverImage}
              onChange={e => setCoverImage(e.target.value)}
              placeholder="https://i0.hdslb.com/... ou URL Unsplash / image web"
              className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none font-mono text-xs"
            />
            <p className="text-[11px] text-neutral-400">
              💡 Si vous avez l'URL de la miniature Bilibili, collez-la ici. Sinon, une superbe photo cinématique sera attribuée par défaut et vous pourrez la modifier à tout moment.
            </p>

            {coverImage && (
              <div className="w-48 aspect-[16/9] overflow-hidden bg-neutral-100 border border-neutral-200 relative mt-2">
                <img
                  src={coverImage}
                  alt="Aperçu miniature"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>

          {/* Step 4: Position Choice */}
          <div className="pt-3 border-t border-neutral-100">
            <label className="block text-neutral-700 font-medium mb-2">
              Position d'insertion dans le portfolio
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <label className={`p-3 border flex items-center gap-2 cursor-pointer transition-colors ${
                position === 'top' ? 'border-neutral-900 bg-neutral-50 font-medium' : 'border-neutral-200 text-neutral-600'
              }`}>
                <input
                  type="radio"
                  name="position"
                  checked={position === 'top'}
                  onChange={() => setPosition('top')}
                  className="text-neutral-900 focus:ring-0"
                />
                <span>★ En tête (Position #1 - Nouveau)</span>
              </label>

              <label className={`p-3 border flex items-center gap-2 cursor-pointer transition-colors ${
                position === 'bottom' ? 'border-neutral-900 bg-neutral-50 font-medium' : 'border-neutral-200 text-neutral-600'
              }`}>
                <input
                  type="radio"
                  name="position"
                  checked={position === 'bottom'}
                  onChange={() => setPosition('bottom')}
                  className="text-neutral-900 focus:ring-0"
                />
                <span>À la fin de la liste</span>
              </label>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-neutral-500 hover:text-neutral-900 text-xs transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-sans transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus size={14} />
              <span>Créer et ajouter au portfolio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
