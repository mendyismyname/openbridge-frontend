import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Trash2, 
  Plus, 
  Check, 
  Play, 
  MessageSquare,
  ArrowRight,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { TrainingDocument, TrainingExample, CommunicationTone } from '../types';

interface TrainingViewProps {
  documents: TrainingDocument[];
  examples: TrainingExample[];
  preferredTone: CommunicationTone;
  onAddDocument: (doc: Omit<TrainingDocument, 'id' | 'uploadedAt'>) => void;
  onRemoveDocument: (id: string) => void;
  onAddExample: (trigger: string, response: string) => void;
  onRemoveExample: (id: string) => void;
  onSelectTone: (tone: CommunicationTone) => void;
}

export default function TrainingView({
  documents,
  examples,
  preferredTone,
  onAddDocument,
  onRemoveDocument,
  onAddExample,
  onRemoveExample,
  onSelectTone
}: TrainingViewProps) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [showAddExampleForm, setShowAddExampleForm] = useState<boolean>(false);
  const [newTrigger, setNewTrigger] = useState<string>('');
  const [newResponse, setNewResponse] = useState<string>('');
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Playground state
  const [playgroundInput, setPlaygroundInput] = useState<string>('Request for outbound lead list');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<string>(
    'Select a sample scenario or type one below to preview the customized training adapter.'
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    // Validate file type
    const validTypes = ['text/plain', 'application/pdf', 'application/json', 'text/csv', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const isDocx = file.name.endsWith('.docx');
    const isPdf = file.name.endsWith('.pdf');
    const isValid = validTypes.includes(file.type) || isDocx || isPdf;

    if (!isValid) {
      setUploadError("Invalid file type. Please upload PDF, TXT, DOCX, CSV, or JSON documents.");
      setTimeout(() => setUploadError(null), 4000);
      return;
    }

    // Convert size to human readable
    const sizeInKB = Math.round(file.size / 1024);
    const sizeStr = sizeInKB > 1024 
      ? `${(sizeInKB / 1024).toFixed(1)} MB` 
      : `${sizeInKB} KB`;

    onAddDocument({
      name: file.name,
      type: file.name.split('.').pop()?.toUpperCase() || 'TXT',
      size: sizeStr,
      content: `Simulated contents of ${file.name}`
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleExampleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrigger.trim() || !newResponse.trim()) return;
    onAddExample(newTrigger, newResponse);
    setNewTrigger('');
    setNewResponse('');
    setShowAddExampleForm(false);
  };

  // Tone definitions helper
  const tones = [
    {
      id: 'concise' as CommunicationTone,
      label: 'Authoritative & Concise',
      desc: 'Straightforward bullet points. Eliminates conversational pleasantries. Best for high-tempo operations.',
      previewText: 'Command received. Process initialized. SSH tunnel established to workstation. Booking forms compiled in browser checkout. Authorization key required.'
    },
    {
      id: 'direct' as CommunicationTone,
      label: 'Analytical & Metric-First',
      desc: 'Highlights key ratios, financial impacts, and execution timelines before acting.',
      previewText: 'Processing leads query. Identified 42 outbound targets. Expected customer acquisition cost (CAC) reduction: 14%. System integrity: 99.8%. Awaiting your signal.'
    },
    {
      id: 'polite' as CommunicationTone,
      label: 'Empathetic & Collaborative',
      desc: 'Respectful and reassuring. Outlines intermediate steps thoroughly to ensure total user comfort.',
      previewText: 'Hello! I have carefully queued up your outbound workflow as requested. I will inspect the local workstation credentials, and if you are comfortable, I can finalize the draft. Let me know when you would like to proceed!'
    },
    {
      id: 'casual' as CommunicationTone,
      label: 'Energetic Startup Partner',
      desc: 'Friendly, modern tech dialect. Communicates with high enthusiasm and swift summaries.',
      previewText: 'Awesome, on it! 🚀 Ready to sync those files over to your Mac and handle the bookings. Double-checking details now so you don\'t have to. Click approve below and we roll!'
    },
    {
      id: 'executive' as CommunicationTone,
      label: 'Focused Executive Brief',
      desc: 'Short, high-level summaries. Groups information into minimal action lists with clear deadlines.',
      previewText: 'STATUS UPDATE: Outbound campaign staged. ACTION REQUIRED: Review payment node ($42.50) within 15 mins. NEXT STEPS: Establish Notion synchronization parameters.'
    }
  ];

  // Simulated output adapter preview generator
  const runSimulation = (input: string) => {
    setIsSimulating(true);
    setTimeout(() => {
      const activeToneConfig = tones.find(t => t.id === preferredTone) || tones[0];
      let customizedOutput = '';

      // Check if any output examples match
      const matchingExample = examples.find(ex => 
        input.toLowerCase().includes(ex.trigger.toLowerCase()) || 
        ex.trigger.toLowerCase().includes(input.toLowerCase())
      );

      // Check if any documents can be referenced
      const documentReference = documents.length > 0 
        ? `[Adaptive Context: Referencing rules and specifications loaded from your custom file "${documents[0].name}"]\n\n`
        : '';

      if (matchingExample) {
        customizedOutput = `${documentReference}[Exact Training Example Matched! Applying custom behavior]\n\n${matchingExample.response}`;
      } else {
        // Generate a responsive mockup blending input + tone style
        let baselineMsg = '';
        const query = input.toLowerCase();
        
        if (query.includes('outbound') || query.includes('lead') || query.includes('saas')) {
          if (preferredTone === 'concise') {
            baselineMsg = 'Lead list fetched. 50 accounts ready. Source files mapped. Launching outbound mail bridge.';
          } else if (preferredTone === 'direct') {
            baselineMsg = 'Retrieved SaaS Lead matrix. 50 prospects mapped. Avg. contract value potential: $12k. System processing complete. Confirm pipeline dispatch.';
          } else if (preferredTone === 'polite') {
            baselineMsg = 'I have successfully analyzed your outbound SaaS leads directory. I have isolated 50 promising contact profiles for you. I will wait for your validation before initiating any messaging scripts.';
          } else if (preferredTone === 'casual') {
            baselineMsg = 'Boom! Standard lead outbound compiled. 50 high-quality matches loaded. Ready to deploy via linked systems. Let\'s get this outreach started! 🎯';
          } else {
            baselineMsg = 'SaaS CAMPAIGN INITIATED:\n• Leads Found: 50 accounts\n• Confidence Level: 94%\n• Action: Click approve to synchronize outreach list.';
          }
        } else if (query.includes('hotel') || query.includes('booking') || query.includes('london') || query.includes('travel')) {
          if (preferredTone === 'concise') {
            baselineMsg = 'CitizenM London tower suites drafted. Cost: $740.00. Payment authorization requested.';
          } else if (preferredTone === 'direct') {
            baselineMsg = 'Drafted booking for CitizenM London. Cost metrics: 4 nights @ $185/night. Total: $740.00. Financial payload prepared.';
          } else if (preferredTone === 'polite') {
            baselineMsg = 'I have identified a comfortable workspace room at CitizenM London Tower Bridge. The total for your 4-night stay is $740.00. Please let me know if these details are correct.';
          } else if (preferredTone === 'casual') {
            baselineMsg = 'Snagged a sweet room for you in London! 🇬🇧 4 nights at CitizenM. Total is $740.00. Tap approve below and the ticket is yours!';
          } else {
            baselineMsg = 'LONDON TRIP DIRECTIVE:\n• Hotel: CitizenM Tower Bridge\n• Duration: 4 Nights\n• Total Cost: $740.00\n• Action: Validate authorization key.';
          }
        } else {
          // General dynamic fallback
          if (preferredTone === 'concise') {
            baselineMsg = `Instruction "${input}" logged. Process active. Executing container commands.`;
          } else if (preferredTone === 'direct') {
            baselineMsg = `Analyzing "${input}". Sync latency: 12ms. Command queue position: 1. Execution payload ready.`;
          } else if (preferredTone === 'polite') {
            baselineMsg = `I have received your request to "${input}". I am processing the local SSH tunnels and will update you as soon as the workflow completes safely.`;
          } else if (preferredTone === 'casual') {
            baselineMsg = `Got it! Running "${input}" right now. Sit back while I handle the background work and get this synced. 🙌`;
          } else {
            baselineMsg = `DIRECTIVE LOGGED: "${input}"\n• System status: Online\n• Integration status: Connected\n• Action: Pending confirmation.`;
          }
        }

        customizedOutput = `${documentReference}${baselineMsg}`;
      }

      setSimulationResult(customizedOutput);
      setIsSimulating(false);
    }, 800);
  };

  const handleSandboxSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playgroundInput.trim()) return;
    runSimulation(playgroundInput);
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#f5f6f9] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] p-6 lg:p-8 space-y-8 select-none scrollbar-thin text-left relative">
      <div className="border-b border-neutral-200/50 pb-5">
        <h1 className="text-xl font-display font-semibold text-neutral-900 flex items-center gap-2">
          <span>AI CEO Custom Training Hub</span>
        </h1>
        <p className="text-xs text-neutral-500 font-sans mt-0.5">
          Train your AI CEO to adopt specific communication tones, reference proprietary corporate documents, and map preferred output guidelines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Left Column: Tones, Documents, Examples */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Tone Adapter */}
          <div className="p-6 rounded-[24px] border border-neutral-200/80 bg-white/90 backdrop-blur-md space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.018)] transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase block">
                Step 1: Communication Tone & Behavior Adaptation
              </span>
              <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 font-mono px-2.5 py-0.5 rounded-lg font-bold uppercase self-start sm:self-auto">
                Active: {tones.find(t => t.id === preferredTone)?.label}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {tones.map((t) => {
                const isSelected = t.id === preferredTone;
                return (
                  <button
                    key={t.id}
                    onClick={() => onSelectTone(t.id)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected 
                        ? 'bg-indigo-50/40 border-indigo-500 shadow-sm' 
                        : 'bg-white/80 border-neutral-200/80 hover:border-neutral-350 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold ${isSelected ? 'text-indigo-700' : 'text-neutral-750'}`}>
                        {t.label}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1.5 font-light leading-relaxed">{t.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Upload Documents */}
          <div className="p-6 rounded-[24px] border border-neutral-200/80 bg-white/90 backdrop-blur-md space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.018)] transition-all">
            <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase block">
              Step 2: Proprietary Corporate Document Library
            </span>

            {/* Drag & Drop Upload Zone */}
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 transition-all duration-150 flex flex-col items-center justify-center text-center cursor-pointer ${
                dragActive 
                  ? 'border-indigo-500 bg-indigo-50/20' 
                  : 'border-neutral-250 bg-neutral-50/40 hover:border-neutral-350'
              }`}
              onClick={onButtonClick}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                multiple={false}
                onChange={handleFileChange}
                accept=".txt,.pdf,.docx,.json,.csv"
              />
              <UploadCloud className={`w-8 h-8 mb-2 ${dragActive ? 'text-indigo-600 animate-bounce' : 'text-neutral-400'}`} />
              <p className="text-xs font-semibold text-neutral-850">
                Drag and drop your document here, or <span className="text-indigo-600 font-bold">browse files</span>
              </p>
              <p className="text-[10px] text-neutral-450 mt-1 font-mono font-medium">
                Supports TXT, PDF, DOCX, CSV, or JSON (Max 15MB)
              </p>
            </div>

            {uploadError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* List of Uploaded Documents */}
            {documents.length > 0 ? (
              <div className="space-y-3 pt-1">
                <span className="text-[9px] font-mono text-neutral-400 uppercase block tracking-wider font-bold">Synced Knowledge Assets ({documents.length})</span>
                <div className="grid grid-cols-1 gap-2.5">
                  {documents.map((doc) => (
                    <div 
                      key={doc.id}
                      className="p-4 rounded-xl border border-neutral-200/80 bg-white/60 hover:bg-white hover:border-neutral-300 transition-all flex items-center justify-between text-xs shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-[10px] shrink-0">
                          {doc.type}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-neutral-800 truncate max-w-[200px] sm:max-w-sm">{doc.name}</p>
                          <p className="text-[10px] text-neutral-450 font-mono mt-0.5 font-medium">
                            {doc.size} • Uploaded {doc.uploadedAt}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveDocument(doc.id)}
                        className="text-neutral-400 hover:text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete asset"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-neutral-50/50 rounded-xl border border-neutral-200/80 text-center text-[11px] text-neutral-450 font-mono font-medium">
                No custom files uploaded. Upload guidelines to feed proprietary context to your AI CEO.
              </div>
            )}
          </div>

          {/* Section 3: Desired Output Style Examples */}
          <div className="p-6 rounded-[24px] border border-neutral-200/80 bg-white/90 backdrop-blur-md space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.018)] transition-all">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase block">
                Step 3: High-Precision Behavior Mappings
              </span>
              <button
                onClick={() => setShowAddExampleForm(!showAddExampleForm)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-semibold font-mono transition-colors cursor-pointer border border-indigo-100"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Define Workflow</span>
              </button>
            </div>

            {/* Add Example Form */}
            {showAddExampleForm && (
              <form onSubmit={handleExampleSubmit} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-3 animate-slide-up">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-500 mb-1.5 uppercase font-semibold">When user triggers / asks (Keyword or phrase)</label>
                  <input
                    type="text"
                    value={newTrigger}
                    onChange={(e) => setNewTrigger(e.target.value)}
                    placeholder="e.g., 'Draft outbound proposal'"
                    className="w-full bg-white border border-neutral-250 rounded-xl p-2.5 text-xs text-neutral-800 focus:outline-none focus:border-indigo-500 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-neutral-500 mb-1.5 uppercase font-semibold">Desired Output Behavior / Structure</label>
                  <textarea
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    placeholder="e.g., '1. Format as an Executive Summary. 2. Outline precise cost parameters. 3. Output as formatted bullets.'"
                    className="w-full bg-white border border-neutral-250 rounded-xl p-2.5 text-xs text-neutral-800 focus:outline-none focus:border-indigo-500 h-20 resize-none font-sans"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddExampleForm(false)}
                    className="px-3 py-1.5 rounded-lg text-neutral-450 hover:text-neutral-700 text-xs font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold shadow-md"
                  >
                    Save Mapping
                  </button>
                </div>
              </form>
            )}

            {/* Examples List */}
            {examples.length > 0 ? (
              <div className="space-y-3">
                {examples.map((ex) => (
                  <div 
                    key={ex.id}
                    className="p-4 rounded-xl border border-neutral-200/85 bg-white/50 hover:bg-white hover:border-neutral-300 transition-all space-y-2.5 relative group text-xs text-left shadow-xs"
                  >
                    <button
                      onClick={() => onRemoveExample(ex.id)}
                      className="absolute top-3 right-3 text-neutral-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all cursor-pointer p-1.5 hover:bg-rose-50 rounded"
                      title="Delete rule"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-start gap-2 max-w-[90%]">
                      <span className="text-[9px] bg-neutral-200 text-neutral-600 font-mono px-1.5 py-0.5 rounded font-bold shrink-0 uppercase">IF TRIGGER</span>
                      <span className="font-mono text-neutral-800 font-semibold truncate">{ex.trigger}</span>
                    </div>
                    <div className="pl-3.5 border-l border-indigo-400 py-0.5 space-y-1">
                      <span className="text-[9px] text-indigo-600 font-mono block uppercase font-bold">THEN APPLY</span>
                      <p className="text-[11px] text-neutral-500 leading-relaxed whitespace-pre-wrap font-light">{ex.response}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-neutral-50/50 rounded-xl border border-neutral-200/80 text-center text-[11px] text-neutral-450 font-mono font-medium">
                No precision behavior guidelines mapped. Add custom triggers to control exact agent output structures.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Playground / Test Simulator */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-[24px] border border-neutral-200/80 bg-white/95 backdrop-blur-md sticky top-6 space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.018)] transition-all">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-mono font-bold text-neutral-850 uppercase tracking-wider">Trained Model Live Playground</h3>
            </div>

            <p className="text-[11px] text-neutral-500 leading-relaxed font-light">
              Test how the AI CEO adapts its response styles in real-time. The active communication tone, knowledge base references, and precision guidelines will instantly mold the output.
            </p>

            <div className="space-y-3 pt-2">
              {/* Presets buttons */}
              <span className="text-[9px] font-mono text-neutral-400 uppercase block tracking-wider font-bold">Select Sample Scenarios</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setPlaygroundInput('Request for outbound lead list');
                    runSimulation('Request for outbound lead list');
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-[10px] text-neutral-650 font-mono border border-neutral-200/50 transition-all cursor-pointer font-medium"
                >
                  Outbound Leads
                </button>
                <button
                  onClick={() => {
                    setPlaygroundInput('Book hotel in London for workspace');
                    runSimulation('Book hotel in London for workspace');
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-[10px] text-neutral-650 font-mono border border-neutral-200/50 transition-all cursor-pointer font-medium"
                >
                  London Hotel Booking
                </button>
                <button
                  onClick={() => {
                    setPlaygroundInput('Sync source code pull request');
                    runSimulation('Sync source code pull request');
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-[10px] text-neutral-650 font-mono border border-neutral-200/50 transition-all cursor-pointer font-medium"
                >
                  Sync Pull Request
                </button>
              </div>

              {/* Input tester */}
              <form onSubmit={handleSandboxSubmit} className="relative mt-2">
                <input
                  type="text"
                  value={playgroundInput}
                  onChange={(e) => setPlaygroundInput(e.target.value)}
                  placeholder="Type a custom query..."
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-3 pl-3 pr-10 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-indigo-500/50 focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={isSimulating}
                  className="absolute right-2 top-1.5 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-colors cursor-pointer shadow-sm"
                  title="Run model adaptation"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Simulated Output Terminal Box */}
            <div className="space-y-1.5 pt-2 text-left">
              <span className="text-[9px] font-mono text-neutral-400 uppercase block tracking-wider font-bold">Simulated AI CEO Adaptor Output</span>
              
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 overflow-hidden min-h-[160px] flex flex-col justify-between">
                {/* Header status bar */}
                <div className="bg-neutral-100 border-b border-neutral-200 px-3 py-1.5 flex items-center justify-between text-[10px] text-neutral-500 font-mono font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    <span>Tuning Engine Layer v1.2</span>
                  </div>
                  <span>{preferredTone.toUpperCase()}</span>
                </div>

                {/* Simulated message text */}
                <div className="p-4 text-[11px] font-mono text-neutral-650 flex-1 leading-relaxed whitespace-pre-wrap select-all font-light text-left">
                  {isSimulating ? (
                    <div className="flex flex-col gap-2.5">
                      <div className="h-3.5 bg-neutral-200 rounded animate-pulse w-3/4"></div>
                      <div className="h-3.5 bg-neutral-200 rounded animate-pulse w-5/6"></div>
                      <div className="h-3.5 bg-neutral-200 rounded animate-pulse w-2/3"></div>
                    </div>
                  ) : (
                    simulationResult
                  )}
                </div>

                {/* Footer status bar */}
                <div className="bg-neutral-100/55 border-t border-neutral-200 px-3 py-2 flex items-center justify-between text-[9px] text-neutral-450 font-mono font-medium">
                  <span>Custom Context: {documents.length} Docs Loaded</span>
                  <span>Rules: {examples.length} Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
