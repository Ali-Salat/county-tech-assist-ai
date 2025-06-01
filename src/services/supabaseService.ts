
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

// Get current user's role
export const getCurrentUserRole = async (): Promise<string | null> => {
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
};

// Get all tickets based on user role
export const getTicketsFromSupabase = async (): Promise<Ticket[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const userRole = await getCurrentUserRole();
  
  let query = supabase.from('tickets').select('*');
  
  // If user is not ICT staff, only show their own tickets
  if (userRole === 'user') {
    query = query.eq('submitted_by_id', user.id);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });

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
    submittedBy: {
      id: ticket.submitted_by_id,
      name: ticket.submitted_by_name,
      email: ticket.submitted_by_email,
      department: ticket.submitted_by_department
    }
  }));
};

// Get all users (only for authorized roles)
export const getUsersFromSupabase = async (): Promise<User[]> => {
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
};

// Create a new ticket
export const createTicketInSupabase = async (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ticket> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('tickets')
    .insert({
      title: ticketData.title,
      description: ticketData.description,
      category: ticketData.category,
      priority: ticketData.priority,
      status: ticketData.status,
      department: ticketData.department,
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
    submittedBy: {
      id: data.submitted_by_id,
      name: data.submitted_by_name,
      email: data.submitted_by_email,
      department: data.submitted_by_department
    }
  };
};

// Update a ticket (only for authorized roles)
export const updateTicketInSupabase = async (id: string, updates: Partial<SupabaseTicket>): Promise<Ticket> => {
  const { data, error } = await supabase
    .from('tickets')
    .update(updates)
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
    submittedBy: {
      id: data.submitted_by_id,
      name: data.submitted_by_name,
      email: data.submitted_by_email,
      department: data.submitted_by_department
    }
  };
};
