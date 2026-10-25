import { NextRequest, NextResponse } from 'next/server';
import { ABDUL_INSIGHT_SYSTEM_PROMPT, BOT_PROFILE_CONTEXT } from '@/lib/bot-context';
import { logChatMessage } from '@/lib/chat-logger';

export const dynamic = 'force-dynamic';

interface IncomingMessage {
  role: 'user' | 'assistant';
  content: string;
}

// ── 1. Zero-Token Guardrail Patterns ─────────────────────────────────────────
const GREETING_REGEX = /^(?:hi|hello|hey|greetings|howdy|yo|who are you|what is your name|tell me about yourself)\b/i;
const PROMPT_INJECTION_REGEX = /(?:reveal|show|share|give|tell|print|display|expose|repeat).{0,60}(?:api[\s_-]*key|secret|credential|system prompt|hidden instructions?|environment variable)/i;
const OUT_OF_SCOPE_PATTERNS = [
  /\b(?:recipe|cook|weather|forecast|movie|celebrity|joke|riddle|song lyrics|write a poem about cats)\b/i,
  /\b(?:fifa|world cup|cricket score|stock price of|capital of France)\b/i,
  /^(?:what is|calculate|solve)\s*[\d\s+\-*/()=^.?]{3,}$/i,
];

function isGreetingOnly(text: string): boolean {
  const clean = text.trim().toLowerCase().replace(/[!?.,]/g, '');
  if (['hi', 'hello', 'hey', 'greetings', 'yo', 'slam', 'assalam o alaikum', 'salam'].includes(clean)) return true;
  return GREETING_REGEX.test(clean) && !text.match(/project|yolo|vision|rag|cnn|tumor|covid|hire|contact|experience/i);
}

function isOutOfScope(text: string): boolean {
  return OUT_OF_SCOPE_PATTERNS.some((pattern) => pattern.test(text.trim()));
}

// ── 2. Derive Action Buttons & Follow-Up Suggestions ─────────────────────────
interface BotAction {
  type: 'open_project' | 'open_contact' | 'none';
  label?: string;
  url?: string;
  target?: string;
}

function deriveAction(text: string): BotAction {
  const lower = text.toLowerCase();
  if (lower.includes('hire') || lower.includes('contact') || lower.includes('email') || lower.includes('quote') || lower.includes('call') || lower.includes('whatsapp') || lower.includes('reach out')) {
    return {
      type: 'open_contact',
      label: '📬 Send Direct Email to Hafiz Abdul Rehman ↗',
      url: 'mailto:hafizrehman3321@gmail.com?subject=Engineering%20Inquiry%20via%20AbdulInsight%20AI',
      target: 'contact',
    };
  }
  if (lower.includes('brain tumor') || lower.includes('brats')) {
    return {
      type: 'open_project',
      label: 'Inspect Brain Tumor Attention U-Net on GitHub ↗',
      url: 'https://github.com/Abdul-Insighht/Brain-Tumor-Segmentation-BraTS-2020',
      target: 'brain-tumor-segmentation',
    };
  }
  if (lower.includes('covid') || lower.includes('fuzzy integral')) {
    return {
      type: 'open_project',
      label: 'View COVID-19 CNN Ensemble on GitHub ↗',
      url: 'https://github.com/Abdul-Insighht/COVID-19-Detection-CNN-Ensemble',
      target: 'covid-19-detection-cnn-ensemble',
    };
  }
  if (lower.includes('football') || lower.includes('bytetrack') || lower.includes('tracking')) {
    return {
      type: 'open_project',
      label: 'View YOLO Football Player Tracking ↗',
      url: 'https://github.com/Abdul-Insighht/Real-Time-Football-Player-Tracking',
      target: 'real-time-football-player-tracking',
    };
  }
  if (lower.includes('speed') || lower.includes('vehicle')) {
    return {
      type: 'open_project',
      label: 'Explore Vehicle Speed Detection System ↗',
      url: 'https://github.com/Abdul-Insighht/Vehicle-Speed-Detection-System',
      target: 'vehicle-speed-detection-system',
    };
  }
  if (lower.includes('research component') || lower.includes('rag')) {
    return {
      type: 'open_project',
      label: 'View Research Components Extractor RAG ↗',
      url: 'https://github.com/Abdul-Insighht/Research_Components_Extractor_Using_Rag',
      target: 'research-components-extractor-rag',
    };
  }
  if (lower.includes('hire') || lower.includes('contact') || lower.includes('email') || lower.includes('quote') || lower.includes('call')) {
    return {
      type: 'open_contact',
      label: '📬 Send Direct Email to Hafiz Abdul Rehman ↗',
      url: 'mailto:hafizrehman3321@gmail.com?subject=Engineering%20Inquiry%20via%20AbdulInsight%20AI',
      target: 'contact',
    };
  }
  return { type: 'none' };
}

