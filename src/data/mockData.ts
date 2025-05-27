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

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'superuser' | 'ict_officer' | 'user';
  department: string;
  title?: string;
}

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

export const users: User[] = [
  {
    id: 'user-super-1',
    name: 'Mohamed Shahid',
    email: 'mohamed.shahid@wajir.go.ke',
    role: 'superuser',
    department: 'ICT, Trade, Investment and Industry',
    title: 'Director ICT'
  },
  {
    id: 'user-ict-1',
    name: 'Ali Salat',
    email: 'ali.salat@wajir.go.ke',
    role: 'ict_officer',
    department: 'ICT, Trade, Investment and Industry',
    title: 'Senior ICT Officer'
  }
];

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
    assignedTo: 'Ali Salat',
    department: 'ICT, Trade, Investment and Industry',
    submittedBy: {
      id: 'user1',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@wajir.go.ke',
      department: 'Finance and Economic Planning'
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
    department: 'ICT, Trade, Investment and Industry',
    submittedBy: {
      id: 'user2',
      name: 'Fatima Abdullah',
      email: 'fatima.abdullah@wajir.go.ke',
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
    assignedTo: 'Mohamed Shahid',
    department: 'ICT, Trade, Investment and Industry',
    submittedBy: {
      id: 'user3',
      name: 'Omar Ibrahim',
      email: 'omar.ibrahim@wajir.go.ke',
      department: 'Finance and Economic Planning'
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
    assignedTo: 'Ali Salat',
    department: 'ICT, Trade, Investment and Industry',
    submittedBy: {
      id: 'user4',
      name: 'Amina Mohammed',
      email: 'amina.mohammed@wajir.go.ke',
      department: 'Lands, Public Works and Urban Development'
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
    department: 'ICT, Trade, Investment and Industry',
    submittedBy: {
      id: 'user5',
      name: 'Yusuf Ahmed',
      email: 'yusuf.ahmed@wajir.go.ke',
      department: 'Office of the Governor, Public Service and County Administration'
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

// Updated Wajir County departments
export const departments = [
  "Health Services",
  "Water Services", 
  "Office of the Governor, Public Service and County Administration",
  "Agriculture, Livestock and Veterinary Services",
  "ICT, Trade, Investment and Industry",
  "Finance and Economic Planning",
  "Education, Social Welfare and Family Affairs",
  "Roads and Transport",
  "Lands, Public Works and Urban Development",
  "Energy, Environment and Climate Change",
  "Wajir Municipality",
  "Wajiwasco (Wajir Water and Sewerage Company)"
];
