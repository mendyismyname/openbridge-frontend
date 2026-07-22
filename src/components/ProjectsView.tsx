import React, { useState } from 'react';
import { Project, SubTask } from '../types';
import { 
  Layers, 
  Plus, 
  CheckSquare, 
  Square, 
  Play, 
  CheckCircle, 
  Clock, 
  HelpCircle,
  Briefcase,
  ChevronRight,
  TrendingUp,
  Cpu,
  User
} from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  onToggleSubtask: (projectId: string, subtaskId: string) => void;
  onAddProject: (name: string, description: string) => void;
}

export default function ProjectsView({ projects, onToggleSubtask, onAddProject }: ProjectsViewProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    onAddProject(newProjectName, newProjectDesc);
    setNewProjectName('');
    setNewProjectDesc('');
    setShowAddForm(false);
  };

  // Stats
  const activeCount = projects.filter(p => p.status === 'active').length;
  const completedCount = projects.filter(p => p.status === 'completed').length;
  const totalSubtasks = projects.reduce((acc, p) => acc + p.subtasks.length, 0);
  const completedSubtasks = projects.reduce(
    (acc, p) => acc + p.subtasks.filter(t => t.status === 'completed').length, 
    0
  );
  const overallProgress = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#f8f9fc] p-6 space-y-6 select-none scrollbar-thin">
      
      {/* Top Welcome & Summary Cards */}
      <div className="flex items-center justify-between border-b border-neutral-200/50 pb-5">
        <div className="text-left">
          <h1 className="text-xl font-display font-semibold text-neutral-900">Current Projects</h1>
          <p className="text-xs text-neutral-500 font-sans mt-0.5">Let your AI CEO orchestrate computer actions and synchronize boards.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold font-mono transition-all duration-150 cursor-pointer shadow-md hover:shadow-lg hover:shadow-indigo-600/15"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Add Project Form (Modal/Drawer look) */}
      {showAddForm && (
        <form onSubmit={handleAddProject} className="p-5 rounded-2xl border border-neutral-200 bg-white space-y-4 animate-slide-up text-left shadow-[0_12px_40px_rgba(0,0,0,0.03)]">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-mono font-bold text-neutral-800 uppercase tracking-wider">Propose New Project Directive</h3>
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
              <label className="block text-[10px] font-mono text-neutral-450 mb-1.5 uppercase font-semibold">Project Title</label>
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="e.g., Automate Outbound SaaS Lead Gen"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs font-sans text-neutral-800 focus:outline-none focus:border-indigo-500/50 focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-neutral-450 mb-1.5 uppercase font-semibold">Objective / Instructions</label>
              <textarea
                value={newProjectDesc}
                onChange={(e) => setNewProjectDesc(e.target.value)}
                placeholder="Write specific steps that you want the AI CEO to fulfill..."
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs font-sans text-neutral-800 focus:outline-none focus:border-indigo-500/50 focus:bg-white h-20 resize-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-md hover:shadow-lg hover:shadow-indigo-600/15"
          >
            Dispatch Project to AI CEO
          </button>
        </form>
      )}

      {/* Performance Bento Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Total Projects */}
        <div className="p-4 rounded-2xl text-left border border-neutral-200 bg-white relative overflow-hidden flex flex-col justify-between h-24 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Directives</span>
            <Briefcase className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-neutral-850">{projects.length}</span>
            <span className="text-[10px] text-neutral-400 font-mono">({activeCount} Active)</span>
          </div>
          <div className="absolute right-0 bottom-0 w-24 h-1 bg-gradient-to-r from-indigo-500/30 to-sky-500/30"></div>
        </div>

        {/* Sync / Task Status */}
        <div className="p-4 rounded-2xl text-left border border-neutral-200 bg-white relative overflow-hidden flex flex-col justify-between h-24 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Fulfillment Rate</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-neutral-850">{overallProgress}%</span>
            <span className="text-[10px] text-neutral-400 font-mono">{completedSubtasks}/{totalSubtasks} tasks</span>
          </div>
          <div className="absolute right-0 bottom-0 w-24 h-1 bg-gradient-to-r from-indigo-500/30 to-purple-500/30"></div>
        </div>

        {/* AI Agent Status */}
        <div className="p-4 rounded-2xl text-left border border-neutral-200 bg-white relative overflow-hidden flex flex-col justify-between h-24 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Agent Bridge</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-sm font-bold text-indigo-600 font-mono uppercase tracking-wider">ACTIVE DEPLOY</span>
          </div>
          <p className="text-[9px] text-neutral-400 font-mono">Synced across Mac & Phone</p>
          <div className="absolute right-0 bottom-0 w-24 h-1 bg-gradient-to-r from-emerald-500/30 to-indigo-500/30"></div>
        </div>
      </div>

      {/* Main Column Split: Projects Navigation List vs. Subtask Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-left">
        {/* Projects List on the Left Side of Section */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase block">Active Pipelines</span>
          
          <div className="space-y-2.5">
            {projects.map((project) => {
              const completedTasks = project.subtasks.filter(t => t.status === 'completed').length;
              const isSelected = project.id === selectedProjectId;
              return (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer text-left relative ${
                    isSelected 
                      ? 'bg-white border-neutral-300 shadow-[0_10px_30px_rgba(0,0,0,0.02)]' 
                      : 'bg-white/80 border-neutral-200/60 hover:border-neutral-300 hover:bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <h3 className={`text-xs font-semibold ${isSelected ? 'text-neutral-800' : 'text-neutral-700'}`}>
                      {project.name}
                    </h3>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-lg uppercase tracking-wider font-medium ${
                      project.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-550 leading-relaxed mt-1.5 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                      <span>Completed ({completedTasks}/{project.subtasks.length})</span>
                      <span className="font-semibold text-neutral-550">{project.progress}%</span>
                    </div>
                    {/* Minimal progress bar */}
                    <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          project.status === 'completed' 
                            ? 'bg-emerald-500' 
                            : 'bg-gradient-to-r from-indigo-500 to-indigo-600'
                        }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Task checklist details on the Right Side of Section */}
        <div className="lg:col-span-7">
          <div className="p-5 rounded-2xl border border-neutral-200 bg-white space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
            {selectedProject ? (
              <>
                <div className="border-b border-neutral-200 pb-3 flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Directive Details</span>
                    <h2 className="text-sm font-semibold text-neutral-850 mt-1">{selectedProject.name}</h2>
                    <p className="text-[11px] text-neutral-500 leading-relaxed mt-1.5">{selectedProject.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase block">
                    Execution Checklist
                  </span>

                  <div className="space-y-2">
                    {selectedProject.subtasks.map((task) => {
                      const isCompleted = task.status === 'completed';
                      const isAgent = task.assignedTo === 'verrazano';
                      return (
                        <div
                          key={task.id}
                          id={`task-row-${task.id}`}
                          onClick={() => onToggleSubtask(selectedProject.id, task.id)}
                          className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                            isCompleted 
                              ? 'bg-emerald-50/40 border-emerald-200/50 text-neutral-500' 
                              : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                              {isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : (
                                <div className="w-4 h-4 border border-neutral-300 rounded shrink-0 bg-white"></div>
                              )}
                            </button>
                            <div className="text-left">
                              <span className={`text-xs ${isCompleted ? 'line-through text-neutral-400' : 'text-neutral-800'}`}>
                                {task.title}
                              </span>
                              {task.completedAt && (
                                <span className="block text-[9px] font-mono text-neutral-400 mt-0.5 font-medium">
                                  Done: {task.completedAt}
                                </span>
                              )}
                            </div>
                          </div>

                          <span className={`text-[9px] font-mono flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg font-medium ${
                            isAgent 
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' 
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {isAgent ? <Cpu className="w-2.5 h-2.5" /> : <User className="w-2.5 h-2.5" />}
                            <span>{isAgent ? 'aiceo' : 'User Approval'}</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="h-60 flex flex-col items-center justify-center text-center">
                <Layers className="w-12 h-12 text-neutral-300 stroke-1 mb-2" />
                <p className="text-[11px] font-mono text-neutral-400">Select an active project pipeline to view subtask trees</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
