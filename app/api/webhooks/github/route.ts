import { NextRequest, NextResponse } from 'next/server';
import { syncProjectsWithGitHub } from '@/lib/github-sync';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const event = request.headers.get('x-github-event');
    const signature = request.headers.get('x-hub-signature-256');
    const rawBody = await request.text();

    // Verify secret signature if configured in environment
    const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;
    if (webhookSecret && signature) {
      const hmac = crypto.createHmac('sha256', webhookSecret);
      const digest = `sha256=${hmac.update(rawBody).digest('hex')}`;
      if (signature !== digest) {
        return NextResponse.json({ success: false, error: 'Invalid webhook signature.' }, { status: 401 });
      }
    }

    // Process push, repository, or public events
    if (['push', 'repository', 'public', 'star', 'release'].includes(event || '')) {
      const syncResult = await syncProjectsWithGitHub();
      
      try {
        revalidatePath('/');
        revalidatePath('/projects');
      } catch (err) {
        // Cache revalidation error non-fatal
      }

      return NextResponse.json({
        success: true,
        event,
        message: 'GitHub webhook processed and projects synchronized.',
        syncResult,
      });
    }

    return NextResponse.json({
      success: true,
      event,
      message: `Ignored GitHub event: ${event}`,
    });
  } catch (error: any) {
    console.error('Error handling GitHub webhook:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Webhook processing failed.' },
      { status: 500 }
    );
  }
}
