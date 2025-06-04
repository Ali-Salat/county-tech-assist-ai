
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getTickets } from "@/utils/ticketUtils";
import { useAuth } from "@/components/AuthProvider";
import { 
  Ticket, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  TrendingUp,
  Plus,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { userProfile } = useAuth();
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
  });

  const userTickets = userProfile?.role === 'user' 
    ? tickets.filter(ticket => ticket.submittedBy.id === userProfile?.id)
    : tickets;

  const openTickets = userTickets.filter(t => t.status === 'open').length;
  const inProgressTickets = userTickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = userTickets.filter(t => t.status === 'resolved').length;
  const closedTickets = userTickets.filter(t => t.status === 'closed').length;

  const recentTickets = userTickets
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getRoleSpecificStats = () => {
    if (userProfile?.role === 'user') {
      return [
        {
          title: "My Open Tickets",
          value: openTickets,
          description: "Tickets waiting for response",
          icon: Ticket,
          color: "text-orange-600"
        },
        {
          title: "In Progress",
          value: inProgressTickets,
          description: "Being worked on",
          icon: Clock,
          color: "text-blue-600"
        },
        {
          title: "Resolved",
          value: resolvedTickets,
          description: "Recently resolved",
          icon: CheckCircle,
          color: "text-green-600"
        },
        {
          title: "Total Tickets",
          value: userTickets.length,
          description: "All time submissions",
          icon: Activity,
          color: "text-purple-600"
        }
      ];
    } else {
      return [
        {
          title: "Open Tickets",
          value: openTickets,
          description: "Need attention",
          icon: AlertTriangle,
          color: "text-red-600"
        },
        {
          title: "In Progress",
          value: inProgressTickets,
          description: "Being resolved",
          icon: Clock,
          color: "text-blue-600"
        },
        {
          title: "Resolved Today",
          value: resolvedTickets,
          description: "Completed tickets",
          icon: CheckCircle,
          color: "text-green-600"
        },
        {
          title: "Total Active",
          value: openTickets + inProgressTickets,
          description: "Requiring action",
          icon: TrendingUp,
          color: "text-purple-600"
        }
      ];
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loading...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">...</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {getGreeting()}, {userProfile?.name}!
            </h1>
            <p className="text-blue-100 mt-1">
              Welcome to the Wajir County ICT Help Desk System
            </p>
            <Badge variant="secondary" className="mt-2 bg-blue-500/20 text-blue-100 border-blue-400">
              {userProfile?.role?.replace('_', ' ').toUpperCase()} - {userProfile?.department}
            </Badge>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/submit-ticket">
              <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {getRoleSpecificStats().map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Tickets
            </CardTitle>
            <CardDescription>
              {userProfile?.role === 'user' ? 'Your latest submissions' : 'Latest system activity'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentTickets.length > 0 ? (
              <div className="space-y-4">
                {recentTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{ticket.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {ticket.category} • {new Date(ticket.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge 
                      variant={
                        ticket.status === 'open' ? 'destructive' :
                        ticket.status === 'in-progress' ? 'default' :
                        ticket.status === 'resolved' ? 'secondary' : 'outline'
                      }
                      className="text-xs"
                    >
                      {ticket.status.replace('-', ' ')}
                    </Badge>
                  </div>
                ))}
                <div className="pt-2">
                  <Link to={userProfile?.role === 'user' ? '/my-tickets' : '/tickets'}>
                    <Button variant="outline" className="w-full">
                      View All Tickets
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No tickets yet</p>
                <Link to="/submit-ticket">
                  <Button className="mt-2">Submit Your First Ticket</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link to="/submit-ticket" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Submit New Ticket
                </Button>
              </Link>
              <Link to="/knowledge-base" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Browse Knowledge Base
                </Button>
              </Link>
              {userProfile?.role !== 'user' && (
                <>
                  <Link to="/tickets" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Activity className="h-4 w-4 mr-2" />
                      Manage All Tickets
                    </Button>
                  </Link>
                  <Link to="/reports" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Reports
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Help Desk Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Email System Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Database Connected</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
