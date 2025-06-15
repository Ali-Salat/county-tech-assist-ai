
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { formatDate } from "@/utils/ticketUtils";

interface SLAData {
  ticketId: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  responseTime: number; // in hours
  resolutionTime: number; // in hours
  responseDeadline: string;
  resolutionDeadline: string;
  status: 'on-track' | 'at-risk' | 'breached';
  timeRemaining: number; // in hours
}

export function SLATracker() {
  // Mock SLA data - in real app, this would come from API
  const slaData: SLAData[] = [
    {
      ticketId: 'TCK-001',
      title: 'Network connectivity issue in Finance Department',
      priority: 'high',
      responseTime: 1,
      resolutionTime: 4,
      responseDeadline: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
      resolutionDeadline: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(),
      status: 'at-risk',
      timeRemaining: 2
    },
    {
      ticketId: 'TCK-002',
      title: 'Printer not working in HR office',
      priority: 'medium',
      responseTime: 4,
      resolutionTime: 24,
      responseDeadline: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
      resolutionDeadline: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString(),
      status: 'on-track',
      timeRemaining: 8
    },
    {
      ticketId: 'TCK-003',
      title: 'Email access problem',
      priority: 'low',
      responseTime: 8,
      resolutionTime: 48,
      responseDeadline: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      resolutionDeadline: new Date(Date.now() + 1000 * 60 * 60 * 40).toISOString(),
      status: 'breached',
      timeRemaining: -2
    }
  ];

  const getSLAIcon = (status: SLAData['status']) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'at-risk': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'breached': return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getSLABadgeVariant = (status: SLAData['status']) => {
    switch (status) {
      case 'on-track': return 'default';
      case 'at-risk': return 'secondary';
      case 'breached': return 'destructive';
    }
  };

  const calculateProgress = (timeRemaining: number, totalTime: number) => {
    if (timeRemaining <= 0) return 100;
    return Math.max(0, Math.min(100, ((totalTime - timeRemaining) / totalTime) * 100));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          SLA Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {slaData.map((ticket) => (
            <div key={ticket.ticketId} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getSLAIcon(ticket.status)}
                  <span className="font-medium">{ticket.ticketId}</span>
                  <Badge variant={ticket.priority === 'high' ? 'destructive' : ticket.priority === 'medium' ? 'secondary' : 'outline'}>
                    {ticket.priority}
                  </Badge>
                </div>
                <Badge variant={getSLABadgeVariant(ticket.status)}>
                  {ticket.status.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">{ticket.title}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Response SLA</span>
                    <span className={ticket.timeRemaining < 0 ? 'text-red-500 font-semibold' : 'text-muted-foreground'}>
                      {ticket.timeRemaining > 0 ? `${ticket.timeRemaining}h remaining` : `${Math.abs(ticket.timeRemaining)}h overdue`}
                    </span>
                  </div>
                  <Progress 
                    value={calculateProgress(ticket.timeRemaining, ticket.responseTime)} 
                    className={`h-2 ${ticket.status === 'breached' ? 'bg-red-100' : ''}`}
                  />
                  <p className="text-xs text-muted-foreground">
                    Due: {formatDate(ticket.responseDeadline)}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Resolution SLA</span>
                    <span className="text-muted-foreground">
                      {Math.round(ticket.timeRemaining + (ticket.resolutionTime - ticket.responseTime))}h remaining
                    </span>
                  </div>
                  <Progress 
                    value={calculateProgress(ticket.timeRemaining + (ticket.resolutionTime - ticket.responseTime), ticket.resolutionTime)} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Due: {formatDate(ticket.resolutionDeadline)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
