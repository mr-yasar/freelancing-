import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Code2, Server, Database, Globe, Layers, GitBranch,
  Palette, Braces, Rocket, Shield, Cloud,
  Trophy, Target, Zap, Flame, MessageCircle,
  TrendingUp, Briefcase, BookOpen, Users,
  Star, Layout, ChevronDown,
  Lock, Cpu, Lightbulb, Handshake,
  GraduationCap, Bot, ChevronRight,
  Circle, CheckCircle2, XCircle, Wifi, Monitor,
  Share2, Eye,
  PenTool, Mail, Play, RotateCcw,
  Crown, Medal, Gem
} from 'lucide-react';

// ─── Scroll Reveal Hook ───
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const els = document.querySelectorAll('.reveal');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Confetti Component ───
function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: ['#FFEA00', '#39FF14', '#FF3366', '#00D4FF', '#B026FF'][Math.floor(Math.random() * 5)],
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: `${p.left}%`,
            bottom: '-10px',
            animationDelay: `${p.delay}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  );
}

// ─── Typewriter Component ───
function Typewriter({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-blink-cursor border-r-2 border-neon-green ml-0.5">&nbsp;</span>
    </span>
  );
}

// ─── Section Divider ───
function SectionDivider({ color = '#FFEA00' }: { color?: string }) {
  return (
    <div className="relative h-16 overflow-hidden">
      <div
        className="absolute inset-0 skew-y-3 origin-left"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  HERO SECTION
// ═══════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-8 pb-0 overflow-hidden bg-grid-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-bg/80 pointer-events-none" />

      <div className="relative z-10 text-center max-w-md mx-auto w-full">
        <p className="text-sm font-bold text-white mb-2 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          Hi Zafar! 👋
        </p>
        <p className="text-xs text-gray-400 mb-6 max-w-[85%] mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          This is the full roadmap for becoming a full-stack developer. I will explain everything in very simple English. Even if you know zero coding, this guide will help you understand step by step. Let&apos;s begin macha! 💪
        </p>

        {/* Hero Computer Illustration */}
        <div className="relative w-48 h-48 mx-auto mb-4 animate-float">
          <img
            src="/hero-computer.png"
            alt="Retro Computer"
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(176,38,255,0.4)]"
            loading="eager"
          />
        </div>

        {/* Hero Boy Illustration */}
        <div className="relative w-36 h-36 mx-auto -mt-8 mb-4 animate-float-slow">
          <img
            src="/hero-boy.png"
            alt="Programmer Boy"
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,234,0,0.3)]"
            loading="eager"
          />
        </div>

        {/* Stacked Typography */}
        <div className="relative mt-4">
          <h1
            className="text-6xl font-black italic text-neon-green text-stroke animate-bounce-in"
            style={{ animationDelay: '0.4s', opacity: 0, textShadow: '4px 4px 0 #000' }}
          >
            FULL STACK
          </h1>
          <h1
            className="text-5xl font-black text-white text-stroke -mt-2 animate-bounce-in"
            style={{ animationDelay: '0.6s', opacity: 0, textShadow: '4px 4px 0 #000' }}
          >
            DEVELOPER
          </h1>
          <h1
            className="text-5xl font-black text-primary text-stroke -mt-1 animate-bounce-in"
            style={{ animationDelay: '0.8s', opacity: 0, textShadow: '4px 4px 0 #000, 0 0 20px rgba(255,234,0,0.3)' }}
          >
            ROADMAP
          </h1>
        </div>
      </div>

      <SectionDivider color="#FFEA00" />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  POWER OF FULL STACK SECTION
// ═══════════════════════════════════════════════════════════
function PowerSection() {
  const [terminalLines, setTerminalLines] = useState<number>(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setTerminalLines(1), 500),
      setTimeout(() => setTerminalLines(2), 1500),
      setTimeout(() => setTerminalLines(3), 2500),
      setTimeout(() => setTerminalLines(4), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative px-5 py-12 -mt-4">
      <div className="max-w-md mx-auto">
        <div className="reveal bg-neon-green rounded-2xl p-5 border-4 border-black shadow-lg">
          <h2 className="text-lg font-black text-black text-stroke-sm mb-3">
            💪 THE POWER OF FULL STACK
          </h2>
          <p className="text-xs font-bold text-black leading-relaxed mb-4">
            Why Full Stack is a Superpower! Full Stack means you can build the frontend (what people see), the backend (the brain behind it), and the database (where data is stored). Companies love hiring full-stack developers because they can handle everything!
          </p>

          <div className="bg-black rounded-lg p-4 font-code text-sm space-y-2 border border-zinc-800">
            {terminalLines >= 1 && (
              <div className="flex items-center gap-2">
                <span className="text-neon-green">&gt;</span>
                <Typewriter text="Frontend code running... " className="text-neon-green" />
                {terminalLines >= 1 && <span className="text-neon-green">✅</span>}
              </div>
            )}
            {terminalLines >= 2 && (
              <div className="flex items-center gap-2">
                <span className="text-neon-green">&gt;</span>
                <Typewriter text="Backend API responding... " delay={200} className="text-primary" />
                {terminalLines >= 2 && <span className="text-neon-green">✅</span>}
              </div>
            )}
            {terminalLines >= 3 && (
              <div className="flex items-center gap-2">
                <span className="text-neon-green">&gt;</span>
                <Typewriter text="Database connected... " delay={400} className="text-neon-purple" />
                {terminalLines >= 3 && <span className="text-neon-green">✅</span>}
              </div>
            )}
            {terminalLines >= 4 && (
              <div className="flex items-center gap-2">
                <span className="text-primary">&gt;</span>
                <Typewriter text="Result: A complete working app! " delay={600} className="text-primary font-bold" />
                {terminalLines >= 4 && <span className="text-primary">🚀</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  CORE SKILLS SECTION
// ═══════════════════════════════════════════════════════════
function CoreSkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-5 py-12 overflow-hidden">
      <div className="max-w-md mx-auto">
        {/* Frontend Row */}
        <div className="relative flex items-center justify-between mb-6">
          <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}
               style={{ transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            <h2 className="text-5xl font-black text-primary text-stroke" style={{ textShadow: '4px 4px 0 #000' }}>
              FRONTEND
            </h2>
          </div>
          <div className={`w-32 h-32 flex-shrink-0 transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
               style={{ transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s' }}>
            <img src="/browser-window.png" alt="Browser" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,234,0,0.3)]" loading="lazy" />
          </div>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed mb-8 -mt-2 reveal">
          This is everything the user sees and interacts with. Buttons, colors, animations, layouts — all of this is frontend work. You will use HTML, CSS, JavaScript, and later React to build amazing user interfaces.
        </p>

        {/* Backend Row */}
        <div className="relative flex items-center justify-between mb-6">
          <div className={`w-32 h-32 flex-shrink-0 transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}
               style={{ transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s' }}>
            <img src="/server-tower.png" alt="Server" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,51,102,0.3)]" loading="lazy" />
          </div>
          <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
               style={{ transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s' }}>
            <h2 className="text-5xl font-black text-neon-green text-stroke" style={{ textShadow: '4px 4px 0 #000' }}>
              BACKEND
            </h2>
          </div>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed mb-6 reveal">
          This is the brain of the application. It handles logic, authentication, API routes, and connects everything together. You will use Node.js and Express.js to build powerful backends.
        </p>

        {/* Database & Deployment Pills */}
        <div className="flex gap-3 justify-center reveal">
          <span className="pill bg-black text-neon-green border-neon-green flex items-center gap-2">
            <Database size={14} /> DATABASE
          </span>
          <span className="pill bg-black text-primary border-primary flex items-center gap-2">
            <Cloud size={14} /> DEPLOYMENT
          </span>
        </div>
        <p className="text-xs text-gray-400 text-center mt-3 reveal">
          Database is where all data lives. Deployment puts your app on the internet! 🚀
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  ROADMAP SECTION
// ═══════════════════════════════════════════════════════════
const roadmapSteps = [
  { num: '01', title: '<HTML/>', sub: '<CSS/>', icon: <Palette size={18} />, desc: 'Learn the structure & styling of websites', color: 'text-neon-purple' },
  { num: '02', title: '{JavaScript}', sub: '', icon: <Braces size={18} />, desc: 'Make websites interactive and dynamic', color: 'text-primary' },
  { num: '03', title: '<Git_&_Github/>', sub: '', icon: <GitBranch size={18} />, desc: 'Track changes and collaborate with others', color: 'text-neon-red' },
  { num: '04', title: '<React.js/>', sub: '', icon: <Layers size={18} />, desc: 'Build modern user interfaces like a pro', color: 'text-neon-blue' },
  { num: '05', title: '{Node.js}', sub: '', icon: <Server size={18} />, desc: 'Run JavaScript on the server side', color: 'text-neon-green' },
  { num: '06', title: '{Express.js}', sub: '+ {MongoDB}', icon: <Database size={18} />, desc: 'Create APIs and store data', color: 'text-primary' },
  { num: '07', title: '{Authentication}', sub: '', icon: <Shield size={18} />, desc: 'Secure user logins and sessions', color: 'text-neon-red' },
  { num: '08', title: '{Deployment}', sub: '', icon: <Rocket size={18} />, desc: 'Launch your app to the world', color: 'text-neon-green' },
  { num: '09', title: '{Projects!}', sub: '', icon: <Trophy size={18} />, desc: 'Build real-world projects and get hired', color: 'text-primary' },
];

function RoadmapSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="relative px-5 py-12">
      <div className="max-w-md mx-auto">
        <h2 className="section-title text-primary text-center mb-2 reveal">⚡ THE ROADMAP</h2>
        <p className="text-sm text-gray-400 text-center mb-8 reveal">Your Step-by-Step Learning Path</p>

        <div className="relative">
          <div className="roadmap-line" />

          <div className="space-y-4">
            {roadmapSteps.map((step, i) => (
              <div
                key={step.num}
                className={`reveal relative ml-8 bg-dark-surface rounded-xl p-4 border border-zinc-700 transition-all duration-300 cursor-pointer
                  ${activeStep === i ? 'border-primary shadow-glow -translate-y-1' : 'hover:border-zinc-500'}`}
                style={{ transitionDelay: `${i * 0.05}s` }}
                onClick={() => setActiveStep(activeStep === i ? null : i)}
              >
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-2 border-black flex items-center justify-center z-10">
                  <span className="text-[9px] font-black text-black">{step.num}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className={step.color}>{step.icon}</span>
                  <div className="flex-1">
                    <div className="font-code text-sm font-bold text-white">
                      {step.title}
                      {step.sub && <span className="text-gray-400 text-xs ml-1">{step.sub}</span>}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{step.desc}</p>
                  </div>
                  <ChevronRight size={16} className={`text-gray-500 transition-transform ${activeStep === i ? 'rotate-90' : ''}`} />
                </div>

                {activeStep === i && (
                  <div className="mt-3 pt-3 border-t border-zinc-700 text-xs text-gray-300 leading-relaxed animate-fade-in-up">
                    <p className="font-bold text-primary mb-1">Step {step.num} — Super da! 🎯</p>
                    <p>Click the checkbox in the Progress Tracker below when you complete this step, macha!</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  PROJECTS SECTION
// ═══════════════════════════════════════════════════════════
const projectData = {
  beginner: [
    { name: 'Personal Portfolio', desc: 'Show yourself to the world', icon: <Layout size={16} /> },
    { name: 'Calculator App', desc: 'Do math like a pro', icon: <Cpu size={16} /> },
    { name: 'To-Do List', desc: 'Track your daily tasks', icon: <CheckCircle2 size={16} /> },
    { name: 'Weather App', desc: 'Check weather anywhere', icon: <Cloud size={16} /> },
  ],
  intermediate: [
    { name: 'Blog Website', desc: 'Write and publish posts', icon: <PenTool size={16} /> },
    { name: 'E-Commerce Cart', desc: 'Shop like Amazon', icon: <ShoppingIcon size={16} /> },
    { name: 'Chat Application', desc: 'Real-time messaging', icon: <MessageCircle size={16} /> },
    { name: 'Movie Search App', desc: 'Find any movie info', icon: <Eye size={16} /> },
  ],
  advanced: [
    { name: 'Full E-Commerce', desc: 'Payment + Admin panel', icon: <Briefcase size={16} /> },
    { name: 'Social Media App', desc: 'Like Instagram/Facebook', icon: <Share2 size={16} /> },
    { name: 'SaaS Dashboard', desc: 'Analytics and charts', icon: <TrendingUp size={16} /> },
    { name: 'Video Streaming', desc: 'Like YouTube/Netflix', icon: <Play size={16} /> },
  ],
};

function ShoppingIcon({ size }: { size: number }) {
  return <Briefcase size={size} />;
}

function ProjectsSection() {
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  return (
    <section className="relative px-5 py-12">
      <div className="max-w-md mx-auto">
        <h2 className="section-title text-center mb-2 reveal">🛠️ PROJECTS TO BUILD</h2>
        <p className="text-sm text-gray-400 text-center mb-6 reveal">Start Small, Dream Big!</p>

        <div className="flex gap-2 justify-center mb-6 reveal">
          {(['beginner', 'intermediate', 'advanced'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-4 py-2 rounded-full text-xs font-black border-2 border-black transition-all
                ${level === l ? 'bg-primary text-black' : 'bg-dark-card text-white border-zinc-700'}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 reveal">
          {projectData[level].map((p, i) => (
            <div
              key={p.name}
              className="bg-dark-surface rounded-xl p-4 border border-zinc-700 hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-primary mb-2">{p.icon}</div>
              <h3 className="text-sm font-bold text-white mb-1">{p.name}</h3>
              <p className="text-[11px] text-gray-400">{p.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center mt-6 reveal">
          Don&apos;t just watch tutorials — build real projects macha! These projects will be your portfolio and help you get hired! 💪
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  FAQ SECTION
// ═══════════════════════════════════════════════════════════
const faqs = [
  { q: 'Do I need a degree to become a developer?', a: 'No macha! Many developers are self-taught. Google, Netflix, and Spotify hire people without degrees if they have the skills. Your projects matter more than a certificate! 💪' },
  { q: 'How long does it take to learn full-stack?', a: 'If you learn 2-3 hours daily, you can start building projects in 6 months and get job-ready in 12 months. Consistency is the key da! 🔑' },
  { q: 'Is DSA (Data Structures & Algorithms) required?', a: 'For top companies like Google and Amazon, yes. But for startups and freelancing, you can start without it. Learn DSA after you are comfortable with building projects! 📚' },
  { q: 'Will AI replace developers?', a: 'No bro! AI helps developers code faster, but it cannot replace human creativity and problem-solving. Developers who use AI will replace those who don\'t! 🤖' },
  { q: 'Can I learn coding if I am not good at math?', a: 'Absolutely thambi! Most web development needs only basic math. If you can think logically, you can code. Logic > Math! 🧠' },
  { q: 'Which laptop do I need for coding?', a: 'Any laptop with 8GB RAM works fine macha! You don\'t need a fancy gaming laptop. Start with what you have! 💻' },
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="relative px-5 py-12">
      <div className="max-w-md mx-auto">
        <h2 className="section-title text-primary text-center mb-6 reveal">🤔 COMMON DOUBTS</h2>

        <div className="border-2 border-dashed border-primary/50 rounded-2xl p-4 space-y-3 reveal">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-dark-surface rounded-lg overflow-hidden border border-zinc-700">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-3 text-left"
              >
                <span className="text-sm font-bold text-white pr-2">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-primary flex-shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-40' : 'max-h-0'}`}
              >
                <p className="px-3 pb-3 text-xs text-gray-300 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  MONEY MAKING SECTION
