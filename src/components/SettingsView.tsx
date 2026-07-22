import React from 'react';
import { Settings, Shield, Key, AlertTriangle, Trash2, Smartphone, Check, User } from 'lucide-react';

interface SettingsViewProps {
  onReset: () => void;
}

export default function SettingsView({ onReset }: SettingsViewProps) {
  const [successMsg, setSuccessMsg] = React.useState(false);

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the aiceo simulator state to factory defaults? This clears custom projects and action logs.')) {
      onReset();
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 2000);
    }
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#f8f9fc] p-6 space-y-6 select-none scrollbar-thin text-left">
      {/* Header */}
      <div className="border-b border-neutral-200/50 pb-5">
        <h1 className="text-xl font-display font-semibold text-neutral-900">Settings & Profile</h1>
        <p className="text-xs text-neutral-500 font-sans mt-0.5">Manage developer profiles, secure encryption headers, and synchronize synced modules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* User Profile */}
        <div className="p-5 rounded-2xl border border-neutral-200 bg-white space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.012)]">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <div className="w-10 h-10 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-500 shadow-sm">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-neutral-800">seldo6@gmail.com</h3>
              <p className="text-[10px] text-indigo-600 font-mono font-bold uppercase tracking-wider mt-0.5">Subscription: ChatGPT Pro Enterprise</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center text-neutral-650">
              <span className="text-neutral-400 font-mono uppercase text-[9px] font-bold">Session Cryptography</span>
              <span className="font-mono text-[11px] text-neutral-800 font-semibold">X25519-Curve25519</span>
            </div>
            <div className="flex justify-between items-center text-neutral-650">
              <span className="text-neutral-400 font-mono uppercase text-[9px] font-bold">Connected Tunnel</span>
              <span className="font-mono text-[11px] text-emerald-600 font-bold">Tunnel-aiceo-active</span>
            </div>
          </div>
        </div>

        {/* Security & Cryptography Key Info */}
        <div className="p-5 rounded-2xl border border-neutral-200 bg-white space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.012)]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-mono font-bold text-neutral-800 uppercase tracking-wider">Device Keys & Sec</h3>
          </div>

          <p className="text-[11px] text-neutral-500 leading-relaxed font-sans font-light">
            Every transaction is encrypted locally using AES-256 in your Mac bridge before being synced. No third-party servers ever read your raw files or personal WhatsApp credentials.
          </p>

          <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-[10px] font-mono text-neutral-550 font-medium">
            <Key className="w-3.5 h-3.5 text-neutral-450" />
            <span>Fingerprint: <code className="text-neutral-800 font-bold">SHA256:8af192...</code></span>
          </div>
        </div>

        {/* Reset State Box */}
        <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/50 space-y-3 md:col-span-2">
          <div className="flex items-center gap-2 text-rose-700">
            <AlertTriangle className="w-4 h-4" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider">Developer Diagnostics Area</h3>
          </div>

          <p className="text-[11px] text-neutral-650 leading-relaxed font-sans font-light">
            Need to restart the workspace and re-populate the simulated ChatGPT thread, custom projects, and computer action timelines back to default? Trigger a factory reset below.
          </p>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-rose-200 hover:border-rose-350 hover:bg-rose-100/50 text-rose-700 font-mono transition-all text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-sm bg-white"
            >
              <Trash2 className="w-4 h-4" />
              <span>Reset Simulator State</span>
            </button>
            {successMsg && (
              <span className="text-xs text-emerald-600 font-mono flex items-center gap-1 animate-fade-in font-bold">
                <Check className="w-4 h-4" />
                <span>Simulated state restored!</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
