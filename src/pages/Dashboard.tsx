
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/components/TicketDashboard";
import { StatsGrid } from "@/components/StatsCards";
import { QuickActions } from "@/components/QuickActions";
import { SystemStatus } from "@/components/SystemStatus";
import { TicketAnalytics } from "@/components/TicketAnalytics";
import { SLATracker } from "@/components/SLATracker";
import { useAuth } from "@/components/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { getTickets } from "@/utils/ticketUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  Ticket, 
  BarChart3, 
  Clock,
  Users,
  CheckCircle,
  AlertTriangle,
  TrendingUp
} from "lucide-react";

export default function Dashboard() {
  const { userProfile } = useAuth();
  const { data: tickets = [] } = useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
  });

  // Calculate stats based on user role
  const myTickets = userProfile ? tickets.filter(t => t.submittedBy.id === userProfile.id) : [];
  const openTickets = tickets.filter(t => t.status === 'open' || t.status === 'in-progress');
  const resolvedToday = tickets.filter(t => {
    const today = new Date().toDateString();
    return t.status === 'resolved' && new Date(t.updatedAt).toDateString() === today;
  }).length;

  const getUserSpecificStats = () => {
    if (userProfile?.role === 'user') {
      return [
        {
          title: "My Open Tickets",
          value: myTickets.filter(t => t.status !== 'resolved').length,
          description: "Active support requests",
          icon: <Ticket className="h-4 w-4" />,
          trend: "neutral" as const,
          trendValue: ""
        },
        {
          title: "Total Submitted",
          value: myTickets.length,
          description: "All time tickets",
          icon: <BarChart3 className="h-4 w-4" />,
          trend: "neutral" as const,
          trendValue: ""
        },
        {
          title: "Average Resolution",
          value: "2.3 days",
          description: "Your tickets average",
          icon: <Clock className="h-4 w-4" />,
          trend: "down" as const,
          trendValue: "0.5 days faster"
        },
        {
          title: "Satisfaction Rate",
          value: "4.8/5",
          description: "Your feedback average",
          icon: <CheckCircle className="h-4 w-4" />,
          trend: "up" as const,
          trendValue: "0.2 points"
        }
      ];
    } else {
      return [
        {
          title: "Total Tickets",
          value: tickets.length,
          description: "All tickets in system",
          icon: <Ticket className="h-4 w-4" />,
          trend: "up" as const,
          trendValue: "+12%"
        },
        {
          title: "Open/In Progress",
          value: openTickets.length,
          description: "Requires attention",
          icon: <AlertTriangle className="h-4 w-4" />,
          trend: "down" as const,
          trendValue: "-5%"
        },
        {
          title: "Resolved Today",
          value: resolvedToday,
          description: "Completed tickets",
          icon: <CheckCircle className="h-4 w-4" />,
          trend: "up" as const,
          trendValue: "+8%"
        },
        {
          title: "Response Time",
          value: "2.1 hrs",
          description: "Average this week",
          icon: <Clock className="h-4 w-4" />,
          trend: "down" as const,
          trendValue: "15 min faster"
        }
      ];
    }
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    const name = userProfile?.name?.split(' ')[0] || 'User';
    
    if (userProfile?.role === 'user') {
      return `${greeting}, ${name}! How can we help you today?`;
    } else {
      return `${greeting}, ${name}! Here's your ICT support overview.`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <CardHeader>
          <CardTitle className="text-xl">
            {getWelcomeMessage()}
          </CardTitle>
          <CardDescription className="text-blue-100">
            {userProfile?.role === 'user' 
              ? "Submit tickets, track progress, and access our knowledge base for quick solutions."
              : "Monitor tickets, manage users, and ensure optimal ICT support delivery."
            }
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <StatsGrid stats={getUserSpecificStats()} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Role-based Dashboard Content */}
      {userProfile?.role === 'user' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>My Recent Tickets</CardTitle>
              <CardDescription>Your latest support requests</CardDescription>
            </CardHeader>
            <CardContent>
              {myTickets.slice(0, 5).length > 0 ? (
                <div className="space-y-3">
                  {myTickets.slice(0, 5).map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{ticket.title}</p>
                        <p className="text-xs text-muted-foreground">#{ticket.id.slice(0, 8)}</p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-block px-2 py-1 rounded text-xs ${
                          ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                          ticket.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {ticket.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No tickets submitted yet. Click "Submit New Ticket" to get started.
                </p>
              )}
            </CardContent>
          </Card>

          <SystemStatus />
        </div>
      ) : (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="sla">SLA Tracking</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardStats />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <TicketAnalytics />
          </TabsContent>

          <TabsContent value="sla" className="space-y-6">
            <SLATracker />
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <SystemStatus />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
