import fs from 'fs';
import path from 'path';
import { Project, ProjectDomain, GitHubRepoResponse, SyncResult } from '@/types/project';
import { INITIAL_CURATED_PROJECTS, DOMAIN_LABELS } from '@/data/curated-projects';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'Abdul-Insighht';
const CACHE_FILE_PATH = path.join(process.cwd(), 'data', 'projects-cache.json');

/**
 * Intelligent domain classification based on repo name, description, and topics.
 */
export function classifyRepositoryDomain(repo: {
  name: string;
  description: string | null;
  topics?: string[];
  language?: string | null;
}): ProjectDomain {
  const combined = `${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')}`.toLowerCase();

  // Agentic AI & RAG
  if (
    combined.includes('rag') ||
    combined.includes('agent') ||
    combined.includes('langchain') ||
    combined.includes('langgraph') ||
    combined.includes('gemini') ||
    combined.includes('retrieval') ||
    combined.includes('assistant') ||
    combined.includes('llm') ||
    combined.includes('chatbot')
  ) {
    return 'agentic-ai';
  }

  // Deep Learning & Medical AI
  if (
    combined.includes('tumor') ||
    combined.includes('covid') ||
    combined.includes('mri') ||
    combined.includes('brats') ||
    combined.includes('u-net') ||
    combined.includes('unet') ||
    combined.includes('kidney') ||
    combined.includes('medical') ||
    combined.includes('ensemble') ||
    combined.includes('ct scan') ||
    combined.includes('deep learning')
  ) {
    return 'deep-learning';
  }

  // Computer Vision
  if (
    combined.includes('yolo') ||
    combined.includes('opencv') ||
    combined.includes('tracking') ||
    combined.includes('bytetrack') ||
    combined.includes('detection') ||
    combined.includes('mediapipe') ||
    combined.includes('segmentation') ||
    combined.includes('speed') ||
    combined.includes('license') ||
    combined.includes('vehicle') ||
    combined.includes('activity') ||
    combined.includes('vision')
  ) {
    return 'computer-vision';
  }

  // Data Science & Analytics
  if (
    combined.includes('data science') ||
    combined.includes('analytics') ||
    combined.includes('dashboard') ||
    combined.includes('eda') ||
    combined.includes('sentiment') ||
    combined.includes('pandas') ||
    combined.includes('visualization') ||
    combined.includes('statistics')
  ) {
    return 'data-science';
  }

  // Full-Stack & Web
  if (
    combined.includes('nextjs') ||
    combined.includes('react') ||
    combined.includes('fastapi') ||
    combined.includes('flask') ||
    combined.includes('django') ||
    combined.includes('full-stack') ||
    combined.includes('web')
  ) {
    return 'web-fullstack';
  }

  return 'other';
}

/**
 * Format repository name into a clean, human-readable title.
 * e.g. "Brain-Tumor-Segmentation-BraTS-2020" -> "Brain Tumor Segmentation (BraTS 2020)"
 */
export function formatProjectTitle(repoName: string): string {
  let title = repoName
    .replace(/[-_]/g, ' ')
    .replace(/\bbrats\b/gi, '(BraTS)')
    .replace(/\bdl\b/gi, '(Deep Learning)')
    .replace(/\byolo\b/gi, 'YOLO')
    .replace(/\brag\b/gi, '(RAG)')
    .replace(/\bcnn\b/gi, 'CNN')
    .replace(/\bmlops\b/gi, 'MLOps')
    .replace(/\bocr\b/gi, 'OCR')
    .replace(/\beda\b/gi, 'EDA')
    .trim();

  // Capitalize words
  title = title.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1));
  return title;
}

/**
 * Default domain-based fallback images from unsplash (AI/Data/Vision).
 */
export function getDefaultDomainImage(domain: ProjectDomain): string {
  switch (domain) {
    case 'computer-vision':
      return 'https://images.unsplash.com/photo-1507146426996-ef0538887e1f?q=80&w=2000';
    case 'agentic-ai':
      return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000';
    case 'deep-learning':
      return 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2000';
    case 'data-science':
      return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000';
    case 'web-fullstack':
      return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000';
    default:
      return 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000';
  }
}

/**
 * Fetch public repositories from GitHub API with rate limit safety.
 */
