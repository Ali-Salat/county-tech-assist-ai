
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { getTickets } from "@/utils/ticketUtils";
import { BarChart3, Clock, Users, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

export function TicketAnalytics() {
  const { data: tickets = [] } = useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
  });

  // Calculate analytics
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
  const highPriorityTickets = tickets.filter(t => t.priority === 'high').length;
  
  const resolutionRate = totalTickets > 0 ? Math.round((resolvedTickets / totalTickets) * 100) : 0;
  const avgResponseTime = "2.5 hours"; // Mock data
  const customerSatisfaction = 94;

  // Category breakdown
  const categoryStats = tickets.reduce((acc, ticket) => {
    acc[ticket.category] = (acc[ticket.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Total Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTickets}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Open Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets + inProgressTickets}</div>
            <p className="text-xs text-muted-foreground">Awaiting resolution</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Resolution Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolutionRate}%</div>
            <Progress value={resolutionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              High Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highPriorityTickets}</div>
            <p className="text-xs text-muted-foreground">Urgent attention needed</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Tickets by Category</CardTitle>
            <CardDescription>Distribution of issues by type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(categoryStats).map(([category, count]) => {
              const percentage = totalTickets > 0 ? Math.round((count / totalTickets) * 100) : 0;
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium capitalize">{category.replace('-', ' ')}</span>
                    <span className="text-sm text-muted-foreground">{count} ({percentage}%)</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key service level indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Response Time</span>
                <Badge variant="secondary">{avgResponseTime}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Customer Satisfaction</span>
                <Badge variant="default">{customerSatisfaction}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">First Call Resolution</span>
                <Badge variant="default">78%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">SLA Compliance</span>
                <Badge variant="default">92%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
