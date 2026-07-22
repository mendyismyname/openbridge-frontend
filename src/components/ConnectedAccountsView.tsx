import React, { useState } from 'react';
import { ConnectedAccount } from '../types';
import { 
  Link2, 
  Check, 
  X, 
  Smartphone, 
  Slack, 
  Github, 
  Mail, 
  Database, 
  Compass, 
  MessageSquare,
  QrCode,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  Workflow,
  AlertCircle,
  Info,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface ConnectedAccountsViewProps {
  accounts: ConnectedAccount[];
  onToggleAccount: (id: string) => void;
}

export default function ConnectedAccountsView({ accounts, onToggleAccount }: ConnectedAccountsViewProps) {
  const [qrOpenFor, setQrOpenFor] = useState<string | null>(null);

  const getAccountIcon = (type: ConnectedAccount['type']) => {
    switch (type) {
      case 'github': return <Github className="w-5 h-5 text-violet-600" />;
      case 'gmail': return <Mail className="w-5 h-5 text-rose-500" />;
      case 'notion': return <Database className="w-5 h-5 text-neutral-800" />;
      case 'monday': return <Database className="w-5 h-5 text-rose-600" />;
      case 'airtable': return <Database className="w-5 h-5 text-cyan-600" />;
      case 'whatsapp': return <MessageSquare className="w-5 h-5 text-emerald-600" />;
      case 'ubereats': return <MessageSquare className="w-5 h-5 text-amber-600" />;
      case 'booking': return <Compass className="w-5 h-5 text-indigo-600" />;
      default: return <Smartphone className="w-5 h-5 text-neutral-500" />;
    }
  };

  const getBrandAccent = (type: ConnectedAccount['type']) => {
    switch (type) {
      case 'github': return 'from-violet-500/10 to-transparent border-violet-200/50 hover:border-violet-300';
      case 'gmail': return 'from-rose-500/10 to-transparent border-rose-200/50 hover:border-rose-300';
      case 'notion': return 'from-neutral-800/10 to-transparent border-neutral-300 hover:border-neutral-400';
      case 'monday': return 'from-rose-500/10 to-transparent border-rose-200/50 hover:border-rose-300';
      case 'airtable': return 'from-cyan-500/10 to-transparent border-cyan-200/50 hover:border-cyan-300';
      case 'whatsapp': return 'from-emerald-500/10 to-transparent border-emerald-200/50 hover:border-emerald-300';
      case 'ubereats': return 'from-amber-500/10 to-transparent border-amber-200/50 hover:border-amber-300';
      case 'booking': return 'from-indigo-500/10 to-transparent border-indigo-200/50 hover:border-indigo-300';
      default: return 'from-neutral-500/10 to-transparent border-neutral-200 hover:border-neutral-300';
    }
  };

  const handleToggle = (account: ConnectedAccount) => {
    if (account.type === 'whatsapp' && !account.connected) {
      setQrOpenFor(account.id);
    } else {
      onToggleAccount(account.id);
    }
  };

  const confirmQrScan = (id: string) => {
    onToggleAccount(id);
    setQrOpenFor(null);
  };

  const categories = [
    { 
      id: 'workspace', 
      label: 'Workspace integrations',
      description: 'Synchronized software suites used by your business, linking repos, documents and boards.' 
    },
    { 
      id: 'personal', 
      label: 'Personal accounts',
      description: 'Consumer nodes authorizing transactional checks like travel bookings, food delivery, and chat channels.' 
    },
    { 
      id: 'device', 
      label: 'Linked hardware devices',
      description: 'Physical computers and terminals running the Verrazano terminal background daemon.' 
    }
  ];

  // Calculate stats
  const totalConnected = accounts.filter(a => a.connected).length;
  const totalIntegrations = accounts.length;

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#f8f9fc] p-6 lg:p-8 space-y-8 select-none scrollbar-thin text-left relative">
      
      {/* Background elegant grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_top,transparent_20%,black_80%)] opacity-[0.18] pointer-events-none"></div>

      {/* Header section with Stats */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-neutral-200/50 pb-6">
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
            <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase tracking-widest">Integrations Registry</span>
          </div>
          <h1 className="text-xl font-display font-semibold text-neutral-900 tracking-tight mt-1">
            Connected Tools & APIs
          </h1>
          <p className="text-xs text-neutral-500 font-sans mt-0.5 max-w-xl">
            Configure authentication profiles and third-party APIs. This allows your AI CEO to securely control local computer targets, execute browser checkouts, and dispatch notifications.
          </p>
        </div>

        {/* Stats HUD Widget */}
        <div className="flex items-center gap-4 bg-white border border-neutral-200/60 p-3.5 rounded-[20px] shadow-sm shrink-0">
          <div className="text-left pr-4 border-r border-neutral-150">
            <span className="text-[9px] font-mono text-neutral-400 uppercase font-bold block">ACTIVE PIPELINES</span>
            <span className="text-lg font-display font-bold text-neutral-900 mt-0.5 block">{totalConnected} <span className="text-xs text-neutral-400 font-sans">/ {totalIntegrations}</span></span>
          </div>
          <div className="text-left">
            <span className="text-[9px] font-mono text-neutral-400 uppercase font-bold block">INTEGRITY INDEX</span>
            <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% SECURE</span>
            </span>
          </div>
        </div>
      </div>

      {/* WhatsApp QR Scan Premium Overlay Modal */}
      {qrOpenFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-md animate-fade-in">
          <div 
            className="absolute inset-0" 
            onClick={() => setQrOpenFor(null)}
          ></div>
          
          <div className="relative bg-white rounded-[28px] border border-neutral-200/80 p-6 shadow-2xl max-w-lg w-full text-left overflow-hidden z-10 animate-slide-up">
            {/* Elegant Background Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] bg-emerald-100 text-emerald-800 border border-emerald-200/50 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                      NEW BRIDGE NODE
                    </span>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                  </div>
                  <h3 className="text-xs font-mono font-bold text-neutral-850 uppercase tracking-wider mt-0.5">
                    Link WhatsApp Business App
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setQrOpenFor(null)}
                className="p-1.5 hover:bg-neutral-100 rounded-xl text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                title="Dismiss QR Scanner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="mt-5 space-y-5">
              
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-neutral-50/50 p-5 rounded-2xl border border-neutral-200/60">
                
                {/* Styled High-Tech Simulated QR Code with Laser Scanner */}
                <div className="relative p-3 bg-white rounded-2xl shrink-0 border border-neutral-200/90 shadow-md">
                  <div className="grid grid-cols-6 gap-1.5 w-28 h-28 relative">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`rounded-sm transition-colors duration-150 ${(i % 4 === 0 || i % 6 === 1 || i < 8 || i > 28 || i % 5 === 0) ? 'bg-neutral-800' : 'bg-transparent'}`}
                      ></div>
                    ))}
                    {/* Simulated Corner QR Squares */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-2 border-neutral-800 bg-white p-1">
                      <div className="w-full h-full bg-neutral-800"></div>
                    </div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-2 border-neutral-800 bg-white p-1">
                      <div className="w-full h-full bg-neutral-800"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-2 border-neutral-800 bg-white p-1">
                      <div className="w-full h-full bg-neutral-800"></div>
                    </div>
                  </div>

                  {/* Dynamic laser scan bar overlay */}
                  <div className="absolute left-0 right-0 h-[3px] bg-emerald-500/80 shadow-[0_0_12px_#10b981] animate-laser pointer-events-none"></div>
                </div>

                {/* Instruction Steps */}
                <div className="space-y-3.5 text-left flex-1">
                  <div className="flex gap-2.5 items-start">
                    <div className="w-5 h-5 rounded-full bg-neutral-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <p className="text-xs text-neutral-600 leading-normal">
                      Launch <strong>WhatsApp</strong> on your mobile phone or enterprise business terminal.
                    </p>
                  </div>
                  
                  <div className="flex gap-2.5 items-start border-t border-neutral-100 pt-3">
                    <div className="w-5 h-5 rounded-full bg-neutral-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <p className="text-xs text-neutral-600 leading-normal">
                      Tap <strong>Menu</strong> or <strong>Settings</strong> and select <strong>Linked Devices</strong>.
                    </p>
                  </div>

                  <div className="flex gap-2.5 items-start border-t border-neutral-100 pt-3">
                    <div className="w-5 h-5 rounded-full bg-neutral-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <p className="text-xs text-neutral-600 leading-normal">
                      Select <strong>Link a Device</strong> and point your camera to capture this secure QR.
                    </p>
                  </div>
                </div>
              </div>

              {/* Warning/Security Info Note */}
              <div className="p-3 bg-amber-50/50 border border-amber-200/40 rounded-xl flex items-start gap-2 text-[10px] text-amber-850 font-light">
                <Info className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                <p>
                  <strong>Encryption Standard:</strong> Your WhatsApp sync is bound to your physical container sandbox via cryptographically signed local cookies. The Verrazano platform never captures or stores messages on server-side databases.
                </p>
              </div>

              {/* Simulation Action Buttons */}
              <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:justify-end gap-3.5">
                <button
                  onClick={() => setQrOpenFor(null)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-600 text-xs font-mono transition-all cursor-pointer"
                >
                  Cancel Bridge Setup
                </button>
                <button
                  onClick={() => confirmQrScan(qrOpenFor)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Verify Sync Connection</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Banner widget for missing triggers */}
      <div className="relative z-10 p-5 rounded-[24px] border border-indigo-150 bg-indigo-50/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0 mt-0.5">
            <Workflow className="w-4.5 h-4.5 text-indigo-700" />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-bold text-neutral-800">Dynamic API Command Dispatcher</h4>
            <p className="text-xs text-neutral-500 leading-relaxed font-light mt-0.5">
              These tools utilize custom secure cookies. When a command is synchronized in your Chat panel, Verrazano proxies headers to initiate secure checkouts and draft updates instantly.
            </p>
          </div>
        </div>
        <a 
          href="#chat-input"
          className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-neutral-50 text-indigo-700 border border-indigo-200 text-xs font-mono font-bold transition-colors shadow-xs flex items-center gap-1 self-start md:self-center cursor-pointer shrink-0"
        >
          <span>Ask Agent in Thread</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Categories of accounts */}
      <div className="space-y-8 relative z-10">
        {categories.map((category) => {
          const categoryAccounts = accounts.filter(a => a.category === category.id);
          if (categoryAccounts.length === 0) return null;

          return (
            <div key={category.id} className="space-y-3">
              <div className="text-left">
                <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase block">
                  {category.label}
                </span>
                <p className="text-[10px] text-neutral-500 mt-0.5 font-light">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {categoryAccounts.map((account) => {
                  const isConnected = account.connected;
                  const accentClasses = getBrandAccent(account.type);
                  
                  return (
                    <div
                      key={account.id}
                      className={`group p-5 rounded-[24px] bg-white border transition-all duration-300 flex flex-col justify-between h-44 relative overflow-hidden bg-gradient-to-br ${accentClasses} ${
                        isConnected 
                          ? 'shadow-[0_8px_30px_rgb(0,0,0,0.015)] border-neutral-250' 
                          : 'opacity-65 hover:opacity-100 hover:shadow-xs'
                      }`}
                    >
                      {/* Interactive toggle block */}
                      <div className="flex justify-between items-start gap-4 relative z-10">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                            isConnected 
                              ? 'bg-white border-neutral-250 shadow-sm' 
                              : 'bg-neutral-50 border-neutral-200'
                          }`}>
                            {getAccountIcon(account.type)}
                          </div>
                          <div className="text-left">
                            <h3 className="text-xs font-bold text-neutral-800 tracking-tight group-hover:text-neutral-900">
                              {account.name}
                            </h3>
                            <p className="text-[9px] font-mono text-neutral-400 uppercase mt-0.5 tracking-wider font-semibold">
                              {account.type}
                            </p>
                          </div>
                        </div>

                        {/* Interactive toggle switch */}
                        <button
                          onClick={() => handleToggle(account)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            isConnected ? 'bg-indigo-600' : 'bg-neutral-200'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                              isConnected ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Middle description for richer layout depth */}
                      <div className="my-2.5 text-left relative z-10">
                        <p className="text-[10px] text-neutral-500 font-sans leading-normal line-clamp-2 font-light">
                          {isConnected 
                            ? `Secure session active. Connected with ${account.username || 'API Token credentials'}.` 
                            : `Integration offline. Toggle above to authorize securely.`}
                        </p>
                      </div>

                      {/* Connection metadata info */}
                      <div className="pt-3.5 border-t border-neutral-200/60 flex items-center justify-between text-[10px] font-mono relative z-10">
                        <span className="text-neutral-400 truncate max-w-[130px] font-medium">
                          {isConnected && account.username ? account.username : 'DISCONNECTED'}
                        </span>
                        
                        <span className={`flex items-center gap-1 font-bold ${isConnected ? 'text-indigo-600' : 'text-neutral-400'}`}>
                          {isConnected ? (
                            <>
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mr-0.5"></span>
                              <span>ONLINE</span>
                            </>
                          ) : (
                            <>
                              <X className="w-3 h-3 text-neutral-400" />
                              <span>OFFLINE</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
