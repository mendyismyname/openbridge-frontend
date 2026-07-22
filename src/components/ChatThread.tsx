import React, { useState, useRef, useEffect } from 'react';
import { 
  Zap, 
  CornerDownRight, 
  ExternalLink, 
  CheckCircle2, 
  Terminal,
  ChevronRight,
  Check,
  X,
  Plus,
  Paperclip,
  Globe,
  Lightbulb,
  Mic,
  ArrowUp,
  ChevronDown
} from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatThreadProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onActionSelect: (messageId: string, choiceValue: string) => void;
  onDeepLinkClick: (actionId: string) => void;
  activeDeepLinkId: string | null;
  onClose?: () => void;
}

export default function ChatThread({ 
  messages, 
  onSendMessage, 
  onActionSelect, 
  onDeepLinkClick,
  activeDeepLinkId,
  onClose
}: ChatThreadProps) {
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState('GPT-4o');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [searchWebActive, setSearchWebActive] = useState(false);
  const [reasoningActive, setReasoningActive] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="w-screen max-w-[440px] h-screen border-l border-neutral-200/60 bg-white flex flex-col justify-between shrink-0 select-none relative">
      {/* Background glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.015),_transparent_50%)] pointer-events-none"></div>

      {/* Model Selection Header (Inspired by modern ChatGPT selector) */}
      <div className="p-3 border-b border-neutral-150 bg-white flex items-center justify-between z-20 relative select-none shrink-0">
        <div className="relative">
          <button 
            type="button"
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-neutral-100 text-neutral-800 font-sans font-semibold text-xs transition-colors cursor-pointer"
          >
            <span>{selectedModel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-450" />
          </button>

          {isModelDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-30" 
                onClick={() => setIsModelDropdownOpen(false)}
              ></div>
              <div className="absolute left-0 mt-1.5 w-64 rounded-2xl bg-white border border-neutral-200 shadow-lg p-1.5 z-40 animate-fade-in text-left">
                <span className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider text-neutral-400 block font-bold">Switch model</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedModel('GPT-4o');
                    setIsModelDropdownOpen(false);
                  }}
                  className={`w-full flex flex-col p-2.5 rounded-xl text-left cursor-pointer transition-colors ${
                    selectedModel === 'GPT-4o' ? 'bg-neutral-50' : 'hover:bg-neutral-50/50'
                  }`}
                >
                  <span className="text-xs font-semibold text-neutral-900">GPT-4o</span>
                  <span className="text-[10px] text-neutral-450 font-sans leading-normal">Great for most everyday queries</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedModel('04-mini');
                    setIsModelDropdownOpen(false);
                  }}
                  className={`w-full flex flex-col p-2.5 rounded-xl text-left cursor-pointer transition-colors ${
                    selectedModel === '04-mini' ? 'bg-neutral-50' : 'hover:bg-neutral-50/50'
                  }`}
                >
                  <span className="text-xs font-semibold text-neutral-900">04-mini</span>
                  <span className="text-[10px] text-neutral-450 font-sans leading-normal">Fastest at advanced operations</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedModel('verrazano o1');
                    setIsModelDropdownOpen(false);
                  }}
                  className={`w-full flex flex-col p-2.5 rounded-xl text-left cursor-pointer transition-colors ${
                    selectedModel === 'verrazano o1' ? 'bg-neutral-50' : 'hover:bg-neutral-50/50'
                  }`}
                >
                  <span className="text-xs font-semibold text-neutral-900">verrazano o1</span>
                  <span className="text-[10px] text-neutral-450 font-sans leading-normal">Deep reasoning local agent system</span>
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-50 border border-neutral-200/60 text-[10px] font-mono text-neutral-500 font-semibold shadow-xs">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Active Bridge</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              type="button"
              className="p-1 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
              title="Close chat panel"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Thread */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 p-5 overflow-y-auto space-y-6 scrollbar-thin z-10 relative bg-white"
      >
        <div className="p-3.5 rounded-2xl border border-neutral-200/70 bg-neutral-50 text-[10px] font-sans text-neutral-500 leading-relaxed text-left">
          <span className="text-neutral-850 font-bold block mb-1">💡 Verrazano Synchronization:</span> 
          Any operations requested here or dispatched via local shortcuts are mirrored in real time. The verrazano agent stages checkouts locally.
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isSystem = msg.sender === 'system';
          const isHighlighted = activeDeepLinkId && msg.deepLinkId === activeDeepLinkId;
          const hasChoices = !isUser && msg.choices && msg.choices.length > 0;

          if (isSystem) {
            return (
              <div key={msg.id} className="flex items-center justify-center gap-2 py-1 text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                <span className="h-[1px] w-6 bg-neutral-200"></span>
                <span>{msg.text}</span>
                <span className="h-[1px] w-6 bg-neutral-200"></span>
              </div>
            );
          }

          if (isUser) {
            return (
              <div key={msg.id} className="flex flex-col items-end space-y-1 pl-12 animate-slide-up">
                <div className="bg-neutral-100 text-neutral-800 rounded-2xl rounded-tr-xs px-4 py-2.5 text-xs font-sans text-left max-w-[95%] leading-relaxed">
                  <p className="whitespace-pre-wrap font-normal">{msg.text}</p>
                </div>
                <span className="text-[9px] font-mono text-neutral-400 mr-1.5">{msg.timestamp}</span>
              </div>
            );
          }

          // Assistant Message Layout (ChatGPT style)
          return (
            <div 
              key={msg.id} 
              className={`flex gap-3 text-left animate-slide-up ${
                isHighlighted ? 'bg-amber-50/40 p-3.5 rounded-2xl ring-1 ring-amber-200/50' : ''
              }`}
            >
              {/* circular assistant icon */}
              <div className="w-7 h-7 rounded-full bg-black shrink-0 flex items-center justify-center text-white font-display font-bold text-[11px] leading-none shadow-xs mt-0.5 select-none">
                Br
              </div>
              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-neutral-850 font-sans">verrazano o1</span>
                  {msg.isTuned && (
                    <span className="text-[8px] bg-indigo-50 text-indigo-600 border border-indigo-150 px-1 rounded font-mono font-bold uppercase tracking-wider flex items-center gap-0.5 shrink-0">
                      <Zap className="w-2 h-2 text-indigo-500" />
                      <span>AI Tuned</span>
                    </span>
                  )}
                  <span className="text-[9px] font-mono text-neutral-400">{msg.timestamp}</span>
                </div>

                <div className="text-xs font-sans text-neutral-800 leading-relaxed font-light space-y-3 min-w-0">
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                  {/* Execution Logs */}
                  {msg.summaries && msg.summaries.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-neutral-150/60 space-y-2 min-w-0">
                      <div className="flex items-center gap-1.5 text-[9px] font-mono text-neutral-450 uppercase tracking-wider font-bold">
                        <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Execution Pipeline Logs</span>
                      </div>
                      <ul className="space-y-1 bg-neutral-50 p-3 rounded-xl border border-neutral-200/40 min-w-0">
                        {msg.summaries.map((summary, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[10px] font-mono text-neutral-500 leading-normal">
                            <CornerDownRight className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                            <span className="break-words">{summary}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Active supervised decision */}
                  {hasChoices && (
                    <div className="mt-4 border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-xs max-w-full">
                      <div className="bg-neutral-900 text-white px-4 py-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider">Consent Authorized Staging</span>
                        </div>
                        {msg.deepLinkId && (
                          <button 
                            type="button"
                            onClick={() => onDeepLinkClick(msg.deepLinkId!)}
                            className="flex items-center gap-1 text-[9px] font-mono text-neutral-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer"
                          >
                            <ExternalLink className="w-2.5 h-2.5" />
                            <span>Inspect</span>
                          </button>
                        )}
                      </div>
                      <div className="p-3.5 bg-neutral-50/50 space-y-3">
                        {msg.isDecisionPending ? (
                          <div className="grid grid-cols-1 gap-2">
                            {msg.choices!.map((choice) => {
                              const isApprove = choice.action === 'approve';
                              return (
                                <div
                                  key={choice.value}
                                  onClick={() => onActionSelect(msg.id, choice.value)}
                                  className={`flex items-center p-3 bg-white rounded-xl border border-neutral-200/90 cursor-pointer hover:bg-neutral-50 hover:shadow-xs transition-all group ${
                                    isApprove ? 'hover:border-neutral-850' : 'hover:border-rose-450'
                                  }`}
                                >
                                  <div className="w-7 h-7 rounded bg-neutral-50 border border-neutral-100 mr-2.5 flex items-center justify-center shrink-0">
                                    {isApprove ? (
                                      <Check className="w-3.5 h-3.5 text-neutral-950" />
                                    ) : (
                                      <X className="w-3.5 h-3.5 text-rose-500" />
                                    )}
                                  </div>
                                  <div className="flex-1 text-left min-w-0">
                                    <p className="text-[8px] font-bold uppercase tracking-wider text-neutral-400">
                                      {isApprove ? 'EXECUTE ACTION' : 'HALT & CANCEL'}
                                    </p>
                                    <p className="text-xs font-semibold text-neutral-800 truncate">{choice.label}</p>
                                  </div>
                                  <ChevronRight className={`w-4 h-4 text-neutral-300 transition-transform group-hover:translate-x-0.5 shrink-0 ${
                                    isApprove ? 'group-hover:text-black' : 'group-hover:text-rose-500'
                                  }`} />
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-150 text-[10px] font-mono text-emerald-700 font-semibold shadow-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                            <span>Action processed & synced locally</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Tray (Inspired by Image 2 modern ChatGPT UI) */}
      <div className="p-4 border-t border-neutral-150 bg-white z-10 shrink-0 select-none">
        <form onSubmit={handleSubmit} className="space-y-2">
          
          <div className="bg-white border border-neutral-200 rounded-2xl p-2.5 shadow-xs flex flex-col gap-2 relative">
            <textarea
              id="chat-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask anything..."
              rows={1}
              className="w-full bg-transparent border-0 focus:outline-none resize-none text-xs text-neutral-800 placeholder-neutral-400 pr-8 min-h-[40px] font-sans"
            />
            
            <div className="flex items-center justify-between border-t border-neutral-100 pt-2 shrink-0">
              {/* Pills on the left */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-50 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 text-[9px] font-bold transition-colors border border-neutral-200/40 cursor-pointer"
                >
                  <Paperclip className="w-3 h-3 text-neutral-450" />
                  <span>Attach</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSearchWebActive(!searchWebActive)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold transition-colors border cursor-pointer ${
                    searchWebActive 
                      ? 'bg-neutral-900 border-neutral-900 text-white' 
                      : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 border-neutral-200/40'
                  }`}
                >
                  <Globe className="w-3 h-3" />
                  <span>Search</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReasoningActive(!reasoningActive)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold transition-colors border cursor-pointer ${
                    reasoningActive 
                      ? 'bg-neutral-900 border-neutral-900 text-white' 
                      : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 border-neutral-200/40'
                  }`}
                >
                  <Lightbulb className="w-3 h-3" />
                  <span>Reason</span>
                </button>
              </div>

              {/* Action buttons on the right */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-450 hover:text-neutral-700 transition-colors cursor-pointer"
                  title="Voice input"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150 shadow-xs cursor-pointer ${
                    inputText.trim() 
                      ? 'bg-neutral-900 text-white hover:bg-neutral-800' 
                      : 'bg-neutral-100 text-neutral-300 pointer-events-none'
                  }`}
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
          
          <p className="text-[8px] text-center text-neutral-400 uppercase tracking-widest font-mono pt-1">
            Connected to Verra o1-preview • Encrypted Channel
          </p>
        </form>
      </div>
    </div>
  );
}
