import React, { useState } from 'react';
import { ComputerAction, Project, ConnectedAccount } from '../types';
import ComputerActionCard from './ComputerActionCard';
import { 
  Activity, 
  Clock, 
  Radio, 
  Laptop, 
  ArrowUpRight,
  Server,
  Plus,
  Compass,
  ArrowRight,
  TrendingUp,
  Cpu,
  Shield,
  HelpCircle,
  Download,
  Terminal,
  Copy,
  Check,
  ShieldAlert,
  Zap,
  AlertTriangle
} from 'lucide-react';

interface DashboardViewProps {
  actions: ComputerAction[];
  projects: Project[];
  accounts: ConnectedAccount[];
  onApprove: (actionId: string) => void;
  onDecline: (actionId: string) => void;
  onAuth: (actionId: string) => void;
  activeDeepLinkId: string | null;
  setCurrentTab: (tab: string) => void;
  onToggleAccount: (id: string) => void;
  onOnboardAction?: (action: string) => void;
}

export default function DashboardView({
  actions,
  projects,
  accounts,
  onApprove,
  onDecline,
  onAuth,
  activeDeepLinkId,
  setCurrentTab,
  onToggleAccount,
  onOnboardAction
}: DashboardViewProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'success'>('all');
  const [bridgeCoreTemp, setBridgeCoreTemp] = useState(19);
  const [selectedRange, setSelectedRange] = useState<'Week' | 'Month'>('Week');
  const [showExplanations, setShowExplanations] = useState(true);
  const [customToken, setCustomToken] = useState('vz_tok_8f93a2e7c10b45fa92');
  const [copied, setCopied] = useState(false);
  const [activeInstallerTab, setActiveInstallerTab] = useState<'terminal' | 'mac-app'>('terminal');
  const [capacityLimit, setCapacityLimit] = useState<number>(15368);

  const isMacbookConnected = accounts.find(a => a.type === 'macbook')?.connected;

  const curlCommand = `curl -fsSL https://install.verrazano.ai/bridge.sh | env VERRAZANO_TOKEN="${customToken}" bash`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredActions = actions.filter((action) => {
    if (filter === 'pending') return action.status === 'pending_approval' || action.status === 'needs_auth';
    if (filter === 'success') return action.status === 'success';
    return true;
  });

  // Summary Metrics
  const activeProjectsCount = projects.filter(p => p.status === 'active').length;
  const pendingActionsCount = actions.filter(a => a.status === 'pending_approval' || a.status === 'needs_auth').length;
  const totalSubtasks = projects.reduce((acc, p) => acc + p.subtasks.length, 0);
  const completedSubtasks = projects.reduce(
    (acc, p) => acc + p.subtasks.filter(t => t.status === 'completed').length, 
    0
  );
  const overallProgress = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  // Static mock members for the "Let's Connect" section (Image 1 style)
  const systemTeam = [
    {
      name: "Randy Gouse",
      role: "Security Chief Supervisor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      level: "Senior",
      levelColor: "bg-orange-500 text-white"
    },
    {
      name: "Giana Schleifer",
      role: "API Integration Engineer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      level: "Middle",
      levelColor: "bg-neutral-900 text-white"
    }
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#fafafa] p-6 lg:p-8 space-y-8 select-none scrollbar-thin">
      
      {/* 1. Luxurious Dashboard Header Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-neutral-200/50 pb-6">
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
            <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase tracking-widest">Protocol Status: Synced</span>
          </div>
          <h1 className="text-xl font-display font-medium text-neutral-900 tracking-tight mt-1">
            System Executive Dashboard
          </h1>
          <p className="text-xs text-neutral-500 font-sans mt-0.5">
            Sandbox orchestration, credentials container, and local browser execution logs.
          </p>
        </div>

        {/* Sync Device Overview (Aesthetic widgets) */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Master Non-Technical Explanations Switch */}
          <div className="flex items-center gap-2 bg-white border border-neutral-200/60 px-3 py-1 rounded-full shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase tracking-wider">Help Guide</span>
            <button 
              onClick={() => setShowExplanations(!showExplanations)}
              title="Toggle clear explanations for all charts and metrics for non-technical users"
              className={`relative inline-flex h-4.5 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                showExplanations ? 'bg-black' : 'bg-neutral-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  showExplanations ? 'translate-x-3.5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50/60 border border-emerald-100/50 px-3.5 py-1 rounded-full text-[10px] font-mono text-emerald-600 font-bold">
            <Clock className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>Active 2h 45m</span>
          </div>
        </div>
      </div>

      {/* Dynamic Bridge Status Banner & Setup Guides */}
      {!isMacbookConnected ? (
        <div className="p-6 rounded-[28px] bg-white border border-neutral-200/60 shadow-xs space-y-6 text-left relative overflow-hidden animate-fade-in">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-400 border border-neutral-200/80 shrink-0">
                <ShieldAlert className="w-5 h-5 text-neutral-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] bg-neutral-100 text-neutral-600 border border-neutral-200 px-2 py-0.5 rounded font-mono font-semibold uppercase tracking-wider">
                    Bridge Setup Pending
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                </div>
                <h2 className="text-sm font-semibold text-neutral-900 mt-1">
                  Local Sandbox Bridge Not Detected
                </h2>
                <p className="text-xs text-neutral-500 font-light mt-0.5 leading-relaxed max-w-2xl">
                  Verrazano utilizes a secure local background client ("bridge") to control your local browser session and run sandboxed terminal operations. Follow the instructions below to establish the connection.
                </p>
              </div>
            </div>

            <button 
              onClick={() => onToggleAccount('acc-mac')}
              className="px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-mono font-bold transition-all shadow-sm active:scale-98 flex items-center gap-1.5 shrink-0 self-start md:self-center cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulate Quick Connection</span>
            </button>
          </div>

          {/* Installation Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            
            {/* Steps & Guide */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
                <button 
                  onClick={() => setActiveInstallerTab('terminal')}
                  className={`text-xs font-mono font-bold pb-1.5 border-b-2 transition-all ${
                    activeInstallerTab === 'terminal' 
                      ? 'border-black text-black' 
                      : 'border-transparent text-neutral-400 hover:text-neutral-600'
                  }`}
                >
                  Terminal Command (Recommended)
                </button>
                <button 
                  onClick={() => setActiveInstallerTab('mac-app')}
                  className={`text-xs font-mono font-bold pb-1.5 border-b-2 transition-all ml-4 ${
                    activeInstallerTab === 'mac-app' 
                      ? 'border-black text-black' 
                      : 'border-transparent text-neutral-400 hover:text-neutral-600'
                  }`}
                >
                  macOS Tray App DMG
                </button>
              </div>

              {activeInstallerTab === 'terminal' ? (
                <div className="space-y-3">
                  <p className="text-xs text-neutral-500 leading-relaxed font-light">
                    Execute this lightweight setup command in your macOS terminal. It downloads our core binary, registers your secure workspace token, and listens for approved directives.
                  </p>
                  
                  {/* Token Configuration Row */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider block font-semibold">Workspace Security Token</label>
                    <input 
                      type="text" 
                      value={customToken}
                      onChange={(e) => setCustomToken(e.target.value)}
                      placeholder="Insert customized secure token..."
                      className="w-full bg-neutral-50/50 border border-neutral-200/80 rounded-xl p-2.5 text-xs font-mono text-neutral-800 focus:outline-none focus:border-black focus:bg-white"
                    />
                  </div>

                  {/* Curl Command Shell Widget */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider font-semibold">Terminal Script</span>
                      <button 
                        onClick={copyToClipboard}
                        className="text-[10px] font-mono text-neutral-400 hover:text-neutral-700 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy script</span>
                          </>
                        )}
                      </button>
                    </div>
                    
                    <div className="bg-neutral-50 text-neutral-850 rounded-xl p-3 font-mono text-[11px] leading-relaxed relative border border-neutral-200/80 shadow-inner overflow-x-auto whitespace-nowrap scrollbar-none">
                      <span className="text-neutral-400 select-none">$ </span>
                      {curlCommand}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-left">
                  <p className="text-xs text-neutral-500 leading-relaxed font-light">
                    Prefer a clean interface? Download the native desktop menu bar app. It packs the secure tunnel binaries and lists active browser automation steps in real-time.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold font-mono transition-all cursor-pointer shadow-sm">
                      <Download className="w-4 h-4" />
                      <span>Download verrazano_desktop_v1.2.dmg</span>
                    </button>
                    <button 
                      onClick={() => onToggleAccount('acc-mac')}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <span>Simulate App Launch</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Why Sandbox Security Matters for Non-Technical Users */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-neutral-50/50 border border-neutral-200/80 flex flex-col justify-between space-y-3 text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-neutral-400 uppercase font-bold tracking-wider">
                  <Shield className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Architecture & Security</span>
                </div>
                <h3 className="text-xs font-semibold text-neutral-800">Why does this need to run locally?</h3>
                <ul className="space-y-2 text-[11px] text-neutral-500 font-light leading-relaxed">
                  <li className="flex gap-1.5">
                    <span className="text-emerald-500">✔</span>
                    <span><strong>Data Stays Yours:</strong> Your actual logins, files, and credentials are stored locally on your device rather than a cloud server.</span>
                  </li>
                  <li className="flex gap-1.5">
                    <span className="text-emerald-500">✔</span>
                    <span><strong>Safe Browser Tunnels:</strong> The bridge spawns a local, sandboxed browser window on your Mac. You can literally watch the cursor move.</span>
                  </li>
                  <li className="flex gap-1.5">
                    <span className="text-emerald-500">✔</span>
                    <span><strong>Cryptographic Control:</strong> All transactions require your explicit approval token before execution.</span>
                  </li>
                </ul>
              </div>
              <div className="text-[10px] text-neutral-400 font-mono italic">
                Ready to link? Hit "Simulate Quick Connection" above.
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Connected Status indicator banner */
        <div className="p-4 rounded-2xl bg-white border border-neutral-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left animate-fade-in shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
              <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-950 uppercase tracking-wide">🟢 Local Sandbox Bridge Active</p>
              <p className="text-[11px] text-neutral-500 leading-relaxed font-light">
                Connected to MacBook Pro M3 (username: <code className="bg-neutral-50 px-1 py-0.5 rounded font-mono font-semibold text-emerald-800">seldo-mac-pro</code>) via encrypted SSH tunnel. Browser automation and logs are fully synchronized.
              </p>
            </div>
          </div>
          <button 
            onClick={() => onToggleAccount('acc-mac')}
            className="text-[10px] font-mono text-rose-600 hover:text-rose-800 font-semibold underline self-start sm:self-auto cursor-pointer"
            title="Simulate disconnection to review setup steps"
          >
            Disconnect Bridge (Review Setup)
          </button>
        </div>
      )}

      {/* INTERACTIVE WORKSPACE SETUP WALKTHROUGH */}
      <div className="p-6 rounded-[28px] bg-gradient-to-br from-indigo-50/40 via-white to-sky-50/30 border border-indigo-100 shadow-[0_12px_35px_rgba(99,102,241,0.03)] text-left relative overflow-hidden space-y-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-sky-500/5 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-100 pb-4 relative z-10">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] bg-indigo-100 text-indigo-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Workspace Setup Onboarding
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
            </div>
            <h2 className="text-sm font-semibold text-neutral-900 mt-1">
              Your Interactive Setup Guide
            </h2>
            <p className="text-xs text-neutral-500 font-sans mt-0.5 font-light">
              Follow these simple interactive steps to test the AI CEO’s autonomous local and cloud integrations.
            </p>
          </div>
          <button 
            onClick={() => {
              if (onOnboardAction) onOnboardAction('hydrate-all');
            }}
            className="text-[10px] font-mono font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Skip Walkthrough (Hydrate All) →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
          {/* STEP 1 */}
          <div className="p-4 rounded-2xl bg-white/80 border border-neutral-200/60 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-neutral-450 block">STEP 1</span>
              <h3 className="text-xs font-semibold text-neutral-800">Link Local Sandbox Bridge</h3>
              <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                Connect your device to let the verrazano o1 agent run terminal tasks and inspect active browser steps.
              </p>
            </div>
            <div>
              {isMacbookConnected ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-mono font-bold">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>MacBook Connected</span>
                </div>
              ) : (
                <button 
                  onClick={() => onToggleAccount('acc-mac')}
                  className="w-full py-2 rounded-xl bg-black hover:bg-neutral-800 text-white text-[11px] font-mono font-bold transition-all shadow-sm active:scale-98 cursor-pointer text-center"
                >
                  Simulate Connection
                </button>
              )}
            </div>
          </div>

          {/* STEP 2 */}
          <div className="p-4 rounded-2xl bg-white/80 border border-neutral-200/60 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-neutral-450 block">STEP 2</span>
              <h3 className="text-xs font-semibold text-neutral-800">Sync Third-Party Node Tools</h3>
              <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                Demo how Verrazano synchronizes databases, repos, and communication networks by turning on test suites.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'acc-github', label: 'GitHub' },
                { id: 'acc-gmail', label: 'Gmail' },
                { id: 'acc-notion', label: 'Notion' }
              ].map(item => {
                const isLinked = accounts.find(a => a.id === item.id)?.connected;
                return (
                  <button
                    key={item.id}
                    onClick={() => onToggleAccount(item.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border transition-all cursor-pointer ${
                      isLinked 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-extrabold' 
                        : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300 text-neutral-600'
                    }`}
                  >
                    {isLinked ? '✔ ' : ''}{item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3 */}
          <div className="p-4 rounded-2xl bg-white/80 border border-neutral-200/60 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-neutral-450 block">STEP 3</span>
              <h3 className="text-xs font-semibold text-neutral-800">Suggested First Projects</h3>
              <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                Import complete sample checklists with pre-configured automations to watch the AI CEO coordinate actions.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              <button 
                onClick={() => {
                  if (onOnboardAction) onOnboardAction('init-saas');
                }}
                className="w-full text-left py-1.5 px-2.5 rounded-xl bg-indigo-50/60 hover:bg-indigo-100/80 text-indigo-700 border border-indigo-200/40 text-[10px] font-mono font-bold transition-all flex items-center justify-between cursor-pointer"
              >
                <span>SaaS Alpha Launch</span>
                <span className="text-[9px] text-indigo-500 font-extrabold">Deploy →</span>
              </button>
              <button 
                onClick={() => {
                  if (onOnboardAction) onOnboardAction('init-travel');
                }}
                className="w-full text-left py-1.5 px-2.5 rounded-xl bg-indigo-50/60 hover:bg-indigo-100/80 text-indigo-700 border border-indigo-200/40 text-[10px] font-mono font-bold transition-all flex items-center justify-between cursor-pointer"
              >
                <span>Travel Booking</span>
                <span className="text-[9px] text-indigo-500 font-extrabold">Deploy →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Bento Grid Row (High Fidelity UI overhaul based on reference images) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* widget 1: "Income Tracker" style system throughput (Inspired by Image 1 Left Card) */}
        <div className="lg:col-span-4 rounded-[28px] bg-white border border-neutral-200/60 p-6 flex flex-col justify-between shadow-xs min-h-[300px]">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-600 border border-neutral-200/50">
                <TrendingUp className="w-4.5 h-4.5 text-neutral-700" />
              </div>
              <div className="text-left">
                <h3 className="text-xs font-semibold text-neutral-900">Weekly Transactions</h3>
                <p className="text-[10px] text-neutral-400 font-mono">Hours worked & tasks completed</p>
              </div>
            </div>

            {/* Custom Interactive Range Pill Selector */}
            <div className="bg-neutral-50 p-0.5 rounded-lg flex items-center gap-0.5 border border-neutral-200/50">
              {(['Week', 'Month'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-md font-bold transition-all ${
                    selectedRange === range 
                      ? 'bg-white text-neutral-900 border border-neutral-200/40 shadow-xs'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Huge Stat + percentage increment */}
          <div className="text-left mt-6">
            <span className="text-3xl font-display font-light tracking-tight text-neutral-900">2,567</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-sm font-bold text-emerald-600">+20%</span>
              <span className="text-[10px] text-neutral-400 font-sans leading-none">more transactions than last cycle</span>
            </div>
          </div>

          {/* Clean Custom-Drawn Vertical bar chart with dots (Direct Copy of Image 1 "Income Tracker" chart) */}
          <div className="mt-6 flex justify-between items-end h-24 px-1">
            {[
              { day: 'S', val: 40 },
              { day: 'M', val: 65 },
              { day: 'T', val: 95, active: true },
              { day: 'W', val: 78 },
              { day: 'T', val: 88 },
              { day: 'F', val: 58 },
              { day: 'S', val: 50 },
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 group cursor-pointer relative">
                {/* Active Tooltip Popover (Matches Image 1 $2,567 bubble) */}
                {bar.active && (
                  <div className="absolute -top-8 bg-black text-white text-[9px] font-mono font-medium px-2 py-0.5 rounded shadow-sm -translate-y-1">
                    $2,567
                  </div>
                )}
                
                {/* Chart Vertical Line Bar */}
                <div className="relative w-6 flex flex-col items-center justify-end h-14">
                  {/* Background Track Line */}
                  <div className="w-[1px] bg-neutral-100 h-full absolute left-1/2 -translate-x-1/2"></div>
                  
                  {/* Active background capsule track */}
                  {bar.active && (
                    <div className="w-5 bg-neutral-50 rounded-lg h-full absolute left-0.5 top-0 border border-neutral-100"></div>
                  )}

                  {/* Dot Pointer representing value */}
                  <div 
                    style={{ bottom: `${bar.val}%` }}
                    className={`w-2 h-2 rounded-full absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
                      bar.active 
                        ? 'bg-black ring-2 ring-black/10 scale-110' 
                        : 'bg-neutral-300 group-hover:bg-neutral-800 scale-100'
                     }`}
                  ></div>
                </div>

                {/* Day label Circle */}
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono transition-all ${
                  bar.active 
                    ? 'bg-black text-white font-bold' 
                    : 'text-neutral-400 hover:text-neutral-600'
                }`}>
                  {bar.day}
                </div>
              </div>
            ))}
          </div>

          {showExplanations && (
            <div className="mt-5 pt-3 border-t border-neutral-100 text-[10px] text-neutral-400 font-sans leading-relaxed text-left">
              This tracks the daily volume of actions and hours worked successfully completed by your local desktop helper.
            </div>
          )}
        </div>

        {/* widget 2: "Sales statistics" style dark layout (Inspired by Image 2 Left Card) */}
        <div className="lg:col-span-4 rounded-[28px] bg-[#09090b] text-white p-6 flex flex-col justify-between shadow-xs relative overflow-hidden min-h-[300px] border border-zinc-900">
          <div className="flex justify-between items-center relative z-10">
            <div className="text-left">
              <h3 className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider font-semibold">Operational Load</h3>
              <p className="text-[9px] text-zinc-600 font-mono">Updated 1 min ago</p>
            </div>
            <span className="text-[9px] font-mono bg-zinc-900 px-2.5 py-0.5 rounded-full text-zinc-400 border border-zinc-800">
              Monthly Limit
            </span>
          </div>

          {/* Visitors / Operations stats and Up badge */}
          <div className="text-left mt-6 relative z-10">
            <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-mono font-semibold">
              <span>Concurrent Tasks</span>
              <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-[10px] font-bold leading-none">
                ↗
              </span>
            </div>
            <p className="text-3xl font-display font-light tracking-tight text-white mt-0.5">2,025</p>
          </div>

          {/* Modern Dual Colored bento bars (Direct aesthetic of Image 2 "Sales statistics" chart) */}
          <div className="mt-6 flex gap-6 relative z-10">
            
            {/* Bar 1 (September representation) */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full h-20 rounded-xl bg-zinc-900/40 border border-zinc-900 overflow-hidden flex flex-col justify-end">
                {/* Dynamic green core */}
                <div className="h-2/3 bg-emerald-400/90 rounded-t-lg relative overflow-hidden">
                  {/* Nested purple base segment */}
                  <div className="h-1/3 bg-indigo-500/90 absolute bottom-0 left-0 right-0"></div>
                </div>
              </div>
              <span className="text-[9px] font-mono text-zinc-500">September</span>
            </div>

            {/* Bar 2 (November representation) */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full h-20 rounded-xl bg-zinc-900/40 border border-zinc-900 overflow-hidden flex flex-col justify-end">
                {/* Higher green volume */}
                <div className="h-[82%] bg-emerald-400/90 rounded-t-lg relative overflow-hidden">
                  {/* Nested purple base segment */}
                  <div className="h-[24%] bg-indigo-500/90 absolute bottom-0 left-0 right-0"></div>
                </div>
              </div>
              <span className="text-[9px] font-mono text-zinc-300 font-bold">November</span>
            </div>
          </div>

          {showExplanations && (
            <div className="mt-5 pt-3 border-t border-zinc-900 text-[10px] text-zinc-500 font-sans leading-relaxed text-left">
              Monitors CPU/memory consumption of the local sandbox, ensuring smooth background operation.
            </div>
          )}
        </div>

        {/* widget 3: Redesigned interactive Bridge Capacity module (Inspired by Seon Clinic high craftsmanship) */}
        <div className="lg:col-span-4 rounded-[28px] bg-white border border-neutral-200/60 p-6 flex flex-col justify-between shadow-xs min-h-[300px]">
          <div className="flex justify-between items-center">
            <div className="text-left">
              <h3 className="text-xs font-semibold text-neutral-900">Bridge Capacity</h3>
              <p className="text-[10px] text-neutral-400 font-sans">Live transaction budget limits</p>
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full text-[8px] font-mono text-emerald-700 font-bold border border-emerald-100/50">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Secure</span>
            </div>
          </div>

          {/* Premium Dark Obsidian styled container representing capacity */}
          <div className="mt-4 bg-[#09090b] rounded-[24px] p-5 border border-zinc-900 flex flex-col justify-between relative overflow-hidden text-white min-h-[220px]">
            {/* Top header stats inside dark container */}
            <div className="flex justify-between items-start relative z-10">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              
              <div className="text-right">
                <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-0.5 justify-end">
                  {Math.round((capacityLimit / 25000) * 100)}% ↗
                </span>
                <span className="text-[8px] text-zinc-500 font-mono block">Max: $25.0K</span>
              </div>
            </div>

            {/* Semicircular Dynamic Gauge and Metric */}
            <div className="relative flex flex-col items-center justify-center mt-1 z-10">
              <svg width="120" height="60" viewBox="0 0 100 50" className="overflow-visible">
                {/* Background arc path */}
                <path 
                  d="M 10 50 A 40 40 0 0 1 90 50" 
                  fill="none" 
                  stroke="#1c1d22" 
                  strokeWidth="6" 
                  strokeLinecap="round"
                />
                {/* Dynamic foreground arc path */}
                {capacityLimit > 1000 && (
                  <path 
                    d={`M 10 50 A 40 40 0 0 1 ${50 + 40 * Math.cos(((180 - (Math.min(100, Math.max(1, Math.round((capacityLimit / 25000) * 100))) * 1.8)) * Math.PI) / 180)} ${50 - 40 * Math.sin(((180 - (Math.min(100, Math.max(1, Math.round((capacityLimit / 25000) * 100))) * 1.8)) * Math.PI) / 180)}`} 
                    fill="none" 
                    stroke="url(#gradient-emerald)" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                  />
                )}
                {/* Gradients definition */}
                <defs>
                  <linearGradient id="gradient-emerald" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
                {/* Moving dot locator */}
                <circle 
                  cx={50 + 40 * Math.cos(((180 - (Math.min(100, Math.max(0, Math.round((capacityLimit / 25000) * 100))) * 1.8)) * Math.PI) / 180)} 
                  cy={50 - 40 * Math.sin(((180 - (Math.min(100, Math.max(0, Math.round((capacityLimit / 25000) * 100))) * 1.8)) * Math.PI) / 180)} 
                  r="3" 
                  fill="#ffffff" 
                  stroke="#10b981" 
                  strokeWidth="1.5" 
                />
              </svg>

              {/* Bold centered metric */}
              <div className="absolute bottom-[-6px] text-center">
                <span className="text-lg font-mono font-bold tracking-tight text-white">
                  ${capacityLimit.toLocaleString()}
                </span>
                <span className="text-[8px] text-zinc-500 block font-mono">Limit Ceiling</span>
              </div>
            </div>

            {/* Slider & Custom controls */}
            <div className="mt-3 space-y-1.5 relative z-10 pt-2 border-t border-zinc-900/50">
              <input 
                type="range" 
                min="1000" 
                max="25000" 
                step="500"
                value={capacityLimit} 
                onChange={(e) => setCapacityLimit(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex items-center justify-between gap-1.5 pt-0.5">
                <button 
                  onClick={() => setCapacityLimit(prev => Math.max(1000, prev - 1000))}
                  className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-850 rounded-md border border-zinc-800 text-[8px] font-semibold text-zinc-400 transition-colors cursor-pointer"
                >
                  - $1,000
                </button>
                <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-600">Adjust</span>
                <button 
                  onClick={() => setCapacityLimit(prev => Math.min(25000, prev + 1000))}
                  className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-850 rounded-md border border-zinc-800 text-[8px] font-semibold text-zinc-400 transition-colors cursor-pointer"
                >
                  + $1,000
                </button>
              </div>
            </div>

            {showExplanations && (
              <div className="mt-3 pt-2 border-t border-zinc-900/50 text-[10px] text-zinc-500 font-sans leading-relaxed text-left">
                Authorization ceiling before prompting for manual approval.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 3. Middle Bento Grid Row (Image 1 "Let's Connect" & Image 2 "Market forecast") */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Let's Connect Contact Panel (Direct copy of Image 1 bottom left) */}
        <div className="lg:col-span-4 rounded-[28px] bg-white border border-neutral-200/60 p-6 flex flex-col justify-between shadow-xs min-h-[300px]">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-semibold text-neutral-900">Let's Connect</h3>
            <button className="text-[10px] font-mono text-neutral-400 hover:text-neutral-600 underline">
              See all
            </button>
          </div>

          {/* Members list */}
          <div className="space-y-3 mt-4">
            {systemTeam.map((member, i) => (
              <div 
                key={i}
                className="p-3 bg-neutral-50/50 hover:bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-8 h-8 rounded-full object-cover border border-white shadow-xs referrer-policy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-neutral-800">{member.name}</span>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-medium ${member.levelColor}`}>
                        {member.level}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">{member.role}</span>
                  </div>
                </div>

                {/* Circular Add Button */}
                <button className="w-6 h-6 rounded-full bg-white hover:bg-neutral-50 flex items-center justify-center text-neutral-400 border border-neutral-200 shadow-xs transition-all active:scale-90 cursor-pointer">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Unlock Premium / Core Protocol optimization block (Direct copy of Image 1 Bottom Center) */}
          <div className="mt-5 p-4 rounded-2xl bg-neutral-50/50 border border-neutral-200/50 text-left flex flex-col justify-between h-[100px]">
            <div className="space-y-0.5">
              <h4 className="text-xs font-semibold text-neutral-800">Optimize Core Protocol</h4>
              <p className="text-[9px] text-neutral-400 leading-snug">Get access to sandboxed multi-bridges and secure keys.</p>
            </div>

            <button 
              onClick={() => setCurrentTab('training')}
              className="mt-2 w-full bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200/80 rounded-xl py-1.5 px-3 text-[10px] font-mono font-bold flex items-center justify-between transition-all active:scale-98 shadow-xs cursor-pointer"
            >
              <span>Train custom bridges</span>
              <ArrowRight className="w-3 h-3 text-neutral-400" />
            </button>
          </div>
        </div>

        {/* Market Forecast / Timeline tracker (Direct copy of Image 2 Bottom center-right) */}
        <div className="lg:col-span-4 rounded-[28px] bg-white border border-neutral-200/60 p-6 flex flex-col justify-between shadow-xs min-h-[300px]">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-semibold text-neutral-900">Agent Forecast</h3>
            <span className="text-[9px] text-neutral-400 bg-neutral-50 border border-neutral-200/50 px-2 py-0.5 rounded-full font-mono font-medium">
              Simulation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4 h-full items-stretch">
            
            {/* Left timeline steps */}
            <div className="md:col-span-7 flex flex-col justify-between text-left relative pl-3.5 border-l border-neutral-100 py-1 space-y-4">
              
              {/* Timeline marker */}
              <div className="absolute top-0 bottom-0 left-[-0.5px] w-[1px] bg-neutral-100"></div>

              {/* Step 1 */}
              <div className="relative">
                <span className="absolute -left-[19.5px] top-1.5 w-1.5 h-1.5 rounded-full bg-black"></span>
                <span className="text-[10px] font-mono font-bold text-neutral-800 block">2023</span>
                <p className="text-[9px] text-neutral-400 mt-0.5 font-light leading-snug">Autonomous browser sandbox initialization</p>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <span className="absolute -left-[19.5px] top-1.5 w-1.5 h-1.5 rounded-full bg-neutral-200"></span>
                <span className="text-[10px] font-mono text-neutral-400 block">2024</span>
                <p className="text-[9px] text-neutral-400 mt-0.5 font-light leading-snug">Mainstream adoption of Curve25519 secure bridges</p>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <span className="absolute -left-[19.5px] top-1.5 w-1.5 h-1.5 rounded-full bg-neutral-200"></span>
                <span className="text-[10px] font-mono text-neutral-400 block">2025</span>
                <p className="text-[9px] text-neutral-400 mt-0.5 font-light leading-snug">Sync reach expands to multi-modal WhatsApp</p>
              </div>
            </div>

            {/* Right micro-visual cards */}
            <div className="md:col-span-5 flex flex-col gap-3 justify-between">
              
              {/* BTC Price block (Lime-green) */}
              <div className="bg-neutral-50/50 border border-neutral-200/50 p-3 rounded-2xl text-left flex flex-col justify-between h-[100px]">
                <div className="flex justify-between items-start text-[9px] font-mono text-neutral-400 font-bold uppercase">
                  <span>Capacity score</span>
                  <span className="text-emerald-500">↗</span>
                </div>
                <div className="mt-1 text-left">
                  <p className="text-sm font-mono font-bold text-neutral-900 leading-tight">21,105$</p>
                  <p className="text-[8px] text-emerald-600 font-mono mt-0.5">+28.21% limit</p>
                </div>
                
                {/* Horizontal slider progress indicator */}
                <div className="w-full bg-neutral-100 h-1 rounded-full mt-1.5 relative overflow-hidden">
                  <div className="w-3/4 bg-neutral-900 h-full rounded-full"></div>
                </div>
              </div>

              {/* Market cap block (Premium Charcoal) */}
              <div className="bg-neutral-50/50 border border-neutral-200/50 p-3 rounded-2xl text-left flex flex-col justify-between h-[100px]">
                <div className="flex justify-between items-start text-[9px] font-mono text-neutral-400 font-bold uppercase">
                  <span>Forecast load</span>
                  <span className="text-neutral-500">↗</span>
                </div>
                <div className="mt-0.5 text-left">
                  <p className="text-sm font-mono font-bold text-neutral-900 leading-tight">1.3trln$</p>
                </div>

                {/* Micro custom wave graph using small SVG */}
                <div className="w-full h-4 mt-1">
                  <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
                     <path 
                      d="M 0 15 Q 25 5, 50 12 T 100 2" 
                      fill="none" 
                      stroke="#171717" 
                      strokeWidth="1" 
                    />
                    <circle cx="85" cy="5" r="1.5" fill="#171717" />
                  </svg>
                </div>
              </div>

            </div>
          </div>

          {showExplanations && (
            <div className="mt-5 pt-3 border-t border-neutral-100 text-[10px] text-neutral-400 font-sans leading-relaxed text-left">
              Predicts computer automation and safe financial budget scales based on upcoming workflows.
            </div>
          )}
        </div>

        {/* Proposal Progress striped indicator card (Direct copy of Image 1 Bottom Right) */}
        <div className="lg:col-span-4 rounded-[28px] bg-white border border-neutral-200/60 p-6 flex flex-col justify-between shadow-xs min-h-[300px]">
          <div className="flex justify-between items-center">
            <div className="text-left">
              <h3 className="text-xs font-semibold text-neutral-900">Proposal Progress</h3>
              <p className="text-[10px] text-neutral-400 font-mono">Workflow authorization statistics</p>
            </div>
            {/* Custom dropdown trigger */}
            <div className="flex items-center gap-1 bg-neutral-50 border border-neutral-200/50 rounded-lg text-[9px] font-mono text-neutral-500 font-bold px-2 py-0.5">
              <span>April 11, 2026</span>
              <span className="text-[7px] text-neutral-400">▼</span>
            </div>
          </div>

          {/* Core numerical stats row */}
          <div className="grid grid-cols-3 gap-2 mt-4 text-left border-b border-neutral-100 pb-4">
            <div className="border-r border-neutral-100 pr-2">
              <span className="text-[10px] text-neutral-400 font-mono block">Proposals sent</span>
              <span className="text-2xl font-display font-bold text-neutral-800 mt-1 block">64</span>
            </div>
            <div className="border-r border-neutral-100 px-2">
              <span className="text-[10px] text-neutral-400 font-mono block">Interviews</span>
              <span className="text-2xl font-display font-bold text-neutral-800 mt-1 block text-orange-600">12</span>
            </div>
            <div className="pl-2">
              <span className="text-[10px] text-neutral-400 font-mono block">Hires log</span>
              <span className="text-2xl font-display font-bold text-neutral-800 mt-1 block text-neutral-900">10</span>
            </div>
          </div>

          {/* Premium Micro-Stripe Indicators Bar (Fills the visual density of Image 1 nicely) */}
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex justify-between text-[9px] font-mono text-neutral-400">
              <span>Sequence logs timeline</span>
              <span>100% capacity</span>
            </div>
            
            {/* Row of micro vertical lines showing timeline progress */}
            <div className="flex items-end justify-between h-8 mt-1">
              {Array.from({ length: 44 }).map((_, idx) => {
                let barHeight = 'h-4';
                if (idx % 5 === 0) barHeight = 'h-6';
                else if (idx % 3 === 0) barHeight = 'h-5';
                
                let barColor = 'bg-neutral-100';
                if (idx > 10 && idx < 22) barColor = 'bg-orange-500/80';
                else if (idx >= 22) barColor = 'bg-neutral-800';

                return (
                  <div 
                    key={idx} 
                    className={`w-[1px] rounded-full transition-all duration-300 ${barHeight} ${barColor}`}
                  ></div>
                );
              })}
            </div>
          </div>

          {/* Interactive Core Process Temperature (Fun widget kept from original) */}
          <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-neutral-400" />
              <span className="text-[10px] font-mono text-neutral-400">Core Temp: <strong className="text-neutral-700 font-bold">{bridgeCoreTemp}°C</strong></span>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={() => setBridgeCoreTemp(prev => Math.min(prev + 1, 32))}
                className="w-5 h-5 rounded-md bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/50 flex items-center justify-center text-[10px] text-neutral-500 font-bold cursor-pointer transition-all"
              >
                +
              </button>
              <button 
                onClick={() => setBridgeCoreTemp(prev => Math.max(prev - 1, 15))}
                className="w-5 h-5 rounded-md bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/50 flex items-center justify-center text-[10px] text-neutral-500 font-bold cursor-pointer transition-all"
              >
                -
              </button>
            </div>
          </div>

          {showExplanations && (
            <div className="mt-5 pt-3 border-t border-neutral-100 text-[10px] text-neutral-400 font-sans leading-relaxed text-left">
              Aggregates recruitment outreach statistics (proposals sent, live bot chats/interviews, and hired contracts).
            </div>
          )}
        </div>

      </div>

      {/* 4. Unified System Activity Log - Designed with OpenAI Minimalism & Translucent Cards */}
      <div className="rounded-[28px] bg-white border border-neutral-200/60 overflow-hidden text-left shadow-xs">
        {/* Module Header */}
        <div className="px-6 py-5 border-b border-neutral-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-400 border border-neutral-200/50">
              <Activity className="w-4 h-4 text-neutral-700" />
            </div>
            <div className="text-left">
              <h2 className="text-sm font-semibold text-neutral-900 tracking-tight">System Activity Logs & Live Actions</h2>
              <p className="text-[10px] text-neutral-400 font-mono">Sandbox browser orchestration telemetry</p>
            </div>
          </div>
          
          {/* Shaded filter buttons (Screenshot 2 inspired style) */}
          <div className="flex items-center gap-1 bg-neutral-50 p-0.5 rounded-lg border border-neutral-200/50 self-start sm:self-auto">
            {(['all', 'pending', 'success'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`text-[9px] font-mono px-3 py-1 rounded-md transition-all capitalize cursor-pointer font-bold ${
                  filter === type
                    ? 'bg-white text-neutral-800 border border-neutral-200/40 shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                {type === 'pending' ? 'Required Action' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Content timeline */}
        <div className="p-6 space-y-6 scrollbar-thin bg-white">
          {filteredActions.length === 0 ? (
            <div className="h-44 flex flex-col items-center justify-center text-center p-6 bg-neutral-50/30 rounded-2xl border border-neutral-200/40">
              <Server className="w-8 h-8 text-neutral-400 stroke-1 mb-2.5" />
              <p className="text-[11px] font-mono text-neutral-400">No synchronized agent logs found for selection</p>
            </div>
          ) : (
            <div className="relative ml-2 space-y-6 pl-6 border-l border-neutral-100">
              {filteredActions.map((action) => {
                const isPending = action.status === 'pending_approval' || action.status === 'needs_auth';
                return (
                  <div key={action.id} className="relative pb-2 animate-fade-in">
                    {/* Modern Dot Marker */}
                    <span className={`absolute -left-[30.5px] top-2 w-2 h-2 rounded-full transition-all duration-300 border border-white shadow-xs ${
                      isPending
                        ? 'bg-amber-400 ring-4 ring-amber-500/15'
                        : 'bg-neutral-900 ring-4 ring-neutral-950/15'
                    }`}></span>

                    <span className="text-[9px] font-mono text-neutral-400 tracking-wider block mb-1.5 font-semibold">
                      {action.timestamp}
                    </span>

                    <ComputerActionCard
                      action={action}
                      onApprove={onApprove}
                      onDecline={onDecline}
                      onAuth={onAuth}
                      isActiveDeepLink={activeDeepLinkId === action.id}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Live sync footer */}
        <div className="px-6 py-4 border-t border-neutral-200/50 bg-neutral-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[9px] font-mono text-neutral-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Bridge synchronized with macOS Client Core</span>
          </span>
          <span>Core Agent ID: <code className="text-neutral-600 font-bold bg-neutral-200/40 px-1.5 py-0.5 rounded">verrazano_pro_001</code></span>
        </div>
      </div>
    </div>
  );
}