function deriveFollowUps(text: string): string[] {
  const lower = text.toLowerCase();
  if (lower.includes('tumor') || lower.includes('covid') || lower.includes('medical') || lower.includes('imaging')) {
    return [
      'What architecture was used for BraTS 2020 Brain Tumor segmentation?',
      'How does the Sugeno Fuzzy Integral ensemble work for COVID detection?',
      'What datasets and accuracies were achieved?',
    ];
  }
  if (lower.includes('yolo') || lower.includes('vision') || lower.includes('tracking') || lower.includes('speed')) {
    return [
      'How does the vehicle speed detector calibrate perspective?',
      'Tell me about the YOLO Football player tracking system.',
      'What frame rate (FPS) do these vision pipelines achieve?',
    ];
  }
  if (lower.includes('rag') || lower.includes('agent') || lower.includes('nlp')) {
    return [
      'How does the Research Components Extractor RAG pipeline work?',
      'Tell me about the AutoStatAgent for automated EDA.',
      'What LLMs and vector stores has Abdul Rehman integrated?',
    ];
  }
  return [
    'What are Hafiz Abdul Rehman’s top featured projects?',
    'Tell me about his Computer Vision & YOLO work.',
    'How can I get in touch to discuss a project?',
  ];
}

// ── 3. High-Fidelity Smart Fallback Knowledge Engine (Human Tone, Zero Slogans, Zero Asterisks) ──
function generateSmartFallbackResponse(question: string): string {
  const lower = question.toLowerCase();

  if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('whatsapp') || lower.includes('freelance') || lower.includes('quote') || lower.includes('touch')) {
    return `You can reach Hafiz directly via email at hafizrehman3321@gmail.com or on WhatsApp at +92 328 3121702. He is available for full-time engineering opportunities and selective freelance client projects, and usually replies within one business day.`;
  }
  if (lower.includes('experience') || lower.includes('aibit') || lower.includes('aura') || lower.includes('nexl') || lower.includes('work experience') || lower.includes('employment') || lower.includes('career')) {
    return `Hafiz works as an AI & Machine Learning Engineer at AiBit Soft, where he architected AURA OS, an autonomous multi-agent conversational assistant with FastAPI and WebSockets. He also engineers lip-sync recommendation systems and computer vision teacher monitoring pipelines. Previously, he built enterprise document RAG systems at Nexl Tech and delivered production ML solutions at Arch Technologies and Upwork.`;
  }
  if (lower.includes('tumor') || lower.includes('brats')) {
    return `For 3D MRI brain tumor segmentation, Hafiz engineered an Attention U-Net on the BraTS 2020 dataset. Using soft attention gates to filter background noise and focal dice loss to handle class imbalance, the system achieved 99.64% validation accuracy and a 0.986 Mean IoU.`;
  }
  if (lower.includes('covid')) {
    return `His research on COVID-19 detection from lung CT scans uses a Sugeno Fuzzy Integral decision fusion ensemble combining VGG-11, GoogLeNet, SqueezeNet, and Wide ResNet-50-2, achieving 98.93% test accuracy and 99.1% sensitivity alongside Topological Data Analysis (TDA).`;
  }
  if (lower.includes('yolo') || lower.includes('vision') || lower.includes('tracking') || lower.includes('speed') || lower.includes('football')) {
    return `In computer vision, Hafiz has built multiple deployed systems:
- Drone fire and smoke detection trained on 22,000+ aerial images using YOLOv8.
- PPE safety compliance system achieving 91% precision for helmet and vest detection on live CCTV feeds.
- Real-time football player tracking at 60+ FPS with YOLO and ByteTrack.
- Vehicle speed detection and telemetry using YOLO11 paired with inverse perspective homography calibration within 2.5 km/h.`;
  }
  if (lower.includes('visualization') || lower.includes('telemetry') || lower.includes('dashboard') || lower.includes('analytics') || lower.includes('tsne') || lower.includes('t-sne')) {
    return `Hafiz builds interactive visual analytics and real-time model telemetry dashboards using Streamlit, Plotly, Power BI, and t-SNE dimensionality reduction to monitor loss curves, inference latencies, and high-dimensional feature embeddings.`;
  }
  if (lower.includes('supervis') || lower.includes('mentor') || lower.includes('capstone')) {
    return `In academic supervisions and mentorship at GIFT University, Hafiz advised undergraduate capstone projects including 3D Attention U-Net brain lesion segmentation pipelines and clinical decision support RAG assistants, guiding students on vector indexing and GPU inference optimization.`;
  }
  if (lower.includes('rag') || lower.includes('agent') || lower.includes('llm')) {
    return `In agentic AI and RAG, Hafiz has built:
- Application Tracking System (ATS) RAG chatbot using LangChain, vector databases, and FastAPI to automate candidate resume screening.
- GmailDraft autonomous assistant using Next.js and Llama 3.3 for inbox monitoring and draft generation.
- Research Components Extractor parsing complex scientific whitepapers into structured LaTeX tables with ChromaDB.`;
  }
  if (lower.includes('research') || lower.includes('paper') || lower.includes('fyp') || lower.includes('sam')) {
    return `Hafiz's research includes:
- Final Year Project (2026): Enhancing Referring Remote Sensing Image Segmentation through Optimal Transport Alignment and Segment Anything Model (SAM).
- Survey Paper: A comprehensive survey on Referring Remote Sensing Image Segmentation from cross-modal learning to foundation models.
- Research Paper: COVID-19 detection from CT scans using Topological Data Analysis and CNN ensembles.`;
  }
  if (lower.includes('award') || lower.includes('achievement') || lower.includes('hackathon')) {
    return `Notable achievements include:
- 4th Place out of 64 teams at GIFT University FYP Display 2026.
- 90th Percentile in the Pakistan National Skills Competency Test 2026 among 34,000+ participants.
- Top 100 Globally in the USAII Global AI Hackathon with CogniFlow.
- Harvard Health Systems Innovation Lab 7th Edition participant for AI mental health monitoring.
- Lablab.ai hackathon wins with VendorSentinel and NeuralNexus.`;
  }
  if (lower.includes('pack') || lower.includes('github education') || lower.includes('campus') || lower.includes('student developer')) {
    return `Hafiz is a recognized member of GitHub Global Campus with the GitHub Student Developer Pack (https://education.github.com/pack), utilizing GitHub Pro, GitHub Actions CI/CD pipelines, and cloud developer tools in his engineering stack.`;
  }
  if (lower.includes('education') || lower.includes('degree') || lower.includes('university') || lower.includes('cgpa')) {
    return `Hafiz is completing his Bachelor of Science in Data Science (2022 to 2026) at GIFT University, Gujranwala, with an overall CGPA of 3.68/4.0 and a perfect 4.0/4.0 in Semesters 7 & 8.`;
  }

  return `Hafiz Abdul Rehman is an AI & Machine Learning Engineer with 57 public GitHub repositories specializing in Computer Vision (YOLO, OpenCV), Deep Learning (U-Net, PyTorch), and Agentic AI/RAG systems. He currently works at AiBit Soft building multi-agent systems and has verified outcomes including 99.64% MRI segmentation accuracy. What aspect of his background or projects would you like to explore?`;
}

