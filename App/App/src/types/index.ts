export interface Issue {
  id: string;
  title: string;
  category: string;
  address: string;
  votes: number;
  status: 'Reported' | 'In Progress' | 'Resolved';
  image: string;
  expectedResolution?: string;
  resolvedDate?: string;
  progress?: number;
  departmentAssigned?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface Report extends Issue {
  reportedDate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'admin';
  text: string;
  timestamp: Date;
  type: 'text' | 'emergency';
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  isEmergency: boolean;
  assignedAdminId?: string;
  status: 'active' | 'resolved';
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'admin';
  badges: string[];
  createdAt: Date;
}

export interface EmergencyKeyword {
  keyword: string;
  priority: 'high' | 'medium';
}
