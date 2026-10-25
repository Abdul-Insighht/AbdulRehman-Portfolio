import fs from 'fs';
import path from 'path';

const GITHUB_USERNAME = 'Abdul-Insighht';
const CACHE_FILE_PATH = path.join(process.cwd(), 'data', 'projects-cache.json');

const DOMAIN_LABELS = {
  all: 'All',
  'computer-vision': 'Computer Vision',
  'agentic-ai': 'Agentic AI & RAG',
  'deep-learning': 'Deep Learning & Medical AI',
  'data-science': 'Data Science & Analytics',
  'web-fullstack': 'Full-Stack & Web',
  other: 'General ML & Software',
};

function classifyRepositoryDomain(repo) {
  const combined = `${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')}`.toLowerCase();

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
    combined.includes('sam') ||
    combined.includes('soct') ||
    combined.includes('rrsis') ||
    combined.includes('deep learning')
  ) {
    return 'deep-learning';
  }

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
    combined.includes('vision') ||
    combined.includes('image')
  ) {
    return 'computer-vision';
  }

  if (
    combined.includes('data science') ||
    combined.includes('analytics') ||
    combined.includes('dashboard') ||
    combined.includes('eda') ||
    combined.includes('sentiment') ||
    combined.includes('pandas') ||
    combined.includes('visualization') ||
    combined.includes('recommendation') ||
    combined.includes('statistics')
  ) {
    return 'data-science';
  }

  if (
    combined.includes('nextjs') ||
    combined.includes('react') ||
    combined.includes('fastapi') ||
    combined.includes('flask') ||
    combined.includes('django') ||
    combined.includes('full-stack') ||
    combined.includes('web') ||
    combined.includes('portfolio')
  ) {
    return 'web-fullstack';
  }

  return 'other';
}

function formatProjectTitle(repoName) {
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
    .replace(/\bsam\b/gi, 'SAM')
    .replace(/\brrsis\b/gi, 'RRSIS')
    .trim();

  title = title.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1));
  return title;
}

function getDefaultDomainImage(domain) {
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

async function run() {
  console.log('Fetching live GitHub repositories...');
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&direction=desc`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'AbdulRehman-Sync-CLI'
    }
  });

  const ghRepos = await res.json();
  console.log(`Fetched ${ghRepos.length} repos from GitHub.`);

  // Load existing curated
  let curated = [];
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'data', 'projects-cache.json'), 'utf-8');
    curated = JSON.parse(raw);
  } catch (e) {
    // will populate from scratch
  }

  const curatedMap = new Map();
  curated.forEach((p) => {
    curatedMap.set(p.name.toLowerCase(), p);
    curatedMap.set(p.slug.toLowerCase(), p);
  });

  const merged = [];
  const processedNames = new Set();

  for (const gh of ghRepos) {
    if (gh.name.toLowerCase() === GITHUB_USERNAME.toLowerCase()) continue; // skip profile readme repo
    if (gh.fork) continue; // skip forks

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

    merged.push({
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

  // Preserve any curated not in ghRepos
  for (const c of curated) {
    if (!processedNames.has(c.name.toLowerCase())) {
      merged.push(c);
    }
  }

  // Ensure top flagship projects are featured
  const flagshipSlugs = [
    'brain-tumor-segmentation',
    'covid-19-detection-cnn-ensemble',
    'real-time-football-player-tracking',
    'vehicle-speed-detection-system',
    'research-components-extractor-rag',
    'sign-language-recognition-mediapipe',
    'ai-global-travel-planner',
    'kidney-disease-classification-dl',
    'social-distance-violation-detector',
    'autostatagent-automated-eda',
    'ats-system-using-rag',
    'sentiment-analysis-dashboard',
    'soct-sam',
    'final_rrsis'
  ];

  merged.forEach((p) => {
    if (flagshipSlugs.some(s => p.slug.toLowerCase().includes(s) || p.name.toLowerCase().includes(s))) {
      p.featured = true;
    }
  });

  // Sort: featured first, then pushed_at
  merged.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.pushedAt || b.updatedAt).getTime() - new Date(a.pushedAt || a.updatedAt).getTime();
  });

  const dir = path.dirname(CACHE_FILE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(merged, null, 2), 'utf-8');

  console.log(`Saved ${merged.length} projects to ${CACHE_FILE_PATH}!`);

  // Print domain summary
  const summary = {};
  merged.forEach(p => {
    summary[p.domain] = (summary[p.domain] || 0) + 1;
  });
  console.log('Domain Distribution:', summary);
}

run();
