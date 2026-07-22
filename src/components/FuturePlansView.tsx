import React, { useState } from 'react';
import { FuturePlan } from '../types';
import { 
  Compass, 
  Plus, 
  Clock, 
  Calendar, 
  TrendingUp, 
  Trash2,
  ListFilter
} from 'lucide-react';

interface FuturePlansViewProps {
  plans: FuturePlan[];
  onAddPlan: (title: string, description: string, quarter: string, priority: 'high' | 'medium' | 'low') => void;
  onRemovePlan: (id: string) => void;
}

export default function FuturePlansView({ plans, onAddPlan, onRemovePlan }: FuturePlansViewProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newQuarter, setNewQuarter] = useState('Q3 2026');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddPlan(newTitle, newDesc, newQuarter, newPriority);
    setNewTitle('');
    setNewDesc('');
    setShowAddForm(false);
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-rose-50 text-rose-700 border border-rose-200/60';
      case 'medium': return 'bg-amber-50 text-amber-700 border border-amber-200/60';
      default: return 'bg-sky-50 text-sky-700 border border-sky-200/60';
    }
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#f8f9fc] p-6 space-y-6 select-none scrollbar-thin text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200/50 pb-5">
        <div>
          <h1 className="text-xl font-display font-semibold text-neutral-900">Backlog & Future Plans</h1>
          <p className="text-xs text-neutral-500 font-sans mt-0.5">Define long-term organization milestones for the AI CEO to plan ahead.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold font-mono transition-all duration-150 cursor-pointer shadow-md hover:shadow-lg hover:shadow-indigo-600/15"
        >
          <Plus className="w-4 h-4" />
          <span>Add Plan Directive</span>
        </button>
      </div>

      {/* Add Plan Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="p-5 rounded-2xl border border-neutral-200 bg-white space-y-4 animate-slide-up text-left shadow-[0_12px_40px_rgba(0,0,0,0.03)]">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-mono font-bold text-neutral-800 uppercase tracking-wider">Propose Backlog Milestone</h3>
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)} 
              className="text-neutral-400 hover:text-neutral-700 text-xs font-mono cursor-pointer"
            >
              Cancel
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-neutral-450 mb-1.5 uppercase font-semibold">Plan Goal / Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g., Shopify automatic fulfillment tracker"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs font-sans text-neutral-800 focus:outline-none focus:border-indigo-500/50 focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-neutral-450 mb-1.5 uppercase font-semibold">Operational Description</label>
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="List tools required (e.g. Airtable, Gmail integration)..."
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs font-sans text-neutral-800 focus:outline-none focus:border-indigo-500/50 focus:bg-white h-20 resize-none"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-neutral-450 mb-1.5 uppercase font-semibold">Target Quarter</label>
                <select
                  value={newQuarter}
                  onChange={(e) => setNewQuarter(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs font-sans text-neutral-850 focus:outline-none focus:border-indigo-500/50 focus:bg-white"
                >
                  <option value="Q3 2026">Q3 2026</option>
                  <option value="Q4 2026">Q4 2026</option>
                  <option value="Q1 2027">Q1 2027</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono text-neutral-450 mb-1.5 uppercase font-semibold">Priority Level</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs font-sans text-neutral-850 focus:outline-none focus:border-indigo-500/50 focus:bg-white"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-md hover:shadow-lg hover:shadow-indigo-600/15"
          >
            Deploy into Pipeline Database
          </button>
        </form>
      )}

      {/* Plans List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="p-4 rounded-2xl border border-neutral-200 bg-white flex flex-col justify-between h-44 hover:border-neutral-350 transition-all group relative shadow-[0_8px_30px_rgb(0,0,0,0.012)]"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center gap-2">
                <span className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-lg uppercase ${getPriorityColor(plan.priority)}`}>
                  {plan.priority} Priority
                </span>
                <button
                  onClick={() => onRemovePlan(plan.id)}
                  className="text-neutral-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all cursor-pointer p-1 hover:bg-rose-50 rounded"
                  title="Remove plan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="text-xs font-semibold text-neutral-800 group-hover:text-indigo-600 transition-colors">
                {plan.title}
              </h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-3 font-light">
                {plan.description}
              </p>
            </div>

            {/* Plan Footer Metadata */}
            <div className="mt-4 pt-3 border-t border-neutral-150 flex items-center justify-between text-[10px] font-mono text-neutral-400 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-neutral-300" />
                <span>Target: {plan.quarter}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neutral-300" />
                <span>Est. {plan.estimatedHours}h</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