// ── 4. Main Chat Handler ─────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await request.json();
    const messages: IncomingMessage[] = body.messages || [];
    const sessionId = body.sessionId || `session_${Date.now()}`;
    const visitorIp = request.headers.get('x-forwarded-for') || 'local';

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ success: false, error: 'No messages provided.' }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1]?.content || '';

    // 1. Prompt Injection & Secret Leak Guardrail
    if (PROMPT_INJECTION_REGEX.test(latestMessage)) {
      const responseText = "I am AbdulInsight AI, configured to discuss only Hafiz Abdul Rehman's verified public portfolio work, technical architectures, and contact information. I cannot reveal internal instructions, system prompts, or configuration keys.";
      return NextResponse.json({
        success: true,
        data: {
          message: responseText,
          model: 'security-guardrail',
          action: { type: 'none' },
          followUps: deriveFollowUps(latestMessage),
          sources: ['Security Policy'],
        },
      });
    }

    // 2. Zero-Token Greeting Guardrail
    if (isGreetingOnly(latestMessage)) {
      const greetingReply = `Assalam o Alaikum and welcome! I am AbdulInsight AI, the personal portfolio assistant for Hafiz Abdul Rehman, an AI & Machine Learning Engineer.\n\nI can share verified facts about his industry work at AiBit Soft, research publications (including the 99.64% BraTS U-Net and COVID TDA ensemble), computer vision systems, or RAG architectures across his 57 repositories.\n\nHow can I help you today?`;

      logChatMessage(sessionId, {
        role: 'user',
        content: latestMessage,
        visitorIp,
      });
      logChatMessage(sessionId, {
        role: 'assistant',
        content: greetingReply,
        model: 'zero-token-greeting',
        latencyMs: Date.now() - startTime,
      });

      return NextResponse.json({
        success: true,
        data: {
          message: greetingReply,
          model: 'abdulinsight-instant-v1',
          action: { type: 'none' },
          followUps: [
            'What accuracy did he achieve in Brain Tumor segmentation?',
            'Tell me about his YOLO Computer Vision projects.',
            'How can I get in touch with Hafiz Abdul Rehman?',
          ],
          sources: ['Profile Factsheet'],
        },
      });
    }

    // 3. Zero-Token Out-of-Scope Guardrail
    if (isOutOfScope(latestMessage)) {
      const outOfScopeReply = `I am **AbdulInsight AI**, strictly calibrated to **Hafiz Abdul Rehman's portfolio records** to ensure zero hallucinations.\n\nI cannot assist with general trivia, cooking recipes, or unrelated topics. However, I can explain his **30+ AI/ML systems**, computer vision pipelines, or contact options. Would you like to review one of his engineering case studies?`;

      return NextResponse.json({
        success: true,
        data: {
          message: outOfScopeReply,
          model: 'scope-guardrail',
          action: { type: 'none' },
          followUps: deriveFollowUps(latestMessage),
          sources: ['Scope Policy'],
        },
      });
    }

    // Log the incoming user message
    logChatMessage(sessionId, {
      role: 'user',
      content: latestMessage,
      visitorIp,
    });

    let assistantResponse = '';
    let activeModel = 'abdulinsight-knowledge-engine';

    // ── 4. Try External LLM Providers ─────────────────────────────────────────
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    if (geminiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;
        const contents = [
          { role: 'user', parts: [{ text: ABDUL_INSIGHT_SYSTEM_PROMPT }] },
          ...messages.slice(-8).map((m) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          })),
        ];

        const geminiRes = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 350,
            },
          }),
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          assistantResponse = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
          activeModel = 'gemini-2.0-flash';
        }
      } catch (err) {
        console.warn('Gemini request failed, falling back:', err);
      }
    }

    if (!assistantResponse && groqKey) {
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${groqKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: ABDUL_INSIGHT_SYSTEM_PROMPT },
              ...messages.slice(-8),
            ],
            temperature: 0.2,
            max_tokens: 350,
          }),
        });

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          assistantResponse = groqData.choices?.[0]?.message?.content || '';
          activeModel = 'groq/llama-3.3-70b';
        }
      } catch (err) {
        console.warn('Groq request failed, falling back:', err);
      }
    }

    // ── 5. Guaranteed Intelligent Fallback ────────────────────────────────────
    if (!assistantResponse) {
      assistantResponse = generateSmartFallbackResponse(latestMessage);
      activeModel = 'abdulinsight-local-rag-v1';
    }

    const latencyMs = Date.now() - startTime;

    // Log the assistant response
    logChatMessage(sessionId, {
      role: 'assistant',
      content: assistantResponse,
      model: activeModel,
      latencyMs,
    });

    const action = deriveAction(latestMessage + ' ' + assistantResponse);
    const followUps = deriveFollowUps(latestMessage + ' ' + assistantResponse);

    // Strict Human Output Sanitization: Strip all double asterisks (**) and markdown headers
    const sanitizedResponse = assistantResponse
      .replace(/\*\*/g, '')
      .replace(/###\s?/g, '')
      .replace(/##\s?/g, '')
      .replace(/#\s?/g, '')
      .trim();

    return NextResponse.json({
      success: true,
      data: {
        message: sanitizedResponse,
        model: activeModel,
        action,
        followUps,
        sources: ['Hafiz Abdul Rehman Verified CV Factsheet', 'GitHub Repositories'],
      },
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Chat error occurred.',
      },
      { status: 500 }
    );
  }
}
