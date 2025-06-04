
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "./AuthProvider";
import { 
  Home, 
  Ticket, 
  Users, 
  Settings, 
  BarChart3, 
  FileText,
  Shield,
  Menu,
  X,
  HelpCircle,
  Archive,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  const navigationItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
      roles: ["user", "ict_officer", "admin", "superuser"]
    },
    {
      title: "Submit Ticket",
      icon: Ticket,
      href: "/submit-ticket",
      roles: ["user", "ict_officer", "admin", "superuser"]
    },
    {
      title: "My Tickets",
      icon: FileText,
      href: "/my-tickets",
      roles: ["user", "ict_officer", "admin", "superuser"]
    },
    {
      title: "All Tickets",
      icon: Archive,
      href: "/tickets",
      roles: ["ict_officer", "admin", "superuser"]
    },
    {
      title: "Knowledge Base",
      icon: BookOpen,
      href: "/knowledge-base",
      roles: ["user", "ict_officer", "admin", "superuser"]
    },
    {
      title: "Reports",
      icon: BarChart3,
      href: "/reports",
      roles: ["ict_officer", "admin", "superuser"]
    },
    {
      title: "User Management",
      icon: Users,
      href: "/users",
      roles: ["admin", "superuser"]
    },
    {
      title: "System Settings",
      icon: Settings,
      href: "/settings",
      roles: ["superuser"]
    }
  ];

  const filteredItems = navigationItems.filter(item => 
    userProfile?.role && item.roles.includes(userProfile.role)
  );

  return (
    <div className={cn(
      "bg-gradient-to-b from-slate-900 to-slate-800 text-white h-screen transition-all duration-300 flex flex-col border-r border-slate-700",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-sm">ICT Help Desk</h2>
                <p className="text-xs text-slate-300">Wajir County</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-700"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && userProfile && (
        <div className="p-4 bg-slate-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">
                {userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{userProfile.name}</p>
              <p className="text-xs text-slate-300 truncate">{userProfile.department}</p>
              <Badge 
                variant={userProfile.role === 'superuser' ? 'destructive' : 'secondary'} 
                className="text-xs mt-1"
              >
                {userProfile.role.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
      )}

      <Separator className="bg-slate-700" />

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white",
                  isCollapsed && "justify-center"
                )
              }
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        {!isCollapsed && (
          <div className="text-xs text-slate-400">
            <p className="font-semibold">Wajir County Government</p>
            <p>ICT Department © 2025</p>
          </div>
        )}
      </div>
    </div>
  );
}
