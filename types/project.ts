export type ProjectDomain =
  | 'all'
  | 'computer-vision'
  | 'agentic-ai'
  | 'deep-learning'
  | 'data-science'
  | 'web-fullstack'
  | 'other';

export interface ProjectCaseStudy {
  hook?: string;
  problem?: string;
  solution?: string;
  architecture?: string[];
  keyFeatures?: string[];
  metrics?: string;
  stack?: string[];
}

export interface Project {
  id: string | number;
  slug: string;
  name: string; // GitHub repository name (e.g. "Brain-Tumor-Segmentation-BraTS-2020")
  title: string; // Display title (e.g. "Brain Tumor Segmentation")
  description: string;
  domain: ProjectDomain;
  domainLabel: string;
  tags: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  accuracy?: string;
  featured: boolean;
  pinned: boolean;
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
  pushedAt: string;
  createdAt: string;
  hasReadme?: boolean;
  caseStudy?: ProjectCaseStudy;
  source: 'github' | 'manual';
  isPublished: boolean;
  lastSyncedAt?: string;
}

export interface ProjectDomainFilter {
  id: ProjectDomain;
  label: string;
  count?: number;
  icon?: string;
}

export interface GitHubRepoResponse {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  visibility: string;
  default_branch: string;
}

export interface SyncResult {
  success: boolean;
  totalSynced: number;
  newProjects: number;
  updatedProjects: number;
  timestamp: string;
  errors?: string[];
}
