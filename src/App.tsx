import { useState, useEffect } from 'react';
import { Sparkles, Layers, Terminal, CheckCircle2, ChevronDown, ChevronUp, Menu, X, ArrowRight, ShieldCheck, Cpu, Zap, Flame, Lock, Star, ExternalLink, LogOut, Download, Crown } from 'lucide-react';

const PRODUCTS = [
  { id: 'basic', name: 'BASIC PACK', price: '$49', type: 'one-time', description: 'Perfect for starters and hobbyists looking to enhance their AI outputs.', features: ['100 premium prompts','For personal use','ChatGPT, Midjourney & Claude','Lifetime access'], stripeLink: 'https://buy.stripe.com/4gM28q20I1VzeUFctX00001', popular: false, value: '' },
  { id: 'pro', name: 'PRO PACK', price: '$99', type: 'one-time', description: 'The standard for professionals, creators, and power users who need leverage.', features: ['500 premium prompts','Commercial use allowed','Monthly updates','Priority Discord support','Copy-paste ready templates'], stripeLink: 'https://buy.stripe.com/aFadR8cFm9o113PfG900002', popular: true, value: 'MOST POPULAR' },
  { id: 'agency', name: 'AGENCY PACK', price: '$199', type: 'lifetime', description: 'Unrestricted power for agencies, teams, and high-volume commercial builders.', features: ['Unlimited prompts + all future packs','Full commercial + agency license','White label rights','Dedicated Slack channel','1-on-1 prompt consultation'], stripeLink: 'https://buy.stripe.com/14AbJ048QcAd27T8dH00000', popular: false, value: 'BEST VALUE' }
];

const FEATURES = [
  { title: 'Expert Engineered Prompts', description: 'Meticulously crafted and thoroughly tested to deliver consistent, production-ready AI outputs every time.', icon: Sparkles },
  { title: 'Multi-AI Compatibility', description: 'Optimized instructions custom-tailored for ChatGPT (GPT-4), Midjourney v6, and Claude 3.5 Sonnet.', icon: Terminal },
  { title: 'Instant Copy-Paste', description: 'One-click copying makes it seamless to integrate premium prompts straight into your daily workflow.', icon: Zap },
  { title: 'Commercial Licensing', description: 'Build products, generate assets for clients, and run commercial campaigns without any copyright worries.', icon: ShieldCheck },
  { title: 'Organized Categories', description: 'Easily navigate prompts organized by marketing, copywriting, design, coding, strategy, and more.', icon: Layers },
  { title: 'Lifetime Free Updates', description: 'Never worry about stale prompts. Access all future prompt iterations and new additions free of charge.', icon: Cpu }
];

const FAQS = [
  { question: "What exactly is PromptForge and how does it work?", answer: "PromptForge is a highly curated library of premium, expert-engineered AI prompts for ChatGPT, Midjourney, and Claude. Instead of wasting hours guessing how to instruct AI, you can copy and paste our vetted prompts to get top-tier results in seconds." },
  { question: "Can I use these prompts for my client work or commercial projects?", answer: "Absolutely! The Pro Pack and Agency Pack both come with full commercial usage rights. The Agency Pack additionally includes white-label rights and an agency license, allowing you to build and package prompt libraries for client distribution." },
  { question: "How do I get access after making a payment?", answer: "Immediately after your payment is processed via Stripe, you will receive an automated email with your direct access link to the PromptForge vault. You will also be redirected to our thank-you page with instructions." },
  { question: "Do you offer updates as AI models evolve?", answer: "Yes! The AI landscape moves fast. We update our prompts regularly to optimize for the latest LLM releases (such as GPT-4o, Claude 3.5, and Midjourney v6) and add entirely new prompt packs monthly. Pro and Agency members receive these updates forever." },
  { question: "What is your refund policy?", answer: "Due to the digital nature of prompt libraries and instant vault access, we do not offer refunds. However, we stand behind the outstanding quality of our prompt collection. If you have any issues, reach out and we will make it right." }
];

