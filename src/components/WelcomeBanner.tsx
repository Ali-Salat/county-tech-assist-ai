
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "./AuthProvider";
import { Sparkles, Crown, Shield, Wrench, User } from "lucide-react";

export function WelcomeBanner() {
  const { userProfile } = useAuth();

  const getRoleInfo = (role: string) => {
    switch (role) {
      case 'superuser':
        return {
          icon: Crown,
          badge: 'System Administrator',
          color: 'from-red-500 to-red-600',
          bgColor: 'from-red-50 to-red-100',
          textColor: 'text-red-700',
          greeting: 'Welcome back, Super Administrator!'
        };
      case 'admin':
        return {
          icon: Shield,
          badge: 'ICT Administrator',
          color: 'from-blue-500 to-blue-600',
          bgColor: 'from-blue-50 to-blue-100',
          textColor: 'text-blue-700',
          greeting: 'Welcome back, Administrator!'
        };
      case 'ict_officer':
        return {
          icon: Wrench,
          badge: 'ICT Officer',
          color: 'from-green-500 to-green-600',
          bgColor: 'from-green-50 to-green-100',
          textColor: 'text-green-700',
          greeting: 'Welcome back, ICT Officer!'
        };
      default:
        return {
          icon: User,
          badge: 'Staff Member',
          color: 'from-purple-500 to-purple-600',
          bgColor: 'from-purple-50 to-purple-100',
          textColor: 'text-purple-700',
          greeting: 'Welcome to the Help Desk!'
        };
    }
  };

  if (!userProfile) return null;

  const roleInfo = getRoleInfo(userProfile.role);
  const RoleIcon = roleInfo.icon;
  const currentHour = new Date().getHours();
  const timeGreeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <Card className={`border-0 bg-gradient-to-br ${roleInfo.bgColor} mb-8 overflow-hidden relative`}>
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
        <div className={`w-full h-full rounded-full bg-gradient-to-br ${roleInfo.color} opacity-10`} />
      </div>
      <div className="absolute bottom-0 left-0 w-24 h-24 transform -translate-x-12 translate-y-12">
        <div className={`w-full h-full rounded-full bg-gradient-to-br ${roleInfo.color} opacity-5`} />
      </div>
      
      <div className="relative p-8">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${roleInfo.color} text-white shadow-lg`}>
                <RoleIcon className="h-6 w-6" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${roleInfo.textColor}`}>
                  {timeGreeting}, {userProfile.name}!
                </h1>
                <p className="text-slate-600">{roleInfo.greeting}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge className={`bg-gradient-to-r ${roleInfo.color} text-white px-4 py-1 shadow-lg`}>
                <RoleIcon className="h-4 w-4 mr-2" />
                {roleInfo.badge}
              </Badge>
              
              <div className="text-sm text-slate-600">
                <span className="font-medium">{userProfile.department}</span>
                {userProfile.title && (
                  <span className="block text-xs text-slate-500">{userProfile.title}</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Sparkles className={`h-5 w-5 ${roleInfo.textColor} animate-pulse`} />
            <span className={`text-sm font-medium ${roleInfo.textColor}`}>
              Have a productive day!
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