export async function fetchGitHubRepositories(): Promise<GitHubRepoResponse[]> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'AbdulRehman-Portfolio-Sync',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&direction=desc`;

  try {
    const res = await fetch(url, {
      headers,
      next: { revalidate: 3600 }, // Next.js ISR: revalidate every hour
    });

    if (!res.ok) {
      console.warn(`GitHub API request failed with status ${res.status}: ${res.statusText}`);
      return [];
    }

    const repos: GitHubRepoResponse[] = await res.json();
    return repos.filter((r) => !r.fork); // exclude forks by default
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}

/**
 * Merge live GitHub repository data with curated overrides.
 */
export function mergeGitHubWithCurated(
  ghRepos: GitHubRepoResponse[],
  curated: Project[] = INITIAL_CURATED_PROJECTS
): Project[] {
  const curatedMap = new Map<string, Project>();
  
  // Index curated projects by lowercase repo name and slug
  curated.forEach((p) => {
    curatedMap.set(p.name.toLowerCase(), p);
    curatedMap.set(p.slug.toLowerCase(), p);
  });

  const mergedList: Project[] = [];
  const processedNames = new Set<string>();

  // 1. Process all GitHub repos from live API
  for (const gh of ghRepos) {
    const nameKey = gh.name.toLowerCase();
    processedNames.add(nameKey);
    const existing = curatedMap.get(nameKey);

    const domain = existing?.domain || classifyRepositoryDomain(gh);
    const domainLabel = DOMAIN_LABELS[domain] || 'General ML';
    const title = existing?.title || formatProjectTitle(gh.name);
    const description = gh.description || existing?.description || 'Autonomous AI/ML engineering project with production code and evaluation.';
    const image = existing?.image || getDefaultDomainImage(domain);
    const tags = Array.from(
      new Set([
        ...(existing?.tags || []),
        ...(gh.topics || []),
        gh.language || 'Python',
      ])
    ).filter(Boolean);

    mergedList.push({
      id: existing?.id || gh.id.toString(),
      slug: existing?.slug || gh.name.toLowerCase(),
      name: gh.name,
      title,
      description,
      domain,
      domainLabel,
      tags,
      image,
      githubUrl: gh.html_url,
      liveUrl: gh.homepage || existing?.liveUrl,
      accuracy: existing?.accuracy,
      featured: existing?.featured ?? false,
      pinned: existing?.pinned ?? false,
      stars: gh.stargazers_count,
      forks: gh.forks_count,
      language: gh.language || 'Python',
      updatedAt: gh.updated_at,
      pushedAt: gh.pushed_at,
      createdAt: gh.created_at,
      caseStudy: existing?.caseStudy,
      source: 'github',
      isPublished: existing ? existing.isPublished : true,
      lastSyncedAt: new Date().toISOString(),
    });
  }

  // 2. Add any curated projects that might not be returned by GitHub (e.g. rate limit, private or offline)
  for (const c of curated) {
    if (!processedNames.has(c.name.toLowerCase())) {
      mergedList.push(c);
    }
  }

  // 3. Sort by pinned, featured, then most recently updated
  return mergedList.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.pushedAt || b.updatedAt).getTime() - new Date(a.pushedAt || a.updatedAt).getTime();
  });
}

/**
 * Load projects from disk cache or fallback to initial curated dataset.
 */
export function getCachedProjects(): Project[] {
  try {
    if (fs.existsSync(CACHE_FILE_PATH)) {
      const data = fs.readFileSync(CACHE_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to read projects cache from disk:', err);
  }
  return INITIAL_CURATED_PROJECTS;
}

/**
 * Persist projects to disk cache for fast serverless retrieval.
 */
export function saveProjectsToCache(projects: Project[]): void {
  try {
    const dir = path.dirname(CACHE_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(projects, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write projects cache to disk:', err);
  }
}

/**
 * Run a full synchronization with GitHub API, merge with curated data, and persist to cache.
 */
export async function syncProjectsWithGitHub(): Promise<SyncResult> {
  const timestamp = new Date().toISOString();
  try {
    const ghRepos = await fetchGitHubRepositories();
    if (ghRepos.length === 0) {
      return {
        success: false,
        totalSynced: 0,
        newProjects: 0,
        updatedProjects: 0,
        timestamp,
        errors: ['No repositories returned from GitHub API or rate limited.'],
      };
    }

    const currentCached = getCachedProjects();
    const existingSlugs = new Set(currentCached.map((p) => p.slug));

    const merged = mergeGitHubWithCurated(ghRepos, currentCached);
    saveProjectsToCache(merged);

    const newCount = merged.filter((p) => !existingSlugs.has(p.slug)).length;
    const updatedCount = merged.length - newCount;

    return {
      success: true,
      totalSynced: merged.length,
      newProjects: newCount,
      updatedProjects: updatedCount,
      timestamp,
    };
  } catch (error: any) {
    console.error('Sync failed:', error);
    return {
      success: false,
      totalSynced: 0,
      newProjects: 0,
      updatedProjects: 0,
      timestamp,
      errors: [error.message || 'Unknown sync error'],
    };
  }
}
