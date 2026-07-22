import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatThread from './components/ChatThread';
import ProjectsView from './components/ProjectsView';
import ConnectedAccountsView from './components/ConnectedAccountsView';
import FuturePlansView from './components/FuturePlansView';
import SetupInstructionsView from './components/SetupInstructionsView';
import SettingsView from './components/SettingsView';
import TrainingView from './components/TrainingView';
import DashboardView from './components/DashboardView';
import LandingPage from './components/LandingPage';

import { 
  INITIAL_PROJECTS, 
  INITIAL_FUTURE_PLANS, 
  INITIAL_ACCOUNTS, 
  INITIAL_ACTIONS, 
  INITIAL_CHAT,
  INITIAL_TRAINING_DOCS,
  INITIAL_TRAINING_EXAMPLES,
  INITIAL_PREFERRED_TONE,
  DEMO_PROJECTS,
  DEMO_ACCOUNTS,
  DEMO_ACTIONS,
  DEMO_FUTURE_PLANS,
  DEMO_CHAT,
  DEMO_TRAINING_DOCS,
  DEMO_TRAINING_EXAMPLES
} from './data/mockData';
import { Project, FuturePlan, ConnectedAccount, ComputerAction, ChatMessage, TrainingDocument, TrainingExample, CommunicationTone } from './types';
import { HelpCircle, Laptop, Radio, Menu, MessageSquare, X } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [showLandingPage, setShowLandingPage] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  
  // High fidelity LocalStorage loaded states
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('aiceo_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [plans, setPlans] = useState<FuturePlan[]>(() => {
    const saved = localStorage.getItem('aiceo_plans');
    return saved ? JSON.parse(saved) : INITIAL_FUTURE_PLANS;
  });

  const [accounts, setAccounts] = useState<ConnectedAccount[]>(() => {
    const saved = localStorage.getItem('aiceo_accounts');
    return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
  });

  const [actions, setActions] = useState<ComputerAction[]>(() => {
    const saved = localStorage.getItem('aiceo_actions');
    return saved ? JSON.parse(saved) : INITIAL_ACTIONS;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('aiceo_messages');
    return saved ? JSON.parse(saved) : INITIAL_CHAT;
  });

  // Custom Training states
  const [trainingDocs, setTrainingDocs] = useState<TrainingDocument[]>(() => {
    const saved = localStorage.getItem('aiceo_training_docs');
    return saved ? JSON.parse(saved) : INITIAL_TRAINING_DOCS;
  });

  const [trainingExamples, setTrainingExamples] = useState<TrainingExample[]>(() => {
    const saved = localStorage.getItem('aiceo_training_examples');
    return saved ? JSON.parse(saved) : INITIAL_TRAINING_EXAMPLES;
  });

  const [preferredTone, setPreferredTone] = useState<CommunicationTone>(() => {
    const saved = localStorage.getItem('aiceo_preferred_tone');
    return (saved as CommunicationTone) || INITIAL_PREFERRED_TONE;
  });

  const [activeDeepLinkId, setActiveDeepLinkId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('aiceo_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('aiceo_plans', JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem('aiceo_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('aiceo_actions', JSON.stringify(actions));
  }, [actions]);

  useEffect(() => {
    localStorage.setItem('aiceo_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('aiceo_training_docs', JSON.stringify(trainingDocs));
  }, [trainingDocs]);

  useEffect(() => {
    localStorage.setItem('aiceo_training_examples', JSON.stringify(trainingExamples));
  }, [trainingExamples]);

  useEffect(() => {
    localStorage.setItem('aiceo_preferred_tone', preferredTone);
  }, [preferredTone]);

  // Clean active deep link highlight timer
  useEffect(() => {
    if (activeDeepLinkId) {
      const timer = setTimeout(() => {
        setActiveDeepLinkId(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [activeDeepLinkId]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // 1. Task checklist toggling (recalculating percentages organically!)
  const handleToggleSubtask = (projectId: string, subtaskId: string) => {
    setProjects(prevProjects => {
      return prevProjects.map(project => {
        if (project.id !== projectId) return project;

        const updatedSubtasks = project.subtasks.map(task => {
          if (task.id !== subtaskId) return task;
          const newStatus = task.status === 'completed' ? 'pending' as const : 'completed' as const;
          return {
            ...task,
            status: newStatus,
            completedAt: newStatus === 'completed' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined
          };
        });

        const completedCount = updatedSubtasks.filter(t => t.status === 'completed').length;
        const totalCount = updatedSubtasks.length;
        const newProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

        showToast(`Task list updated for ${project.name}`, 'info');

        return {
          ...project,
          subtasks: updatedSubtasks,
          progress: newProgress,
          status: newProgress === 100 ? 'completed' : 'active'
        };
      });
    });
  };

  // 2. Propose new project
  const handleAddProject = (name: string, description: string) => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name,
      description,
      status: 'active',
      progress: 0,
      subtasks: [
        { id: `sub-${Date.now()}-1`, title: 'Scan and analyze local file tree schemas', status: 'completed', assignedTo: 'verrazano', completedAt: 'Just Now' },
        { id: `sub-${Date.now()}-2`, title: 'Compile outbound connection parameters', status: 'in_progress', assignedTo: 'verrazano' },
        { id: `sub-${Date.now()}-3`, title: 'Awaiting your review on WhatsApp/Email outreach', status: 'pending', assignedTo: 'user' }
      ]
    };
    setProjects(prev => [newProj, ...prev]);
    showToast(`New project directive dispatched: ${name}`, 'success');

    // Trigger mirrored action log
    const newAct: ComputerAction = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: `Orchestrated: ${name}`,
      description: `Dispatched Node.js sandbox environment to coordinate steps for "${name}".`,
      category: 'code',
      status: 'executing'
    };
    setActions(prev => [newAct, ...prev]);

    // Update execution status after 3s
    setTimeout(() => {
      setActions(current => current.map(a => {
        if (a.id === newAct.id) {
          return { ...a, status: 'success', description: `Sudo container booted for "${name}". Subtasks updated.` };
        }
        return a;
      }));
      showToast(`AI CEO Bridge established sandbox for ${name}`, 'success');
    }, 3000);
  };

  // 3. Propose new backlog plans
  const handleAddPlan = (title: string, description: string, quarter: string, priority: 'high' | 'medium' | 'low') => {
    const newPlan: FuturePlan = {
      id: `plan-${Date.now()}`,
      title,
      description,
      quarter,
      priority,
      estimatedHours: Math.floor(Math.random() * 15) + 5
    };
    setPlans(prev => [newPlan, ...prev]);
    showToast(`Milestone logged for ${quarter}`, 'success');
  };

  const handleRemovePlan = (id: string) => {
    setPlans(prev => prev.filter(p => p.id !== id));
    showToast('Future plan discarded', 'warning');
  };

  // 4. Toggle account statuses
  const handleToggleAccount = (id: string) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id !== id) return acc;
      const willConnect = !acc.connected;
      
      if (willConnect) {
        showToast(`Linked ${acc.name} successfully`, 'success');
        
        // If WhatsApp is linked, automatically resolve the expired WhatsApp action item! Cross-linking!
        if (acc.type === 'whatsapp') {
          setTimeout(() => {
            setActions(currentActions => currentActions.map(act => {
              if (act.id === 'act-whatsapp') {
                return { 
                  ...act, 
                  status: 'success', 
                  description: 'WhatsApp QR synchronization verified. Logistics dispute messenger bridge active.' 
                };
              }
              return act;
            }));
            
            // Resolve Chat Message decision too!
            setMessages(currentMsgs => currentMsgs.map(msg => {
              if (msg.id === 'msg-whatsapp-auth') {
                return { ...msg, isDecisionPending: false };
              }
              return msg;
            }));

            showToast('WhatsApp dispute messenger is now running!', 'success');
          }, 1500);
        }
      } else {
        showToast(`Disconnected ${acc.name}`, 'warning');
      }

      return {
        ...acc,
        connected: willConnect,
        status: willConnect ? 'OAuth Session Active' : 'Disconnected'
      };
    }));
  };

  // 5. Deep Linking Highlight Trigger
  const handleDeepLinkClick = (actionId: string) => {
    setActiveDeepLinkId(actionId);
    setCurrentTab('projects'); // Recent Actions live in the projects timeline split
    showToast('Navigated to deep linked computer action card', 'info');

    // Scroll node smoothly
    setTimeout(() => {
      const targetElement = document.getElementById(`action-node-${actionId}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Custom Training state modifiers
  const handleAddTrainingDoc = (doc: Omit<TrainingDocument, 'id' | 'uploadedAt'>) => {
    const newDoc: TrainingDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploadedAt: new Date().toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTrainingDocs(prev => [newDoc, ...prev]);
    showToast(`Added custom training asset: ${doc.name}`, 'success');
  };

  const handleRemoveTrainingDoc = (id: string) => {
    setTrainingDocs(prev => prev.filter(d => d.id !== id));
    showToast(`Removed training document asset`, 'warning');
  };

  const handleAddTrainingExample = (trigger: string, response: string) => {
    const newEx: TrainingExample = {
      id: `ex-${Date.now()}`,
      trigger,
      response
    };
    setTrainingExamples(prev => [newEx, ...prev]);
    showToast(`Added behavioral mapping trigger: "${trigger}"`, 'success');
  };

  const handleRemoveTrainingExample = (id: string) => {
    setTrainingExamples(prev => prev.filter(ex => ex.id !== id));
    showToast(`Removed behavioral mapping`, 'warning');
  };

  const handleSelectTone = (tone: CommunicationTone) => {
    setPreferredTone(tone);
    showToast(`Tone adapted: ${tone.toUpperCase()}`, 'success');
  };

  // 6. ChatGPT thread choices handler (Approving/declining booking or lunch sushi orders)
  const handleActionSelect = (messageId: string, choiceValue: string) => {
    // Acknowledge decision in chat
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return { ...msg, isDecisionPending: false };
      }
      return msg;
    }));

    // Handle interactive onboarding walkthrough choices
    if (choiceValue === 'onboard-connect-macbook') {
      setAccounts(prev => prev.map(acc => {
        if (acc.id === 'acc-mac') {
          return {
            ...acc,
            connected: true,
            status: 'Online (Script Active)',
            username: 'seldo-mac-pro'
          };
        }
        return acc;
      }));
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [
        ...prev,
        {
          id: `onboard-mac-${Date.now()}`,
          sender: 'verrazano',
          text: "🟢 **MacBook Pro Local Sandbox connected successfully!** The secure bridge SSH tunnel has been initialized with local user `seldo-mac-pro` on port 3000.\n\nNow I can poll for Terminal terminal commands and execute local Safari browser sessions securely.\n\nNext, let's commission a sample project directive to see the pipeline logs, checklist, and authorization alerts in action. Choose one of our suggested templates below to deploy:",
          timestamp,
          choices: [
            { label: '📁 Initialize "SaaS Alpha Launch" Project', value: 'onboard-init-saas', action: 'approve' },
            { label: '✈️ Initialize "Conference Booking" Project', value: 'onboard-init-travel', action: 'approve' }
          ]
        }
      ]);
      showToast('Linked My MacBook (Local Host)', 'success');
      return;
    }

    if (choiceValue === 'onboard-init-saas') {
      setAccounts(prev => prev.map(acc => {
        if (acc.id === 'acc-mac') {
          return { ...acc, connected: true, status: 'Online (Script Active)', username: 'seldo-mac-pro' };
        }
        if (acc.id === 'acc-github' || acc.id === 'acc-gmail' || acc.id === 'acc-notion') {
          return {
            ...acc,
            connected: true,
            status: 'OAuth Session Active',
            username: acc.id === 'acc-github' ? 'verra-dev' : (acc.id === 'acc-gmail' ? 'seldo6@gmail.com' : 'seldo-ventures')
          };
        }
        return acc;
      }));

      const saasProj = DEMO_PROJECTS.find(p => p.id === 'proj-1');
      if (saasProj) {
        setProjects(prev => {
          if (prev.find(p => p.id === saasProj.id)) return prev;
          return [saasProj, ...prev];
        });
      }

      const saasActions = [
        {
          id: 'act-code',
          timestamp: '11:30 AM',
          title: 'Pushed tailwind fix to landing-page repo',
          description: 'Updated border definitions, added backdrop-blur tags to layout.tsx, and ran compiler test.',
          category: 'code' as any,
          status: 'success' as any,
          screenshotUrl: 'code_git_push',
          actionMeta: {
            accountType: 'github',
            details: 'Repo: nextjs-saas | Branch: main | Commit: f92a5b1',
            deepLinkId: 'msg-code-push'
          }
        },
        {
          id: 'act-notion',
          timestamp: '09:15 AM',
          title: 'Updated Notion Client Roadmap',
          description: 'Imported new feedback bullet points into Notion from Gmail thread with venture clients.',
          category: 'spreadsheet' as any,
          status: 'success' as any,
          screenshotUrl: 'notion_update_lead',
          actionMeta: {
            accountType: 'notion',
            details: 'Page: "Enterprise Client Roadmap" | Added 4 rows'
          }
        }
      ];
      setActions(prev => {
        const filtered = saasActions.filter(sa => !prev.find(p => p.id === sa.id));
        return [...filtered, ...prev];
      });

      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [
        ...prev,
        {
          id: `onboard-saas-${Date.now()}`,
          sender: 'verrazano',
          text: "📂 **'SaaS Alpha Launch' project directive successfully initialized!**\n\nI have imported your task checklist into the **Projects** tab. To demonstrate account syncing, I have automatically connected your **GitHub**, **Gmail**, and **Notion** accounts as workspace nodes.\n\nYou can now see their synced logs inside your System Activity log. Would you like to view the project checklist or connect more tools?",
          timestamp,
          choices: [
            { label: '📋 View Active Projects Checklist', value: 'onboard-go-projects', action: 'approve' },
            { label: '✨ Hydrate All Demo Data & Projects', value: 'onboard-hydrate-all', action: 'approve' }
          ]
        }
      ]);
      showToast('Initialized SaaS Alpha Launch project', 'success');
      return;
    }

    if (choiceValue === 'onboard-init-travel') {
      setAccounts(prev => prev.map(acc => {
        if (acc.id === 'acc-mac') {
          return { ...acc, connected: true, status: 'Online (Script Active)', username: 'seldo-mac-pro' };
        }
        if (acc.id === 'acc-booking' || acc.id === 'acc-whatsapp') {
          return { ...acc, connected: true, status: 'OAuth Session Active', username: 'seldo6@gmail.com' };
        }
        return acc;
      }));

      const travelProj = DEMO_PROJECTS.find(p => p.id === 'proj-2');
      if (travelProj) {
        setProjects(prev => {
          if (prev.find(p => p.id === travelProj.id)) return prev;
          return [travelProj, ...prev];
        });
      }

      const travelActions = [
        {
          id: 'act-booking',
          timestamp: '10:42 AM',
          title: 'CitizenM London Hotel Booking',
          description: 'Located a King Room at CitizenM Tower of London. Awaiting user payment & final approval.',
          category: 'booking' as any,
          status: 'pending_approval' as any,
          screenshotUrl: 'hotel_citizenm_london',
          actionMeta: {
            accountType: 'booking',
            amount: '$740.00 (4 nights)',
            details: 'CitizenM London Tower Bridge | Check-In: Oct 12 | Check-Out: Oct 16',
            deepLinkId: 'msg-hotel',
            itemDetails: ['1x Double King Room', 'High-speed Wi-Fi & Workdesk Included', 'Cancellation window active until Oct 1st']
          }
        }
      ];
      setActions(prev => {
        const filtered = travelActions.filter(ta => !prev.find(p => p.id === ta.id));
        return [...filtered, ...prev];
      });

      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [
        ...prev,
        {
          id: `onboard-travel-${Date.now()}`,
          sender: 'verrazano',
          text: "✈️ **'Euro-Tech Conference Booking' has been initialized!**\n\nI have imported your travel logistics checklist into the **Projects** tab. To demonstrate browser simulation, I have pre-filled a CitizenM hotel reservation and added a payment approval alert to your **System Activity Log**.\n\nYou can review and confirm the booking checkout securely inside your dashboard.",
          timestamp,
          choices: [
            { label: '📋 View Checklist', value: 'onboard-go-projects', action: 'approve' }
          ]
        }
      ]);
      showToast('Initialized Euro-Tech Conference Booking project', 'success');
      return;
    }

    if (choiceValue === 'onboard-hydrate-all') {
      setProjects(DEMO_PROJECTS);
      setAccounts(DEMO_ACCOUNTS);
      setActions(DEMO_ACTIONS);
      setPlans(DEMO_FUTURE_PLANS);
      setTrainingDocs(DEMO_TRAINING_DOCS);
      setTrainingExamples(DEMO_TRAINING_EXAMPLES);
      
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [
        ...prev,
        {
          id: `onboard-hydrate-${Date.now()}`,
          sender: 'verrazano',
          text: "✨ **Full Workspace Hydrated!**\n\nI have imported all demo projects, active plans, sandbox credentials, recent automated browser checkout logs, and custom AI CEO training docs.\n\nExplore around the tabs to see the minimal style dashboard, connected accounts sync, modular subtask checking, and custom settings!",
          timestamp
        }
      ]);
      showToast('Demo environment fully hydrated!', 'success');
      return;
    }

    if (choiceValue === 'onboard-go-projects') {
      setCurrentTab('projects');
      showToast('Navigated to Projects panel', 'info');
      return;
    }

    // Find linked computer action
    const targetMsg = messages.find(m => m.id === messageId);
    if (!targetMsg || !targetMsg.deepLinkId) return;

    const actionId = targetMsg.deepLinkId;

    if (choiceValue === 'confirm-hotel' || choiceValue === 'confirm-lunch') {
      // Approve action
      handleApproveAction(actionId);
    } else if (choiceValue === 'decline-hotel' || choiceValue === 'decline-lunch') {
      // Decline action
      handleDeclineAction(actionId);
    } else if (choiceValue === 'connect-whatsapp') {
      // Trigger WhatsApp QR linkage
      setCurrentTab('accounts');
      showToast('Opening QR Code module for WhatsApp linking...', 'info');
    }
  };

  const handleApproveAction = (actionId: string) => {
    setActions(prev => prev.map(act => {
      if (act.id !== actionId) return act;
      return { 
        ...act, 
        status: 'success', 
        description: `AUTHORIZED: User confirmed charges of ${act.actionMeta?.amount || 'items'}. Automated terminal script completed transaction successfully.` 
      };
    }));

    // Append ChatGPT system success update
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const targetAction = actions.find(a => a.id === actionId);
    
    setMessages(prev => [
      ...prev,
      {
        id: `sys-msg-${Date.now()}`,
        sender: 'system',
        text: `Transaction completed: ${targetAction?.title || 'Action'} approved`,
        timestamp
      },
      {
        id: `reply-msg-${Date.now()}`,
        sender: 'aiceo',
        text: `Perfect. I have carried out your transaction for "${targetAction?.title}" and finalized the receipt parameters in your connected accounts.`,
        timestamp
      }
    ]);

    // Organically complete subtask if matching
    if (actionId === 'act-booking') {
      // Complete "Confirm CitizenM London Hotel booking" subtask
      setProjects(prev => prev.map(p => {
        if (p.id !== 'proj-2') return p;
        const updatedSubtasks = p.subtasks.map(t => {
          if (t.id === 'sub-7') {
            return { ...t, status: 'completed' as const, completedAt: timestamp };
          }
          return t;
        });
        const compCount = updatedSubtasks.filter(t => t.status === 'completed').length;
        const newProgress = Math.round((compCount / updatedSubtasks.length) * 100);
        return { ...p, subtasks: updatedSubtasks, progress: newProgress };
      }));
    }

    showToast('User payment authorized', 'success');
  };

  const handleDeclineAction = (actionId: string) => {
    setActions(prev => prev.map(act => {
      if (act.id !== actionId) return act;
      return { 
        ...act, 
        status: 'failed', 
        description: 'DECLINED BY USER: Transaction cancelled. Cart purged.' 
      };
    }));

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [
      ...prev,
      {
        id: `sys-msg-${Date.now()}`,
        sender: 'system',
        text: 'Action Declined by User',
        timestamp
      }
    ]);

    showToast('Action cancelled & discarded', 'warning');
  };

  // 7. Simulated chat responses (Smart Agent triggers!)
  const handleSendMessage = (text: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsgId = `user-msg-${Date.now()}`;
    
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp
    };

    setMessages(prev => [...prev, newUserMsg]);

    // Trigger active "AI CEO is processing..." simulation
    showToast('AI CEO received directive. Simulating remote computer control...', 'info');

    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let aiResponseText = '';
      let summariesList: string[] = [];
      let newComputerAction: ComputerAction | null = null;
      let aiMsgId = `ai-msg-${Date.now()}`;

      if (lowerText.includes('sushi') || lowerText.includes('food') || lowerText.includes('eat')) {
        // Sushi trigger
        aiResponseText = 'Sushi Palace has been compiled in your browser session. I loaded your standard 2x Spicy Tuna Roll and Sashimi choices. Authorization needed.';
        summariesList = [
          'Opened local Safari session on MacBook Pro.',
          'Added items to UberEats checkout cart matching past parameters.',
          'Linked checkout node to your aiceo workspace.'
        ];
        newComputerAction = {
          id: `act-sushi-${Date.now()}`,
          timestamp,
          title: 'Drafted UberEats sushi order',
          description: 'Awaiting your payment validation for Spicy Tuna roll bundle.',
          category: 'food',
          status: 'pending_approval',
          screenshotUrl: 'sushi_order_confirmation',
          actionMeta: {
            accountType: 'ubereats',
            amount: '$42.50',
            details: 'Sushi Palace (Delivery to office)',
            deepLinkId: aiMsgId,
            itemDetails: ['2x Spicy Tuna Roll', '1x Salmon Sashimi Platter', '1x Miso Soup']
          }
        };
      } else if (lowerText.includes('hotel') || lowerText.includes('booking') || lowerText.includes('london')) {
        // Hotel Booking trigger
        aiResponseText = 'Found the standard suite room at CitizenM London Tower Bridge. Initiated draft booking form. Awaiting user authorization.';
        summariesList = [
          'Searched Booking.com API for London Tower Bridge suites.',
          'Selected King Room with workspaces.',
          'Filled travel billing address automatically.'
        ];
        newComputerAction = {
          id: `act-hotel-${Date.now()}`,
          timestamp,
          title: 'CitizenM London Booking Drafted',
          description: 'Pre-filled itinerary ready. Final user signature needed.',
          category: 'booking',
          status: 'pending_approval',
          screenshotUrl: 'hotel_citizenm_london',
          actionMeta: {
            accountType: 'booking',
            amount: '$740.00 (4 nights)',
            details: 'CitizenM London Tower Bridge',
            deepLinkId: aiMsgId,
            itemDetails: ['1x Double King Room', 'Cancellation window active', 'High-speed Workdesk']
          }
        };
      } else {
        // Generic agent execution
        aiResponseText = `I have received your instruction: "${text}". I will open a secure ssh tunnel to your MacBook, execute corresponding terminal commands, and synchronize Notion/Airtable roadmaps.`;
        summariesList = [
          'Triggered MacBook bridge polling stream.',
          'Applied automated script sequences.',
          'Synchronized remote CRM datasets.'
        ];
        newComputerAction = {
          id: `act-generic-${Date.now()}`,
          timestamp,
          title: 'Executed Command Script',
          description: `Orchestrated Terminal control sequences for: "${text}"`,
          category: 'code',
          status: 'executing'
        };

        // Complete generic action after 3 seconds
        const actId = newComputerAction.id;
        setTimeout(() => {
          setActions(current => current.map(a => {
            if (a.id === actId) {
              return { ...a, status: 'success', description: `Successfully completed local Terminal tasks for: "${text}"` };
            }
            return a;
          }));
          showToast('Local computer tasks successfully processed!', 'success');
        }, 3000);
      }

      // -- Custom Training Adaptations --
      let isTuned = false;
      
      // 1. Check custom example behavior mappings
      const matchingEx = trainingExamples.find(ex => 
        lowerText.includes(ex.trigger.toLowerCase()) || 
        ex.trigger.toLowerCase().includes(lowerText)
      );

      if (matchingEx) {
        aiResponseText = matchingEx.response;
        isTuned = true;
      }

      // 2. Adapt communication tone
      const adaptResponseWithTone = (baseText: string, tone: CommunicationTone): string => {
        switch (tone) {
          case 'concise':
            return baseText
              .replace(/I have successfully/gi, 'Successfully')
              .replace(/I have received/gi, 'Received')
              .replace(/I am processing/gi, 'Processing')
              .replace(/I will open/gi, 'Opening')
              .replace(/I attempted to/gi, 'Attempted')
              .replace(/Please let me know if these details are correct/gi, 'Awaiting confirmation')
              .replace(/Awaiting your payment validation/gi, 'Pending payment confirmation')
              .replace(/Perfect. I have carried out your transaction for/gi, 'Approved.')
              .replace(/\./g, '')
              .trim();
          case 'direct':
            return `[Metrics Channel Active]\n${baseText}\n• Operational Latency: 12ms\n• System Priority Level: Direct`;
          case 'polite':
            return `Greetings. ${baseText} Please review these details at your convenience and let me know if you would like me to adjust any aspect.`;
          case 'casual':
            return `On it! 🚀 ${baseText.replace(/\./g, '!')} Let's get this done. 🙌`;
          case 'executive':
            return `STATUS BRIEFING:\n• Target Operation: Active\n• Details: ${baseText}\n• Action Required: Awaiting authorization keys.`;
          default:
            return baseText;
        }
      };

      if (preferredTone && preferredTone !== 'casual' || matchingEx) {
        aiResponseText = adaptResponseWithTone(aiResponseText, preferredTone);
        isTuned = true;
      }

      // 3. Prepend document reference context if loaded
      let responsePrefix = '';
      if (trainingDocs.length > 0) {
        const refDoc = trainingDocs[0];
        responsePrefix = `[Context Applied: Ref ${refDoc.name}]\n`;
        isTuned = true;
      }

      const finalResponseText = responsePrefix + aiResponseText;

      // Append AI response
      const newAiMsg: ChatMessage = {
        id: aiMsgId,
        sender: 'verrazano',
        text: finalResponseText,
        timestamp,
        summaries: summariesList,
        deepLinkId: newComputerAction?.id,
        isDecisionPending: newComputerAction?.status === 'pending_approval',
        isTuned: isTuned,
        choices: newComputerAction?.status === 'pending_approval' ? [
          { label: `Approve Action (${newComputerAction.actionMeta?.amount})`, value: newComputerAction.id.includes('sushi') ? 'confirm-lunch' : 'confirm-hotel', action: 'approve' },
          { label: 'Cancel Action', value: newComputerAction.id.includes('sushi') ? 'decline-lunch' : 'decline-hotel', action: 'decline' }
        ] : undefined
      };

      setMessages(prev => [...prev, newAiMsg]);

      if (newComputerAction) {
        setActions(prev => [newComputerAction!, ...prev]);
      }
      
      showToast('AI CEO posted response & mirrored action', 'success');
    }, 1800);
  };

  // Factory reset to default data
  const handleFactoryReset = () => {
    localStorage.removeItem('aiceo_projects');
    localStorage.removeItem('aiceo_plans');
    localStorage.removeItem('aiceo_accounts');
    localStorage.removeItem('aiceo_actions');
    localStorage.removeItem('aiceo_messages');
    localStorage.removeItem('aiceo_training_docs');
    localStorage.removeItem('aiceo_training_examples');
    localStorage.removeItem('aiceo_preferred_tone');

    setProjects(INITIAL_PROJECTS);
    setPlans(INITIAL_FUTURE_PLANS);
    setAccounts(INITIAL_ACCOUNTS);
    setActions(INITIAL_ACTIONS);
    setMessages(INITIAL_CHAT);
    setTrainingDocs(INITIAL_TRAINING_DOCS);
    setTrainingExamples(INITIAL_TRAINING_EXAMPLES);
    setPreferredTone(INITIAL_PREFERRED_TONE);
    setCurrentTab('projects');
  };

  // View renderer based on currentTab selection
  const renderTabContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardView 
            actions={actions}
            projects={projects}
            accounts={accounts}
            onApprove={handleApproveAction}
            onDecline={handleDeclineAction}
            onAuth={(id) => {
              setCurrentTab('accounts');
              showToast('Link WhatsApp/Session to authorize bridge', 'info');
            }}
            activeDeepLinkId={activeDeepLinkId}
            setCurrentTab={setCurrentTab}
            onToggleAccount={handleToggleAccount}
            onOnboardAction={(action) => {
              if (action === 'init-saas') {
                handleActionSelect('msg-welcome', 'onboard-init-saas');
              } else if (action === 'hydrate-all') {
                handleActionSelect('msg-welcome', 'onboard-hydrate-all');
              } else if (action === 'init-travel') {
                handleActionSelect('msg-welcome', 'onboard-init-travel');
              }
            }}
          />
        );
      case 'projects':
        return (
          <ProjectsView 
            projects={projects}
            onToggleSubtask={handleToggleSubtask}
            onAddProject={handleAddProject}
          />
        );
      case 'plans':
        return (
          <FuturePlansView 
            plans={plans}
            onAddPlan={handleAddPlan}
            onRemovePlan={handleRemovePlan}
          />
        );
      case 'accounts':
        return (
          <ConnectedAccountsView 
            accounts={accounts}
            onToggleAccount={handleToggleAccount}
          />
        );
      case 'training':
        return (
          <TrainingView
            documents={trainingDocs}
            examples={trainingExamples}
            preferredTone={preferredTone}
            onAddDocument={handleAddTrainingDoc}
            onRemoveDocument={handleRemoveTrainingDoc}
            onAddExample={handleAddTrainingExample}
            onRemoveExample={handleRemoveTrainingExample}
            onSelectTone={handleSelectTone}
          />
        );
      case 'setup':
        return <SetupInstructionsView />;
      case 'settings':
        return <SettingsView onReset={handleFactoryReset} />;
      default:
        return <div className="text-neutral-500 p-8 font-mono">Select workspace tab</div>;
    }
  };

  // Show Landing Page first if enabled
  if (showLandingPage) {
    return <LandingPage onEnterConsole={() => setShowLandingPage(false)} />;
  }

  return (
    <div className="flex h-screen w-screen bg-[#f0f2f5] text-neutral-850 overflow-hidden font-sans relative">
      
      {/* Toast Notification HUD */}
      {notification && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-neutral-200/60 shadow-xl flex items-center gap-2.5 animate-slide-up text-xs">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="font-mono text-neutral-700">{notification.message}</span>
        </div>
      )}

      {/* Column 1: Far Left Sidebar */}
      <div className={`md:flex ${isSidebarOpen ? 'flex fixed inset-y-0 left-0 z-50 shadow-2xl bg-white' : 'hidden'} md:relative shrink-0 h-full`}>
        <Sidebar 
          currentTab={currentTab}
          setCurrentTab={(tab) => {
            setCurrentTab(tab);
            setIsSidebarOpen(false);
          }}
          accounts={accounts}
          onShowLandingPage={() => setShowLandingPage(true)}
        />
      </div>

      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-45"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Column 2: Center/Main content (renders the current selected tab view) */}
      <div className="flex-1 h-full overflow-hidden flex flex-col bg-[#fafafc] border-r border-neutral-200/60 relative">
        
        {/* Mobile Header Navbar */}
        <div className="md:hidden flex items-center justify-between px-5 py-3.5 bg-white border-b border-neutral-200/60 z-30 shrink-0 select-none">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-neutral-50 rounded-xl border border-neutral-200/50 text-neutral-850 cursor-pointer"
          >
            <Menu className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setShowLandingPage(true)}>
            <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center text-white font-display font-bold text-sm tracking-tighter leading-none shadow-sm">
              Br
            </div>
            <span className="font-display font-semibold text-xs tracking-wider text-neutral-900 uppercase">verrazano</span>
          </div>

          <button 
            onClick={() => setIsChatOpen(true)}
            className="p-2 hover:bg-neutral-50 rounded-xl border border-neutral-200/50 text-neutral-850 relative cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          </button>
        </div>

        {renderTabContent()}

        {/* Floating Chat Button for smaller screens (xl:hidden) when chat is closed */}
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="xl:hidden fixed bottom-6 right-6 z-40 bg-neutral-900 hover:bg-black text-white p-3.5 rounded-full shadow-xl flex items-center justify-center transition-all duration-200 active:scale-95 border border-neutral-800"
            title="Open AI Chat Mirror"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse border border-neutral-900"></span>
          </button>
        )}
      </div>

      {/* Column 3: Mirror Thread (ChatGPT Chat sync thread) */}
      <div className={`xl:flex ${isChatOpen ? 'flex fixed inset-y-0 right-0 z-50 shadow-2xl bg-white w-full max-w-[420px] md:max-w-[480px]' : 'hidden'} xl:relative shrink-0 h-full`}>
        {isChatOpen && (
          <button 
            onClick={() => setIsChatOpen(false)}
            className="xl:hidden absolute top-4 left-[-48px] w-10 h-10 rounded-full bg-white border border-neutral-200/80 shadow-md flex items-center justify-center text-neutral-700 hover:text-black z-50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <ChatThread 
          messages={messages}
          onSendMessage={handleSendMessage}
          onActionSelect={handleActionSelect}
          onDeepLinkClick={handleDeepLinkClick}
          activeDeepLinkId={activeDeepLinkId}
          onClose={() => setIsChatOpen(false)}
        />
      </div>

      {isChatOpen && (
        <div 
          className="xl:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-45"
          onClick={() => setIsChatOpen(false)}
        ></div>
      )}
    </div>
  );
}
