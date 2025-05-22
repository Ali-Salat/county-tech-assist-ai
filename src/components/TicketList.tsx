
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PriorityBadge, TicketStatusBadge } from "./TicketStatus";
import { getTickets, formatDate } from "@/utils/ticketUtils";
import { Ticket, TicketStatus } from "@/data/mockData";
import { Search } from "lucide-react";

export function TicketList() {
  const allTickets = getTickets();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all");
  
  const filteredTickets = allTickets.filter(ticket => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Your Support Tickets</CardTitle>
        <div className="flex flex-col sm:flex-row justify-between gap-2 mt-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tickets..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1 text-sm rounded-md ${
                statusFilter === "all" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("open")}
              className={`px-3 py-1 text-sm rounded-md ${
                statusFilter === "open" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              Open
            </button>
            <button
              onClick={() => setStatusFilter("in-progress")}
              className={`px-3 py-1 text-sm rounded-md ${
                statusFilter === "in-progress" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setStatusFilter("resolved")}
              className={`px-3 py-1 text-sm rounded-md ${
                statusFilter === "resolved" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              Resolved
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredTickets.length > 0 ? (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No tickets found matching your criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface TicketCardProps {
  ticket: Ticket;
}

function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-lg">{ticket.title}</h3>
        <div className="flex gap-2">
          <PriorityBadge priority={ticket.priority} />
          <TicketStatusBadge status={ticket.status} />
        </div>
      </div>
      <div className="text-sm text-muted-foreground mb-2 truncate">
        {ticket.description}
      </div>
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <div>
          <span>Ticket #{ticket.id}</span>
          <span className="mx-2">•</span>
          <span>Category: {ticket.category}</span>
        </div>
        <div>
          <span>Created: {formatDate(ticket.createdAt)}</span>
        </div>
      </div>
      {ticket.assignedTo && (
        <div className="mt-2 text-xs text-muted-foreground">
          Assigned to: {ticket.assignedTo}
        </div>
      )}
    </div>
  );
}
