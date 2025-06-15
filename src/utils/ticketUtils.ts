
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

// Advanced filtering function
export const filterTickets = (tickets: Ticket[], filters: any): Ticket[] => {
  return tickets.filter(ticket => {
    // Text search
    if (filters.query) {
      const searchText = filters.query.toLowerCase();
      if (!ticket.title.toLowerCase().includes(searchText) &&
          !ticket.description.toLowerCase().includes(searchText) &&
          !ticket.id.toLowerCase().includes(searchText)) {
        return false;
      }
    }

    // Status filter
    if (filters.status && ticket.status !== filters.status) {
      return false;
    }

    // Priority filter
    if (filters.priority && ticket.priority !== filters.priority) {
      return false;
    }

    // Category filter
    if (filters.category && ticket.category !== filters.category) {
      return false;
    }

    // Department filter
    if (filters.department && ticket.department !== filters.department) {
      return false;
    }

    // Date range filter
    if (filters.dateFrom) {
      const ticketDate = new Date(ticket.createdAt);
      const fromDate = new Date(filters.dateFrom);
      if (ticketDate < fromDate) {
        return false;
      }
    }

    if (filters.dateTo) {
      const ticketDate = new Date(ticket.createdAt);
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999); // End of day
      if (ticketDate > toDate) {
        return false;
      }
    }

    return true;
  });
};

// Calculate SLA metrics
export const calculateSLAMetrics = (tickets: Ticket[]) => {
  const slaThresholds = {
    response: { high: 1, medium: 4, low: 8 }, // hours
    resolution: { high: 4, medium: 24, low: 48 } // hours
  };

  return tickets.map(ticket => {
    const createdTime = new Date(ticket.createdAt).getTime();
    const now = Date.now();
    const hoursElapsed = (now - createdTime) / (1000 * 60 * 60);

    const responseThreshold = slaThresholds.response[ticket.priority];
    const resolutionThreshold = slaThresholds.resolution[ticket.priority];

    const responseStatus = hoursElapsed <= responseThreshold ? 'on-track' :
                          hoursElapsed <= responseThreshold * 1.5 ? 'at-risk' : 'breached';

    const resolutionStatus = ticket.status === 'resolved' ? 'met' :
                           hoursElapsed <= resolutionThreshold ? 'on-track' :
                           hoursElapsed <= resolutionThreshold * 1.5 ? 'at-risk' : 'breached';

    return {
      ...ticket,
      sla: {
        responseStatus,
        resolutionStatus,
        hoursElapsed: Math.round(hoursElapsed * 10) / 10,
        responseTimeRemaining: Math.max(0, responseThreshold - hoursElapsed),
        resolutionTimeRemaining: Math.max(0, resolutionThreshold - hoursElapsed)
      }
    };
  });
};

// Generate ticket analytics
export const generateTicketAnalytics = (tickets: Ticket[]) => {
  const total = tickets.length;
  const resolved = tickets.filter(t => t.status === 'resolved').length;
  const open = tickets.filter(t => t.status === 'open').length;
  const inProgress = tickets.filter(t => t.status === 'in-progress').length;

  const categoryStats = tickets.reduce((acc, ticket) => {
    acc[ticket.category] = (acc[ticket.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const departmentStats = tickets.reduce((acc, ticket) => {
    acc[ticket.department] = (acc[ticket.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priorityStats = tickets.reduce((acc, ticket) => {
    acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    overview: {
      total,
      resolved,
      open,
      inProgress,
      resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0
    },
    categories: categoryStats,
    departments: departmentStats,
    priorities: priorityStats,
    trends: {
      // Calculate weekly/monthly trends
      thisWeek: tickets.filter(t => {
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return new Date(t.createdAt) >= weekAgo;
      }).length,
      lastWeek: tickets.filter(t => {
        const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const ticketDate = new Date(t.createdAt);
        return ticketDate >= twoWeeksAgo && ticketDate < weekAgo;
      }).length
    }
  };
};
