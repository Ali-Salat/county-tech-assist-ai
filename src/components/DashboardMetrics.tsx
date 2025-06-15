
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useAuth } from "./AuthProvider";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: React.ReactNode;
  color: string;
  description?: string;
}

function MetricCard({ title, value, change, icon, color, description }: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`} />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">{title}</CardTitle>
        <div className={`p-2 rounded-lg bg-gradient-to-br ${color} text-white shadow-lg`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
        {description && (
          <p className="text-xs text-slate-500 mb-2">{description}</p>
        )}
        {change && (
          <div className="flex items-center text-xs">
            {change.type === 'increase' ? (
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
            )}
            <span className={change.type === 'increase' ? 'text-green-600' : 'text-red-600'}>
              {change.value}% from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardMetrics() {
  const { userProfile } = useAuth();
  
  // Mock data - in real app, this would come from API
  const metrics = {
    totalTickets: 156,
    openTickets: 42,
    resolvedToday: 8,
    avgResponseTime: "2.4 hrs",
    pendingTickets: 15,
    closedTickets: 99
  };

  const userMetrics = [
    {
      title: "Total Tickets",
      value: metrics.totalTickets,
      change: { value: 12, type: 'increase' as const },
      icon: <CheckCircle className="h-5 w-5" />,
      color: "from-blue-500 to-blue-600",
      description: "All time submissions"
    },
    {
      title: "Open Tickets",
      value: metrics.openTickets,
      change: { value: 5, type: 'decrease' as const },
      icon: <Clock className="h-5 w-5" />,
      color: "from-orange-500 to-orange-600",
      description: "Awaiting resolution"
    },
    {
      title: "Resolved Today",
      value: metrics.resolvedToday,
      change: { value: 25, type: 'increase' as const },
      icon: <CheckCircle className="h-5 w-5" />,
      color: "from-green-500 to-green-600",
      description: "Successfully completed"
    },
    {
      title: "Avg Response Time",
      value: metrics.avgResponseTime,
      change: { value: 15, type: 'decrease' as const },
      icon: <TrendingUp className="h-5 w-5" />,
      color: "from-purple-500 to-purple-600",
      description: "System performance"
    }
  ];

  const staffMetrics = [
    ...userMetrics,
    {
      title: "Pending Review",
      value: metrics.pendingTickets,
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "from-yellow-500 to-yellow-600",
      description: "Requires attention"
    },
    {
      title: "Closed This Month",
      value: metrics.closedTickets,
      change: { value: 8, type: 'increase' as const },
      icon: <XCircle className="h-5 w-5" />,
      color: "from-slate-500 to-slate-600",
      description: "Successfully resolved"
    }
  ];

  const isStaff = userProfile?.role && ['ict_officer', 'admin', 'superuser'].includes(userProfile.role);
  const displayMetrics = isStaff ? staffMetrics : userMetrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {displayMetrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}
