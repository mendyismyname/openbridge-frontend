import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  HelpCircle, 
  Layers, 
  Download, 
  Monitor, 
  ShieldAlert,
  Compass
} from 'lucide-react';

export default function SetupInstructionsView() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'mac-app' | 'chatgpt'>('terminal');
  const [customToken, setCustomToken] = useState('ac_7fb3d106ef39a');
  const [copied, setCopied] = useState(false);

  // Curl command dynamically prefilled with their customToken
  const curlCommand = `curl -fsSL https://install.verrazano.ai/bridge.sh | env VERRAZANO_TOKEN="${customToken}" bash`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#f5f6f9] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] p-6 lg:p-8 space-y-8 select-none scrollbar-thin text-left relative">
      {/* Header */}
      <div className="border-b border-neutral-200/50 pb-5">
        <h1 className="text-xl font-display font-semibold text-neutral-900">Agent Setup & Permissions</h1>
        <p className="text-xs text-neutral-500 font-sans mt-0.5">Initialize computer control permissions to link ChatGPT and your physical workstation.</p>
      </div>

      {/* Main Option Tabs */}
      <div className="flex border border-neutral-200/60 gap-1 p-1 bg-neutral-200/50 backdrop-blur-xs rounded-xl max-w-md relative z-10">
        <button
          onClick={() => setActiveTab('terminal')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'terminal' 
              ? 'bg-white text-neutral-950 shadow-sm border border-neutral-200/50' 
              : 'text-neutral-450 hover:text-neutral-700'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Terminal Bridge</span>
        </button>

        <button
          onClick={() => setActiveTab('mac-app')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'mac-app' 
              ? 'bg-white text-neutral-950 shadow-sm border border-neutral-200/50' 
              : 'text-neutral-450 hover:text-neutral-700'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>macOS App</span>
        </button>

        <button
          onClick={() => setActiveTab('chatgpt')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'chatgpt' 
              ? 'bg-white text-neutral-950 shadow-sm border border-neutral-200/50' 
              : 'text-neutral-450 hover:text-neutral-700'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>ChatGPT Plugin</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="space-y-6 animate-fade-in relative z-10">
        {/* TERMINAL TAB */}
        {activeTab === 'terminal' && (
          <div className="space-y-6">
            <div className="p-6 rounded-[24px] border border-neutral-200/80 bg-white/95 backdrop-blur-md space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.018)] transition-all">
              <div className="space-y-1.5">
                <span className="text-[9px] bg-neutral-100 border border-neutral-200 text-neutral-800 px-2.5 py-0.5 rounded-lg font-mono uppercase font-bold inline-block">Recommended for Engineers</span>
                <h2 className="text-sm font-semibold text-neutral-850 mt-1">Deploy Computer Agent Bridge via Terminal</h2>
                <p className="text-[11px] text-neutral-500 leading-relaxed font-sans font-light">
                  The verrazano background bridge is an ultra-lightweight Node.js process that polls verified commands from your synchronized ChatGPT thread, executing them via secure SSH tunnels on your local macOS.
                </p>
              </div>

              {/* Token Prefiller */}
              <div className="space-y-1.5 max-w-sm">
                <label className="block text-[10px] font-mono text-neutral-400 uppercase font-bold">Your Secure Agent Token</label>
                <input
                  type="text"
                  value={customToken}
                  onChange={(e) => setCustomToken(e.target.value)}
                  placeholder="Insert secure tunnel token..."
                  className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl p-3 text-xs font-mono text-neutral-800 focus:outline-none focus:border-black focus:bg-white"
                />
                <p className="text-[9px] font-mono text-neutral-450">Injects custom credential headers into your curl executable.</p>
              </div>

              {/* Terminal Simulator Box */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-neutral-400 uppercase font-bold">Copy & Execute command</label>
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 overflow-hidden shadow-sm">
                  <div className="bg-neutral-100 border-b border-neutral-200 px-3.5 py-2 flex items-center justify-between text-neutral-500">
                    <span className="text-[10px] font-mono font-medium">zsh — local session</span>
                    <button 
                      onClick={copyToClipboard}
                      className="flex items-center gap-1.5 text-[10px] text-neutral-550 hover:text-neutral-800 transition-colors cursor-pointer font-semibold"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="p-4 font-mono text-xs text-neutral-700 overflow-x-auto leading-relaxed select-all">
                    <span className="text-neutral-400 mr-2 font-bold">$</span>
                    <span className="text-emerald-700 font-bold">{curlCommand}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-[20px] border border-neutral-200 bg-white/90 backdrop-blur-md space-y-3 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-md transition-all">
                <h4 className="text-xs font-semibold text-neutral-800 font-mono uppercase tracking-wider">System Requirements</h4>
                <ul className="text-xs text-neutral-500 space-y-2 font-sans leading-relaxed font-light">
                  <li className="flex items-center gap-2">• <span>macOS Sonoma 14.0 or greater</span></li>
                  <li className="flex items-center gap-2">• <span>Node.js runtime environment (v18.0+)</span></li>
                  <li className="flex items-center gap-2">• <span>Admin level Terminal sudo permissions</span></li>
                </ul>
              </div>

              <div className="p-5 rounded-[20px] border border-neutral-200 bg-white/90 backdrop-blur-md space-y-3 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-md transition-all">
                <h4 className="text-xs font-semibold text-neutral-800 font-mono uppercase tracking-wider">Security Hardening</h4>
                <ul className="text-xs text-neutral-500 space-y-2 font-sans leading-relaxed font-light">
                  <li className="flex items-center gap-2">• <span>Local sandboxing isolates execution processes</span></li>
                  <li className="flex items-center gap-2">• <span>Prompt-level approvals required for financial costs</span></li>
                  <li className="flex items-center gap-2">• <span>Full action logs mirrored instantly to cloud</span></li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* MAC OS APP TAB */}
        {activeTab === 'mac-app' && (
          <div className="space-y-6">
            <div className="p-6 rounded-[24px] border border-neutral-200/80 bg-white/95 backdrop-blur-md space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.018)] transition-all">
              <div className="space-y-1.5">
                <span className="text-[9px] bg-neutral-100 border border-neutral-200 text-neutral-800 px-2.5 py-0.5 rounded-lg font-mono uppercase font-bold inline-block">Simple / No Code Install</span>
                <h2 className="text-sm font-semibold text-neutral-850 mt-1">Deploy verrazano macOS Desktop App</h2>
                <p className="text-[11px] text-neutral-500 leading-relaxed font-sans font-light">
                  Prefer a clean desktop tray app instead of running terminal commands? Download the official macOS dmg. It packages Node.js runtimes internally and has an elegant GUI configuration pane.
                </p>
              </div>

              <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold font-mono transition-all cursor-pointer shadow-md">
                <Download className="w-4 h-4" />
                <span>Download verrazano_desktop_v1.2.dmg</span>
              </button>

              {/* macOS Security Settings Instruction visualizer */}
              <div className="mt-4 pt-4 border-t border-neutral-200 space-y-3">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">Required macOS System Permissions</span>
                
                <div className="bg-neutral-50/50 rounded-xl border border-neutral-200/80 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 border-b border-neutral-200 pb-2">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    <span>System Settings &gt; Privacy & Security</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {/* Accessibility Permission */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-neutral-200/85 text-xs shadow-sm">
                      <div className="text-left pr-2">
                        <p className="font-semibold text-neutral-800">Accessibility (System Controls)</p>
                        <p className="text-[10px] text-neutral-450 mt-0.5">Allows the verrazano app to simulate key strokes and clicks.</p>
                      </div>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-2.5 py-1 rounded-lg font-mono font-bold shrink-0 self-center">Enabled</span>
                    </div>

                    {/* Automation Permission */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-neutral-200/85 text-xs shadow-sm">
                      <div className="text-left pr-2">
                        <p className="font-semibold text-neutral-800">Automation (App control)</p>
                        <p className="text-[10px] text-neutral-450 mt-0.5">Allows verrazano to send AppleScript syntax into Chrome, Notion or Spotify.</p>
                      </div>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-2.5 py-1 rounded-lg font-mono font-bold shrink-0 self-center">Enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CHAT GPT TAB */}
        {activeTab === 'chatgpt' && (
          <div className="p-6 rounded-[24px] border border-neutral-200/80 bg-white/95 backdrop-blur-md space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.018)] transition-all">
            <div className="space-y-1.5">
              <span className="text-[9px] bg-neutral-100 border border-neutral-200 text-neutral-800 px-2.5 py-0.5 rounded-lg font-mono uppercase font-bold inline-block">Sync ChatGPT thread</span>
              <h2 className="text-sm font-semibold text-neutral-850 mt-1">Install the Verra Plugin on ChatGPT Pro</h2>
              <p className="text-[11px] text-neutral-500 leading-relaxed font-sans font-light">
                To instruct your computer agent straight from your OpenAI Chat interface (saving on dedicated cost structures), deploy our custom GPT.
              </p>
            </div>

            <div className="space-y-3 bg-neutral-50/50 p-5 rounded-xl border border-neutral-200/80">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">Step-by-Step GPT Store Setup</span>
              
              <div className="space-y-3 text-xs text-neutral-600 leading-relaxed font-sans font-light text-left">
                <div className="flex gap-3">
                  <span className="text-neutral-400 font-mono font-bold">1.</span>
                  <p>Log in to your <strong>ChatGPT Plus/Pro</strong> account on openai.com.</p>
                </div>
                <div className="flex gap-3 border-t border-neutral-150 pt-2.5">
                  <span className="text-neutral-400 font-mono font-bold">2.</span>
                  <p>Navigate to the <strong>GPT Store</strong> in the left sidebar, and search for <strong>Verra</strong>.</p>
                </div>
                <div className="flex gap-3 border-t border-neutral-150 pt-2.5">
                  <span className="text-neutral-400 font-mono font-bold">3.</span>
                  <div>
                    <p>Click <strong>Connect Account</strong> inside the GPT welcome panel.</p>
                    <p className="text-[10px] text-neutral-900 font-mono mt-1.5 font-bold">
                      Paste Token: <code className="bg-white px-2.5 py-1 rounded border border-neutral-200 text-neutral-850">{customToken}</code>
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 border-t border-neutral-150 pt-2.5">
                  <span className="text-neutral-400 font-mono font-bold">4.</span>
                  <p>Initiate your chat: <em className="text-neutral-800 font-medium">"Hey Verra, pull the SaaS repository and review my outstanding pull requests."</em></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
