import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain, ShieldCheck, BarChart3, Bot, Cpu, Database, Globe, LineChart,
  Lock, Zap, Network, Eye, Code2, Gamepad2, Cloud, Mic, Image as ImageIcon,
  MessageSquare, Workflow, GitBranch, Search, Sparkles
} from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import SectionAura from "./SectionAura";

type Project = {
  title: string;
  category: "AI" | "ML" | "Cyber" | "Data" | "Web" | "Product";
  blurb: string;
  Icon: typeof Brain;
  stack: string[];
};

const PROJECTS: Project[] = [
  { title: "HAR AI Assistant", category: "AI", blurb: "Gemini-style multimodal chat assistant for the Matrix Minds site.", Icon: Bot, stack: ["Gemini", "Edge Fn", "React"] },
  { title: "H&H Online", category: "Product", blurb: "Multiplayer football card game with realtime matchmaking.", Icon: Gamepad2, stack: ["React", "Supabase", "Realtime"] },
  { title: "Threat Recon Scanner", category: "Cyber", blurb: "Authorised recon + vulnerability mapper with OWASP coverage.", Icon: ShieldCheck, stack: ["Python", "Nmap", "OWASP"] },
  { title: "Phishing Sentinel", category: "Cyber", blurb: "ML-driven phishing URL & email classifier with 97% accuracy.", Icon: Lock, stack: ["scikit-learn", "FastAPI"] },
  { title: "Customer Churn Predictor", category: "ML", blurb: "XGBoost pipeline with explainability for SaaS retention.", Icon: LineChart, stack: ["XGBoost", "SHAP"] },
  { title: "Sales Forecasting Engine", category: "ML", blurb: "Prophet + LSTM hybrid forecasting for retail demand.", Icon: BarChart3, stack: ["Prophet", "LSTM"] },
  { title: "RAG Knowledge Bot", category: "AI", blurb: "Document Q&A with vector search and source citations.", Icon: MessageSquare, stack: ["pgvector", "OpenAI"] },
  { title: "Resume Ranker AI", category: "AI", blurb: "Recruiter copilot ranking CVs against role rubrics.", Icon: Sparkles, stack: ["LLM", "Embeddings"] },
  { title: "Smart Attendance Vision", category: "AI", blurb: "Face-recognition attendance with anti-spoof liveness.", Icon: Eye, stack: ["OpenCV", "FaceNet"] },
  { title: "License Plate Reader", category: "AI", blurb: "ANPR for parking and society gate automation.", Icon: ImageIcon, stack: ["YOLOv8", "OCR"] },
  { title: "Realtime Toxicity Filter", category: "AI", blurb: "Live chat moderation for gaming and community apps.", Icon: ShieldCheck, stack: ["Transformers"] },
  { title: "Voice Command Mate", category: "AI", blurb: "Offline-friendly voice assistant for kiosks and showrooms.", Icon: Mic, stack: ["Whisper", "Piper"] },
  { title: "AI Image Studio", category: "AI", blurb: "Brand-tuned image generator and editor pipeline.", Icon: ImageIcon, stack: ["Gemini Image"] },
  { title: "Code Review Copilot", category: "AI", blurb: "PR-aware reviewer with style + security hints.", Icon: Code2, stack: ["LLM", "GitHub API"] },
  { title: "DDoS Pattern Detector", category: "Cyber", blurb: "Anomaly detection on traffic flows with auto-alerts.", Icon: Network, stack: ["Suricata", "ML"] },
  { title: "Web App Pentest Suite", category: "Cyber", blurb: "Automated OWASP-Top-10 fuzzer with verified PoCs.", Icon: ShieldCheck, stack: ["Burp", "Python"] },
  { title: "Password Vault Audit", category: "Cyber", blurb: "Org-wide leaked-credential scanner with rotation playbook.", Icon: Lock, stack: ["HIBP API"] },
  { title: "SOC Triage Dashboard", category: "Cyber", blurb: "SIEM front-end consolidating alerts from 6 sources.", Icon: Workflow, stack: ["ELK", "Grafana"] },
  { title: "Zero-Trust Access Gate", category: "Cyber", blurb: "Device-posture + risk-scored SSO for internal apps.", Icon: Lock, stack: ["OIDC", "WebAuthn"] },
  { title: "Phish-Simulation Platform", category: "Cyber", blurb: "Train employees with safe, branded phishing drills.", Icon: ShieldCheck, stack: ["Next.js"] },
  { title: "Hospital Bed Optimizer", category: "Data", blurb: "Linear-programming model for ward capacity planning.", Icon: BarChart3, stack: ["PuLP", "Streamlit"] },
  { title: "Crop Yield Predictor", category: "ML", blurb: "Satellite + weather signals for kharif yield estimation.", Icon: LineChart, stack: ["Sentinel-2"] },
  { title: "Energy Demand Forecast", category: "ML", blurb: "Hourly grid load forecasting for distribution companies.", Icon: Zap, stack: ["LightGBM"] },
  { title: "Disease X-Ray Triage", category: "AI", blurb: "ResNet classifier flagging high-priority radiology cases.", Icon: Brain, stack: ["PyTorch"] },
  { title: "Sentiment Pulse", category: "Data", blurb: "Brand-mention dashboard across X, Reddit and news.", Icon: Globe, stack: ["NLP", "Recharts"] },
  { title: "Recommendation Engine", category: "ML", blurb: "Hybrid CF + content recommender for an e-learning site.", Icon: Sparkles, stack: ["Implicit", "Faiss"] },
  { title: "Fraud Detection Layer", category: "ML", blurb: "Realtime card-not-present scoring with sub-100ms p99.", Icon: ShieldCheck, stack: ["Kafka", "ONNX"] },
  { title: "Inventory Vision QC", category: "AI", blurb: "Conveyor-belt defect detection for manufacturing.", Icon: Eye, stack: ["YOLOv8"] },
  { title: "Smart Traffic Counter", category: "AI", blurb: "Edge-device vehicle counting for city dashboards.", Icon: Cpu, stack: ["Jetson", "DeepSORT"] },
  { title: "AI Tutor for Students", category: "AI", blurb: "Curriculum-aware tutor with adaptive question banks.", Icon: Brain, stack: ["RAG", "LLM"] },
  { title: "Document Forgery Check", category: "AI", blurb: "Detects tampered IDs and certificates for KYC flows.", Icon: ShieldCheck, stack: ["CV", "OCR"] },
  { title: "Customer 360 Lakehouse", category: "Data", blurb: "Unified profile store powering CRM + marketing.", Icon: Database, stack: ["DuckDB", "dbt"] },
  { title: "ETL Orchestrator", category: "Data", blurb: "Airflow DAGs ingesting 40+ partner APIs nightly.", Icon: Workflow, stack: ["Airflow"] },
  { title: "Stock Pattern Scanner", category: "ML", blurb: "Candlestick + indicator pattern scanner for NSE/BSE.", Icon: LineChart, stack: ["TA-Lib"] },
  { title: "Chatbot for Clinics", category: "AI", blurb: "Appointment booking + symptom triage bot on WhatsApp.", Icon: MessageSquare, stack: ["Twilio", "LLM"] },
  { title: "Legal Doc Summarizer", category: "AI", blurb: "Long-context summariser for contracts and notices.", Icon: Sparkles, stack: ["Gemini 2.5"] },
  { title: "E-Commerce Storefront", category: "Web", blurb: "Headless Shopify storefront with edge personalisation.", Icon: Globe, stack: ["Next.js"] },
  { title: "Realtime Analytics SDK", category: "Product", blurb: "Lightweight web SDK for product event tracking.", Icon: BarChart3, stack: ["TypeScript"] },
  { title: "AI Voice Cloner", category: "AI", blurb: "Consent-based voice cloning for accessibility apps.", Icon: Mic, stack: ["XTTS"] },
  { title: "Smart Home Hub", category: "Product", blurb: "MQTT-based controller with voice + app interfaces.", Icon: Cpu, stack: ["ESP32", "MQTT"] },
  { title: "Cloud Cost Watchdog", category: "Cyber", blurb: "Anomaly + commitment optimiser across AWS/GCP.", Icon: Cloud, stack: ["AWS API"] },
  { title: "Git Risk Radar", category: "Cyber", blurb: "Detects secrets and risky diffs across mono-repos.", Icon: GitBranch, stack: ["Semgrep"] },
  { title: "SEO Insight Engine", category: "Data", blurb: "Crawl + GSC fusion dashboard for content teams.", Icon: Search, stack: ["GSC API"] },
  { title: "Realtime Translator", category: "AI", blurb: "Low-latency speech-to-speech translator for events.", Icon: Globe, stack: ["Whisper", "TTS"] },
  { title: "Edge ML Camera", category: "AI", blurb: "Tiny-ML object detection running on Raspberry Pi.", Icon: Cpu, stack: ["TFLite"] },
  { title: "Resume Builder AI", category: "Product", blurb: "Guided builder producing ATS-friendly resumes.", Icon: Code2, stack: ["React", "PDFKit"] },
  { title: "Cyber Range Lab", category: "Cyber", blurb: "Browser-accessible CTF labs for student training.", Icon: ShieldCheck, stack: ["Docker"] },
  { title: "AI Meeting Notes", category: "AI", blurb: "Auto-summarised meeting notes with action items.", Icon: MessageSquare, stack: ["Whisper", "LLM"] },
  { title: "Smart Resume Parser", category: "AI", blurb: "Structured extraction from PDF/DOCX resumes.", Icon: Code2, stack: ["spaCy"] },
  { title: "Predictive Maintenance", category: "ML", blurb: "Vibration-signal models for industrial motors.", Icon: Cpu, stack: ["Signal ML"] },
  { title: "Matrix Minds Website", category: "Web", blurb: "This very site — AI-themed React + Lovable Cloud build.", Icon: Globe, stack: ["React", "Tailwind"] },
  { title: "Visitor Analytics Suite", category: "Data", blurb: "Self-hosted, privacy-friendly traffic dashboard.", Icon: BarChart3, stack: ["Supabase"] },
];