// ═══════════════════════════════════════════════════════════
function MoneySection() {
  const [showConsole, setShowConsole] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowConsole(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    { title: 'Build a strong portfolio', desc: 'Fiverr, Upwork, LinkedIn', icon: <Briefcase size={20} />, color: 'bg-primary' },
    { title: 'Join freelancing platforms', desc: 'Local clients, social media', icon: <Globe size={20} />, color: 'bg-neon-green' },
    { title: 'Do internship first', desc: 'Even unpaid ones add experience!', icon: <GraduationCap size={20} />, color: 'bg-neon-blue' },
  ];

  return (
    <section className="relative px-5 py-12">
      <div className="max-w-md mx-auto">
        <h2 className="section-title text-center mb-2 reveal">💰 HOW TO EARN MONEY</h2>
        <p className="text-sm text-gray-400 text-center mb-6 reveal">Your First Income as a Developer!</p>

        <p className="text-sm text-gray-300 leading-relaxed mb-6 reveal">
          Freelancing is the fastest way to earn money while learning. Start with small gigs on Fiverr and Upwork — fix bugs, build landing pages, create portfolio sites. As you gain confidence, approach local businesses and offer to build their websites. LinkedIn is your best friend — post your projects, connect with people, and let opportunities come to you!
        </p>

        <div className="space-y-3 mb-6">
          {steps.map((s, i) => (
            <div key={i} className="reveal flex items-center gap-4 bg-dark-surface rounded-xl p-4 border border-zinc-700">
              <div className={`w-12 h-12 ${s.color} rounded-full flex items-center justify-center border-2 border-black flex-shrink-0`}>
                <span className="text-black">{s.icon}</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{s.title}</h3>
                <p className="text-xs text-gray-400">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Earning Progress */}
        <div className="reveal bg-dark-surface rounded-xl p-4 border border-zinc-700">
          <h3 className="text-sm font-bold text-primary mb-3">💸 Earning Roadmap</h3>
          <div className="space-y-3">
            {[
              { label: 'First ₹10,000', pct: 100, color: 'bg-neon-green' },
              { label: '₹30,000-50,000/month', pct: 70, color: 'bg-primary' },
              { label: '₹1,00,000+/month', pct: 40, color: 'bg-neon-purple' },
            ].map((e) => (
              <div key={e.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">{e.label}</span>
                </div>
                <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                  <div className={`h-full ${e.color} rounded-full transition-all duration-1000`} style={{ width: `${e.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Output */}
        {showConsole && (
          <div className="mt-6 terminal reveal">
            <Typewriter text='console.log("First earning: ₹10,000");' className="text-neon-green block" />
            <Typewriter text='console.log("Then: ₹30,000-50,000/month");' delay={1200} className="text-primary block mt-1" />
            <Typewriter text='console.log("With experience: ₹1,00,000+/month! 💰");' delay={2400} className="text-neon-purple block mt-1" />
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  PORTFOLIO SECTION
// ═══════════════════════════════════════════════════════════
function PortfolioSection() {
  const tips = [
    { icon: <Globe size={16} />, text: 'Get a clean domain (yourname.dev) — it looks professional.' },
    { icon: <Layout size={16} />, text: 'Show 3-4 strong projects — quality over quantity.' },
    { icon: <UserIcon size={16} />, text: 'Add an About Me section — let people know your story.' },
    { icon: <Mail size={16} />, text: 'Include a Contact form — make it easy to reach you.' },
    { icon: <PenTool size={16} />, text: 'Write blogs on Hashnode or Dev.to — sharing builds credibility.' },
    { icon: <Rocket size={16} />, text: 'Deploy everything — live projects impress more than GitHub repos.' },
  ];

  return (
    <section className="relative px-5 py-12">
      <div className="max-w-md mx-auto">
        <h2 className="section-title text-primary text-center mb-6 reveal">🎨 PORTFOLIO TIPS</h2>

        <div className="space-y-3 mb-6">
          {tips.map((tip, i) => (
            <div key={i} className="reveal flex items-start gap-3 bg-dark-surface rounded-xl p-4 border border-zinc-700 hover:border-primary transition-all">
              <span className="text-primary mt-0.5 flex-shrink-0">{tip.icon}</span>
              <p className="text-sm text-gray-300 leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>

        <div className="reveal bg-gradient-to-br from-primary/10 to-neon-green/10 rounded-2xl p-5 border border-primary/20 text-center">
          <p className="text-lg font-black text-primary mb-2">Remember macha!</p>
          <p className="text-sm text-gray-300">Your portfolio is your resume. Make it shine! ✨</p>
        </div>
      </div>
    </section>
  );
}

function UserIcon({ size }: { size: number }) {
  return <Monitor size={size} />;
}

// ═══════════════════════════════════════════════════════════
//  DAILY DISCIPLINE SECTION
// ═══════════════════════════════════════════════════════════
function DisciplineSection() {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const habits = [
    { label: 'Learn', pct: 80, color: 'bg-neon-green', icon: <BookOpen size={14} /> },
    { label: 'Practice', pct: 100, color: 'bg-primary', icon: <Code2 size={14} /> },
    { label: 'Build', pct: 60, color: 'bg-neon-blue', icon: <HammerIcon size={14} /> },
    { label: 'Share', pct: 40, color: 'bg-neon-purple', icon: <Share2 size={14} /> },
  ];

  return (
    <section ref={sectionRef} className="relative px-5 py-12">
      <div className="max-w-md mx-auto">
        <h2 className="section-title text-center mb-2 reveal">📅 DAILY DISCIPLINE</h2>
        <p className="text-sm text-gray-400 text-center mb-6 reveal">Consistency Beats Motivation!</p>

        <p className="text-sm text-gray-300 leading-relaxed mb-6 reveal">
          Motivation comes and goes, but discipline stays. Even if you learn just 1 hour every day, you will be amazed at your progress after 6 months. Set small weekly goals, track your progress, and celebrate small wins. Remember: Every expert was once a beginner macha!
        </p>

        <div className="space-y-4 reveal">
          {habits.map((h) => (
            <div key={h.label}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-gray-400">{h.icon}</span>
                <span className="text-sm font-bold text-white">{h.label}</span>
              </div>
              <div className="h-4 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                <div
                  className={`h-full ${h.color} rounded-full transition-all duration-1000 ease-out relative`}
                  style={{ width: animated ? `${h.pct}%` : '0%' }}
                >
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-black text-black">{h.pct}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HammerIcon({ size }: { size: number }) {
  return <Target size={size} />;
}

// ═══════════════════════════════════════════════════════════
//  MOTIVATION SECTION
// ═══════════════════════════════════════════════════════════
const quotes = [
  "Motivation gets you started, discipline keeps you going.",
  "Small daily progress leads to big results over time.",
  "Don't compare your chapter 1 with someone else's chapter 20.",
  "Failure is just feedback — learn from it and move forward.",
  "The best time to start was yesterday. The second best time is now!",
  "Every expert was once a beginner. Keep going macha!",
  "Code a little every day. One year later, you won't recognize yourself.",
  "Your future self will thank you for not giving up today.",
];

function MotivationSection() {
  const [quoteIdx, setQuoteIdx] = useState(0);

  const nextQuote = useCallback(() => {
    setQuoteIdx((prev) => (prev + 1) % quotes.length);
  }, []);

  return (
    <section className="relative px-5 py-12">
      <div className="max-w-md mx-auto">
        <h2 className="section-title text-neon-red text-center mb-6 reveal">🔥 MOTIVATION & MINDSET</h2>

        <div className="reveal bg-dark-surface rounded-2xl p-5 border border-zinc-700 mb-6">
          <div className="text-center mb-4">
            <span className="text-4xl font-black text-gray-700 text-stroke-sm block">DISCIPLINE</span>
            <span className="pill bg-neon-red text-white border-black -mt-3 relative z-10 inline-block text-sm px-4 py-1">
              MOTIVATION
            </span>
          </div>
        </div>

        {/* Random Quote Generator */}
        <div className="reveal bg-black rounded-xl p-5 border border-zinc-800 mb-6">
          <div className="flex items-start gap-2 mb-4">
            <span className="text-neon-green text-lg">&gt;</span>
            <p className="text-sm text-neon-green font-code leading-relaxed min-h-[40px]">
              {quotes[quoteIdx]}
            </p>
          </div>
          <button
            onClick={nextQuote}
            className="w-full py-2.5 bg-primary text-black font-black text-sm rounded-full border-2 border-black hover:shadow-glow transition-all active:scale-95"
          >
            🎲 Get New Quote
          </button>
        </div>

        <div className="space-y-3">
          {[
            "Believe in yourself thambi! You can do this! 💪",
            "One line of code at a time. That's how pros are made.",
            "Don't fear errors. Every bug teaches you something new! 🐛",
            "Your journey is unique. Enjoy the process macha! 🌟",
          ].map((m, i) => (
            <div key={i} className="reveal flex items-center gap-3 bg-dark-surface/50 rounded-lg p-3 border border-zinc-800">
              <Flame size={16} className="text-primary flex-shrink-0" />
              <p className="text-xs text-gray-300">{m}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  COMMUNITY SECTION
// ═══════════════════════════════════════════════════════════
function CommunitySection() {
  const cards = [
    { title: 'FIND A STUDY PARTNER', desc: 'Learning together is faster and more fun!', icon: <Handshake size={24} />, color: 'from-primary/20 to-primary/5', border: 'border-primary/30' },
    { title: 'JOIN ONLINE COMMUNITIES', desc: 'Discord, Reddit, Twitter — devs help devs!', icon: <Users size={24} />, color: 'from-neon-purple/20 to-neon-purple/5', border: 'border-neon-purple/30' },
    { title: 'FOLLOW GREAT DEVELOPERS', desc: 'Learn from their journey and get inspired!', icon: <Star size={24} />, color: 'from-neon-blue/20 to-neon-blue/5', border: 'border-neon-blue/30' },
  ];

  return (
    <section className="relative px-5 py-12">
      <div className="max-w-md mx-auto">
        <h2 className="section-title text-neon-blue text-center mb-2 reveal">🤝 COMMUNITY & SUPPORT</h2>
        <p className="text-sm text-gray-400 text-center mb-6 reveal">You Are Not Alone in This Journey!</p>

        <p className="text-sm text-gray-300 leading-relaxed mb-6 reveal">
          Learning alone is hard. Find a study partner who has similar goals. Join online communities on Discord and Reddit where developers help each other. Follow great developers on Twitter and LinkedIn — their journey will inspire you. Attend local meetups and hackathons — networking opens doors you didn&apos;t know existed!
        </p>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mx-5 px-5 reveal">
          {cards.map((c) => (
            <div
              key={c.title}
              className={`flex-shrink-0 w-[85%] snap-center bg-gradient-to-br ${c.color} rounded-2xl p-5 border ${c.border} backdrop-blur-sm`}
            >
              <div className="text-primary mb-3">{c.icon}</div>
              <h3 className="text-lg font-black text-white mb-2">{c.title}</h3>
              <p className="text-sm text-gray-300">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  PROGRESS TRACKER SECTION
// ═══════════════════════════════════════════════════════════
function ProgressTrackerSection() {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('zafar-progress');
    return saved ? JSON.parse(saved) : { checked: [] as number[], xp: 0, streak: 1 };
  });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    localStorage.setItem('zafar-progress', JSON.stringify(progress));
  }, [progress]);

  const toggleStep = (idx: number) => {
    setProgress((prev: typeof progress) => {
      const checked = prev.checked.includes(idx)
        ? prev.checked.filter((i: number) => i !== idx)
        : [...prev.checked, idx];
      return { ...prev, checked, xp: checked.length * 100 };
    });
    if (!progress.checked.includes(idx)) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const badges = [
    { name: 'HTML Hero', min: 100, icon: <Code2 size={16} />, color: 'bg-neon-purple' },
    { name: 'JS Ninja', min: 200, icon: <Zap size={16} />, color: 'bg-primary' },
    { name: 'React Pro', min: 400, icon: <Layers size={16} />, color: 'bg-neon-blue' },
    { name: 'Full Stack', min: 700, icon: <Trophy size={16} />, color: 'bg-neon-green' },
    { name: 'Roadmap Master', min: 900, icon: <Crown size={16} />, color: 'bg-neon-red' },
  ];

  return (
    <section className="relative px-5 py-12">
      <Confetti active={showConfetti} />
      <div className="max-w-md mx-auto">
        <h2 className="section-title text-primary text-center mb-6 reveal">📊 PROGRESS TRACKER</h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="reveal bg-neon-green/10 rounded-xl p-4 border border-neon-green/30 text-center">
            <Flame size={24} className="text-neon-green mx-auto mb-1" />
            <div className="text-2xl font-black text-neon-green">{progress.streak}</div>
            <div className="text-[10px] text-gray-400 font-bold">DAY STREAK</div>
          </div>
          <div className="reveal bg-primary/10 rounded-xl p-4 border border-primary/30 text-center">
            <Star size={24} className="text-primary mx-auto mb-1" />
            <div className="text-2xl font-black text-primary">{progress.xp}</div>
            <div className="text-[10px] text-gray-400 font-bold">XP POINTS</div>
          </div>
          <div className="reveal bg-neon-blue/10 rounded-xl p-4 border border-neon-blue/30 text-center">
            <Medal size={24} className="text-neon-blue mx-auto mb-1" />
            <div className="text-2xl font-black text-neon-blue">
              {badges.filter((b) => progress.xp >= b.min).length}
            </div>
            <div className="text-[10px] text-gray-400 font-bold">BADGES</div>
          </div>
          <div className="reveal bg-neon-purple/10 rounded-xl p-4 border border-neon-purple/30 text-center">
            <Gem size={24} className="text-neon-purple mx-auto mb-1" />
            <div className="text-2xl font-black text-neon-purple">{progress.checked.length}/9</div>
            <div className="text-[10px] text-gray-400 font-bold">SKILLS</div>
          </div>
        </div>

        {/* Roadmap Checklist */}
        <div className="reveal bg-dark-surface rounded-xl p-4 border border-zinc-700 mb-6">
          <h3 className="text-sm font-bold text-white mb-3">Check off completed steps:</h3>
          <div className="space-y-2">
            {roadmapSteps.map((step, i) => (
              <button
                key={i}
                onClick={() => toggleStep(i)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all text-left
                  ${progress.checked.includes(i) ? 'bg-neon-green/10 border border-neon-green/30' : 'bg-zinc-800/50 border border-transparent hover:border-zinc-600'}`}
              >
                {progress.checked.includes(i)
                  ? <CheckCircle2 size={18} className="text-neon-green flex-shrink-0" />
                  : <Circle size={18} className="text-gray-500 flex-shrink-0" />
                }
                <span className={`text-xs font-code ${progress.checked.includes(i) ? 'text-neon-green' : 'text-gray-300'}`}>
                  {step.title}
                </span>
                {progress.checked.includes(i) && <span className="ml-auto text-[10px] text-neon-green font-bold">+100 XP</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="reveal">
          <h3 className="text-sm font-bold text-white mb-3">Achievement Badges:</h3>
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => {
              const earned = progress.xp >= b.min;
              return (
                <span
                  key={b.name}
                  className={`pill text-[10px] flex items-center gap-1.5 ${earned ? `${b.color} text-black border-black` : 'bg-zinc-800 text-gray-500 border-zinc-700'}`}
                >
                  {earned ? b.icon : <Lock size={10} />}
                  {b.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  MISTAKES SECTION
// ═══════════════════════════════════════════════════════════
function MistakesSection() {
  const mistakes = [
    { title: 'Tutorial Hell', desc: 'Don\'t just watch, BUILD!', icon: <Play size={20} /> },
    { title: 'Skipping Projects', desc: 'Projects teach more than theory!', icon: <Code2 size={20} /> },
    { title: 'Not using GitHub', desc: 'Your code history matters!', icon: <GitBranch size={20} /> },
    { title: 'Learning everything at once', desc: 'Focus on one thing, master it, then move on!', icon: <Target size={20} /> },
  ];

  return (
    <section className="relative px-5 py-12">
      <div className="max-w-md mx-auto">
        <h2 className="section-title text-neon-red text-center mb-6 reveal">⚠️ MISTAKES TO AVOID</h2>

        <div className="space-y-3">
          {mistakes.map((m) => (
            <div
              key={m.title}
              className="reveal flex items-center gap-4 bg-dark-surface rounded-xl p-4 border border-neon-red/20 hover:border-neon-red/50 transition-all"
            >
              <div className="w-12 h-12 bg-neon-red/10 rounded-full flex items-center justify-center flex-shrink-0 border border-neon-red/30">
                <XCircle size={24} className="text-neon-red" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neon-red mb-0.5">{m.title}</h3>
                <p className="text-xs text-gray-400">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  FREE RESOURCES SECTION
// ═══════════════════════════════════════════════════════════
function ResourcesSection() {
  const resources = [
    {
      category: 'YouTube Channels',
      icon: <Play size={16} />,
      color: 'text-neon-red',
      items: ['Traversy Media', 'The Net Ninja', 'Fireship', 'Web Dev Simplified'],
    },
    {
      category: 'Documentation',
      icon: <BookOpen size={16} />,
      color: 'text-primary',
      items: ['MDN Web Docs', 'DevDocs.io', 'React Docs', 'Node.js Docs'],
    },
    {
      category: 'Practice Platforms',
      icon: <Target size={16} />,
      color: 'text-neon-green',
      items: ['FreeCodeCamp', 'Frontend Mentor', 'Codewars', 'LeetCode'],
    },
    {
      category: 'AI Tools',
      icon: <Bot size={16} />,
      color: 'text-neon-purple',
      items: ['ChatGPT', 'GitHub Copilot', 'Claude', 'Codeium'],
    },
  ];

  return (
    <section className="relative px-5 py-12">
      <div className="max-w-md mx-auto">
        <h2 className="section-title text-neon-green text-center mb-6 reveal">📚 FREE RESOURCES</h2>
        <p className="text-sm text-gray-400 text-center mb-6 reveal">Best Free Resources to Learn</p>

        <div className="space-y-4">
          {resources.map((r) => (
            <div key={r.category} className="reveal bg-dark-surface rounded-xl p-4 border border-zinc-700">
              <div className="flex items-center gap-2 mb-3">
                <span className={r.color}>{r.icon}</span>
                <h3 className="text-sm font-bold text-white">{r.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {r.items.map((item) => (
                  <span key={item} className="pill-dark text-[11px] hover:border-primary transition-colors cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  30-DAY CHALLENGE SECTION
// ═══════════════════════════════════════════════════════════
const challengeData = [
  {
    week: 'WEEK 1',
    title: 'HTML & CSS BASICS',
    days: 'Days 1-7',
    color: 'border-primary',
    bg: 'from-primary/10 to-primary/5',
    tasks: ['Learn HTML tags & structure', 'Master CSS selectors & box model', 'Build a personal landing page', 'Practice Flexbox & Grid layouts', 'Make your page responsive', 'Add hover effects & transitions', 'Deploy your first website!'],
  },
  {
    week: 'WEEK 2',
    title: 'JAVASCRIPT FUNDAMENTALS',
    days: 'Days 8-14',
    color: 'border-neon-yellow',
    bg: 'from-yellow-400/10 to-yellow-400/5',
    tasks: ['Variables, loops & functions', 'DOM manipulation basics', 'Build a calculator app', 'Build a to-do list app', 'Learn event listeners', 'LocalStorage for saving data', 'Make both apps interactive!'],
  },
  {
    week: 'WEEK 3',
    title: 'REACT & FRONTEND',
    days: 'Days 15-21',
    color: 'border-neon-blue',
    bg: 'from-blue-400/10 to-blue-400/5',
    tasks: ['Learn React components & JSX', 'Props and state management', 'Build a movie search app', 'Use React Hooks (useState, useEffect)', 'Fetch data from APIs', 'Build a weather dashboard', 'Style with modern CSS!'],
  },
  {
    week: 'WEEK 4',
    title: 'BACKEND & FULL PROJECT',
    days: 'Days 22-30',
    color: 'border-neon-green',
    bg: 'from-green-400/10 to-green-400/5',
    tasks: ['Setup Node.js & Express server', 'Connect MongoDB database', 'Build REST API endpoints', 'Add user authentication', 'Connect frontend to backend', 'Build a full-stack blog app', 'Deploy your complete app!'],
  },
];

function ChallengeSection() {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('zafar-challenge');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('zafar-challenge', JSON.stringify([...completed]));
  }, [completed]);

  const toggleTask = (key: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const totalTasks = challengeData.reduce((sum, w) => sum + w.tasks.length, 0);
  const progress = Math.round((completed.size / totalTasks) * 100);

  return (
    <section className="relative px-5 py-12">
      <div className="max-w-md mx-auto">
        <h2 className="section-title text-center mb-2 reveal">🗓️ 30-DAY CHALLENGE</h2>
        <p className="text-sm text-gray-400 text-center mb-4 reveal">Your First Month Plan!</p>

        {/* Progress */}
        <div className="reveal bg-dark-surface rounded-xl p-4 border border-zinc-700 mb-6">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-gray-400">Challenge Progress</span>
            <span className="text-primary font-bold">{completed.size}/{totalTasks} tasks</span>
          </div>
          <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-neon-green rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">{progress}% Complete — Keep going macha! 🔥</p>
        </div>

        {/* Weekly Cards */}
        <div className="space-y-4">
          {challengeData.map((week) => (
            <div key={week.week} className={`reveal bg-gradient-to-br ${week.bg} rounded-2xl p-4 border ${week.color} backdrop-blur-sm`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="pill-yellow text-[10px]">{week.week}</span>
                  <h3 className="text-sm font-black text-white mt-1">{week.title}</h3>
                </div>
                <span className="text-xs text-gray-400">{week.days}</span>
              </div>
              <div className="space-y-2">
                {week.tasks.map((task, i) => {
                  const key = `${week.week}-${i}`;
                  const isDone = completed.has(key);
                  return (
                    <button
                      key={i}
                      onClick={() => toggleTask(key)}
                      className={`w-full flex items-center gap-2.5 p-2.5 rounded-lg transition-all text-left
                        ${isDone ? 'bg-neon-green/20 border border-neon-green/30' : 'bg-black/30 border border-transparent hover:border-zinc-600'}`}
                    >
                      {isDone
                        ? <CheckCircle2 size={16} className="text-neon-green flex-shrink-0" />
                        : <Circle size={16} className="text-gray-500 flex-shrink-0" />
                      }
                      <span className={`text-xs ${isDone ? 'text-neon-green line-through' : 'text-gray-300'}`}>
                        Day {parseInt(week.days.split(' ')[1]) + i}: {task}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  FUTURE GROWTH SECTION
// ═══════════════════════════════════════════════════════════
function FutureSection() {
  const paths = [
    { title: 'Freelancing', desc: 'Be your own boss, work with global clients', icon: <Globe size={24} />, color: 'text-primary' },
    { title: 'Remote Jobs', desc: 'Work from anywhere in the world', icon: <Wifi size={24} />, color: 'text-neon-green' },
    { title: 'SaaS Products', desc: 'Build once, earn forever', icon: <Rocket size={24} />, color: 'text-neon-blue' },
    { title: 'Startups', desc: 'Solve real problems, create impact', icon: <Lightbulb size={24} />, color: 'text-neon-purple' },
  ];

  return (
    <section className="relative px-5 py-12">
      <div className="max-w-md mx-auto">
        <h2 className="section-title text-center mb-2 reveal">🚀 FUTURE GROWTH</h2>
        <p className="text-sm text-gray-400 text-center mb-6 reveal">What&apos;s Next After Full Stack?</p>

        <div className="grid grid-cols-2 gap-3">
          {paths.map((p) => (
            <div key={p.title} className="reveal bg-dark-surface rounded-xl p-4 border border-zinc-700 hover:border-primary transition-all hover:-translate-y-1 text-center">
              <div className={`${p.color} mx-auto mb-2`}>{p.icon}</div>
              <h3 className="text-sm font-bold text-white mb-1">{p.title}</h3>
              <p className="text-[11px] text-gray-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  FINAL CTA SECTION
// ═══════════════════════════════════════════════════════════
function FinalCTASection() {
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <section className="relative px-5 py-16 overflow-hidden">
      <Confetti active={showConfetti} />
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-3xl font-black text-white text-stroke mb-4 reveal" style={{ textShadow: '4px 4px 0 #000' }}>
          🔥 START YOUR JOURNEY TODAY ZAFAR! 🔥
        </h2>

        <div className="reveal bg-black rounded-xl p-5 border border-zinc-800 mb-6 font-code">
          <p className="text-lg text-neon-green font-bold">
            Learn → Build → Share → Earn
          </p>
        </div>

        <p className="text-sm text-gray-300 leading-relaxed mb-6 reveal">
          Macha, discipline beats motivation. Small steps every day. One year later, your life can look completely different. Keep going da! 🚀
        </p>

        <button
          onClick={() => setShowConfetti(true)}
          className="reveal px-8 py-4 bg-primary text-black font-black text-lg rounded-full border-4 border-black shadow-text-3d-lg hover:shadow-glow transition-all active:scale-95 animate-pulse-glow"
        >
          💪 LET&apos;S DO THIS! 💪
        </button>

        {showConfetti && (
          <button onClick={() => setShowConfetti(false)} className="block mx-auto mt-4 text-xs text-gray-500">
            <RotateCcw size={14} className="inline mr-1" /> Replay
          </button>
        )}

        {/* Mascot */}
        <div className="reveal mt-8 relative">
          <img
            src="/mascot-boy.png"
            alt="Zafar Mascot"
            className="w-64 h-80 mx-auto object-contain drop-shadow-[0_0_20px_rgba(57,255,20,0.3)]"
            loading="lazy"
          />
        </div>

        <p className="text-xs text-gray-500 mt-6 reveal">
          Made with ❤️ for Zafar. Your big brother believes in you macha!
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════
function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <div className="max-w-[430px] mx-auto relative overflow-hidden">
        <HeroSection />
        <PowerSection />
        <CoreSkillsSection />
        <RoadmapSection />
        <ProjectsSection />
        <FAQSection />
        <MoneySection />
        <PortfolioSection />
        <DisciplineSection />
        <MotivationSection />
        <CommunitySection />
        <ProgressTrackerSection />
        <MistakesSection />
        <ResourcesSection />
        <ChallengeSection />
        <FutureSection />
        <FinalCTASection />
      </div>
    </div>
  );
}

export default App;
