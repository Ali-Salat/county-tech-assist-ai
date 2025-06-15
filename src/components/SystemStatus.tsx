
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle, Activity } from "lucide-react";

interface SystemService {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime: string;
  lastChecked: string;
}

export function SystemStatus() {
  const services: SystemService[] = [
    {
      name: "Web Application",
      status: "operational",
      uptime: "99.9%",
      lastChecked: "2 minutes ago"
    },
    {
      name: "Database",
      status: "operational",
      uptime: "99.8%",
      lastChecked: "1 minute ago"
    },
    {
      name: "Email Service",
      status: "operational",
      uptime: "99.7%",
      lastChecked: "3 minutes ago"
    },
    {
      name: "File Storage",
      status: "operational",
      uptime: "99.9%",
      lastChecked: "2 minutes ago"
    },
    {
      name: "Notification Service",
      status: "degraded",
      uptime: "98.5%",
      lastChecked: "5 minutes ago"
    }
  ];

  const getStatusIcon = (status: SystemService['status']) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'outage': return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: SystemService['status']) => {
    switch (status) {
      case 'operational': return <Badge variant="default" className="bg-green-500">Operational</Badge>;
      case 'degraded': return <Badge variant="secondary">Degraded</Badge>;
      case 'outage': return <Badge variant="destructive">Outage</Badge>;
    }
  };

  const overallStatus = services.every(s => s.status === 'operational') ? 'operational' :
                       services.some(s => s.status === 'outage') ? 'outage' : 'degraded';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Status
          </CardTitle>
          {getStatusBadge(overallStatus)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.name} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(service.status)}
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Uptime: {service.uptime} • Last checked: {service.lastChecked}
                  </p>
                </div>
              </div>
              {getStatusBadge(service.status)}
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>System Health:</strong> All critical services are operational. 
            Minor performance degradation detected in notification service.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
