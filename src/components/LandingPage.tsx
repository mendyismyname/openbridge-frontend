import React, { useState } from 'react';
import { 
  ArrowRight, 
  Layers, 
  Cpu, 
  Compass, 
  Link2, 
  Activity, 
  Terminal, 
  Play, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  Laptop, 
  Smartphone, 
  ChevronDown, 
  Plus, 
  Star,
  ChevronRight,
  Shield,
  Zap,
  Check,
  UserCheck
} from 'lucide-react';

interface LandingPageProps {
  onEnterConsole: () => void;
}

export default function LandingPage({ onEnterConsole }: LandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [demoApproved, setDemoApproved] = useState<boolean | null>(null);

  // New interactive states for Create, Collect, Insights, Operations
  const [activeMockTab, setActiveMockTab] = useState<'create' | 'collect' | 'insights' | 'operations'>('create');
  const [selectedDirective, setSelectedDirective] = useState<'hotel' | 'slack' | 'ubereats' | 'credentials'>('hotel');
  const [isDemoAuthorized, setIsDemoAuthorized] = useState<boolean>(false);
  const [activeCollectFile, setActiveCollectFile] = useState<string | null>('travel_itinerary_uk.pdf');
  const [insightsViewMode, setInsightsViewMode] = useState<'velocity' | 'load'>('velocity');
  const [opsRunningStep, setOpsRunningStep] = useState<number>(0);
  const [opsLogs, setOpsLogs] = useState<string[]>([
    '[bridge] Secure bridge tunnel established on port 3000',
    '[bridge] Listening for calendar and file triggers...'
  ]);

  const capabilities = [
    {
      num: '01',
      title: 'Workspace Orchestration',
      desc: 'Connect your workspace platforms, calendar schedules, and messaging platforms. Let the AI CEO read corporate docs and schedule timelines.',
      tags: ['Slack Sync', 'Notion Link']
    },
    {
      num: '02',
      title: 'Staged Purchasing',
      desc: 'Pre-fill orders on platforms like UberEats or Booking.com based on your preferences. The AI CEO stages checkouts and halts for physical approval.',
      tags: ['UberEats Proxy', 'Travel Booking']
    },
    {
      num: '03',
      title: 'Dev & Git Integration',
      desc: 'Link local sandboxes and git environments. Prepare draft codebases, execute automated testing daemons, and package clean git diffs.',
      tags: ['Git Pipelines', 'Local Sandbox']
    },
    {
      num: '04',
      title: 'Personal Assistance',
      desc: 'Draft delicate emails, cross-compile spreadsheets, structure company handbooks, and execute administrative pipelines autonomously.',
      tags: ['Inbox Triage', 'Admin Pipelines']
    }
  ];

  const journeySteps = [
    {
      num: '01',
      title: 'Get the macOS App',
      subtitle: 'Download our friendly desktop helper app to link your accounts.'
    },
    {
      num: '02',
      title: 'Link Your Computer',
      subtitle: 'Run a simple secure code in your terminal to safely pair your device.'
    },
    {
      num: '03',
      title: 'Grant Permissions',
      subtitle: 'Turn on simple system access so your assistant can safely draft tasks for you.'
    },
    {
      num: '04',
      title: 'Connect Workspace',
      subtitle: 'Sync your team calendar, project boards, and email tools to get started.'
    }
  ];

  const faqs = [
    {
      q: 'How does my AI helper work with my accounts?',
      a: 'It connects to your tools like Gmail, Notion, and GitHub through secure connections. It works exactly like a helpful virtual assistant—writing draft emails, scheduling calendar events, or preparing task lists—but it will always ask you for final approval before sending any message or booking any transaction.'
    },
    {
      q: 'Is my personal data and transaction information safe?',
      a: 'Yes, completely. Your passwords and private accounts never leave your own computer. The helper acts as a secure local draft companion, preparing everything for you to review and approve with a simple, direct click.'
    },
    {
      q: 'Can I customize how the AI assistant communicates?',
      a: 'Absolutely. You can choose whether you want your assistant to sound friendly and energetic, polite and detailed, or concise and high-level, so it feels like a natural extension of your team.'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafc] text-neutral-800 font-sans overflow-x-hidden selection:bg-neutral-200 selection:text-neutral-900 relative">
      
      {/* 1. Luxurious Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-150/80 bg-white/85 backdrop-blur-md px-6 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-display font-bold text-base tracking-tighter leading-none shadow-sm">
            Br
          </div>
          <div className="text-left">
            <span className="font-display font-bold text-lg tracking-tight text-neutral-900 block leading-none">OpenBridge</span>
            <span className="text-[9px] text-neutral-400 font-mono tracking-widest uppercase mt-0.5 block">verrazano</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-neutral-500 uppercase tracking-widest">
          <a href="#how-it-works" className="hover:text-neutral-900 transition-colors">macOS app</a>
          <a href="#capabilities" className="hover:text-neutral-900 transition-colors">Capabilities</a>
          <a href="#simulator" className="hover:text-neutral-900 transition-colors">Sandbox Demo</a>
          <a href="#faq" className="hover:text-neutral-900 transition-colors">FAQ</a>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={onEnterConsole}
            className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors px-3 py-1.5"
          >
            Log in
          </button>
          <button 
            onClick={onEnterConsole}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-850 active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            <span>Launch Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. Hero Section - Versive Styled Editorial Layout */}
      <section className="bg-white relative overflow-hidden px-6 lg:px-16 pt-20 pb-28 text-center">
        {/* Abstract background decorative glow grids */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-display font-medium text-neutral-900 tracking-tight leading-[1.1] max-w-5xl mx-auto">
            Fastest way to <br className="hidden sm:inline" />
            <span className="text-black">full AI collaboration</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-500 max-w-2xl mx-auto font-sans font-light leading-relaxed">
            Workspace orchestration, sandboxed browser checkouts, and local git pipelines. 
            verrazano translates raw guidance into secure multi-step campaigns, staging actions locally 
            for your physical approval.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button 
              onClick={onEnterConsole}
              className="px-6 py-3.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl active:scale-98"
            >
              Get started for free
            </button>
            <a 
              href="#simulator"
              className="px-6 py-3.5 rounded-full border border-neutral-200 hover:bg-neutral-50 text-neutral-800 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200"
            >
              Book a demo
            </a>
          </div>

          {/* Active Navigation Tabs representing current view in the high-fidelity mock */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 text-[11px] font-mono tracking-wider text-neutral-400 mt-16 border-b border-neutral-150 pb-2.5 max-w-xl mx-auto select-none">
            <button 
              onClick={() => {
                setActiveMockTab('create');
                setIsDemoAuthorized(false);
              }}
              className={`pb-2.5 font-bold transition-all border-b-2 cursor-pointer ${
                activeMockTab === 'create' 
                  ? 'text-neutral-950 border-neutral-950 font-bold' 
                  : 'text-neutral-400 border-transparent hover:text-neutral-600 font-medium'
              }`}
            >
              01 Create
            </button>
            <button 
              onClick={() => {
                setActiveMockTab('collect');
                setIsDemoAuthorized(false);
              }}
              className={`pb-2.5 font-bold transition-all border-b-2 cursor-pointer ${
                activeMockTab === 'collect' 
                  ? 'text-neutral-950 border-neutral-950 font-bold' 
                  : 'text-neutral-400 border-transparent hover:text-neutral-600 font-medium'
              }`}
            >
              02 Collect
            </button>
            <button 
              onClick={() => {
                setActiveMockTab('insights');
                setIsDemoAuthorized(false);
              }}
              className={`pb-2.5 font-bold transition-all border-b-2 cursor-pointer ${
                activeMockTab === 'insights' 
                  ? 'text-neutral-950 border-neutral-950 font-bold' 
                  : 'text-neutral-400 border-transparent hover:text-neutral-600 font-medium'
              }`}
            >
              03 Insights
            </button>
            <button 
              onClick={() => {
                setActiveMockTab('operations');
                setIsDemoAuthorized(false);
              }}
              className={`pb-2.5 font-bold transition-all border-b-2 cursor-pointer ${
                activeMockTab === 'operations' 
                  ? 'text-neutral-950 border-neutral-950 font-bold' 
                  : 'text-neutral-400 border-transparent hover:text-neutral-600 font-medium'
              }`}
            >
              04 Operations
            </button>
          </div>

          {/* Glowing Mockup Graphic Section */}
          <div className="relative mt-8 max-w-5xl mx-auto">
            {/* Multi-layered soft glowing mesh behind mockup */}
            <div className="absolute -inset-4 sm:-inset-10 rounded-[32px] bg-gradient-to-tr from-indigo-500 via-purple-400 to-pink-500 opacity-15 blur-3xl pointer-events-none animate-pulse-subtle"></div>
            
            <div className="relative rounded-2xl border border-neutral-200/80 bg-white/70 backdrop-blur-md p-2 shadow-2xl transition-all duration-300">
              {/* Clean Mock Browser Container */}
              <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden text-left shadow-sm flex flex-col">
                
                {/* Mock Browser Top bar */}
                <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-3 flex items-center justify-between text-xs text-neutral-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="bg-white border border-neutral-200/60 rounded px-4 py-0.5 text-[10px] text-neutral-400 max-w-xs truncate font-semibold">
                    verrazano-workspace-sandbox.local
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="w-3 h-3 text-neutral-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                </div>

                {/* Mock App Layout Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px] text-xs">
                  
                  {/* LEFT PANEL */}
                  {activeMockTab === 'create' && (
                    <div className="md:col-span-3 border-r border-neutral-200 bg-neutral-50/50 p-4 space-y-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block font-bold">Active Directives</span>
                        <p className="text-[10px] text-neutral-500">Staged on local bridge</p>
                      </div>

                      <div className="space-y-1.5">
                        <button
                          onClick={() => { setSelectedDirective('hotel'); setIsDemoAuthorized(false); }}
                          className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                            selectedDirective === 'hotel'
                              ? 'bg-neutral-900 text-white border-neutral-900 font-semibold'
                              : 'bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-600'
                          }`}
                        >
                          <span>Fulfill London Hotel</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${selectedDirective === 'hotel' ? 'bg-white' : 'bg-neutral-300'}`}></span>
                        </button>

                        <button
                          onClick={() => { setSelectedDirective('slack'); setIsDemoAuthorized(false); }}
                          className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                            selectedDirective === 'slack'
                              ? 'bg-neutral-900 text-white border-neutral-900 font-semibold'
                              : 'bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-600'
                          }`}
                        >
                          <span>Slack Outreach List</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${selectedDirective === 'slack' ? 'bg-white' : 'bg-neutral-300'}`}></span>
                        </button>

                        <button
                          onClick={() => { setSelectedDirective('ubereats'); setIsDemoAuthorized(false); }}
                          className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                            selectedDirective === 'ubereats'
                              ? 'bg-neutral-900 text-white border-neutral-900 font-semibold'
                              : 'bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-600'
                          }`}
                        >
                          <span>Verify UberEats Lunch</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${selectedDirective === 'ubereats' ? 'bg-white' : 'bg-neutral-300'}`}></span>
                        </button>

                        <button
                          onClick={() => { setSelectedDirective('credentials'); setIsDemoAuthorized(false); }}
                          className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                            selectedDirective === 'credentials'
                              ? 'bg-neutral-900 text-white border-neutral-900 font-semibold'
                              : 'bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-600'
                          }`}
                        >
                          <span>Local Credentials Sync</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${selectedDirective === 'credentials' ? 'bg-white' : 'bg-neutral-300'}`}></span>
                        </button>
                      </div>
                    </div>
                  )}

                  {activeMockTab === 'collect' && (
                    <div className="md:col-span-3 border-r border-neutral-200 bg-neutral-50/50 p-4 space-y-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block font-bold">Data Harvest</span>
                        <p className="text-[10px] text-neutral-500">Connected Local Tunnels</p>
                      </div>

                      <div className="space-y-1.5">
                        <div className="p-2 rounded-lg bg-neutral-100/80 border border-neutral-200 text-neutral-800 font-medium flex items-center justify-between">
                          <span>WhatsApp Client</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        </div>
                        <div className="p-2 rounded-lg bg-neutral-100/80 border border-neutral-200 text-neutral-800 font-medium flex items-center justify-between">
                          <span>Google Drive API</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        </div>
                        <div className="p-2 rounded-lg bg-neutral-100/80 border border-neutral-200 text-neutral-800 font-medium flex items-center justify-between">
                          <span>Local SSH Directory</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMockTab === 'insights' && (
                    <div className="md:col-span-3 border-r border-neutral-200 bg-neutral-50/50 p-4 space-y-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block font-bold">Metrics Filters</span>
                        <p className="text-[10px] text-neutral-500">Analyze performance logs</p>
                      </div>

                      <div className="space-y-1.5">
                        <button
                          onClick={() => setInsightsViewMode('velocity')}
                          className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                            insightsViewMode === 'velocity'
                              ? 'bg-neutral-900 text-white border-neutral-900 font-semibold'
                              : 'bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-600'
                          }`}
                        >
                          <span>Weekly Transactions</span>
                          <span className="text-[10px] font-mono font-bold">↗</span>
                        </button>
                        <button
                          onClick={() => setInsightsViewMode('load')}
                          className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                            insightsViewMode === 'load'
                              ? 'bg-neutral-900 text-white border-neutral-900 font-semibold'
                              : 'bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-600'
                          }`}
                        >
                          <span>Local Memory Load</span>
                          <span className="text-[10px] font-mono font-bold">14%</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {activeMockTab === 'operations' && (
                    <div className="md:col-span-3 border-r border-neutral-200 bg-neutral-50/50 p-4 space-y-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block font-bold">Runtime Nodes</span>
                        <p className="text-[10px] text-neutral-500">Physical sandbox hosts</p>
                      </div>

                      <div className="space-y-1.5">
                        <div className="p-2.5 rounded-lg bg-neutral-900 text-white border border-neutral-900 font-semibold flex items-center justify-between">
                          <span>macOS-Bridge-01</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-neutral-200 text-neutral-500 flex items-center justify-between font-light">
                          <span>Secure-Proxy-Port</span>
                          <span className="text-[10px] font-mono text-neutral-400">3000</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-neutral-200 text-neutral-500 flex items-center justify-between font-light">
                          <span>Sandbox-Runtime-v2</span>
                          <span className="text-[10px] font-mono text-neutral-400">NodeJS</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CENTER MAIN WORKSPACE */}
                  <div className="md:col-span-6 p-5 space-y-5 flex flex-col justify-between">
                    
                    {/* Create Tab Center Content */}
                    {activeMockTab === 'create' && (
                      <div className="flex-1 flex flex-col justify-between h-full">
                        {isDemoAuthorized ? (
                          <div className="space-y-4 my-auto text-center p-6 bg-emerald-50/50 border border-emerald-200 rounded-2xl animate-fade-in">
                            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
                              <Check className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-sm font-bold text-emerald-950 uppercase tracking-wide">✓ Directive Authorized & Dispatched</h4>
                              <p className="text-[11px] text-emerald-700 leading-relaxed font-light">
                                Verrazano client bridge intercepted the signature token successfully. Staged operation has been processed in a sandboxed secure context.
                              </p>
                            </div>
                            <button
                              onClick={() => setIsDemoAuthorized(false)}
                              className="mx-auto px-4 py-1.5 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-lg text-[10px] font-mono font-bold transition-all shadow-xs cursor-pointer"
                            >
                              Reset Demonstration Sandbox
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4 flex flex-col justify-between h-full">
                            {/* Selected Directive Details */}
                            {selectedDirective === 'hotel' && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-mono bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-bold uppercase">Staged Action</span>
                                  <span className="text-neutral-400 font-mono text-[10px]">Reference #LN-3004</span>
                                </div>
                                <h3 className="text-lg font-display font-medium text-neutral-900">
                                  Fulfill London hotel stay suite
                                </h3>
                                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                  Parsed your calendar event for the London Tech Summit. Located hotel rates near the venue and staged the checkout process.
                                </p>
                                <div className="space-y-2 pt-1">
                                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="font-semibold text-neutral-800">citizenM Tower Bridge</span>
                                      <span className="text-[10px] text-neutral-400 font-mono">4 Nights @ $185</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] text-neutral-500 border-t border-neutral-200/60 pt-2 font-mono">
                                      <span>Subtotal Price</span>
                                      <span className="text-neutral-900 font-bold">$740.00</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl bg-white text-[10px] font-mono">
                                    <span className="text-neutral-500">Security Adapter Code</span>
                                    <span className="text-emerald-600 font-bold">Curve25519 Activated [✓]</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {selectedDirective === 'slack' && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-mono bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold uppercase">Staged Outreach</span>
                                  <span className="text-neutral-400 font-mono text-[10px]">Reference #SL-8921</span>
                                </div>
                                <h3 className="text-lg font-display font-medium text-neutral-900">
                                  Outbound Partner Slack Outreach
                                </h3>
                                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                  Crawled active channel conversations. Formulated personalized follow-up pitches targeting 50 key partners in your CRM log.
                                </p>
                                <div className="space-y-2 pt-1">
                                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="font-semibold text-neutral-800">Direct Message Outreach</span>
                                      <span className="text-[10px] text-neutral-400 font-mono">50 SaaS Executives</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] text-neutral-500 border-t border-neutral-200/60 pt-2 font-mono">
                                      <span>Execution Plan</span>
                                      <span className="text-indigo-600 font-bold font-mono text-[10px]">Staged Draft Messages</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl bg-white text-[10px] font-mono">
                                    <span className="text-neutral-500">Security Adapter Code</span>
                                    <span className="text-emerald-600 font-bold">Local SSH Tunnel Sign [✓]</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {selectedDirective === 'ubereats' && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-mono bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-bold uppercase">Staged Food Order</span>
                                  <span className="text-neutral-400 font-mono text-[10px]">Reference #UB-5092</span>
                                </div>
                                <h3 className="text-lg font-display font-medium text-neutral-900">
                                  Verify UberEats Lunch order
                                </h3>
                                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                  Your Friday sushi routine order has been constructed. Food items matched, delivery cart prefilled and waiting for payment gateway validation.
                                </p>
                                <div className="space-y-2 pt-1">
                                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="font-semibold text-neutral-800">1x Spicy Salmon Roll + Miso Soup</span>
                                      <span className="text-[10px] text-neutral-400 font-mono">Subtotal</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] text-neutral-500 border-t border-neutral-200/60 pt-2 font-mono">
                                      <span>Est. Total with fees</span>
                                      <span className="text-amber-600 font-bold">$18.40</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl bg-white text-[10px] font-mono">
                                    <span className="text-neutral-500">Security Adapter Code</span>
                                    <span className="text-emerald-600 font-bold">Encrypted Card Token [✓]</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {selectedDirective === 'credentials' && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-mono bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-bold uppercase">Tunnel Security</span>
                                  <span className="text-neutral-400 font-mono text-[10px]">Reference #SEC-0099</span>
                                </div>
                                <h3 className="text-lg font-display font-medium text-neutral-900">
                                  Secure Local Credentials Sync
                                </h3>
                                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                  Interchange SSH fingerprint files between the cloud control console and your physical MacBook bridge to keep communication securely encrypted.
                                </p>
                                <div className="space-y-2 pt-1">
                                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="font-semibold text-neutral-800">SSH Public Key Swap</span>
                                      <span className="text-[10px] text-neutral-400 font-mono">RSA-4096</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] text-neutral-500 border-t border-neutral-200/60 pt-2 font-mono">
                                      <span>Local Endpoint IP</span>
                                      <span className="text-rose-600 font-bold">127.0.0.1 (Localhost)</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl bg-white text-[10px] font-mono">
                                    <span className="text-neutral-500">Security Adapter Code</span>
                                    <span className="text-emerald-600 font-bold">SHA256:8af192ae07b [✓]</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="border-t border-neutral-200 pt-4 flex justify-between items-center mt-auto">
                              <span className="text-[10px] font-mono text-neutral-400 font-medium">Requires supervisor signature</span>
                              <button 
                                onClick={() => setIsDemoAuthorized(true)}
                                className="px-4 py-2 rounded-lg bg-black hover:bg-neutral-800 text-white font-mono text-xs font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer"
                              >
                                <span>Authorize & Dispatch</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Collect Tab Center Content */}
                    {activeMockTab === 'collect' && (
                      <div className="flex-1 flex flex-col justify-between h-full">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold uppercase">Live Harvester</span>
                            <span className="text-neutral-400 font-mono text-[10px]">Sync active</span>
                          </div>

                          <h3 className="text-base font-display font-medium text-neutral-900">
                            Harvester Pipeline Attachments
                          </h3>
                          <p className="text-xs text-neutral-500 font-light leading-relaxed">
                            Verrazano automatically scans and filters your connected feeds, staging attachments locally on your Mac for parsing. Click an attachment to inspect:
                          </p>

                          {/* Clickable staged items */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                            <button
                              onClick={() => setActiveCollectFile('feedback_logs_v1.csv')}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                activeCollectFile === 'feedback_logs_v1.csv'
                                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                                  : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-750'
                              }`}
                            >
                              <span className="font-mono text-[8px] block uppercase font-bold opacity-75">Slack Stream</span>
                              <span className="text-xs font-semibold block truncate mt-1">feedback_logs.csv</span>
                              <span className="text-[9px] block mt-1 text-emerald-500 font-mono font-bold">Processed ✓</span>
                            </button>

                            <button
                              onClick={() => setActiveCollectFile('travel_itinerary_uk.pdf')}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                activeCollectFile === 'travel_itinerary_uk.pdf'
                                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                                  : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-750'
                              }`}
                            >
                              <span className="font-mono text-[8px] block uppercase font-bold opacity-75">Email Inbox</span>
                              <span className="text-xs font-semibold block truncate mt-1">travel_itinerary.pdf</span>
                              <span className="text-[9px] block mt-1 text-orange-500 font-mono font-bold">Staged •</span>
                            </button>

                            <button
                              onClick={() => setActiveCollectFile('invoice_booking_48.png')}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                activeCollectFile === 'invoice_booking_48.png'
                                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                                  : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-750'
                              }`}
                            >
                              <span className="font-mono text-[8px] block uppercase font-bold opacity-75">WhatsApp</span>
                              <span className="text-xs font-semibold block truncate mt-1">invoice_booking.png</span>
                              <span className="text-[9px] block mt-1 text-rose-500 font-mono font-bold">Needs Auth !</span>
                            </button>
                          </div>

                          {/* Decrypted Parsed Section */}
                          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1.5 text-[10px] font-mono mt-2">
                            <span className="text-[9px] text-neutral-400 block uppercase font-bold">Parsed Output Preview</span>
                            {activeCollectFile === 'feedback_logs_v1.csv' && (
                              <div className="space-y-1 text-neutral-700 text-left">
                                <div><span className="text-neutral-400">Total Comments:</span> 15 logs</div>
                                <div><span className="text-neutral-400">Isolated Keyphrase:</span> "checkout-flow bottleneck"</div>
                                <div><span className="text-neutral-400">Action Suggested:</span> Optimize React load states</div>
                              </div>
                            )}
                            {activeCollectFile === 'travel_itinerary_uk.pdf' && (
                              <div className="space-y-1 text-neutral-700 text-left">
                                <div><span className="text-neutral-400">Guest Name:</span> Adrian Seldomridge</div>
                                <div><span className="text-neutral-400">Destination:</span> citizenM Tower Bridge London</div>
                                <div><span className="text-neutral-400">Nights Staged:</span> 4 nights (July 24-28)</div>
                              </div>
                            )}
                            {activeCollectFile === 'invoice_booking_48.png' && (
                              <div className="space-y-1 text-neutral-700 text-left">
                                <div><span className="text-neutral-400">Billing Vendor:</span> Uber Amsterdam BV</div>
                                <div><span className="text-neutral-400">Calculated Subtotal:</span> $18.40 USD</div>
                                <div><span className="text-neutral-400">Verification:</span> Staged matching local ledger</div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="border-t border-neutral-200 pt-4 flex justify-between items-center text-[10px] font-mono text-neutral-400 mt-auto">
                          <span>Harvested logs encrypted locally on your Mac</span>
                          <span className="text-emerald-600 font-bold flex items-center gap-1 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Continuous Sync Online
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Insights Tab Center Content */}
                    {activeMockTab === 'insights' && (
                      <div className="flex-1 flex flex-col justify-between h-full">
                        <div className="space-y-3 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono bg-neutral-900 text-white px-2 py-0.5 rounded font-bold uppercase">Analytics</span>
                            <span className="text-neutral-400 font-mono text-[10px]">Updated live</span>
                          </div>

                          <h3 className="text-base font-display font-medium text-neutral-900">
                            {insightsViewMode === 'velocity' ? 'Weekly Transaction Volume' : 'Local Resource Footprint'}
                          </h3>
                          <p className="text-xs text-neutral-500 font-light leading-relaxed">
                            {insightsViewMode === 'velocity' 
                              ? 'This chart measures weekly transaction actions and hours worked successfully logged by your local assistant.' 
                              : 'Real-time CPU and memory usage of the isolated sandbox workspace. High-performance, zero thermal throttling.'}
                          </p>

                          {/* Beautiful Interactive custom SVG Line Chart */}
                          <div className="w-full h-32 bg-neutral-50 rounded-xl border border-neutral-200 relative p-3 flex flex-col justify-between overflow-hidden">
                            {insightsViewMode === 'velocity' ? (
                              <>
                                {/* Grid lines */}
                                <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-40">
                                  <div className="border-b border-neutral-200 w-full"></div>
                                  <div className="border-b border-neutral-200 w-full"></div>
                                  <div className="border-b border-neutral-200 w-full"></div>
                                </div>
                                {/* SVG Line */}
                                <svg className="w-full h-full overflow-visible z-10" viewBox="0 0 400 80">
                                  <path
                                    d="M 10 70 Q 100 40 200 20 T 390 10"
                                    fill="none"
                                    stroke="black"
                                    strokeWidth="2"
                                  />
                                  <path
                                    d="M 10 70 Q 100 40 200 20 T 390 10 L 390 80 L 10 80 Z"
                                    fill="url(#gradient)"
                                    opacity="0.06"
                                  />
                                  <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stopColor="black" />
                                      <stop offset="100%" stopColor="white" />
                                    </linearGradient>
                                  </defs>
                                  {/* Dot indicator */}
                                  <circle cx="390" cy="10" r="4" fill="black" />
                                </svg>
                                <div className="flex justify-between text-[8px] font-mono text-neutral-400 relative z-10">
                                  <span>Mon</span>
                                  <span>Wed</span>
                                  <span>Fri</span>
                                  <span>Today (Peak Outbound)</span>
                                </div>
                              </>
                            ) : (
                              <>
                                {/* Semicircular Gauge represented via clean SVG for pixel perfect look */}
                                <div className="relative flex flex-col items-center justify-center mt-1">
                                  <svg width="100" height="50" viewBox="0 0 100 50">
                                    <path 
                                      d="M 10 50 A 40 40 0 0 1 90 50" 
                                      fill="none" 
                                      stroke="#e5e5e5" 
                                      strokeWidth="8" 
                                      strokeLinecap="round"
                                    />
                                    <path 
                                      d="M 10 50 A 40 40 0 0 1 45 13" 
                                      fill="none" 
                                      stroke="#10b981" 
                                      strokeWidth="8" 
                                      strokeLinecap="round"
                                    />
                                    <circle cx="45" cy="13" r="3" fill="black" />
                                  </svg>
                                  <div className="text-[10px] font-mono font-bold mt-1 text-neutral-800">14% Core Memory Load</div>
                                </div>
                              </>
                            )}
                          </div>

                          {/* Quick Summary Metrics */}
                          <div className="grid grid-cols-3 gap-3 pt-1">
                            <div className="bg-neutral-50 p-2 rounded-lg border border-neutral-150 text-center">
                              <span className="text-[8px] font-mono uppercase text-neutral-400 block font-bold">Hours Saved</span>
                              <span className="text-xs font-semibold text-neutral-900">18.4 Hours</span>
                            </div>
                            <div className="bg-neutral-50 p-2 rounded-lg border border-neutral-150 text-center">
                              <span className="text-[8px] font-mono uppercase text-neutral-400 block font-bold">Successful</span>
                              <span className="text-xs font-semibold text-neutral-900">98.4%</span>
                            </div>
                            <div className="bg-neutral-50 p-2 rounded-lg border border-neutral-150 text-center">
                              <span className="text-[8px] font-mono uppercase text-neutral-400 block font-bold">Bridge Temp</span>
                              <span className="text-xs font-semibold text-neutral-900">19°C (Stable)</span>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-neutral-200 pt-3 flex justify-between items-center text-[10px] font-mono text-neutral-400 mt-auto">
                          <span>Aggregated weekly transaction and hour logs</span>
                          <span className="text-neutral-900 font-bold">Weekly Audit Approved ✓</span>
                        </div>
                      </div>
                    )}

                    {/* Operations Tab Center Content */}
                    {activeMockTab === 'operations' && (
                      <div className="flex-1 flex flex-col justify-between h-full">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-mono bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-bold uppercase">Console Live</span>
                              <span className="text-neutral-400 font-mono text-[10px]">Terminal state</span>
                            </div>
                            <button
                              onClick={() => {
                                setOpsRunningStep(0);
                                setOpsLogs([
                                  '[bridge] Secure bridge tunnel established on port 3000',
                                  '[bridge] Listening for calendar and file triggers...'
                                ]);
                              }}
                              className="text-[9px] font-mono text-neutral-400 hover:text-neutral-800 underline font-bold cursor-pointer"
                            >
                              Reset Terminal
                            </button>
                          </div>

                          <h3 className="text-base font-display font-medium text-neutral-900">
                            Local Tunnel Process Logs
                          </h3>

                          {/* Retro Monospace Console Block */}
                          <div className="p-3 bg-neutral-950 text-[#9bf2a0] font-mono text-[10px] rounded-xl space-y-1 h-32 overflow-y-auto scrollbar-thin text-left border border-neutral-850">
                            {opsLogs.map((log, index) => (
                              <div key={index} className="leading-relaxed animate-fade-in truncate">
                                <span className="text-neutral-550 mr-1.5">&gt;</span>
                                {log}
                              </div>
                            ))}
                            <div className="w-1.5 h-3.5 bg-[#9bf2a0] animate-pulse inline-block align-middle ml-1"></div>
                          </div>

                          {/* Clickable Action simulation */}
                          <div className="flex items-center justify-between gap-3 pt-1">
                            <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-500">
                              <span>Simulation progress:</span>
                              <strong className="text-neutral-950">{opsRunningStep * 25}%</strong>
                            </div>
                            
                            <button
                              onClick={() => {
                                if (opsRunningStep >= 4) return;
                                const nextStep = opsRunningStep + 1;
                                setOpsRunningStep(nextStep);
                                if (nextStep === 1) {
                                  setOpsLogs(prev => [...prev, '[bridge] Initiating Curve25519 secure handshakes...', '[bridge] Exchange credentials payload verified']);
                                } else if (nextStep === 2) {
                                  setOpsLogs(prev => [...prev, '[bridge] Port 3000 authorized for browser tunnels', '[bridge] Spawned sandboxed browser workspace']);
                                } else if (nextStep === 3) {
                                  setOpsLogs(prev => [...prev, '[bridge] Querying calendar and matching local orders...', '[bridge] 1 staged checkout hotel stay compiled']);
                                } else if (nextStep === 4) {
                                  setOpsLogs(prev => [...prev, '[bridge] Authorize dispatch token validated by signature', '[bridge] Process complete. Secure tunnel holding state. ✓']);
                                }
                              }}
                              disabled={opsRunningStep >= 4}
                              className={`px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer ${
                                opsRunningStep >= 4
                                  ? 'bg-neutral-100 border border-neutral-200 text-neutral-400'
                                  : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                              }`}
                            >
                              <span>{opsRunningStep >= 4 ? 'Demo Complete' : 'Execute Step-by-Step Loop'}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Interactive Step Node Visualizer */}
                        <div className="border-t border-neutral-200 pt-3 flex justify-between items-center text-[10px] font-mono text-neutral-400 mt-auto">
                          <div className="flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${opsRunningStep >= 1 ? 'bg-[#9bf2a0]' : 'bg-neutral-300'}`}></span>
                            <span>Handshake</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${opsRunningStep >= 2 ? 'bg-[#9bf2a0]' : 'bg-neutral-300'}`}></span>
                            <span>Port 3000</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${opsRunningStep >= 3 ? 'bg-[#9bf2a0]' : 'bg-neutral-300'}`}></span>
                            <span>Staged</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${opsRunningStep >= 4 ? 'bg-[#9bf2a0]' : 'bg-neutral-300'}`}></span>
                            <span>Signed</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* RIGHT ASSISTANT PANE */}
                  <div className="md:col-span-3 border-l border-neutral-200 bg-neutral-50/50 p-4 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-bold">Assistant Insight</span>
                        <span className="text-[9px] text-neutral-900 font-mono font-bold">A.I. Active</span>
                      </div>

                      {activeMockTab === 'create' && (
                        <div className="space-y-3">
                          <p className="text-[11px] text-neutral-600 leading-relaxed font-light font-sans">
                            I compiled this workflow based on your calendar schedule. Below is the active tracking log:
                          </p>

                          {selectedDirective === 'hotel' && (
                            <div className="space-y-2 text-[10px] font-mono">
                              <div className="flex items-start gap-1.5 text-neutral-500">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span>Mapped 12 local options</span>
                              </div>
                              <div className="flex items-start gap-1.5 text-neutral-500">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span>Selected optimal rates</span>
                              </div>
                              <div className="flex items-start gap-1.5 text-neutral-800 font-semibold">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>Holding for payment key</span>
                              </div>
                            </div>
                          )}

                          {selectedDirective === 'slack' && (
                            <div className="space-y-2 text-[10px] font-mono">
                              <div className="flex items-start gap-1.5 text-neutral-500">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span>Filtered 250 profiles</span>
                              </div>
                              <div className="flex items-start gap-1.5 text-neutral-500">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span>Isolated SaaS leaders</span>
                              </div>
                              <div className="flex items-start gap-1.5 text-neutral-800 font-semibold">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>Staging communication loop</span>
                              </div>
                            </div>
                          )}

                          {selectedDirective === 'ubereats' && (
                            <div className="space-y-2 text-[10px] font-mono">
                              <div className="flex items-start gap-1.5 text-neutral-500">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span>Cart established</span>
                              </div>
                              <div className="flex items-start gap-1.5 text-neutral-500">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span>Verified delivery address</span>
                              </div>
                              <div className="flex items-start gap-1.5 text-neutral-800 font-semibold">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>Awaiting signature to order</span>
                              </div>
                            </div>
                          )}

                          {selectedDirective === 'credentials' && (
                            <div className="space-y-2 text-[10px] font-mono">
                              <div className="flex items-start gap-1.5 text-neutral-500">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span>Port 3000 checked</span>
                              </div>
                              <div className="flex items-start gap-1.5 text-neutral-500">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span>Local certificate read</span>
                              </div>
                              <div className="flex items-start gap-1.5 text-neutral-800 font-semibold">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>Awaiting signature swap</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {activeMockTab === 'collect' && (
                        <div className="space-y-3">
                          <p className="text-[11px] text-neutral-600 leading-relaxed font-light font-sans">
                            Verrazano tracks folders on your local MacBook and crawls WhatsApp threads continuously:
                          </p>
                          <div className="space-y-2 text-[10px] font-mono">
                            <div className="flex items-start gap-1.5 text-neutral-500">
                              <span className="text-emerald-500 font-bold">✓</span>
                              <span>Monitoring slack streams</span>
                            </div>
                            <div className="flex items-start gap-1.5 text-neutral-500">
                              <span className="text-emerald-500 font-bold">✓</span>
                              <span>Scanning inbox receipts</span>
                            </div>
                            <div className="flex items-start gap-1.5 text-neutral-800 font-semibold">
                              <span className="text-emerald-500 font-bold">✓</span>
                              <span>Watching WhatsApp chats</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeMockTab === 'insights' && (
                        <div className="space-y-3">
                          <p className="text-[11px] text-neutral-600 leading-relaxed font-light font-sans">
                            Delegation analytics indicate real-world metrics from active campaigns:
                          </p>
                          <div className="space-y-2 text-[10px] font-mono text-neutral-700 font-medium">
                            <div>• Captcha bypassed: <strong className="text-black">12</strong></div>
                            <div>• SaaS velocity: <strong className="text-emerald-600 font-bold">3.5x faster</strong></div>
                          </div>
                        </div>
                      )}

                      {activeMockTab === 'operations' && (
                        <div className="space-y-3">
                          <p className="text-[11px] text-neutral-600 leading-relaxed font-light font-sans">
                            Operational loop status mapped through live port 3000 communication:
                          </p>
                          <div className="space-y-2 text-[10px] font-mono">
                            <div className="flex items-start gap-1.5 text-neutral-500">
                              <span className="text-neutral-400">Port:</span>
                              <span className="text-neutral-800 font-bold">3000 (Active)</span>
                            </div>
                            <div className="flex items-start gap-1.5 text-neutral-500">
                              <span className="text-neutral-400">Security:</span>
                              <span className="text-emerald-600 font-bold">Curve25519</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-neutral-200/80 text-[10px] text-neutral-400 font-mono font-medium leading-relaxed mt-4">
                      All transaction details are secured locally via client bridge.
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* Under-Mockup Elegant Transition Statement */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-neutral-800 tracking-tight leading-tight mt-16 max-w-3xl mx-auto">
            Helping research, product, and design teams <br className="hidden sm:inline" />
            <span className="text-black">learn and delegate faster</span>
          </h2>
        </div>
      </section>

      {/* 3. Transitional Statement - Spacious Clean Editorial Layout with Verrazano Bridge Background */}
      <section className="relative py-32 px-6 lg:px-16 text-center border-y border-neutral-850/10 overflow-hidden bg-neutral-950 text-white">
        {/* Background Image of Verrazano Bridge */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/02/Verrazano-Narrows_Bridge_from_Fort_Wadsworth.jpg" 
            alt="Verrazano-Narrows Bridge" 
            className="w-full h-full object-cover object-center opacity-20 filter grayscale contrast-125 scale-105 pointer-events-none"
            referrerPolicy="no-referrer"
          />
          {/* Elegant gradients to blend with dark background */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950"></div>
          <div className="absolute inset-0 bg-neutral-950/50"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 font-semibold">The Verrazano Protocol</p>
          <h2 className="text-3xl sm:text-4xl font-display font-normal text-white tracking-tight leading-[1.28]">
            Whether you want to automate customer outreach, <span className="text-neutral-450 font-light">schedule calendars</span>, draft technical codebases, or stage grocery orders, our specialists recommend a <span className="text-white font-semibold underline decoration-neutral-700 decoration-4 underline-offset-8">tailored delegation plan</span>.
          </h2>
          <div className="pt-4 flex justify-center gap-3 text-neutral-400">
            <span className="text-xs font-mono">Precision Framework</span>
            <span>•</span>
            <span className="text-xs font-mono">Local Sandboxed Daemons</span>
            <span>•</span>
            <span className="text-xs font-mono">Absolute Supervision</span>
          </div>
        </div>
      </section>

      {/* 4. Core Capabilities Horizontal Showcase - Carousel with clean round number badges (Seon Clinic style) */}
      <section id="capabilities" className="py-24 px-6 lg:px-16 max-w-7xl mx-auto text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-950 font-bold block">Capabilities</span>
            <h2 className="text-3xl font-display font-semibold text-neutral-900 tracking-tight">Tailored solutions for automated execution</h2>
          </div>
          <p className="text-neutral-500 text-xs md:text-sm font-light max-w-md">
            verrazano handles diverse workspace operations, maintaining strict local sandbox states and secure user checkpoints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => (
            <div 
              key={cap.num}
              className="p-6 rounded-2xl border border-neutral-200/60 bg-white hover:border-neutral-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all flex flex-col justify-between h-[300px] text-left relative group overflow-hidden"
            >
              <div className="flex justify-between items-start">
                {/* Clean round number badge */}
                <div className="w-8 h-8 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center text-xs font-mono text-neutral-500 font-bold">
                  {cap.num}
                </div>
                <div className="flex gap-1">
                  {cap.tags.map(t => (
                    <span key={t} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-500 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-6">
                <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-black transition-colors uppercase tracking-wider">
                  {cap.title}
                </h3>
                <p className="text-[11px] text-neutral-500 leading-relaxed font-light">
                  {cap.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                <span>Core Module Sync</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-300 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Why Choose Us Section (Clean full-width layout with elegant abstract background image) */}
      <section 
        className="relative border-y border-neutral-200/50 py-24 px-6 lg:px-16 text-center bg-cover bg-center overflow-hidden"
        style={{ 
          backgroundImage: "linear-gradient(rgba(250, 250, 252, 0.85), rgba(250, 250, 252, 0.85)), url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80')" 
        }}
      >
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-900 font-bold block">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-display font-light text-neutral-900 tracking-tight leading-tight">
            A commitment to <br />
            <span className="font-semibold text-black">supervised autonomy</span>.
          </h2>
          <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-light max-w-2xl mx-auto">
            Most autonomous platforms operate behind closed APIs, executing live transactions with zero human verification. 
            Our framework couples advanced models with safe-state checkpoints, guaranteeing complete executive oversight.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 max-w-2xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-xs border border-neutral-200/80 text-left shadow-xs">
              <ShieldCheck className="w-5 h-5 text-neutral-900 mb-3" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800">100% Supervised</h4>
              <p className="text-[11px] text-neutral-500 mt-1.5 leading-relaxed font-light">No money or git code leaves your device without physical console verification.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-xs border border-neutral-200/80 text-left shadow-xs">
              <Laptop className="w-5 h-5 text-neutral-900 mb-3" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800">Local Sandbox</h4>
              <p className="text-[11px] text-neutral-500 mt-1.5 leading-relaxed font-light">Active browser sessions run securely in an encrypted local daemon client.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Treatment Journey / Workflow Steps Section (Atmospheric Dark Bridge Background - Inspired by Seon Clinic) */}
      <section 
        id="how-it-works" 
        className="relative py-28 px-6 lg:px-16 text-left bg-cover bg-center overflow-hidden"
        style={{ 
          backgroundImage: "linear-gradient(rgba(15, 17, 23, 0.88), rgba(15, 17, 23, 0.94)), url('https://upload.wikimedia.org/wikipedia/commons/0/02/Verrazano-Narrows_Bridge_from_Fort_Wadsworth.jpg')" 
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold block">The macOS Install Journey</span>
            <h2 className="text-3xl md:text-4xl font-display font-light text-white tracking-tight mt-3">
              Our <span className="font-semibold">4-Stage Operational Protocol</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {journeySteps.map((step) => (
              <div key={step.num} className="space-y-4 relative">
                {/* Top horizontal divider line */}
                <div className="h-0.5 w-full bg-white/20 relative">
                  <span className="absolute left-0 -top-1 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                </div>
                <div className="pt-2 text-3xl font-display font-light text-white/30">
                  {step.num}
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{step.title}</h3>
                  <p className="text-[11px] text-neutral-300 leading-relaxed font-light">{step.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Interactive Sandbox Demonstration (Highly refined light layout - "Twisty" style) */}
      <section id="simulator" className="py-24 border-t border-neutral-200/50 bg-[#f4f5f8] px-6 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-950 font-bold">Try the Sandbox Simulator</span>
          <h2 className="text-3xl font-display font-semibold text-neutral-900 tracking-tight">Interact with an active checkout block</h2>
          <p className="text-xs md:text-sm text-neutral-500 font-light max-w-md mx-auto leading-relaxed">
            Experience how the supervisor loop halts for crucial parameters. Approve or Decline the simulated transaction below to view daemon feedback.
          </p>
        </div>

        {/* Refined clean card with subtle shadow and light borders */}
        <div className="max-w-md mx-auto p-6 rounded-2xl border border-neutral-200 bg-white shadow-xl shadow-neutral-200/50 text-left relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-xs font-mono text-orange-600 font-bold">
                UE
              </div>
              <div>
                <h4 className="text-xs font-semibold text-neutral-800">Team Lunch - UberEats Order</h4>
                <p className="text-[9px] text-neutral-400 font-mono">Status: Awaiting Supervisor Key</p>
              </div>
            </div>
            <span className="text-[9px] font-mono uppercase bg-amber-50 text-amber-600 px-2 py-0.5 rounded border border-amber-200/50 font-bold">Pending Review</span>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed font-light mb-4">
            verrazano scanned Slack channels for today's team lunch preferences. It pre-filled your UberEats cart with deluxe items from Sushi Palace and staged the checkout process.
          </p>

          <div className="p-3.5 bg-neutral-50 border border-neutral-200/60 rounded-xl text-[11px] font-mono space-y-1.5 text-neutral-500">
            <p className="text-neutral-700 font-semibold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-neutral-900" />
              <span>UberEats Cart Pre-filled ($142.50)</span>
            </p>
            <div className="pl-5 text-[10px] text-neutral-400 space-y-0.5">
              <p>🍣 Deluxe Salmon Platter x2</p>
              <p>🥟 Spicy Gyoza Side x3</p>
            </div>
          </div>

          {demoApproved === null ? (
            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-neutral-200/60">
              <button 
                onClick={() => setDemoApproved(false)}
                className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-[10px] font-mono text-neutral-500 cursor-pointer transition-colors"
              >
                Decline
              </button>
              <button 
                onClick={() => setDemoApproved(true)}
                className="px-4 py-1.5 rounded-lg bg-black hover:bg-neutral-800 text-white text-[10px] font-mono font-bold cursor-pointer shadow-md transition-colors"
              >
                Approve & Execute
              </button>
            </div>
          ) : demoApproved ? (
            <div className="mt-6 pt-4 border-t border-neutral-200/60 text-center text-xs text-emerald-600 font-mono flex items-center justify-center gap-2 animate-fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>[Demo Approved] Applying local payment keys and dispatching order...</span>
            </div>
          ) : (
            <div className="mt-6 pt-4 border-t border-neutral-200/60 text-center text-xs text-rose-500 font-mono flex items-center justify-center gap-2 animate-fade-in">
              <span>[Demo Canceled] Order discarded. Feedbacklogged to behavioral model.</span>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={onEnterConsole}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-all cursor-pointer shadow-md"
          >
            <span>Proceed to Live Operations Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 8. Beautiful FAQ Accordion Section (Seon Clinic Inspired layout) */}
      <section id="faq" className="py-24 px-6 lg:px-16 max-w-4xl mx-auto text-left bg-[#fafafc]">
        <div className="mb-12 text-center md:text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-950 font-bold block">FAQ</span>
          <h2 className="text-3xl font-display font-semibold text-neutral-900 tracking-tight mt-1">Frequently asked questions</h2>
        </div>

        <div className="space-y-4 border-t border-neutral-200 pt-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index} 
                className="border-b border-neutral-200/60 pb-4 transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full flex justify-between items-center py-4 text-left font-display text-sm font-semibold text-neutral-800 hover:text-black transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>
                {isOpen && (
                  <p className="text-xs text-neutral-500 leading-relaxed pl-1 animate-fade-in font-light">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Minimalist Elegant Footer */}
      <footer className="border-t border-neutral-200/80 bg-neutral-50 py-16 px-6 text-center text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold tracking-wider text-neutral-900 text-sm">OpenBridge</span>
            <span className="text-[10px] text-neutral-400 font-mono">© 2026 OpenBridge verrazano. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-[11px] font-semibold">
            <a href="#how-it-works" className="hover:text-neutral-800">macOS app</a>
            <a href="#capabilities" className="hover:text-neutral-800">Security Sandbox</a>
            <a href="#simulator" className="hover:text-neutral-800">Demo Simulator</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
