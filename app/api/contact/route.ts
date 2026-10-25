import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const LEADS_FILE_PATH = path.join(process.cwd(), 'data', 'contact-leads.json');

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  projectType: string;
  timeline: string;
  description: string;
  source: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'contacted';
}

function loadLeads(): ContactLead[] {
  try {
    if (fs.existsSync(LEADS_FILE_PATH)) {
      const data = fs.readFileSync(LEADS_FILE_PATH, 'utf-8');
      return JSON.parse(data) || [];
    }
  } catch (err) {
    console.error('Error reading contact-leads.json:', err);
  }
  return [];
}

function saveLeads(leads: ContactLead[]): void {
  try {
    const dir = path.dirname(LEADS_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(leads.slice(-200), null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing contact-leads.json:', err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, projectType, timeline, description, source } = body;
    const messageText = description || body.message || body.problemDescription;
    const finalProjectType = projectType || body.service || 'General Consultation';

    if (!name || !email || !messageText) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and problem description are required.' },
        { status: 400 }
      );
    }

    const lead: ContactLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: String(name).trim(),
      email: String(email).trim(),
      projectType: finalProjectType,
      timeline: timeline || 'Exploring / not urgent',
      description: String(messageText).trim(),
      source: source || 'Direct Portfolio',
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    const existingLeads = loadLeads();
    existingLeads.unshift(lead);
    saveLeads(existingLeads);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. Hafiz Abdul Rehman will reply within one business day.',
      leadId: lead.id,
    });
  } catch (error: any) {
    console.error('Error saving contact lead:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing contact message.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const leads = loadLeads();
  return NextResponse.json({ success: true, count: leads.length, leads });
}
