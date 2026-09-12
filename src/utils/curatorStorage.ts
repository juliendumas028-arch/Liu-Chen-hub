import { ProjectItem } from '../types';
import { projectsData as defaultProjectsData } from '../data/projectsData';

const STORAGE_KEY = 'liuchen_portfolio_custom_projects_v1';

/**
 * Loads projects from localStorage if available, or returns default projectsData
 */
export function getStoredProjects(): ProjectItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load projects from localStorage:', err);
  }
  return defaultProjectsData;
}

/**
 * Saves projects array to localStorage
 */
export function saveStoredProjects(projects: ProjectItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save projects to localStorage:', err);
  }
}

/**
 * Resets projects to the original initial array
 */
export function resetStoredProjects(): ProjectItem[] {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear stored projects:', err);
  }
  return defaultProjectsData;
}

/**
 * Exports the project array as clean JSON or TypeScript snippet
 */
export function generateExportData(projects: ProjectItem[]): string {
  return JSON.stringify(projects, null, 2);
}
