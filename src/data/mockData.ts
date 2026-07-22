import { Project, FuturePlan, ConnectedAccount, ComputerAction, ChatMessage, TrainingDocument, TrainingExample, CommunicationTone } from '../types';

// EMTPY BY DEFAULT INITIAL STATES
export const INITIAL_PROJECTS: Project[] = [];

export const INITIAL_FUTURE_PLANS: FuturePlan[] = [];

export const INITIAL_ACCOUNTS: ConnectedAccount[] = [
  { id: 'acc-mac', name: 'My MacBook (Local Host)', type: 'macbook', connected: false, status: 'Disconnected', category: 'device' },
  { id: 'acc-gmail', name: 'Gmail Outbound', type: 'gmail', connected: false, status: 'Disconnected', category: 'personal' },
  { id: 'acc-notion', name: 'Notion Workspace', type: 'notion', connected: false, status: 'Disconnected', category: 'workspace' },
  { id: 'acc-chatgpt', name: 'ChatGPT Openbridge Plugin', type: 'chatgpt' as any, connected: false, status: 'Disconnected', category: 'workspace' },
  { id: 'acc-monday', name: 'Monday.com boards', type: 'monday', connected: false, status: 'Disconnected', category: 'workspace' },
  { id: 'acc-airtable', name: 'Airtable Datastores', type: 'airtable', connected: false, status: 'Disconnected', category: 'workspace' },
  { id: 'acc-whatsapp', name: 'WhatsApp Business', type: 'whatsapp', connected: false, status: 'Disconnected', category: 'personal' },
  { id: 'acc-ubereats', name: 'UberEats Personal', type: 'ubereats', connected: false, status: 'Disconnected', category: 'personal' },
  { id: 'acc-booking', name: 'Booking.com', type: 'booking', connected: false, status: 'Disconnected', category: 'personal' },
  { id: 'acc-github', name: 'GitHub Enterprise', type: 'github', connected: false, status: 'Disconnected', category: 'workspace' },
];

export const INITIAL_ACTIONS: ComputerAction[] = [];

export const INITIAL_TRAINING_DOCS: TrainingDocument[] = [];

export const INITIAL_TRAINING_EXAMPLES: TrainingExample[] = [];

export const INITIAL_PREFERRED_TONE: CommunicationTone = 'casual';

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'verrazano',
    text: "Welcome to Verrazano. I am your autonomous AI CEO. I am currently running in a sandboxed, offline environment.\n\nTo begin running operations, we should configure your computer sandbox, sync your integrations, and commission your first project. Choose one of the quick actions below to initiate our setup walkthrough, or describe what you'd like to build.",
    timestamp: 'Just Now',
    choices: [
      { label: '🔌 Connect Local MacBook Sandbox', value: 'onboard-connect-macbook', action: 'auth' },
      { label: '📁 Initialize "SaaS Alpha Launch" Project', value: 'onboard-init-saas', action: 'approve' },
      { label: '✨ Hydrate All Demo Data & Projects', value: 'onboard-hydrate-all', action: 'approve' }
    ]
  }
];

// DEMO / HYDRATION DATASETS
export const DEMO_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'SaaS Alpha Launch',
    description: 'Coordinate the server deployment, signups, landing page updates and set up automatic cold outbound messaging.',
    status: 'active',
    progress: 78,
    subtasks: [
      { id: 'sub-1', title: 'Verify Stripe Webhook endpoints', status: 'completed', assignedTo: 'verrazano', completedAt: '10:15 AM' },
      { id: 'sub-2', title: 'Compile build logs for Next.js app', status: 'completed', assignedTo: 'verrazano', completedAt: '11:30 AM' },
      { id: 'sub-3', title: 'Update Airtable CRM with new lead emails', status: 'in_progress', assignedTo: 'verrazano' },
      { id: 'sub-4', title: 'Approve Outbound WhatsApp script', status: 'pending', assignedTo: 'user' },
      { id: 'sub-5', title: 'Verify custom domain routing on Cloudflare', status: 'pending', assignedTo: 'verrazano' },
    ]
  },
  {
    id: 'proj-2',
    name: 'Euro-Tech Conference Booking',
    description: 'Book accommodation, schedule logistics, and arrange executive dinners for the upcoming Paris & London tech summits.',
    status: 'active',
    progress: 40,
    subtasks: [
      { id: 'sub-6', title: 'Search flight options London-Paris', status: 'completed', assignedTo: 'verrazano', completedAt: '09:10 AM' },
      { id: 'sub-7', title: 'Confirm CitizenM London Hotel booking (deep link)', status: 'pending', assignedTo: 'user' },
      { id: 'sub-8', title: 'Draft WhatsApp RSVPs to 12 tech partners', status: 'pending', assignedTo: 'verrazano' },
    ]
  },
  {
    id: 'proj-3',
    name: 'Internal Monday Board Sync',
    description: 'Establish automated sync protocols between high-level client Notion roadmaps and Monday dev boards.',
    status: 'completed',
    progress: 100,
    subtasks: [
      { id: 'sub-9', title: 'Map Airtable table fields to Notion database', status: 'completed', assignedTo: 'verrazano', completedAt: 'Yesterday 04:00 PM' },
      { id: 'sub-10', title: 'Test Monday.com webhook endpoints', status: 'completed', assignedTo: 'verrazano', completedAt: 'Yesterday 05:30 PM' },
    ]
  }
];