const CATEGORIES = ["All", "AI", "ML", "Cyber", "Data", "Web", "Product"] as const;

const ProjectsShowcase = () => {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  const stats = [
    { label: "Projects Delivered", to: PROJECTS.length, suffix: "+" },
    { label: "Happy Clients", to: 30, suffix: "+" },
    { label: "Model Accuracy Avg.", to: 95, suffix: "%" },
    { label: "Support", to: 24, suffix: "/7" },
  ];

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <SectionAura variant="violet" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 reveal-up">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/40">
            <Sparkles className="w-3.5 h-3.5 mr-1" /> 50+ Shipped Projects
          </Badge>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Our Project Universe
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            A live-updating constellation of AI, ML, cybersecurity, data and product work
            shipped by Matrix Minds.
          </p>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((s, i) => (
            <Card
              key={s.label}
              className="bg-card/40 backdrop-blur-md border-primary/20 animate-quantum-pulse"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="font-orbitron text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  <AnimatedCounter to={s.to} suffix={s.suffix} />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
                  {s.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((c) => (
            <Button
              key={c}
              variant={filter === c ? "hero" : "outline"}
              size="sm"
              className="font-orbitron"
              onClick={() => setFilter(c)}
            >
              {c}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <Card
              key={p.title}
              className="group relative overflow-hidden bg-card/40 backdrop-blur-md border-primary/20 hover:border-primary/60 transition-all duration-300 hover:-translate-y-1"
              style={{ animation: `reveal-up 0.6s ease-out ${i * 0.04}s both` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-5 relative">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-primary/15 border border-primary/30 group-hover:animate-circuit-glow">
                    <p.Icon className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="outline" className="border-accent/40 text-accent text-[10px]">
                    {p.category}
                  </Badge>
                </div>
                <h3 className="font-bold text-foreground mb-1.5">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{p.blurb}</p>
                <div className="flex flex-wrap gap-1">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/60 text-secondary-foreground border border-border"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
