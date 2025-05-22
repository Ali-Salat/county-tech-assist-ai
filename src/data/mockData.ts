
export type TicketPriority = 'low' | 'medium' | 'high';
export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type TicketCategory = 
  | 'hardware' 
  | 'software' 
  | 'network' 
  | 'account' 
  | 'email' 
  | 'printer' 
  | 'other';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  department: string;
  submittedBy: {
    id: string;
    name: string;
    email: string;
    department: string;
  };
}

export const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Computer won\'t turn on',
    description: 'My desktop computer won\'t power on at all. I\'ve checked that it\'s plugged in correctly.',
    category: 'hardware',
    priority: 'high',
    status: 'in-progress',
    createdAt: '2025-05-20T08:30:00Z',
    updatedAt: '2025-05-20T09:15:00Z',
    assignedTo: 'Tech Support Team',
    department: 'IT',
    submittedBy: {
      id: 'user1',
      name: 'John Smith',
      email: 'john.smith@county.gov',
      department: 'Finance'
    }
  },
  {
    id: '2',
    title: 'Email not syncing on mobile',
    description: 'My work email has stopped syncing on my county-issued mobile phone since yesterday.',
    category: 'email',
    priority: 'medium',
    status: 'open',
    createdAt: '2025-05-21T10:45:00Z',
    updatedAt: '2025-05-21T10:45:00Z',
    department: 'IT',
    submittedBy: {
      id: 'user2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@county.gov',
      department: 'Health Services'
    }
  },
  {
    id: '3',
    title: 'Need access to financial database',
    description: 'I need access to the county financial database to complete my quarterly report.',
    category: 'account',
    priority: 'medium',
    status: 'resolved',
    createdAt: '2025-05-19T14:20:00Z',
    updatedAt: '2025-05-20T11:30:00Z',
    assignedTo: 'System Admin',
    department: 'IT',
    submittedBy: {
      id: 'user3',
      name: 'Michael Williams',
      email: 'michael.williams@county.gov',
      department: 'Finance'
    }
  },
  {
    id: '4',
    title: 'Printer not connecting',
    description: 'The shared printer on the 3rd floor isn\'t showing up on the network.',
    category: 'printer',
    priority: 'low',
    status: 'closed',
    createdAt: '2025-05-18T09:10:00Z',
    updatedAt: '2025-05-19T13:45:00Z',
    assignedTo: 'Hardware Team',
    department: 'IT',
    submittedBy: {
      id: 'user4',
      name: 'Emily Davis',
      email: 'emily.davis@county.gov',
      department: 'Public Works'
    }
  },
  {
    id: '5',
    title: 'Software installation request',
    description: 'Need Adobe Creative Suite installed on my workstation for the new county branding project.',
    category: 'software',
    priority: 'low',
    status: 'open',
    createdAt: '2025-05-21T11:50:00Z',
    updatedAt: '2025-05-21T11:50:00Z',
    department: 'IT',
    submittedBy: {
      id: 'user5',
      name: 'Robert Brown',
      email: 'robert.brown@county.gov',
      department: 'Communications'
    }
  }
];

export const commonIssues = [
  {
    id: 1,
    title: 'Email not syncing',
    category: 'email',
    solutions: [
      'Check your internet connection',
      'Restart your email application',
      'Verify your email credentials are correct',
      'Clear the cache in your email application'
    ]
  },
  {
    id: 2,
    title: 'Printer not connecting',
    category: 'printer',
    solutions: [
      'Ensure the printer is powered on and connected to the network',
      'Restart the printer',
      'Check if the correct printer driver is installed',
      'Verify your computer is connected to the same network as the printer'
    ]
  },
  {
    id: 3,
    title: 'Cannot access a website',
    category: 'network',
    solutions: [
      'Check your internet connection',
      'Clear your browser cache and cookies',
      'Try accessing the site with a different browser',
      'Verify the website URL is correct'
    ]
  },
  {
    id: 4,
    title: 'Forgotten password',
    category: 'account',
    solutions: [
      'Use the "Forgot Password" link on the login page',
      'Contact the IT department for a password reset',
      'Check if your account is locked due to multiple failed attempts'
    ]
  },
  {
    id: 5,
    title: 'Computer running slowly',
    category: 'hardware',
    solutions: [
      'Restart your computer',
      'Close unnecessary applications',
      'Check for and install system updates',
      'Run a virus scan',
      'Clear temporary files'
    ]
  }
];

export const departments = [
  'Finance',
  'Health Services',
  'Public Works',
  'Human Resources',
  'Information Technology',
  'Parks & Recreation',
  'County Secretary',
  'Revenue',
  'Lands & Physical Planning',
  'Roads & Transport',
  'Environmental Services',
  'Trade',
  'Communications'
];
