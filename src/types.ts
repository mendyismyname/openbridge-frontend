export interface SubTask {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo: 'verrazano' | 'user';
  completedAt?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on_hold';
  progress: number;
  subtasks: SubTask[];
}

export interface FuturePlan {
  id: string;
  title: string;
  description: string;
  quarter: string;
  priority: 'high' | 'medium' | 'low';
  estimatedHours: number;
}

export interface ConnectedAccount {
  id: string;
  name: string;
  type: 'monday' | 'notion' | 'airtable' | 'whatsapp' | 'gmail' | 'macbook' | 'ubereats' | 'booking' | 'github';
  connected: boolean;
  username?: string;
  status?: string;
  category: 'workspace' | 'personal' | 'device';
}

export interface ComputerAction {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  category: 'code' | 'email' | 'spreadsheet' | 'booking' | 'food' | 'social' | 'system';
  status: 'executing' | 'success' | 'needs_auth' | 'pending_approval' | 'failed';
  screenshotUrl?: string; // or dynamic mock code/email window
  actionMeta?: {
    accountType?: string;
    details?: string;
    deepLinkId?: string;
    amount?: string;
    itemDetails?: string[];
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'verrazano' | 'system';
  text: string;
  timestamp: string;
  summaries?: string[];
  screenshotUrl?: string;
  deepLinkId?: string; // links to a specific computer action or state
  choices?: { label: string; value: string; action: string }[];
  isDecisionPending?: boolean;
  isTuned?: boolean; // dynamic indicator when custom training is applied
}

export interface TrainingDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  content?: string;
}

export interface TrainingExample {
  id: string;
  trigger: string;
  response: string;
}

export type CommunicationTone = 'concise' | 'direct' | 'polite' | 'casual' | 'executive';

