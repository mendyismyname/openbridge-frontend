import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Github, 
  Mail, 
  MapPin, 
  Utensils, 
  MessageSquare, 
  Key, 
  Laptop, 
  Check, 
  X, 
  RefreshCw,
  Lock
} from 'lucide-react';
import { ComputerAction } from '../types';

interface ComputerActionCardProps {
  action: ComputerAction;
  onApprove: (actionId: string) => void;
  onDecline: (actionId: string) => void;
  onAuth: (actionId: string) => void;
  isActiveDeepLink: boolean;
}

export default function ComputerActionCard({ 
  action, 
  onApprove, 
  onDecline, 
  onAuth,
  isActiveDeepLink 
}: ComputerActionCardProps) {
  const getCategoryIcon = () => {
    switch (action.category) {
      case 'code': return <Github className="w-4 h-4 text-neutral-800" />;
      case 'email': return <Mail className="w-4 h-4 text-indigo-600" />;
      case 'booking': return <MapPin className="w-4 h-4 text-emerald-600" />;
      case 'food': return <Utensils className="w-4 h-4 text-rose-600" />;
      case 'social': return <MessageSquare className="w-4 h-4 text-neutral-800" />;
      default: return <Laptop className="w-4 h-4 text-neutral-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (action.status) {
      case 'success':
        return (
          <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Success</span>
          </span>
        );
      case 'executing':
        return (
          <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-sky-700 bg-sky-50 border border-sky-200/50 px-3 py-1 rounded-full">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Running</span>
          </span>
        );
      case 'pending_approval':
        return (
          <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-orange-700 bg-orange-50 border border-orange-200/50 px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span>Awaiting Approval</span>
          </span>
        );
      case 'needs_auth':
        return (
          <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-rose-700 bg-rose-50 border border-rose-200/50 px-3 py-1 rounded-full">
            <Key className="w-3.5 h-3.5" />
            <span>Auth Required</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-600 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Failed</span>
          </span>
        );
    }
  };

  // Render simulated computer windows for confirmation screenshots (Ultra-clean modern design)
  const renderSimulatedScreenshot = () => {
    if (!action.screenshotUrl) return null;

    if (action.screenshotUrl === 'sushi_order_confirmation') {
      return (
        <div className="mt-4 rounded-2xl border border-neutral-200 bg-white overflow-hidden text-left shadow-sm">
          {/* Header Bar */}
          <div className="bg-neutral-50/80 border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] font-mono text-neutral-500 ml-2">MacBook (UberEats Checkout)</span>
            </div>
            <Lock className="w-3.5 h-3.5 text-neutral-400" />
          </div>
          {/* Receipt Content */}
          <div className="p-4 space-y-3 font-sans">
            <div className="flex justify-between items-start border-b border-neutral-100 pb-2.5">
              <div>
                <h4 className="text-xs font-semibold text-neutral-850">Sushi Palace</h4>
                <p className="text-[9px] text-neutral-400">Scheduled delivery • 12:30 PM</p>
              </div>
              <span className="text-xs font-mono font-bold text-rose-600">{action.actionMeta?.amount}</span>
            </div>
            <div className="space-y-1.5">
              {action.actionMeta?.itemDetails?.map((item, index) => (
                <div key={index} className="flex justify-between text-[11px] font-light">
                  <span className="text-neutral-600">{item}</span>
                  <span className="text-neutral-400 font-mono">x1</span>
                </div>
              ))}
            </div>
            <div className="pt-2.5 border-t border-dashed border-neutral-200 flex justify-between text-[10px] font-mono">
              <span className="text-neutral-400">Merchant Session</span>
              <span className="text-emerald-600 font-semibold">Secure Cookie Tied</span>
            </div>
          </div>
        </div>
      );
    }

    if (action.screenshotUrl === 'hotel_citizenm_london') {
      return (
        <div className="mt-4 rounded-2xl border border-neutral-200 bg-white overflow-hidden text-left shadow-sm">
          {/* Header Bar */}
          <div className="bg-neutral-50/80 border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] font-mono text-neutral-500 ml-2">MacBook (Booking.com API Proxy)</span>
            </div>
            <Lock className="w-3.5 h-3.5 text-neutral-400" />
          </div>
          {/* Hotel card content */}
          <div className="p-4 space-y-3.5 font-sans bg-white">
            <div className="border-b border-neutral-100 pb-3">
              <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200/50 px-2.5 py-0.5 rounded-lg font-mono font-bold uppercase tracking-wider">Top Rated Selection</span>
              <h4 className="text-sm font-semibold text-neutral-850 mt-2">CitizenM London Tower Bridge</h4>
              <p className="text-[10px] text-neutral-500 mt-0.5 font-light">40 Trinity Square, London EC3N 4DJ, United Kingdom</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-[10px] font-mono border-b border-neutral-100 pb-3 text-neutral-600">
              <div>
                <p className="text-neutral-400 uppercase text-[8px] font-bold">Check-In</p>
                <p className="font-semibold text-neutral-800 mt-1">Mon, Oct 12, 2026</p>
              </div>
              <div>
                <p className="text-neutral-400 uppercase text-[8px] font-bold">Check-Out</p>
                <p className="font-semibold text-neutral-800 mt-1">Fri, Oct 16, 2026</p>
              </div>
            </div>
            <div className="space-y-1">
              {action.actionMeta?.itemDetails?.map((detail, index) => (
                <p key={index} className="text-[10px] text-neutral-500 font-light">• {detail}</p>
              ))}
            </div>
            <div className="pt-2.5 border-t border-neutral-200 flex justify-between items-center">
              <span className="text-[10px] text-neutral-400 font-mono">Pre-Tax Total</span>
              <span className="text-xs font-mono font-bold text-neutral-800">{action.actionMeta?.amount}</span>
            </div>
          </div>
        </div>
      );
    }

    if (action.screenshotUrl === 'code_git_push') {
      return (
        <div className="mt-4 rounded-2xl border border-neutral-800 bg-[#16161a] overflow-hidden text-left shadow-lg font-mono">
          {/* Header Bar */}
          <div className="bg-[#1f1f24] border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] text-neutral-400 ml-2">Terminal (git diff)</span>
            </div>
            <span className="text-[9px] text-neutral-500 font-semibold">Pushed to main</span>
          </div>
          {/* Git code content */}
          <div className="p-4 text-[10px] leading-relaxed space-y-1.5 text-neutral-300">
            <p className="text-neutral-500">commit f92a5b1063ca1db316377 (origin/main)</p>
            <p className="text-neutral-400">Author: aiceo-agent &lt;agent@aiceo.ai&gt;</p>
            <p className="text-neutral-400">Date:   Mon Jul 20 11:30:12 2026</p>
            <p className="text-white mt-2 font-semibold font-sans">    feat: apply backdrop-blur fixes to landing-page</p>
            <div className="border-t border-neutral-800 mt-3 pt-3 space-y-0.5">
              <p className="text-neutral-500">--- a/src/components/Navbar.tsx</p>
              <p className="text-neutral-500">+++ b/src/components/Navbar.tsx</p>
              <p className="text-emerald-400 font-semibold font-mono">+   className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#030303]/60 backdrop-blur-md"</p>
              <p className="text-rose-400 font-semibold font-mono">-   className="sticky top-0 z-50 w-full bg-[#030303]"</p>
            </div>
          </div>
        </div>
      );
    }

    if (action.screenshotUrl === 'whatsapp_qr_request') {
      return (
        <div className="mt-4 rounded-2xl border border-neutral-200 bg-white overflow-hidden text-left shadow-sm">
          {/* Header Bar */}
          <div className="bg-neutral-50/80 border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] font-mono text-neutral-500 ml-2">MacBook (WhatsApp Bridge QR)</span>
            </div>
          </div>
          {/* QR Code Simulation */}
          <div className="p-5 flex flex-col items-center justify-center space-y-4 bg-neutral-50">
            <div className="relative p-3 bg-white rounded-2xl w-32 h-32 flex items-center justify-center border border-neutral-200 shadow-sm">
              {/* Mock QR matrix lines */}
              <div className="grid grid-cols-5 gap-2 w-full h-full">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`rounded-sm ${(i % 3 === 0 || i % 7 === 1 || i < 5 || i > 20 || i % 5 === 0) ? 'bg-neutral-800' : 'bg-transparent'}`}
                  ></div>
                ))}
              </div>
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px] rounded-2xl flex items-center justify-center">
                <span className="text-[10px] text-neutral-800 font-mono font-bold bg-neutral-50 border border-neutral-200 px-2.5 py-1 rounded-lg shadow-sm">WA SYNC</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[11px] font-mono text-neutral-800 font-bold">Scan QR to authenticate DHL dispute agent</p>
              <p className="text-[9px] text-neutral-400 font-mono mt-0.5">Expires in 1m 24s</p>
            </div>
          </div>
        </div>
      );
    }

    if (action.screenshotUrl === 'notion_update_lead') {
      return (
        <div className="mt-4 rounded-2xl border border-neutral-200 bg-white overflow-hidden text-left shadow-sm">
          <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              <span className="text-[10px] font-mono text-neutral-500 ml-2">Notion Database View</span>
            </div>
          </div>
          <div className="p-4 text-[10px] font-mono text-neutral-600 space-y-2">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-1.5 text-[9px] text-neutral-400 font-semibold">
              <span>Task Name</span>
              <span>Status</span>
              <span>Last Edited</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-800 font-semibold">🚀 Enterprise Client Roadmap</span>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-2 py-0.5 rounded text-[8px] font-bold uppercase">Done</span>
              <span className="text-neutral-400 text-[9px]">Just now</span>
            </div>
            <div className="pl-4 text-neutral-500 space-y-1 border-l border-neutral-200 text-[9px]">
              <p className="text-emerald-600 font-semibold">+ Add outbound WhatsApp scripts field</p>
              <p className="text-emerald-600 font-semibold">+ Verify Stripe integration test metrics</p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div 
      id={`action-node-${action.id}`}
      className={`p-5 rounded-[24px] transition-all duration-300 flex flex-col justify-between select-none relative group border ${
        isActiveDeepLink 
          ? 'border-l-4 border-l-indigo-600 bg-indigo-50/15 border-neutral-200 shadow-[0_12px_40px_rgba(99,102,241,0.04)] translate-x-1.5' 
          : 'border-neutral-200/60 bg-white hover:border-neutral-350 hover:shadow-md'
      }`}
    >
      {/* Deep Link Active Highlight badge */}
      {isActiveDeepLink && (
        <span className="absolute -top-2.5 left-5 bg-indigo-600 text-white text-[9px] font-mono font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
          Active Link Target
        </span>
      )}

      {/* Action Title Block */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center border border-neutral-200 shadow-sm group-hover:bg-neutral-200 transition-all">
              {getCategoryIcon()}
            </div>
            <div className="text-left">
              <h3 className="text-xs font-bold text-neutral-800 group-hover:text-indigo-600 transition-colors">
                {action.title}
              </h3>
              <p className="text-[10px] text-neutral-400 font-mono flex items-center gap-1.5 mt-0.5">
                <span>{action.timestamp}</span>
                {action.actionMeta?.accountType && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-neutral-200"></span>
                    <span className="uppercase text-[9px] text-neutral-400 font-bold">{action.actionMeta.accountType}</span>
                  </>
                )}
              </p>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        {/* Action Description */}
        <p className="text-[11px] text-neutral-500 leading-relaxed text-left font-light">
          {action.description}
        </p>

        {/* Dynamic computer screen screenshot representation */}
        {renderSimulatedScreenshot()}
      </div>

      {/* Interactive Action Forms based on status */}
      {(action.status === 'pending_approval' || action.status === 'needs_auth') && (
        <div className="mt-5 pt-4 border-t border-neutral-200/60 flex items-center justify-between gap-3 animate-fade-in">
          <div className="text-left">
            <span className="text-[9px] font-mono text-neutral-400 uppercase block tracking-wider font-semibold">Required Action</span>
            {action.status === 'pending_approval' ? (
              <span className="text-xs font-bold text-indigo-600 font-mono">{action.actionMeta?.amount || 'Confirmation'}</span>
            ) : (
              <span className="text-xs font-bold text-rose-600 font-mono">Link WhatsApp Session</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {action.status === 'pending_approval' ? (
              <>
                <button
                  id={`decline-btn-${action.id}`}
                  onClick={() => onDecline(action.id)}
                  className="px-3.5 py-2 rounded-full border border-neutral-200 hover:bg-rose-50 hover:border-rose-200 text-neutral-500 hover:text-rose-600 transition-all duration-150 text-[10px] font-mono cursor-pointer flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Decline</span>
                </button>
                <button
                  id={`approve-btn-${action.id}`}
                  onClick={() => onApprove(action.id)}
                  className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] font-mono shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve</span>
                </button>
              </>
            ) : (
              <button
                id={`auth-btn-${action.id}`}
                onClick={() => onAuth(action.id)}
                className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] font-mono shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-1"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Link Device</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