export const DEMO_FUTURE_PLANS: FuturePlan[] = [
  {
    id: 'plan-1',
    title: 'Automate Q3 Tax Filings',
    description: 'Compile receipts from QuickBooks, sort by categories, and compile pre-populated PDF for accountant review.',
    quarter: 'Q3 2026',
    priority: 'high',
    estimatedHours: 6
  },
  {
    id: 'plan-2',
    title: 'Airtable Inventory Integration',
    description: 'Establish real-time shipping stock sync from Shopify warehouse CSV feeds straight into primary Airtable sheet.',
    quarter: 'Q3 2026',
    priority: 'medium',
    estimatedHours: 12
  },
  {
    id: 'plan-3',
    title: 'Automated Twitter/X Outbound Agent',
    description: 'Let verrazano monitor tech keywords on Twitter, draft helpful contextual responses, and direct message warm leads.',
    quarter: 'Q4 2026',
    priority: 'low',
    estimatedHours: 20
  }
];

export const DEMO_ACCOUNTS: ConnectedAccount[] = [
  { id: 'acc-mac', name: 'My MacBook (Local Host)', type: 'macbook', connected: true, username: 'seldo-mac-pro', status: 'Online (Script Active)', category: 'device' },
  { id: 'acc-gmail', name: 'Gmail Outbound', type: 'gmail', connected: true, username: 'seldo6@gmail.com', status: 'OAuth Connected', category: 'personal' },
  { id: 'acc-notion', name: 'Notion Workspace', type: 'notion', connected: true, username: 'seldo-ventures', status: 'Workspace Token Valid', category: 'workspace' },
  { id: 'acc-chatgpt', name: 'ChatGPT Openbridge Plugin', type: 'chatgpt' as any, connected: true, username: 'verra-plugin-active', status: 'Verra Plugin Synced', category: 'workspace' },
  { id: 'acc-monday', name: 'Monday.com boards', type: 'monday', connected: true, username: 'seldo-team-monday', status: 'Token Active', category: 'workspace' },
  { id: 'acc-airtable', name: 'Airtable Datastores', type: 'airtable', connected: true, username: 'seldo-crm-2026', status: 'API Key Active', category: 'workspace' },
  { id: 'acc-whatsapp', name: 'WhatsApp Business', type: 'whatsapp', connected: true, username: 'seldo-whatsapp-biz', status: 'Session Active', category: 'personal' },
  { id: 'acc-ubereats', name: 'UberEats Personal', type: 'ubereats', connected: true, username: 'seldo6@gmail.com', status: 'Session Cookie Valid', category: 'personal' },
  { id: 'acc-booking', name: 'Booking.com', type: 'booking', connected: true, username: 'seldo6@gmail.com', status: 'Linked Auth', category: 'personal' },
  { id: 'acc-github', name: 'GitHub Enterprise', type: 'github', connected: true, username: 'verra-dev', status: 'SSH Key Linked', category: 'workspace' },
];

export const DEMO_ACTIONS: ComputerAction[] = [
  {
    id: 'act-food',
    timestamp: '11:45 AM',
    title: 'Drafted lunch order on UberEats',
    description: 'Assembled delivery checkout from Sushi Palace. Scheduled for 12:30 PM.',
    category: 'food',
    status: 'pending_approval',
    screenshotUrl: 'sushi_order_confirmation',
    actionMeta: {
      accountType: 'ubereats',
      amount: '$42.50',
      details: 'Sushi Palace (Delivery to Office)',
      deepLinkId: 'msg-lunch',
      itemDetails: ['2x Spicy Tuna Roll', '1x Salmon Sashimi Platter', '1x Miso Soup', 'Priority Delivery Fee Included']
    }
  },
  {
    id: 'act-code',
    timestamp: '11:30 AM',
    title: 'Pushed tailwind fix to landing-page repo',
    description: 'Updated border definitions, added backdrop-blur tags to layout.tsx, and ran compiler test.',
    category: 'code',
    status: 'success',
    screenshotUrl: 'code_git_push',
    actionMeta: {
      accountType: 'github',
      details: 'Repo: nextjs-saas | Branch: main | Commit: f92a5b1',
      deepLinkId: 'msg-code-push'
    }
  },
  {
    id: 'act-booking',
    timestamp: '10:42 AM',
    title: 'CitizenM London Hotel Booking',
    description: 'Located a King Room at CitizenM Tower of London. Awaiting user payment & final approval.',
    category: 'booking',
    status: 'pending_approval',
    screenshotUrl: 'hotel_citizenm_london',
    actionMeta: {
      accountType: 'booking',
      amount: '$740.00 (4 nights)',
      details: 'CitizenM London Tower Bridge | Check-In: Oct 12 | Check-Out: Oct 16',
      deepLinkId: 'msg-hotel',
      itemDetails: ['1x Double King Room', 'High-speed Wi-Fi & Workdesk Included', 'Cancellation window active until Oct 1st']
    }
  },
  {
    id: 'act-notion',
    timestamp: '09:15 AM',
    title: 'Updated Notion Client Roadmap',
    description: 'Imported new feedback bullet points into Notion from Gmail thread with venture clients.',
    category: 'spreadsheet',
    status: 'success',
    screenshotUrl: 'notion_update_lead',
    actionMeta: {
      accountType: 'notion',
      details: 'Page: "Enterprise Client Roadmap" | Added 4 rows'
    }
  },
  {
    id: 'act-whatsapp',
    timestamp: '08:45 AM',
    title: 'WhatsApp shipment dispute',
    description: 'Found cargo delivery lag alerts. Needs WhatsApp scanner setup to notify logistics agent.',
    category: 'social',
    status: 'needs_auth',
    screenshotUrl: 'whatsapp_qr_request',
    actionMeta: {
      accountType: 'whatsapp',
      details: 'Target: DHL Logistics Group chat | Status: Unauthenticated',
      deepLinkId: 'msg-whatsapp-auth'
    }
  }
];

