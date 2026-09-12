import { ProjectItem, ProjectCategory } from '../types';
import { rawBilibiliList } from './rawBilibiliList';
import { bilibiliCoversMap } from './bilibiliCoversMap';

// Helper to extract BV ID from URL
function extractBvid(url: string): string {
  const match = url.match(/BV[a-zA-Z0-9]+/);
  return match ? match[0] : '';
}

// Helper to generate a slug id
function generateSlug(title: string, bvid: string, index: number): string {
  const clean = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  return clean ? `${clean}-${index + 1}` : `video-${bvid || index + 1}`;
}

// Categorization helper
function detectCategory(title: string): ProjectCategory {
  const t = title.toLowerCase();
  
  if (t.includes('ponant') || t.includes('邮轮') || t.includes('音乐会') || t.includes('你好中国') || t.includes('快闪') || t.includes('推介') || t.includes('vaux') || t.includes('戛纳') || t.includes('wiba')) {
    return 'events-exhibitions';
  }
  
  if (t.includes('调香师') || t.includes('mv') || t.includes('杜可风') || t.includes('巩俐') || t.includes('功利') || t.includes('电影狂人') || t.includes('拉斯冯提尔')) {
    return 'cinema-fiction';
  }

  if (t.includes('苏菲玛索') || t.includes('于佩尔') || t.includes('蔡依林') || t.includes('马岩松') || t.includes('ccd') || t.includes('cdd') || t.includes('访谈') || t.includes('杨澜') || t.includes('采访')) {
    return 'interviews-designers';
  }

  if (t.includes('aito') || t.includes('cgn') || t.includes('seres') || t.includes('easysent') || t.includes('easylog') || t.includes('白象') || t.includes('论坛') || t.includes('餐厅') || t.includes('汽车') || t.includes('深蓝') || t.includes('carita')) {
    return 'brand-commercial';
  }

  return 'fashion-beauty';
}

// Helper to create trilingual titles & descriptions
function generateProjectMetadata(raw: { title: string; date: string; url: string }, index: number): ProjectItem {
  const bvid = extractBvid(raw.url);
  const category = detectCategory(raw.title);
  const year = raw.date ? raw.date.substring(0, 4) : '2025';

  // Retrieve official Bilibili thumbnail and duration if available
  const biliInfo = bilibiliCoversMap[bvid];
  const officialCover = biliInfo?.pic;
  const officialDuration = biliInfo?.durationFormatted;

  // Fallback aesthetic curated images if Bilibili cover isn't loaded
  const categoryImages: Record<ProjectCategory, string[]> = {
    'fashion-beauty': [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80'
    ],
    'interviews-designers': [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80'
    ],
    'brand-commercial': [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    'events-exhibitions': [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80'
    ],
    'cinema-fiction': [
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1200&q=80'
    ],
    'all': []
  };

  const imgPool = categoryImages[category] || categoryImages['fashion-beauty'];
  const coverImage = officialCover || imgPool[index % imgPool.length];

  let titleFr = raw.title;
  let titleEn = raw.title;
  let client = 'Production & Réalisation';

  if (raw.title.includes('苏菲玛索')) {
    titleFr = raw.title.replace('苏菲玛索', 'Sophie Marceau');
    titleEn = titleFr;
    client = 'MaFrance / Sophie Marceau';
  } else if (raw.title.includes('Ponant')) {
    titleFr = raw.title.replace('Ponant 邮轮', 'Croisières Ponant');
    titleEn = raw.title.replace('Ponant 邮轮', 'Ponant Cruises');
    client = 'Compagnie du Ponant';
  } else if (raw.title.includes('AITO')) {
    titleFr = raw.title.replace('AITO巴黎车展', 'AITO Mondial de l\'Auto Paris');
    titleEn = raw.title.replace('AITO巴黎车展', 'AITO Paris Motor Show');
    client = 'AITO Auto';
  } else if (raw.title.includes('CGN')) {
    titleFr = raw.title.replace('CGN 世界核工展', 'CGN World Nuclear Exhibition');
    client = 'China General Nuclear Power Group (CGN)';
  } else if (raw.title.includes('Seres')) {
    client = 'SERES Automobile';
  } else if (raw.title.includes('Fabrique')) {
    client = 'Fabrique Global';
  } else if (raw.title.includes('Cible')) {
    client = 'Cible Skin Paris';
  } else if (raw.title.includes('CCD') || raw.title.includes('CDD')) {
    client = 'CCD Design & Architecture';
  } else if (raw.title.includes('PM')) {
    client = 'PM Brand Paris';
  }

  const slug = generateSlug(raw.title, bvid, index);

  return {
    id: slug,
    title: titleEn,
    titleCn: raw.title,
    titleFr: titleFr,
    subtitle: `${client} • ${raw.date}`,
    client: client,
    year: year,
    category: category,
    roles: ['Director of Photography', 'Cinematographer'],
    rolesFr: ['Directrice de la Photographie', 'Réalisatrice'],
    rolesCn: ['摄影指导', '主掌镜'],
    tags: [`#${year}`, `#${category}`, `#Paris`, `#Bilibili`],
    coverImage: coverImage,
    galleryImages: [],
    descriptionEn: `Cinematographic project: ${raw.title}. Directed and photographed by Liu Chen in France & Europe.`,
    descriptionFr: `Projet cinématographique et commercial : ${raw.title}. Réalisation et direction de la photographie par Liu Chen.`,
    descriptionCn: `影视作品：《${raw.title}》。刘晨旅法执导与摄影创作，以电影级光影呈现。`,
    location: 'Paris / Europe',
    bilibiliUrl: raw.url,
    bvid: bvid,
    videoDuration: officialDuration || 'HD Video'
  };
}

export const projectsData: ProjectItem[] = rawBilibiliList.map((item, index) => 
  generateProjectMetadata(item, index)
);

export const clientLogos = [
  { name: 'Cartier', category: 'Haute Joaillerie', logo: '' },
  { name: 'Guerlain (LVMH)', category: 'Luxe & Beauté', logo: '' },
  { name: 'Versace', category: 'Haute Couture', logo: '' },
  { name: 'Valentino', category: 'Mode', logo: '' },
  { name: 'W Magazine', category: 'Presse Internationale', logo: '' },
  { name: 'V Magazine', category: 'Presse Internationale', logo: '' },
  { name: 'Harper\'s Bazaar', category: 'Presse Internationale', logo: '' },
  { name: 'ELLE', category: 'Presse Internationale', logo: '' },
  { name: 'T Magazine', category: 'Presse Internationale', logo: '' },
  { name: 'AITO Auto', category: 'Automobile & Mobilité', logo: '' },
  { name: 'Deepal Auto', category: 'Automobile', logo: '' },
  { name: 'Compagnie du Ponant', category: 'Voyages & Expéditions', logo: '' },
  { name: 'CGN Clean Energy', category: 'Énergie Propre', logo: '' },
  { name: 'Bosideng', category: 'Design Mode', logo: '' },
  { name: 'Fabrique', category: 'Créateurs Internationaux', logo: '' }
];

export const pdfSpreadsData = [
  {
    pageNumber: 1,
    title: 'Cover: Liu Chen Cinematography Portfolio',
    category: 'Cover',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80',
    fullImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    ocrText: 'Liu Chen Portfolio'
  }
];
