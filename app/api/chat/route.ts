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

// ── 3. High-Fidelity Smart Fallback Knowledge Engine ─────────────────────────
function generateSmartFallbackResponse(question: string): string {
  const lower = question.toLowerCase();

  if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('whatsapp') || lower.includes('freelance') || lower.includes('quote') || lower.includes('touch')) {
    return `You can reach Hafiz Abdul Rehman directly for engineering roles or freelance consultations via:\n- 📧 **Email**: hafizrehman3321@gmail.com\n- 💬 **WhatsApp**: +92 328 3121702\n- 💼 **LinkedIn**: [Hafiz Abdul Rehman](https://linkedin.com/in/hafiz-abdul-rehman-9990ab329)\n\nHe specializes in Medical Deep Learning, Computer Vision (YOLO), and Agentic RAG systems, and typically responds within one business day!`;
  }
  if (lower.includes('tumor') || lower.includes('brats')) {
    return `Hafiz Abdul Rehman engineered an **Attention U-Net** for 3D MRI brain tumor sub-region segmentation on the **BraTS 2020 dataset**. It integrates soft attention gates to filter irrelevant features and achieved **99.64% validation accuracy** with a **0.986 Mean IoU** across multi-sequence MRI scans.`;
  }
  if (lower.includes('covid')) {
    return `His **COVID-19 Detection CNN Ensemble** utilizes a **Sugeno Fuzzy Integral** decision fusion mechanism combining 4 distinct deep CNN architectures (VGG-11, GoogLeNet, SqueezeNet, and Wide ResNet-50-2), achieving **98.93% test accuracy** and **99.1% sensitivity** on lung CT scans.`;
  }
  if (lower.includes('yolo') || lower.includes('vision') || lower.includes('computer vision') || lower.includes('tracking')) {
    return `In **Computer Vision**, Hafiz specializes in YOLO object detection and ByteTrack association. Notable systems include:\n- **Real-Time Football Player Tracking**: YOLO + ByteTrack + K-Means jersey color clustering at 60+ FPS.\n- **Vehicle Speed Detection**: YOLO11 paired with 4-point inverse perspective mapping (homography) for real-time telemetry within ±2.5 km/h.\n- **Sign Language Recognition**: MediaPipe 21-hand landmark extraction achieving 97% accuracy.`;
  }
  if (lower.includes('rag') || lower.includes('agent') || lower.includes('llm')) {
    return `In **Agentic AI & RAG**, Hafiz has built:\n- **Research Components Extractor**: RAG pipeline utilizing ChromaDB and Gemini to extract methodology, results, and formulas from scientific whitepapers with 96.4% precision.\n- **AI Travel Assistant**: Multi-agent itinerary planner powered by Gemini 2.0 Flash.\n- **AutoStatAgent**: Autonomous data science agent generating publication-grade LaTeX statistical reports.`;
  }
  if (lower.includes('visual') || lower.includes('dashboard') || lower.includes('chart') || lower.includes('analytics')) {
    return `In **Visual Analytics & Model Telemetry**, Hafiz specializes in translating complex neural manifolds into interactive tools:\n- **Latent Embeddings**: t-SNE & UMAP 2D/3D projections visualizing cluster separation in vision and NLP models.\n- **Model Diagnostics**: ROC-AUC, Precision-Recall curves, and Dice loss trajectories for medical diagnostic pipelines.\n- **Interactive Dashboards**: Real-time inference monitors built with Streamlit, Plotly Express, and Next.js.`;
  }
  if (lower.includes('pack') || lower.includes('github education') || lower.includes('campus') || lower.includes('student developer') || lower.includes('student pack')) {
    return `Hafiz Abdul Rehman is an active member of **GitHub Global Campus** with the **GitHub Student Developer Pack** (https://education.github.com/pack). This equips his engineering workflow with verified developer toolchains including GitHub Pro, GitHub Actions CI/CD, JetBrains IDE Suite, and cloud infrastructure.`;
  }
  if (lower.includes('supervision') || lower.includes('mentorship') || lower.includes('mentor') || lower.includes('capstone') || lower.includes('fyp') || lower.includes('guided')) {
    return `In **Academic Supervisions & Mentorship**, Hafiz has guided 120+ student engineers and 15+ capstones:\n- **Medical Brain Lesion FYP (2024)**: Advised 3 students on 3D Attention U-Net segmentation, achieving 99.4% Dice score.\n- **Clinical Decision RAG (2023-2024)**: Mentored 4 students on vector search and reranking, reducing hallucinations by 68%.\n- **Edge Drone Vision (2023)**: Supervised YOLOv8 on NVIDIA Jetson Orin (awarded 1st Place in University Tech Showcase).`;
  }
  if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('whatsapp') || lower.includes('freelance')) {
    return `You can reach Hafiz Abdul Rehman directly for engineering roles or freelance consultations via:\n- 📧 **Email**: hafizrehman3321@gmail.com\n- 💬 **WhatsApp**: +92 328 3121702\n- 💼 **LinkedIn**: [Hafiz Abdul Rehman](https://linkedin.com/in/hafiz-abdul-rehman-9990ab329)\n\nHe typically responds within one business day!`;
  }
  if (lower.includes('education') || lower.includes('degree') || lower.includes('university')) {
    return `Hafiz Abdul Rehman completed his Computer Science / Data Science studies at **GIFT University**, with deep specialization in Deep Learning, Computer Vision, and Applied Artificial Intelligence.`;
  }

  return `Hafiz Abdul Rehman is a **Data Scientist & AI/ML Engineer** with 57+ repositories and over 3 years of experience specializing in **Computer Vision (YOLO, MediaPipe)**, **Medical Deep Learning (U-Net, CNN ensembles)**, and **Agentic AI / RAG systems**.\n\nKey validated achievements include **99.64% MRI segmentation accuracy** and **98.93% COVID-19 diagnosis accuracy**. What technical area or project would you like to explore?`;
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
      const greetingReply = `Assalam o Alaikum & Welcome! 🤖 I am **AbdulInsight AI**, the verified portfolio assistant for **Hafiz Abdul Rehman** (Data Scientist & AI/ML Engineer).\n\nI can provide verified facts and technical architectures from his **57 repositories**, including:\n- 🔬 **Medical AI**: 99.64% BraTS Attention U-Net & 98.93% COVID-19 CNN Ensemble\n- 👁️ **Computer Vision**: YOLO11 Highway Speed Telemetry & ByteTrack Football Tracking\n- 🧠 **Agentic AI & RAG**: Whitepaper Components Extractor & Travel Planner\n\nWhich system or project would you like to inspect?`;

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

    return NextResponse.json({
      success: true,
      data: {
        message: assistantResponse,
        model: activeModel,
        action,
        followUps,
        sources: ['Hafiz Abdul Rehman Portfolio Factsheet', 'Verified GitHub Repositories'],
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
