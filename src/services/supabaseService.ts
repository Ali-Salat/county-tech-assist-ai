import { supabase } from "@/integrations/supabase/client";
import { Ticket, TicketPriority, TicketStatus, TicketCategory } from "@/data/mockData";

export interface SupabaseTicket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  department: string;
  specific_office: string;
  assigned_to: string | null;
  submitted_by_id: string;
  submitted_by_name: string;
  submitted_by_email: string;
  submitted_by_department: string;
  created_at: string;
  updated_at: string;
}

export interface SupabaseUser {
  id: string;
  email: string;
  name: string;
  role: 'superuser' | 'admin' | 'ict_officer' | 'user';
  department: string;
  title?: string;
  created_at: string;
  updated_at: string;
}

// Updated User interface to match the database schema
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'superuser' | 'admin' | 'ict_officer' | 'user';
  department: string;
  title?: string;
}

// Get current user's role with enhanced error handling
export const getCurrentUserRole = async (): Promise<string | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching user role:', error);
      return null;
    }

    return data?.role || null;
  } catch (error) {
    console.error('Error in getCurrentUserRole:', error);
    return null;
  }
};

// Enhanced ticket fetching with improved filtering
export const getTicketsFromSupabase = async (): Promise<Ticket[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const userRole = await getCurrentUserRole();
    
    let query = supabase.from('tickets').select('*');
    
    // Enhanced role-based filtering
    if (userRole === 'user') {
      query = query.eq('submitted_by_id', user.id);
    } else if (userRole === 'ict_officer') {
      // ICT officers can see all tickets but with priority sorting
      query = query.order('priority', { ascending: false });
    }
    
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching tickets:', error);
      throw error;
    }

    return data.map(ticket => ({
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      category: ticket.category as TicketCategory,
      priority: ticket.priority as TicketPriority,
      status: ticket.status as TicketStatus,
      createdAt: ticket.created_at,
      updatedAt: ticket.updated_at,
      assignedTo: ticket.assigned_to,
      department: ticket.department,
      specificOffice: ticket.specific_office,
      submittedBy: {
        id: ticket.submitted_by_id,
        name: ticket.submitted_by_name,
        email: ticket.submitted_by_email,
        department: ticket.submitted_by_department
      }
    }));
  } catch (error) {
    console.error('Error in getTicketsFromSupabase:', error);
    throw error;
  }
};

// Enhanced user fetching with role-based access
export const getUsersFromSupabase = async (): Promise<User[]> => {
  try {
    const userRole = await getCurrentUserRole();
    
    // Only allow admins and superusers to fetch user data
    if (!userRole || !['admin', 'superuser'].includes(userRole)) {
      throw new Error('Unauthorized access to user data');
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      throw error;
    }

    return data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as 'superuser' | 'admin' | 'ict_officer' | 'user',
      department: user.department,
      title: user.title
    }));
  } catch (error) {
    console.error('Error in getUsersFromSupabase:', error);
    throw error;
  }
};

// Enhanced ticket creation with validation
export const createTicketInSupabase = async (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ticket> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Enhanced validation
    if (!ticketData.title?.trim()) throw new Error('Ticket title is required');
    if (!ticketData.description?.trim()) throw new Error('Ticket description is required');
    if (!ticketData.category) throw new Error('Ticket category is required');
    if (!ticketData.priority) throw new Error('Ticket priority is required');

    const { data, error } = await supabase
      .from('tickets')
      .insert({
        title: ticketData.title.trim(),
        description: ticketData.description.trim(),
        category: ticketData.category,
        priority: ticketData.priority,
        status: ticketData.status || 'open',
        department: ticketData.department,
        specific_office: ticketData.specificOffice || '',
        assigned_to: ticketData.assignedTo || null,
        submitted_by_id: user.id,
        submitted_by_name: ticketData.submittedBy.name,
        submitted_by_email: ticketData.submittedBy.email,
        submitted_by_department: ticketData.submittedBy.department
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      category: data.category as TicketCategory,
      priority: data.priority as TicketPriority,
      status: data.status as TicketStatus,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      assignedTo: data.assigned_to,
      department: data.department,
      specificOffice: data.specific_office,
      submittedBy: {
        id: data.submitted_by_id,
        name: data.submitted_by_name,
        email: data.submitted_by_email,
        department: data.submitted_by_department
      }
    };
  } catch (error) {
    console.error('Error in createTicketInSupabase:', error);
    throw error;
  }
};

// Enhanced ticket updating with role-based permissions
export const updateTicketInSupabase = async (id: string, updates: Partial<SupabaseTicket>): Promise<Ticket> => {
  try {
    const userRole = await getCurrentUserRole();
    
    // Enhanced permission checking
    if (!userRole || !['ict_officer', 'admin', 'superuser'].includes(userRole)) {
      throw new Error('Insufficient permissions to update tickets');
    }

    const { data, error } = await supabase
      .from('tickets')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating ticket:', error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      category: data.category as TicketCategory,
      priority: data.priority as TicketPriority,
      status: data.status as TicketStatus,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      assignedTo: data.assigned_to,
      department: data.department,
      specificOffice: data.specific_office,
      submittedBy: {
        id: data.submitted_by_id,
        name: data.submitted_by_name,
        email: data.submitted_by_email,
        department: data.submitted_by_department
      }
    };
  } catch (error) {
    console.error('Error in updateTicketInSupabase:', error);
    throw error;
  }
};

// New function: Get user statistics
export const getUserStatistics = async () => {
  try {
    const userRole = await getCurrentUserRole();
    if (!userRole || !['ict_officer', 'admin', 'superuser'].includes(userRole)) {
      throw new Error('Insufficient permissions to view statistics');
    }

    const { data, error } = await supabase
      .from('users')
      .select('role')
      .then(({ data, error }) => {
        if (error) throw error;
        
        const stats = data.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        return { data: stats, error: null };
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting user statistics:', error);
    throw error;
  }
};

// New function: Get ticket statistics
export const getTicketStatistics = async () => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('status, priority, created_at');

    if (error) throw error;

    const stats = {
      total: data.length,
      byStatus: data.reduce((acc, ticket) => {
        acc[ticket.status] = (acc[ticket.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byPriority: data.reduce((acc, ticket) => {
        acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      thisMonth: data.filter(ticket => {
        const ticketDate = new Date(ticket.created_at);
        const now = new Date();
        return ticketDate.getMonth() === now.getMonth() && 
               ticketDate.getFullYear() === now.getFullYear();
      }).length
    };

    return stats;
  } catch (error) {
    console.error('Error getting ticket statistics:', error);
    throw error;
  }
};