const TESTIMONIALS = [
  { quote: "PromptForge changed how I write code and copy. The Claude templates alone saved me 15+ hours this week. Phenomenal asset!", author: "Sarah Jenkins", role: "Lead Developer at TechFlow", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" },
  { quote: "The Midjourney prompts are pure magic. My design process went from trial-and-error to generating stunning UI mockups instantly.", author: "Alex Rivera", role: "Freelance Brand Designer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" },
  { quote: "Purchased the Agency Pack and white-labeled the prompts for our internal marketing team. Our productivity has skyrocketed.", author: "Marcus Chen", role: "CEO, Spark Agency", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80" }
];

function ActivatePage() {
  const [key, setKey] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'valid'|'invalid'>('idle');
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get('key');
    if (k) { setKey(k); verify(k); }
  }, []);

  async function verify(k: string) {
    if (!k) return;
    setStatus('loading');
    try {
      const r = await fetch(`/api/verify-license?key=${encodeURIComponent(k)}`);
      const j = await r.json();
      if (j.valid) {
        setStatus('valid'); setInfo(j);
        localStorage.setItem('pf_license_key', k);
        localStorage.setItem('pf_license', JSON.stringify(j));
      } else { setStatus('invalid'); }
    } catch { setStatus('invalid'); }
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-lg w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center relative z-10 backdrop-blur-sm">
        <div className="bg-gradient-to-tr from-purple-600 to-indigo-500 p-3 rounded-xl w-fit mx-auto mb-4"><Sparkles className="w-6 h-6 text-white" /></div>
        <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Activează licența</h1>
        <p className="text-gray-400 mb-6 text-sm">Cheia din emailul tău <b className="text-white">{key || 'PF-...'}</b></p>
        <div className="flex gap-2 mb-6">
          <input value={key} onChange={e=>setKey(e.target.value)} placeholder="PF-XXXX-XXXX-XXXX" className="flex-1 px-4 py-3 rounded-xl bg-black border border-white/10 text-white text-sm" />
          <button onClick={()=>verify(key)} className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-sm">Verifică</button>
        </div>
        {status==='loading' && <p className="text-purple-400 animate-pulse">Se verifică...</p>}
        {status==='valid' && <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-left"><p className="text-green-400 font-bold flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> Licență validă!</p><p className="text-sm mt-3 text-gray-300">Plan: <b className="text-white">{info.plan?.toUpperCase()}</b><br/>Email: {info.email}</p><a href="/vault" className="mt-4 inline-block w-full text-center px-6 py-3 bg-white text-black rounded-xl font-bold">Mergi la Vault →</a></div>}
        {status==='invalid' && <p className="text-red-400 font-bold bg-red-500/10 border border-red-500/30 rounded-xl p-3">❌ Cheie invalidă. Verifică emailul din spam.</p>}
      </div>
    </div>
  )
}

