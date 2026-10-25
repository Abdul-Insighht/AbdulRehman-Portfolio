import { NextRequest, NextResponse } from 'next/server';
import { getCachedProjects } from '@/lib/github-sync';
import { loadChatSessions } from '@/lib/chat-logger';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

function loadContactLeads() {
  const filePath = path.join(process.cwd(), 'data', 'contact-leads.json');
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8')) || [];
    }
  } catch (e) {
    console.error('Error loading contact leads:', e);
  }
  return [];
}

export async function GET(request: NextRequest) {
  try {
    const projects = getCachedProjects();
    const chatSessions = loadChatSessions();
    const contactLeads = loadContactLeads();

    const stats = {
      totalProjects: projects.length,
      featuredProjects: projects.filter((p) => p.featured).length,
      totalChatSessions: chatSessions.length,
      totalChatMessages: chatSessions.reduce((acc, s) => acc + s.messageCount, 0),
      totalLeads: contactLeads.length,
      leadsWithContactIntent: chatSessions.filter((s) => s.hasContactIntent).length,
      lastSyncedAt: projects[0]?.lastSyncedAt || new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      stats,
      metrics: stats,
      projects,
      chatSessions,
      contactLeads,
      leads: contactLeads,
    });
  } catch (error: any) {
    console.error('Error in /api/admin/data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admin data.' },
      { status: 500 }
    );
  }
}
