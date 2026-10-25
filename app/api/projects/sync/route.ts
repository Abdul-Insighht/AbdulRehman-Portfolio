import { NextRequest, NextResponse } from 'next/server';
import { syncProjectsWithGitHub } from '@/lib/github-sync';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Optional secret key verification for production security
    const authHeader = request.headers.get('authorization');
    const adminSecret = process.env.ADMIN_SYNC_SECRET;

    if (adminSecret && authHeader !== `Bearer ${adminSecret}`) {
      // In development or if no secret is set, we permit sync
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { success: false, error: 'Unauthorized sync request.' },
          { status: 401 }
        );
      }
    }

    const result = await syncProjectsWithGitHub();

    if (result.success) {
      // Invalidate Next.js static pages cache for instant update
      try {
        revalidatePath('/');
        revalidatePath('/projects');
      } catch (cacheErr) {
        console.warn('Revalidation warning:', cacheErr);
      }
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error during /api/projects/sync:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Synchronization failed.',
      },
      { status: 500 }
    );
  }
}
