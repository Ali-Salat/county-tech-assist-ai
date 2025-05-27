
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TicketForm } from "./TicketForm";
import { TicketList } from "./TicketList";
import { useQuery } from "@tanstack/react-query";
import { getTickets } from "@/utils/ticketUtils";

export function TicketDashboard() {
  return (
    <Tabs defaultValue="new" className="w-full">
      <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-4">
        <TabsTrigger value="new">New Ticket</TabsTrigger>
        <TabsTrigger value="existing">My Tickets</TabsTrigger>
      </TabsList>
      <TabsContent value="new">
        <TicketForm />
      </TabsContent>
      <TabsContent value="existing">
        <TicketList />
      </TabsContent>
    </Tabs>
  );
}

export function DashboardStats() {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <StatsCard 
          title="Open Tickets" 
          value="..." 
          description="Loading..."
          trend="neutral"
          trendValue="..."
        />
        <StatsCard 
          title="Avg. Response Time" 
          value="..." 
          description="Loading..."
          trend="neutral"
          trendValue="..."
        />
        <StatsCard 
          title="Satisfaction Rate" 
          value="..." 
          description="Loading..."
          trend="neutral"
          trendValue="..."
        />
      </div>
    );
  }

  const openTickets = tickets.filter(ticket => ticket.status === 'open').length;
  const inProgressTickets = tickets.filter(ticket => ticket.status === 'in-progress').length;
  const totalActiveTickets = openTickets + inProgressTickets;

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      <StatsCard 
        title="Open Tickets" 
        value={totalActiveTickets.toString()} 
        description="Tickets awaiting response"
        trend="down"
        trendValue="5%"
      />
      <StatsCard 
        title="Avg. Response Time" 
        value="3.2 hrs" 
        description="Response time last 7 days"
        trend="up"
        trendValue="10%"
      />
      <StatsCard 
        title="Satisfaction Rate" 
        value="94%" 
        description="Based on ticket feedback"
        trend="up"
        trendValue="2%"
      />
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
}

function StatsCard({ title, value, description, trend, trendValue }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className={`text-xs mt-2 flex items-center ${
          trend === "up" ? "text-green-600" : 
          trend === "down" ? "text-red-600" : 
          "text-gray-600"
        }`}>
          {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue} from last period
        </div>
      </CardContent>
    </Card>
  );
}
