export type Language = 'fr' | 'cn' | 'en';
export type ThemeMode = 'dark' | 'light';
export type ViewMode = 'grid' | 'filmstrip' | 'pdf-book' | 'compact';

export type ProjectCategory = 
  | 'all'
  | 'fashion-beauty'
  | 'interviews-designers'
  | 'brand-commercial'
  | 'events-exhibitions'
  | 'cinema-fiction';

export interface ProjectMedia {
  url: string;
  caption?: string;
  captionFr?: string;
  captionCn?: string;
  isStoryboard?: boolean;
  aspect?: 'landscape' | 'portrait' | 'square';
}

export interface ProjectItem {
  id: string;
  title: string;
  titleCn: string;
  titleFr: string;
  subtitle?: string;
  client: string;
  year: string;
  category: ProjectCategory;
  roles: string[];
  rolesFr: string[];
  rolesCn: string[];
  tags: string[];
  coverImage: string;
  galleryImages: ProjectMedia[];
  storyboardComparison?: {
    storyboard: string;
    actualShot: string;
    title: string;
  }[];
  descriptionEn: string;
  descriptionFr: string;
  descriptionCn: string;
  location?: string;
  collaborators?: string;
  featured?: boolean;
  videoUrl?: string;
  bilibiliUrl?: string;
  bvid?: string;
  videoPlaceholderUrl?: string;
  videoDuration?: string;
  pdfPages?: number[];
}

export interface PDFSpread {
  pageNumber: number;
  title: string;
  category: string;
  thumbnail: string;
  fullImage: string;
  ocrText?: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  company: string;
  serviceType: string;
  date: string;
  budgetRange: string;
  location: string;
  message: string;
}
