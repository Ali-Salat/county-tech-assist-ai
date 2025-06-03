
import { useQuery } from "@tanstack/react-query";
import { getTickets } from "@/utils/ticketUtils";
import { StatsGrid } from "@/components/StatsCards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { 
  Ticket, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Plus,
  Calendar
} from "lucide-react";
import { formatDate } from "@/utils/ticketUtils";
import { EmptyState } from "@/components/EmptyState";

export default function Dashboard() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
  });

  const myTickets = tickets.filter(ticket => 
    userProfile && ticket.submittedBy.id === userProfile.id
  );

  const openTickets = tickets.filter(ticket => ticket.status === 'open').length;
  const inProgressTickets = tickets.filter(ticket => ticket.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'resolved').length;
  const totalTickets = tickets.length;

  const stats = [
    {
      title: "Total Tickets",
      value: totalTickets,
      description: "All system tickets",
      trend: "up" as const,
      trendValue: "12%",
      icon: <Ticket className="h-4 w-4 text-blue-600" />
    },
    {
      title: "Open Tickets",
      value: openTickets,
      description: "Awaiting response",
      trend: "down" as const,
      trendValue: "5%",
      icon: <Clock className="h-4 w-4 text-orange-600" />
    },
    {
      title: "In Progress",
      value: inProgressTickets,
      description: "Being worked on",
      trend: "up" as const,
      trendValue: "8%",
      icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />
    },
    {
      title: "Resolved",
      value: resolvedTickets,
      description: "Successfully closed",
      trend: "up" as const,
      trendValue: "15%",
      icon: <CheckCircle className="h-4 w-4 text-green-600" />
    }
  ];

  const recentTickets = tickets.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {userProfile?.name}!
            </h2>
            <p className="text-blue-100">
              {userProfile?.department} • {userProfile?.title}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 rounded-lg p-4">
              <Calendar className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid stats={stats} loading={isLoading} />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common tasks and frequently used features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              onClick={() => navigate('/submit-ticket')} 
              className="h-16 flex flex-col gap-2"
            >
              <Plus className="h-5 w-5" />
              Submit Ticket
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/my-tickets')} 
              className="h-16 flex flex-col gap-2"
            >
              <Ticket className="h-5 w-5" />
              My Tickets
            </Button>
            {userProfile?.role !== 'user' && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/all-tickets')} 
                  className="h-16 flex flex-col gap-2"
                >
                  <AlertTriangle className="h-5 w-5" />
                  All Tickets
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/analytics')} 
                  className="h-16 flex flex-col gap-2"
                >
                  <TrendingUp className="h-5 w-5" />
                  Analytics
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recent">Recent Tickets</TabsTrigger>
          <TabsTrigger value="my">My Tickets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent System Activity</CardTitle>
              <CardDescription>Latest tickets across the system</CardDescription>
            </CardHeader>
            <CardContent>
              {recentTickets.length > 0 ? (
                <div className="space-y-4">
                  {recentTickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{ticket.title}</h4>
                        <p className="text-sm text-slate-600">{ticket.submittedBy.name}</p>
                        <p className="text-xs text-slate-500">{formatDate(ticket.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={ticket.priority === 'high' ? 'destructive' : 'secondary'}>
                          {ticket.priority}
                        </Badge>
                        <Badge variant="outline">
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No recent activity"
                  description="No tickets have been submitted recently"
                  action={{
                    label: "Submit First Ticket",
                    onClick: () => navigate('/submit-ticket')
                  }}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="my" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Tickets</CardTitle>
              <CardDescription>Tickets you have submitted</CardDescription>
            </CardHeader>
            <CardContent>
              {myTickets.length > 0 ? (
                <div className="space-y-4">
                  {myTickets.slice(0, 5).map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{ticket.title}</h4>
                        <p className="text-sm text-slate-600">{ticket.category}</p>
                        <p className="text-xs text-slate-500">{formatDate(ticket.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={ticket.priority === 'high' ? 'destructive' : 'secondary'}>
                          {ticket.priority}
                        </Badge>
                        <Badge variant="outline">
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No tickets submitted"
                  description="You haven't submitted any tickets yet"
                  action={{
                    label: "Submit Your First Ticket",
                    onClick: () => navigate('/submit-ticket')
                  }}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
