
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PlusCircle, 
  Users, 
  BarChart3, 
  Settings, 
  FileText, 
  HelpCircle,
  Zap,
  Search,
  Bell,
  Download,
  Upload,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface ActionButton {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  roles: string[];
  color: string;
  featured?: boolean;
}

export function EnhancedQuickActions() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  const actions: ActionButton[] = [
    {
      title: "Submit New Ticket",
      description: "Create a new support request",
      icon: PlusCircle,
      action: () => navigate("/submit-ticket"),
      roles: ["user", "ict_officer", "admin", "superuser"],
      color: "from-blue-500 to-blue-600",
      featured: true
    },
    {
      title: "My Tickets",
      description: "View your submitted tickets",
      icon: FileText,
      action: () => navigate("/my-tickets"),
      roles: ["user", "ict_officer", "admin", "superuser"],
      color: "from-green-500 to-green-600",
      featured: true
    },
    {
      title: "All Tickets",
      description: "Manage all support tickets",
      icon: Search,
      action: () => navigate("/tickets"),
      roles: ["ict_officer", "admin", "superuser"],
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "User Management",
      description: "Manage system users",
      icon: Users,
      action: () => navigate("/users"),
      roles: ["admin", "superuser"],
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Analytics & Reports",
      description: "View detailed insights",
      icon: BarChart3,
      action: () => navigate("/reports"),
      roles: ["ict_officer", "admin", "superuser"],
      color: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Knowledge Base",
      description: "Browse help articles",
      icon: HelpCircle,
      action: () => navigate("/knowledge-base"),
      roles: ["user", "ict_officer", "admin", "superuser"],
      color: "from-teal-500 to-teal-600"
    },
    {
      title: "System Settings",
      description: "Configure system preferences",
      icon: Settings,
      action: () => navigate("/settings"),
      roles: ["superuser"],
      color: "from-red-500 to-red-600"
    },
    {
      title: "Export Data",
      description: "Download reports and data",
      icon: Download,
      action: () => console.log("Export data"),
      roles: ["admin", "superuser"],
      color: "from-gray-500 to-gray-600"
    }
  ];

  const filteredActions = actions.filter(action => 
    userProfile?.role && action.roles.includes(userProfile.role)
  );

  const featuredActions = filteredActions.filter(action => action.featured);
  const regularActions = filteredActions.filter(action => !action.featured);

  const ActionButton = ({ action }: { action: ActionButton }) => {
    const Icon = action.icon;
    return (
      <Button
        variant="outline"
        className="h-auto p-6 flex flex-col items-start gap-3 hover:shadow-lg transition-all duration-300 border-0 bg-white relative overflow-hidden group"
        onClick={action.action}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="text-left">
          <div className="font-semibold text-slate-900 mb-1">{action.title}</div>
          <div className="text-sm text-slate-600 leading-relaxed">{action.description}</div>
        </div>
      </Button>
    );
  };

  return (
    <div className="space-y-6">
      {featuredActions.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Quick Actions
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                Featured
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredActions.map((action) => (
                <ActionButton key={action.title} action={action} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {regularActions.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-slate-600" />
              More Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regularActions.map((action) => (
                <ActionButton key={action.title} action={action} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
