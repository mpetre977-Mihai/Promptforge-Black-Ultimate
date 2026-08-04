import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Terminal,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Zap,
  Flame,
  Lock,
  Star,
  ExternalLink
} from 'lucide-react';

// Pricing details
const PRODUCTS = [
  {
    id: 'basic',
    name: 'BASIC PACK',
    price: '$49',
    type: 'one-time',
    description: 'Perfect for starters and hobbyists looking to enhance their AI outputs.',
    features: [
      '100 premium prompts',
      'For personal use',
      'ChatGPT, Midjourney & Claude',
      'Lifetime access'
    ],
    stripeLink: 'https://buy.stripe.com/4gM28q20I1VzeUFctX00001',
    popular: false,
    value: ''
  },
  {
    id: 'pro',
    name: 'PRO PACK',
    price: '$99',
    type: 'one-time',
    description: 'The standard for professionals, creators, and power users who need leverage.',
    features: [
      '500 premium prompts',
      'Commercial use allowed',
      'Monthly updates',
      'Priority Discord support',
      'Copy-paste ready templates'
    ],
    stripeLink: 'https://buy.stripe.com/aFadR8cFm9o113PfG900002',
    popular: true,
    value: 'MOST POPULAR'
  },
  {
    id: 'agency',
    name: 'AGENCY PACK',
    price: '$199',
    type: 'lifetime',
    description: 'Unrestricted power for agencies, teams, and high-volume commercial builders.',
    features: [
      'Unlimited prompts + all future packs',
      'Full commercial + agency license',
      'White label rights',
      'Dedicated Slack channel',
      '1-on-1 prompt consultation'
    ],
    stripeLink: 'https://buy.stripe.com/14AbJ048QcAd27T8dH00000',
    popular: false,
    value: 'BEST VALUE'
  }
];

// Features List
const FEATURES = [
  {
    title: 'Expert Engineered Prompts',
    description: 'Meticulously crafted and thoroughly tested to deliver consistent, production-ready AI outputs every time.',
    icon: Sparkles
  },
  {
    title: 'Multi-AI Compatibility',
    description: 'Optimized instructions custom-tailored for ChatGPT (GPT-4), Midjourney v6, and Claude 3.5 Sonnet.',
    icon: Terminal
  },
  {
    title: 'Instant Copy-Paste',
    description: 'One-click copying makes it seamless to integrate premium prompts straight into your daily workflow.',
    icon: Zap
  },
  {
    title: 'Commercial Licensing',
    description: 'Build products, generate assets for clients, and run commercial campaigns without any copyright worries.',
    icon: ShieldCheck
  },
  {
    title: 'Organized Categories',
    description: 'Easily navigate prompts organized by marketing, copywriting, design, coding, strategy, and more.',
    icon: Layers
  },
  {
    title: 'Lifetime Free Updates',
    description: 'Never worry about stale prompts. Access all future prompt iterations and new additions free of charge.',
    icon: Cpu
  }
];

// FAQs List
const FAQS = [
  {
    question: "What exactly is PromptForge and how does it work?",
    answer: "PromptForge is a highly curated library of premium, expert-engineered AI prompts for ChatGPT, Midjourney, and Claude. Instead of wasting hours guessing how to instruct AI, you can copy and paste our vetted prompts to get top-tier results in seconds."
  },
  {
    question: "Can I use these prompts for my client work or commercial projects?",
    answer: "Absolutely! The Pro Pack and Agency Pack both come with full commercial usage rights. The Agency Pack additionally includes white-label rights and an agency license, allowing you to build and package prompt libraries for client distribution."
  },
  {
    question: "How do I get access after making a payment?",
    answer: "Immediately after your payment is processed via Stripe, you will receive an automated email with your direct access link to the PromptForge vault. You will also be redirected to our thank-you page with instructions."
  },
  {
    question: "Do you offer updates as AI models evolve?",
    answer: "Yes! The AI landscape moves fast. We update our prompts regularly to optimize for the latest LLM releases (such as GPT-4o, Claude 3.5, and Midjourney v6) and add entirely new prompt packs monthly. Pro and Agency members receive these updates forever."
  },
  {
    question: "What is your refund policy?",
    answer: "Due to the digital nature of prompt libraries and instant vault access, we do not offer refunds. However, we stand behind the outstanding quality of our prompt collection. If you have any issues, reach out and we will make it right."
  }
];