export const DEMO_CHAT: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    text: "Hey verrazano, let's launch the SaaS alpha page updates and book my London conference trip hotels today. Also, I am starving. Order me some sushi from Sushi Palace.",
    timestamp: '11:20 AM'
  },
  {
    id: 'msg-2',
    sender: 'verrazano',
    text: 'On it. I have accessed your Mac Pro local host session to start carrying out these actions. Here is my action plan:',
    timestamp: '11:22 AM',
    summaries: [
      'Git clone & pull nextjs-saas repo, apply latest glassmorphism fixes to layout.tsx.',
      'Log into Booking.com to search for hotel suites near Tower Bridge, London.',
      'Access UberEats via Mac session to schedule Sushi Palace items.'
    ]
  },
  {
    id: 'msg-code-push',
    sender: 'verrazano',
    text: "I've successfully written and tested the code updates for your landing page! The local build passes. I committed the change and pushed it directly to the main branch on GitHub.",
    timestamp: '11:31 AM',
    deepLinkId: 'act-code',
    summaries: [
      'File updated: src/components/Navbar.tsx',
      'Compiled successfully with zero linter warnings.',
      'Pushed commit f92a5b1 to main repo.'
    ]
  },
  {
    id: 'msg-hotel',
    sender: 'verrazano',
    text: 'Found an excellent fit for your London trip: CitizenM Tower of London is just 2 mins from your conference hall. I have initiated the reservation process and pre-filled your itinerary, but I need your final approval in the dashboard to confirm the $740 hotel charges.',
    timestamp: '11:43 AM',
    deepLinkId: 'act-booking',
    isDecisionPending: true,
    choices: [
      { label: 'Confirm Hotel Booking ($740.00)', value: 'confirm-hotel', action: 'approve' },
      { label: 'Decline / Search other hotels', value: 'decline-hotel', action: 'decline' }
    ]
  },
  {
    id: 'msg-lunch',
    sender: 'verrazano',
    text: 'Sushi Palace order has been drafted! I have added your standard Spicy Tuna roll preference and Salmon Sashimi platter to the cart, but I need you to authorize the $42.50 payment from your primary card.',
    timestamp: '11:46 AM',
    deepLinkId: 'act-food',
    isDecisionPending: true,
    choices: [
      { label: 'Confirm Sushi Order ($42.50)', value: 'confirm-lunch', action: 'approve' },
      { label: 'Decline Order', value: 'decline-lunch', action: 'decline' }
    ]
  },
  {
    id: 'msg-whatsapp-auth',
    sender: 'verrazano',
    text: 'I attempted to message the DHL logistics group on WhatsApp to follow up on your SaaS alpha hardware shipment delay. However, your WhatsApp account session has expired. Please authenticate by scanning the QR code in the Mac panel.',
    timestamp: '11:50 AM',
    deepLinkId: 'act-whatsapp',
    isDecisionPending: true,
    choices: [
      { label: 'Scan QR / Connect WhatsApp', value: 'connect-whatsapp', action: 'auth' }
    ]
  }
];

export const DEMO_TRAINING_DOCS: TrainingDocument[] = [
  {
    id: 'doc-1',
    name: 'SaaS_Alpha_Outbound_Guidelines.pdf',
    type: 'PDF',
    size: '1.2 MB',
    uploadedAt: 'Yesterday 11:20 AM',
    content: 'Guideline: All SaaS outbound outreach must highlight a 14-day free trial and state that integrating takes under 5 minutes.'
  }
];

export const DEMO_TRAINING_EXAMPLES: TrainingExample[] = [
  {
    id: 'ex-1',
    trigger: 'Draft cold outbound proposal',
    response: '• Highlighting 14-day free trial.\n• Emphasizing < 5 mins setup time.\n• Including customizable link parameters.'
  }
];
