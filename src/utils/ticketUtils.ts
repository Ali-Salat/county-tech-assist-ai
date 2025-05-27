
import { 
  Ticket, 
  TicketPriority, 
  TicketCategory, 
  commonIssues
} from '../data/mockData';
import { 
  getTicketsFromSupabase, 
  createTicketInSupabase, 
  updateTicketInSupabase 
} from '../services/supabaseService';

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

// Get all tickets from Supabase
export const getTickets = async (): Promise<Ticket[]> => {
  try {
    return await getTicketsFromSupabase();
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return [];
  }
};

// Get a single ticket by ID
export const getTicketById = async (id: string): Promise<Ticket | undefined> => {
  const tickets = await getTickets();
  return tickets.find(ticket => ticket.id === id);
};

// Create a new ticket
export const createTicket = async (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ticket> => {
  try {
    return await createTicketInSupabase(ticketData);
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

// Update a ticket
export const updateTicket = async (id: string, updates: Partial<Ticket>): Promise<Ticket | undefined> => {
  try {
    return await updateTicketInSupabase(id, updates);
  } catch (error) {
    console.error('Error updating ticket:', error);
    throw error;
  }
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
    "For urgent issues, please contact the IT helpdesk directly at helpdesk@wajir.go.ke."
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
