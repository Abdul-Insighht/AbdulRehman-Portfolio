import { NextRequest, NextResponse } from 'next/server';
import { getCachedProjects, syncProjectsWithGitHub } from '@/lib/github-sync';
import { ProjectDomain } from '@/types/project';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain') as ProjectDomain | null;
    const featuredOnly = searchParams.get('featured') === 'true';
    const search = searchParams.get('search')?.toLowerCase().trim();
    const shouldSync = searchParams.get('refresh') === 'true';

    // If explicit refresh requested, trigger sync first
    if (shouldSync) {
      await syncProjectsWithGitHub();
    }

    let projects = getCachedProjects();

    // Domain counts before filtering
    const domainCounts: Record<string, number> = {
      all: projects.length,
      'computer-vision': 0,
      'agentic-ai': 0,
      'deep-learning': 0,
      'data-science': 0,
      'web-fullstack': 0,
      other: 0,
    };

    projects.forEach((p) => {
      if (domainCounts[p.domain] !== undefined) {
        domainCounts[p.domain]++;
      } else {
        domainCounts.other++;
      }
    });

    // Apply domain filter
    if (domain && domain !== 'all') {
      projects = projects.filter((p) => p.domain === domain);
    }

    // Apply featured filter
    if (featuredOnly) {
      projects = projects.filter((p) => p.featured);
    }

    // Apply search filter
    if (search) {
      projects = projects.filter((p) => {
        const inTitle = p.title.toLowerCase().includes(search);
        const inDesc = p.description.toLowerCase().includes(search);
        const inTags = p.tags.some((t) => t.toLowerCase().includes(search));
        const inLang = p.language?.toLowerCase().includes(search);
        return inTitle || inDesc || inTags || inLang;
      });
    }

    return NextResponse.json({
      success: true,
      total: projects.length,
      domainCounts,
      projects,
      lastSyncedAt: projects[0]?.lastSyncedAt || new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in /api/projects:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch projects',
      },
      { status: 500 }
    );
  }
}
