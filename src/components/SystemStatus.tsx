
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle, Activity, Zap } from "lucide-react";

interface SystemService {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime: string;
  lastChecked: string;
  responseTime?: string;
}

export function SystemStatus() {
  const services: SystemService[] = [
    {
      name: "Web Application",
      status: "operational",
      uptime: "99.9%",
      lastChecked: "2 minutes ago",
      responseTime: "145ms"
    },
    {
      name: "Database",
      status: "operational",
      uptime: "99.8%",
      lastChecked: "1 minute ago",
      responseTime: "23ms"
    },
    {
      name: "Email Service",
      status: "operational",
      uptime: "99.7%",
      lastChecked: "3 minutes ago",
      responseTime: "892ms"
    },
    {
      name: "File Storage",
      status: "operational",
      uptime: "99.9%",
      lastChecked: "2 minutes ago",
      responseTime: "67ms"
    },
    {
      name: "Notification Service",
      status: "operational",
      uptime: "99.5%",
      lastChecked: "1 minute ago",
      responseTime: "234ms"
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
      case 'operational': return (
        <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CheckCircle className="h-3 w-3 mr-1" />
          Operational
        </Badge>
      );
      case 'degraded': return (
        <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <AlertCircle className="h-3 w-3 mr-1" />
          Degraded
        </Badge>
      );
      case 'outage': return (
        <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <XCircle className="h-3 w-3 mr-1" />
          Outage
        </Badge>
      );
    }
  };

  const overallStatus = services.every(s => s.status === 'operational') ? 'operational' :
                       services.some(s => s.status === 'outage') ? 'outage' : 'degraded';

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            System Status
          </CardTitle>
          {getStatusBadge(overallStatus)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.name} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-slate-50">
              <div className="flex items-center gap-3">
                {getStatusIcon(service.status)}
                <div>
                  <p className="font-semibold text-slate-900">{service.name}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      Uptime: {service.uptime}
                    </span>
                    {service.responseTime && (
                      <span className="flex items-center gap-1">
                        ⚡ {service.responseTime}
                      </span>
                    )}
                    <span>Last: {service.lastChecked}</span>
                  </div>
                </div>
              </div>
              {getStatusBadge(service.status)}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-700">System Health: Excellent</span>
          </div>
          <p className="text-sm text-slate-600">
            All critical services are operational with optimal performance. 
            System monitoring is active and all metrics are within normal parameters.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
