
import { 
  Ticket, 
  TicketPriority, 
  TicketStatus, 
  TicketCategory, 
  mockTickets,
  commonIssues
} from '../data/mockData';

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Format date to a readable string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
};

// Get all tickets (in a real app, this would be an API call)
export const getTickets = (): Ticket[] => {
  return mockTickets;
};

// Get a single ticket by ID
export const getTicketById = (id: string): Ticket | undefined => {
  return mockTickets.find(ticket => ticket.id === id);
};

// Create a new ticket
export const createTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Ticket => {
  const now = new Date().toISOString();
  const newTicket: Ticket = {
    id: generateId(),
    ...ticketData,
    createdAt: now,
    updatedAt: now
  };
  
  // In a real app, this would save to a database
  mockTickets.push(newTicket);
  return newTicket;
};

// Update a ticket
export const updateTicket = (id: string, updates: Partial<Ticket>): Ticket | undefined => {
  const index = mockTickets.findIndex(ticket => ticket.id === id);
  if (index === -1) return undefined;
  
  mockTickets[index] = {
    ...mockTickets[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  return mockTickets[index];
};

// Get AI assistance for a problem description
export const getAIAssistance = (description: string, category: TicketCategory): string[] => {
  // In a real app, this would call an AI service
  // For now, we'll match keywords and return predefined solutions
  const issue = commonIssues.find(issue => 
    issue.category === category || 
    description.toLowerCase().includes(issue.title.toLowerCase())
  );
  
  if (issue) {
    return issue.solutions;
  }
  
  return [
    "We couldn't find an automated solution for your specific issue.",
    "Your ticket has been created and an IT specialist will assist you soon.",
    "For urgent issues, please contact the IT helpdesk directly at extension 1234."
  ];
};

// Estimate priority based on description and category
export const estimatePriority = (description: string, category: TicketCategory): TicketPriority => {
  const urgentKeywords = ['urgent', 'emergency', 'critical', 'broken', 'not working', 'cannot', 'down'];
  const lowPriorityCategories: TicketCategory[] = ['software', 'account'];
  
  // Check for urgent keywords
  if (urgentKeywords.some(keyword => description.toLowerCase().includes(keyword))) {
    return 'high';
  }
  
  // Check category
  if (lowPriorityCategories.includes(category)) {
    return 'low';
  }
  
  // Default priority
  return 'medium';
};
