
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { User, LogOut, Settings, Shield, UserCheck, Wrench, Crown, Sparkles } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { useToast } from '@/components/ui/use-toast';

export function UserMenu() {
  const { user, userProfile, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed out successfully',
        description: 'You have been securely logged out of the system.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getRoleInfo = (role: string) => {
    switch (role) {
      case 'superuser':
        return { 
          label: 'System Administrator', 
          icon: Crown, 
          color: 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-500',
          description: 'Full system access',
          statusColor: 'bg-red-500'
        };
      case 'admin':
        return { 
          label: 'ICT Administrator', 
          icon: Shield, 
          color: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500',
          description: 'Department management',
          statusColor: 'bg-blue-500'
        };
      case 'ict_officer':
        return { 
          label: 'ICT Officer', 
          icon: Wrench, 
          color: 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-500',
          description: 'Technical support',
          statusColor: 'bg-green-500'
        };
      default:
        return { 
          label: 'Staff Member', 
          icon: User, 
          color: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-500',
          description: 'Standard access',
          statusColor: 'bg-purple-500'
        };
    }
  };

  if (!user) return null;

  const roleInfo = userProfile ? getRoleInfo(userProfile.role) : getRoleInfo('user');
  const RoleIcon = roleInfo.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative bg-slate-700/50 hover:bg-slate-600/50 text-white border border-slate-600 transition-all duration-300 hover:scale-105">
          <User className="h-5 w-5" />
          {userProfile?.role && (
            <div className={`absolute -top-1 -right-1 h-3 w-3 rounded-full ${roleInfo.statusColor} animate-pulse shadow-lg ring-2 ring-white`} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0 bg-gradient-to-br from-white to-slate-50 border-slate-200 shadow-2xl">
        <DropdownMenuLabel className="p-0">
          <div className="p-6 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full transform translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full transform -translate-x-8 translate-y-8"></div>
            
            <div className="relative space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-14 w-14 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center ring-2 ring-white/20">
                  <User className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-xl">{userProfile?.name || user.email}</div>
                  <div className="text-sm text-slate-300 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    {userProfile?.email || user.email}
                  </div>
                </div>
              </div>
              
              {userProfile?.department && (
                <div className="text-sm text-slate-300 font-medium bg-white/10 rounded-lg px-3 py-2">
                  📍 {userProfile.department}
                </div>
              )}
              
              {userProfile?.title && (
                <div className="text-xs text-slate-400 italic">
                  {userProfile.title}
                </div>
              )}
              
              <Badge className={`${roleInfo.color} flex items-center gap-2 w-fit px-4 py-2 font-semibold shadow-xl ring-2 ring-white/20`}>
                <RoleIcon className="h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span className="text-sm">{roleInfo.label}</span>
                  <span className="text-xs opacity-90">{roleInfo.description}</span>
                </div>
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <div className="p-3">
          <DropdownMenuItem className="p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-300 group">
            <Settings className="mr-3 h-5 w-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
            <div>
              <div className="font-semibold group-hover:text-blue-700">Account Settings</div>
              <div className="text-xs text-slate-500">Manage your profile and preferences</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="my-3" />
          
          <DropdownMenuItem 
            onClick={handleSignOut} 
            className="p-4 rounded-xl text-red-600 hover:text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 cursor-pointer transition-all duration-300 group"
          >
            <LogOut className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
            <div>
              <div className="font-semibold">Sign Out</div>
              <div className="text-xs text-red-500">End your secure session</div>
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
