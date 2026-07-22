import React from 'react';
import { 
  Terminal, 
  Layers, 
  Compass, 
  Link2, 
  Settings, 
  User, 
  Cpu, 
  Laptop, 
  Smartphone, 
  Clock, 
  Radio,
  Activity
} from 'lucide-react';
import { ConnectedAccount } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  accounts: ConnectedAccount[];
  onShowLandingPage?: () => void;
}

export default function Sidebar({ currentTab, setCurrentTab, accounts, onShowLandingPage }: SidebarProps) {
  const macConnected = accounts.find(a => a.type === 'macbook')?.connected;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'projects', label: 'Current Projects', icon: Layers },
    { id: 'plans', label: 'Future Plans', icon: Compass },
    { id: 'accounts', label: 'Connected Accounts', icon: Link2 },
    { id: 'training', label: 'AI Training', icon: Cpu },
    { id: 'setup', label: 'Setup Instructions', icon: Terminal },
    { id: 'settings', label: 'Settings & Profile', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen border-r border-neutral-200/60 bg-white flex flex-col justify-between shrink-0 select-none">
      {/* Upper Logo / Brand Section - clicking returns to beautiful Landing Page */}
      <div className="p-6">
        <div 
          onClick={onShowLandingPage}
          className="flex items-center gap-2.5 mb-2 cursor-pointer group"
          title="Return to Product Landing Page"
        >
          <div className="w-10 h-10 bg-black group-hover:scale-105 transition-all rounded-xl flex items-center justify-center text-white font-display font-bold text-xl tracking-tighter leading-none shadow-sm">
            Br
          </div>
          <div className="text-left">
            <span className="font-display font-semibold text-lg tracking-wider text-neutral-900 block leading-none group-hover:text-black transition-colors">verrazano</span>
            <span className="text-[9px] text-neutral-400 font-mono tracking-widest uppercase mt-0.5 block">by openbridge</span>
          </div>
          <span className="text-[9px] bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded text-neutral-600 font-mono ml-auto group-hover:bg-neutral-200 transition-colors">Home</span>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <div className="flex-1 px-4 py-2 space-y-1">
        <span className="px-3 text-[10px] font-mono font-medium tracking-wider text-neutral-400/80 uppercase block mb-2">
          Workspace
        </span>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 text-left cursor-pointer ${
                isActive 
                  ? 'bg-neutral-100 text-neutral-950 shadow-sm' 
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50/50'
              }`}
            >
              <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-neutral-900' : 'text-neutral-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Device Status Synchronization / Agent Session details */}
      <div className="p-4 border-t border-neutral-200/60 bg-neutral-50/50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Synced Devices</span>
          <span className="flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
            <Radio className="w-2.5 h-2.5 text-emerald-500 animate-pulse" />
            <span className="text-[8px] font-mono font-semibold text-emerald-600 uppercase">Live</span>
          </span>
        </div>

        <div className="space-y-2">
          {/* MacBook Status */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-neutral-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            <div className="flex items-center gap-2">
              <Laptop className="w-3.5 h-3.5 text-neutral-400" />
              <div className="text-left">
                <p className="text-[11px] font-semibold text-neutral-800">MacBook Pro M3</p>
                <p className="text-[9px] text-neutral-400 font-mono">Agent Bridge active</p>
              </div>
            </div>
            <span className={`w-1.5 h-1.5 rounded-full ${macConnected ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
          </div>

          {/* iPhone Status */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-neutral-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            <div className="flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5 text-neutral-400" />
              <div className="text-left">
                <p className="text-[11px] font-semibold text-neutral-800">iPhone 15 Pro</p>
                <p className="text-[9px] text-neutral-400 font-mono">Mobile App linked</p>
              </div>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-neutral-400" />
            <span>Active session</span>
          </div>
          <span className="text-neutral-600 font-semibold">2h 45m</span>
        </div>
      </div>
    </div>
  );
}