function VaultPage({ navigate }: { navigate: (p:string)=>void }) {
  const [license, setLicense] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('pf_license');
    const key = localStorage.getItem('pf_license_key');
    if (!saved ||!key) { window.location.href = '/activate'; return; }
    setLicense(JSON.parse(saved));
  }, []);

  if (!license) return <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center">Se încarcă Vault-ul...</div>;

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <header className="border-b border-white/5 p-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2"><div className="bg-gradient-to-tr from-purple-600 to-indigo-500 p-2 rounded-xl"><Crown className="w-5 h-5" /></div><span className="font-bold">PromptForge Vault</span><span className="ml-3 px-3 py-1 bg-purple-600 rounded-full text-xs font-bold">{license.plan?.toUpperCase()}</span></div>
        <button onClick={()=>{localStorage.clear(); navigate('/');}} className="text-sm text-gray-400 hover:text-white flex gap-2 items-center"><LogOut className="w-4 h-4"/> Logout</button>
      </header>
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold mb-2">Bine ai venit în Vault, {license.email}</h1>
        <p className="text-gray-400 mb-8">Aici vezi prompturile pentru planul tău <b className="text-white">{license.plan}</b>. Testul tău cu {localStorage.getItem('pf_license_key')} merge perfect.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6"><h3 className="font-bold mb-2 flex items-center gap-2"><Download className="w-5 h-5 text-purple-400"/> BASIC Pack</h3><p className="text-sm text-gray-400 mb-4">100+ prompturi. {license.plan==='basic' || license.plan==='pro' || license.plan==='agency'? '✅ Deblocat' : '🔒 Blocat'}</p><button className="w-full py-2 bg-white text-black rounded-xl font-bold text-sm">Descarcă PDF</button></div>
          <div className="bg-white/5 border border-purple-500/30 rounded-2xl p-6"><h3 className="font-bold mb-2 flex items-center gap-2"><Crown className="w-5 h-5 text-purple-400"/> PRO Pack</h3><p className="text-sm text-gray-400 mb-4">500+ prompturi. {license.plan==='pro' || license.plan==='agency'? '✅ Deblocat' : '🔒 Blocat - Upgrade'}</p><button className="w-full py-2 bg-purple-600 text-white rounded-xl font-bold text-sm">Descarcă PDF</button></div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6"><h3 className="font-bold mb-2">AGENCY Pack</h3><p className="text-sm text-gray-400 mb-4">Unlimited. {license.plan==='agency'? '✅ Deblocat' : '🔒 Blocat'}</p><button className="w-full py-2 bg-white/10 text-white rounded-xl font-bold text-sm">Descarcă PDF</button></div>
        </div>

        <div className="mt-10 bg-[#0c0c12] border border-white/5 rounded-2xl p-6">
          <h2 className="font-bold mb-4">Prompturi de test (primele 3 din Basic)</h2>
          <div className="space-y-3 text-sm text-gray-300 font-mono bg-black/50 p-4 rounded-xl">
            <p>1. Act as a senior copywriter for SaaS... [Basic]</p>
            <p>2. You are Midjourney v6 architect, create photorealistic UI...</p>
            <p>3. System prompt for Claude 3.5 to debug React performance...</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const navigate = (path: string) => { window.history.pushState({}, '', path); setCurrentPath(path); window.scrollTo(0, 0); };

  useEffect(() => {
    const handlePopState = () => { setCurrentPath(window.location.pathname); };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleFaq = (index: number) => { setOpenFaq(openFaq === index? null : index); };

  if (currentPath === '/thank-you') {
    return (
      <div className="min-h-screen bg-[#050508] text-white flex flex-col justify-between">
        <header className="border-b border-white/5 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-50"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"><div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}><div className="bg-gradient-to-tr from-purple-600 to-indigo-500 p-2 rounded-xl"><Sparkles className="w-5 h-5" /></div><span className="text-xl font-bold">Prompt<span className="text-purple-500">Forge</span></span></div><button onClick={() => navigate('/')} className="text-sm text-gray-400">Back to Home</button></div></header>
        <main className="flex-grow flex items-center justify-center p-4"><div className="text-center max-w-xl"><CheckCircle2 className="w-12 h-12 text-purple-400 mx-auto mb-4"/><h1 className="text-4xl font-extrabold mb-4">Thank You!</h1><p className="text-gray-400 mb-6">Emailul cu licența a fost trimis. Verifică spam.</p><button onClick={()=>navigate('/')} className="px-6 py-3 bg-purple-600 rounded-xl">Homepage</button></div></main>
      </div>
    );
  }
  if (currentPath.startsWith('/activate')) { return <ActivatePage />; }
  if (currentPath.startsWith('/vault')) { return <VaultPage navigate={navigate} />; }

  return (
    <div className="min-h-screen bg-[#050508] text-gray-100 flex flex-col">
      <header className="border-b border-white/5 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-50"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"><div className="flex items-center gap-3 cursor-pointer" onClick={()=>navigate('/')}><div className="bg-gradient-to-tr from-purple-600 to-indigo-500 p-2.5 rounded-xl"><Sparkles className="w-5 h-5 text-white" /></div><span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Prompt<span className="text-purple-500">Forge</span></span></div><nav className="hidden md:flex gap-8"><a href="#features" className="text-sm text-gray-400">Features</a><a href="#pricing" className="text-sm text-purple-400">Pricing</a><a href="#testimonials" className="text-sm text-gray-400">Testimonials</a><a href="#faq" className="text-sm text-gray-400">FAQ</a></nav><div className="hidden md:flex"><a href="#pricing" className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm">Browse Prompts</a></div><div className="md:hidden"><button onClick={()=>setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-400">{mobileMenuOpen? <X/> : <Menu/>}</button></div></div></header>
      <section className="pt-24 pb-20 text-center max-w-7xl mx-auto px-4"><h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">1000+ Prompts That Make AI Work Like Magic</h1><p className="text-gray-400 text-xl mb-10">Unlock ChatGPT, Midjourney, Claude.</p><a href="#pricing" className="px-8 py-4 bg-purple-600 rounded-xl font-semibold inline-flex gap-2">Get Premium Prompts <ArrowRight className="w-5 h-5"/></a></section>
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-4"><div className="grid grid-cols-1 lg:grid-cols-3 gap-8">{PRODUCTS.map(p=>(<div key={p.id} className={`rounded-3xl p-8 border ${p.popular?'border-purple-500 bg-[#161226]':'border-white/10 bg-[#0c0c12]'}`}><h3 className="text-2xl font-bold mb-2">{p.name}</h3><p className="text-5xl font-extrabold mb-6">{p.price}</p><ul className="space-y-2 mb-6">{p.features.map((f,i)=><li key={i} className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-purple-400"/>{f}</li>)}</ul><a href={p.stripeLink} target="_blank" className="block text-center py-3 bg-purple-600 rounded-xl font-bold">Get Instant Access</a></div>))}</div></section>
      <footer className="border-t border-white/5 py-8 text-center text-sm text-gray-500">© {new Date().getFullYear()} PromptForge</footer>
    </div>
  );
}
