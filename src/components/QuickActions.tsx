
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Users, BarChart3, Settings, FileText, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function QuickActions() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  const actions = [
    {
      title: "Submit New Ticket",
      description: "Create a new support request",
      icon: PlusCircle,
      action: () => navigate("/submit-ticket"),
      roles: ["user", "ict_officer", "admin", "superuser"]
    },
    {
      title: "View All Tickets",
      description: "Manage support tickets",
      icon: FileText,
      action: () => navigate("/tickets"),
      roles: ["ict_officer", "admin", "superuser"]
    },
    {
      title: "User Management",
      description: "Manage system users",
      icon: Users,
      action: () => navigate("/users"),
      roles: ["admin", "superuser"]
    },
    {
      title: "View Reports",
      description: "Analytics and insights",
      icon: BarChart3,
      action: () => navigate("/reports"),
      roles: ["ict_officer", "admin", "superuser"]
    },
    {
      title: "Knowledge Base",
      description: "Browse help articles",
      icon: HelpCircle,
      action: () => navigate("/knowledge-base"),
      roles: ["user", "ict_officer", "admin", "superuser"]
    },
    {
      title: "System Settings",
      description: "Configure system",
      icon: Settings,
      action: () => navigate("/settings"),
      roles: ["superuser"]
    }
  ];

  const filteredActions = actions.filter(action => 
    userProfile?.role && action.roles.includes(userProfile.role)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.title}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-primary/5"
                onClick={action.action}
              >
                <Icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-semibold text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
