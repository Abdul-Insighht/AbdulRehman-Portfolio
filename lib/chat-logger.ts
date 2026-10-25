import fs from 'fs';
import path from 'path';

export interface ChatMessageEntry {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  model?: string;
  latencyMs?: number;
}

export interface ChatSession {
  sessionId: string;
  startedAt: string;
  lastActiveAt: string;
  visitorIp?: string;
  messageCount: number;
  messages: ChatMessageEntry[];
  hasContactIntent: boolean;
}

const CHAT_LOG_FILE = path.join(process.cwd(), 'data', 'chat-sessions.json');

function ensureDataDirectory() {
  const dir = path.dirname(CHAT_LOG_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function loadChatSessions(): ChatSession[] {
  ensureDataDirectory();
  try {
    if (fs.existsSync(CHAT_LOG_FILE)) {
      const data = fs.readFileSync(CHAT_LOG_FILE, 'utf-8');
      return JSON.parse(data) || [];
    }
  } catch (err) {
    console.error('Error reading chat-sessions.json:', err);
  }
  return [];
}

export function saveChatSessions(sessions: ChatSession[]): void {
  ensureDataDirectory();
  try {
    // Keep last 100 sessions to prevent unbounded file growth
    const trimmed = sessions.slice(-100);
    fs.writeFileSync(CHAT_LOG_FILE, JSON.stringify(trimmed, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing chat-sessions.json:', err);
  }
}

export function logChatMessage(
  sessionId: string,
  entry: {
    role: 'user' | 'assistant';
    content: string;
    model?: string;
    latencyMs?: number;
    visitorIp?: string;
  }
): void {
  try {
    const sessions = loadChatSessions();
    let session = sessions.find((s) => s.sessionId === sessionId);
    const now = new Date().toISOString();

    const contactKeywords = ['hire', 'contact', 'email', 'whatsapp', 'call', 'freelance', 'contract', 'rate', 'price', 'reach out'];
    const hasContact = contactKeywords.some((kw) => entry.content.toLowerCase().includes(kw));

    const message: ChatMessageEntry = {
      id: Math.random().toString(36).substring(2, 9),
      role: entry.role,
      content: entry.content,
      timestamp: now,
      model: entry.model,
      latencyMs: entry.latencyMs,
    };

    if (!session) {
      session = {
        sessionId,
        startedAt: now,
        lastActiveAt: now,
        visitorIp: entry.visitorIp,
        messageCount: 1,
        messages: [message],
        hasContactIntent: hasContact,
      };
      sessions.push(session);
    } else {
      session.lastActiveAt = now;
      session.messageCount += 1;
      session.messages.push(message);
      if (hasContact) session.hasContactIntent = true;
    }

    saveChatSessions(sessions);
  } catch (error) {
    console.error('Failed to log chat message:', error);
  }
}
