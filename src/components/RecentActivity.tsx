
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, MessageSquare, CheckCircle, AlertCircle, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ActivityItem {
  id: string;
  type: 'ticket_created' | 'ticket_updated' | 'ticket_resolved' | 'comment_added';
  title: string;
  description: string;
  user: string;
  timestamp: Date;
  ticketId?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

export function RecentActivity() {
  // Mock data - in real app, this would come from API
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'ticket_created',
      title: 'New ticket submitted',
      description: 'Printer connectivity issues in Finance Department',
      user: 'Sarah Ahmed',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      ticketId: 'TCK-2024-001',
      priority: 'medium'
    },
    {
      id: '2',
      type: 'ticket_resolved',
      title: 'Ticket resolved',
      description: 'Email configuration completed for new staff member',
      user: 'Mohamed Shahid',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      ticketId: 'TCK-2024-002'
    },
    {
      id: '3',
      type: 'comment_added',
      title: 'Comment added',
      description: 'Additional information provided for network issue',
      user: 'Abdul Uthman',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      ticketId: 'TCK-2024-003'
    },
    {
      id: '4',
      type: 'ticket_updated',
      title: 'Ticket updated',
      description: 'Priority changed to urgent for server maintenance',
      user: 'Ali Salat',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      ticketId: 'TCK-2024-004',
      priority: 'urgent'
    }
  ];

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'ticket_created':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case 'ticket_resolved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'comment_added':
        return <MessageSquare className="h-4 w-4 text-purple-600" />;
      case 'ticket_updated':
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-slate-600" />;
    }
  };

  const getPriorityBadge = (priority?: string) => {
    if (!priority) return null;
    
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };

    return (
      <Badge variant="secondary" className={`text-xs ${colors[priority as keyof typeof colors]}`}>
        {priority.toUpperCase()}
      </Badge>
    );
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-slate-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getActivityIcon(activity.type)}
                  <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                  {activity.priority && getPriorityBadge(activity.priority)}
                </div>
                
                <p className="text-sm text-slate-600 mb-1">{activity.description}</p>
                
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {activity.user}
                  </span>
                  <span>{formatDistanceToNow(activity.timestamp, { addSuffix: true })}</span>
                </div>
                
                {activity.ticketId && (
                  <Badge variant="outline" className="text-xs mt-1">
                    {activity.ticketId}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
