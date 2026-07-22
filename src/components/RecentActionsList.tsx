import React from 'react';
import { ComputerAction } from '../types';
import ComputerActionCard from './ComputerActionCard';
import { Layers, Activity, Filter, RefreshCcw } from 'lucide-react';

interface RecentActionsListProps {
  actions: ComputerAction[];
  onApprove: (actionId: string) => void;
  onDecline: (actionId: string) => void;
  onAuth: (actionId: string) => void;
  activeDeepLinkId: string | null;
}

export default function RecentActionsList({
  actions,
  onApprove,
  onDecline,
  onAuth,
  activeDeepLinkId
}: RecentActionsListProps) {
  const [filter, setFilter] = React.useState<'all' | 'pending' | 'success'>('all');

  const filteredActions = actions.filter((action) => {
    if (filter === 'pending') return action.status === 'pending_approval' || action.status === 'needs_auth';
    if (filter === 'success') return action.status === 'success';
    return true;
  });

  return (
    <div className="w-[360px] h-full border-l border-white/5 bg-[#0a0a0a] flex flex-col shrink-0 select-none relative overflow-hidden">
      {/* Absolute background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),_transparent_50%)] pointer-events-none"></div>

      {/* Header */}
      <div className="p-5 border-b border-white/5 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400" />
          <h2 className="text-sm font-semibold text-white tracking-tight">System Activity</h2>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold bg-blue-500/10 px-2.5 py-1 rounded">Live Tracking</span>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-2.5 border-b border-white/5 bg-black/30 flex items-center justify-between gap-1 z-10 relative">
        <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1">
          <Filter className="w-3 h-3" />
          <span>Filter</span>
        </span>
        <div className="flex gap-1.5">
          {(['all', 'pending', 'success'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`text-[9px] font-mono px-2 py-0.5 rounded transition-all capitalize cursor-pointer ${
                filter === type
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              {type === 'pending' ? 'Required' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Actions Timeline */}
      <div className="flex-1 p-5 overflow-y-auto space-y-6 scrollbar-thin z-10 relative">
        {filteredActions.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-center p-4">
            <Layers className="w-8 h-8 text-white/20 stroke-1 mb-2" />
            <p className="text-[11px] font-mono text-white/30">No actions match current filter</p>
          </div>
        ) : (
          filteredActions.map((action) => (
            <div key={action.id} className="relative pl-6 border-l border-white/10 text-left pb-1">
              {/* Custom timeline point */}
              <div className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full transition-all duration-350 ${
                action.status === 'pending_approval' || action.status === 'needs_auth'
                  ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)]'
                  : action.status === 'success'
                    ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]'
                    : 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]'
              }`}></div>
              <p className="text-[10px] text-white/40 mb-1 font-mono">{action.timestamp}</p>
              <ComputerActionCard
                action={action}
                onApprove={onApprove}
                onDecline={onDecline}
                onAuth={onAuth}
                isActiveDeepLink={activeDeepLinkId === action.id}
              />
            </div>
          ))
        )}
      </div>

      {/* Sync Footer status */}
      <div className="p-3.5 border-t border-white/5 bg-black/60 flex items-center justify-between text-[9px] font-mono text-white/30 z-10 relative">
        <span>Agent ID: <code>aiceo_001_m3</code></span>
        <span className="flex items-center gap-1">
          <RefreshCcw className="w-2.5 h-2.5 animate-spin" />
          <span>Synced with Cloud</span>
        </span>
      </div>
    </div>
  );
}