// Testimonials
const TESTIMONIALS = [
  {
    quote: "PromptForge changed how I write code and copy. The Claude templates alone saved me 15+ hours this week. Phenomenal asset!",
    author: "Sarah Jenkins",
    role: "Lead Developer at TechFlow",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    quote: "The Midjourney prompts are pure magic. My design process went from trial-and-error to generating stunning UI mockups instantly.",
    author: "Alex Rivera",
    role: "Freelance Brand Designer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    quote: "Purchased the Agency Pack and white-labeled the prompts for our internal marketing team. Our productivity has skyrocketed.",
    author: "Marcus Chen",
    role: "CEO, Spark Agency",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Simple router simulation
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // Handle browser back/forward buttons
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (currentPath === '/thank-you') {
    return (
      <div className="min-h-screen bg-[#050508] text-white flex flex-col justify-between selection:bg-purple-500 selection:text-white">
        {/* Nav */}
        <header className="border-b border-white/5 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-gradient-to-tr from-purple-600 to-indigo-500 p-2 rounded-xl shadow-lg shadow-purple-500/20">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Prompt<span className="text-purple-500 font-extrabold">Forge</span>
              </span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              Back to Home <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow flex items-center justify-center px-4 py-20 relative overflow-hidden">
          {/* Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl w-full text-center relative z-10">
            <div className="inline-flex items-center justify-center p-4 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 mb-6 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4 leading-tight">
              Thank You for Your Purchase!
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Welcome to the elite club of AI builders. Your subscription/pack activation is complete. We've sent an email with your secure credentials and direct vault access link.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left mb-8 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                What to do next:
              </h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-2">
                  <span className="text-purple-400 font-bold">1.</span>
                  <span>Check your spam/promotions folder if you don't see the confirmation email within 2 minutes.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 font-bold">2.</span>
                  <span>Bookmark the <strong>PromptForge Vault</strong> link sent to your email to get instant access anytime.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 font-bold">3.</span>
                  <span>Join our exclusive Discord channel to network with fellow AI engineers and access bonus weekly drops.</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl transition duration-300 shadow-lg shadow-purple-600/30 active:scale-95 flex items-center justify-center gap-2"
              >
                Go to Homepage
              </button>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-medium rounded-xl transition duration-300 active:scale-95 flex items-center justify-center gap-2"
              >
                Join Discord <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} PromptForge. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-gray-100 flex flex-col selection:bg-purple-600 selection:text-white">
      {/* HEADER / NAVIGATION */}
      <header className="border-b border-white/5 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-gradient-to-tr from-purple-600 to-indigo-500 p-2.5 rounded-xl shadow-lg shadow-purple-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                Prompt<span className="text-purple-500 font-extrabold">Forge</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" /> Pricing
              </a>
              <a href="#testimonials" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Testimonials</a>
              <a href="#faq" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">FAQ</a>
            </nav>

            {/* CTA Header Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#pricing"
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition duration-300 shadow-lg shadow-purple-600/25 active:scale-95"
              >
                Browse Prompts
              </a>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/5 bg-[#050508]/95 px-4 pt-2 pb-6 space-y-3 absolute top-20 left-0 w-full backdrop-blur-xl transition-all">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
            >
              Features
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-purple-400 hover:text-purple-300 hover:bg-white/5"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
            >
              Testimonials
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
            >
              FAQ
            </a>
            <div className="pt-4 border-t border-white/5">
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-colors shadow-lg shadow-purple-600/20"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        {/* Background Gradients & Accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-12 left-10 w-96 h-96 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute right-1/4 bottom-12 w-[500px] h-[500px] bg-purple-800/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-purple-300 mb-8 backdrop-blur-sm shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-ping" />
            <span className="font-medium">Version 4.2 Drop is Live</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400">Optimized for GPT-4o & Claude 3.5</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-tight sm:leading-none mb-8">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              1000+ Prompts That Make AI Work Like Magic
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-gray-400 mb-10 leading-relaxed font-light">
            Unlock the true capabilities of ChatGPT, Midjourney, and Claude. Stop wrestling with instructions. Get premium, engineered prompts designed to 10x your speed and quality instantly.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition duration-300 shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 active:scale-95 flex items-center justify-center gap-2 group text-base"
            >
              Get Premium Prompts <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition duration-300 active:scale-95 flex items-center justify-center gap-2 text-base"
            >
              Explore Features
            </a>
          </div>

          {/* Prompt Preview Mockup (Modern Dark Card) */}
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-[#0b0b0f] p-1.5 md:p-3 shadow-2xl shadow-purple-950/20 backdrop-blur-md">
            <div className="bg-[#0c0c12] rounded-xl border border-white/5 overflow-hidden text-left">
              {/* Mockup Toolbar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0e0e16]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10">
                  <Terminal className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs font-mono text-gray-400">expert_system_architect.prompt</span>
                </div>
                <div className="w-14" />
              </div>
              {/* Mockup Editor Content */}
              <div className="p-4 md:p-6 font-mono text-xs sm:text-sm text-gray-300 space-y-4">
                <p className="text-purple-400"># SYSTEM INSTRUCTIONS FOR CLAUDE 3.5 SONNET</p>
                <p className="text-gray-400">
                  Act as a world-class systems architect. You are tasked with designing a production-ready, highly-scalable backend service using AWS Serverless patterns.
                </p>
                <p className="text-gray-400">
                  Ensure the architectural blueprints include strict API definitions, DynamoDB single-table schema designs with partition and sort keys laid out clearly, and an explicit disaster recovery protocol.
                </p>
                <div className="p-4 bg-white/5 rounded-lg border border-purple-500/20 text-xs text-gray-400">
                  <span className="text-purple-400 font-bold">Output Expectation:</span> Provide Markdown-formatted UML diagrams, raw YAML config templates, and JSON mock response schemas.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANIONS / LOGO CLOUD */}
      <section className="py-12 border-y border-white/5 bg-[#08080c]/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6">
            Engineered For Excellence On
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            <span className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              🤖 ChatGPT Plus
            </span>
            <span className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              ⛵ Midjourney v6
            </span>
            <span className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              🎭 Claude 3.5 Sonnet
            </span>
            <span className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              🌀 Llama 3
            </span>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION (6 Features) */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-purple-900/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-base text-purple-400 font-semibold tracking-wider uppercase mb-3">Why PromptForge</h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              Supercharge Your Output in Seconds
            </p>
            <p className="text-lg text-gray-400 mt-4">
              Stop settling for average. Our hand-crafted, meticulously detailed prompts unlock features in LLMs you didn't even know existed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.07] transition-all duration-300 group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                  <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTERSTITIAL BRAND STATS */}
      <section className="py-16 bg-gradient-to-r from-purple-950/10 via-[#050508] to-indigo-950/10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-extrabold text-white">1,000+</p>
              <p className="text-sm text-gray-400 mt-2">Premium Prompts</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-extrabold text-white">15,000+</p>
              <p className="text-sm text-gray-400 mt-2">AI Creators Served</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-extrabold text-white">10x</p>
              <p className="text-sm text-gray-400 mt-2">Efficiency Boost</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-extrabold text-white">99.4%</p>
              <p className="text-sm text-gray-400 mt-2">Satisfaction Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION (3 Cards, PRO is Popular) */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        {/* Colorful backgrounds for the main section */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-base text-purple-400 font-semibold tracking-wider uppercase mb-3">Simple, Transparent Pricing</h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              One-Time Payment. Lifetime Power.
            </p>
            <p className="text-lg text-gray-400 mt-4">
              Invest in your workflow today. Select the perfect pack and start generating world-class AI outputs. No monthly subscriptions, no hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  prod.popular
                    ? 'bg-gradient-to-b from-[#161226] to-[#0c0a17] border-2 border-purple-500 shadow-2xl shadow-purple-500/10 md:-translate-y-4 scale-100'
                    : 'bg-[#0c0c12] border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Popular / Best Value Badge */}
                {prod.value && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase ${
                    prod.popular ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-800 text-purple-300 border border-purple-500/20'
                  }`}>
                    {prod.value}
                  </div>
                )}

                <div>
                  {/* Name and Description */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white tracking-wide mb-2 uppercase">{prod.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{prod.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-5xl font-extrabold text-white tracking-tight">{prod.price}</span>
                    <span className="text-gray-500 text-sm font-semibold uppercase">/ {prod.type}</span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-10 text-left border-t border-white/5 pt-8">
                    {prod.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${prod.popular ? 'text-purple-400' : 'text-gray-400'}`} />
                        <span className="text-sm text-gray-300 font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buy Button */}
                <div>
                  <a
                    href={prod.stripeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full text-center py-4 px-6 rounded-2xl font-bold transition duration-300 active:scale-95 text-base shadow-md ${
                      prod.popular
                        ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/20 hover:shadow-purple-600/40'
                        : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                    }`}
                  >
                    Get Instant Access
                  </a>
                  <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-gray-500" /> Secure 256-bit SSL checkout
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 bg-[#08080c]/30 relative overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-base text-purple-400 font-semibold tracking-wider uppercase mb-3">Loved by Creators</h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              What AI Power Users Say
            </p>
            <p className="text-lg text-gray-400 mt-4">
              Join thousands of developers, copywriters, marketers, and design teams who are using PromptForge to accelerate daily workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#0c0c12] border border-white/5 flex flex-col justify-between hover:border-white/10 transition-colors"
              >
                <div>
                  <div className="flex gap-1 text-purple-400 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-purple-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic text-base leading-relaxed mb-8">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-12 h-12 rounded-full object-cover border border-purple-500/30"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-bold text-white text-sm sm:text-base">{t.author}</p>
                    <p className="text-xs text-gray-500 font-semibold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION (5 Questions) */}
      <section id="faq" className="py-24 relative overflow-hidden">
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-900/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-base text-purple-400 font-semibold tracking-wider uppercase mb-3">Got Questions?</h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/5 bg-[#0c0c12] hover:bg-[#0e0e16] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-6 text-left font-bold text-white text-base sm:text-lg focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-purple-400 flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-80 border-t border-white/5' : 'max-h-0'
                    }`}
                  >
                    <div className="p-6 text-gray-400 text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative rounded-3xl p-8 md:p-16 overflow-hidden bg-gradient-to-b from-[#140e2d] to-[#0a061c] border border-purple-500/30 text-center">
            {/* Gradients */}
            <div className="absolute inset-0 bg-radial-gradient from-purple-600/10 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Ready to Supercharge Your AI Workflows?
              </h2>
              <p className="text-gray-300 text-lg mb-8 font-light">
                Get full access to the PromptForge library. Elevate your engineering speed, design jaw-dropping visual landscapes, and build digital products at the speed of thought.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="#pricing"
                  className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition duration-300 shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 active:scale-95"
                >
                  Get Instant Access
                </a>
                <a
                  href="#faq"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition duration-300 active:scale-95"
                >
                  Still Have Questions?
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#030305] border-t border-white/5 pt-16 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-tr from-purple-600 to-indigo-500 p-2 rounded-xl">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Prompt<span className="text-purple-500">Forge</span>
                </span>
              </div>
              <p className="text-sm text-gray-500 max-w-sm leading-relaxed mb-6">
                PromptForge is the world's premium engineered prompt repository. We enable individuals and enterprises to master LLMs and generative design suites instantly.
              </p>
            </div>

            {/* Links column */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-gray-500 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-500 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#testimonials" className="text-gray-500 hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#faq" className="text-gray-500 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Contact / Legal column */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Contact & Support</h3>
              <p className="text-sm text-gray-500 mb-2">Have a question or request?</p>
              <a href="mailto:support@promptforge.ai" className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium">
                support@promptforge.ai
              </a>
              <div className="mt-4 flex gap-4 text-xs text-gray-500 border-t border-white/5 pt-4">
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: We protect your data and do not sell information to third parties."); }} className="hover:text-white transition-colors">Privacy</a>
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms of Service: Prompts are for legal, personal and licensed commercial activities. Unauthorized reselling is strictly prohibited."); }} className="hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <p>© {new Date().getFullYear()} PromptForge. Premium AI Prompts. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <Sparkles className="w-3.5 h-3.5 text-purple-500" /> for the AI Generation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
