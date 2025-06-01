
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
import { User, LogOut, Settings, Shield, UserCheck, Wrench, Crown } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { useToast } from '@/components/ui/use-toast';

export function UserMenu() {
  const { user, userProfile, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
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
          description: 'Full system access'
        };
      case 'admin':
        return { 
          label: 'ICT Administrator', 
          icon: Shield, 
          color: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500',
          description: 'Department management'
        };
      case 'ict_officer':
        return { 
          label: 'ICT Officer', 
          icon: Wrench, 
          color: 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-500',
          description: 'Technical support'
        };
      default:
        return { 
          label: 'Staff Member', 
          icon: User, 
          color: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-500',
          description: 'Standard access'
        };
    }
  };

  if (!user) return null;

  const roleInfo = userProfile ? getRoleInfo(userProfile.role) : getRoleInfo('user');
  const RoleIcon = roleInfo.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative bg-slate-700/50 hover:bg-slate-600/50 text-white border border-slate-600">
          <User className="h-5 w-5" />
          {userProfile?.role && (
            <div className={`absolute -top-1 -right-1 h-3 w-3 rounded-full ${
              userProfile.role === 'superuser' ? 'bg-red-500' :
              userProfile.role === 'admin' ? 'bg-blue-500' :
              userProfile.role === 'ict_officer' ? 'bg-green-500' : 'bg-gray-500'
            } animate-pulse`} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 bg-gradient-to-br from-white to-slate-50 border-slate-200 shadow-xl">
        <DropdownMenuLabel className="p-0">
          <div className="p-6 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg">{userProfile?.name || user.email}</div>
                  <div className="text-sm text-slate-300">{userProfile?.email || user.email}</div>
                </div>
              </div>
              
              {userProfile?.department && (
                <div className="text-sm text-slate-300 font-medium">
                  {userProfile.department}
                </div>
              )}
              
              {userProfile?.title && (
                <div className="text-xs text-slate-400 italic">
                  {userProfile.title}
                </div>
              )}
              
              <Badge className={`${roleInfo.color} flex items-center gap-2 w-fit px-3 py-1 font-semibold shadow-lg`}>
                <RoleIcon className="h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span className="text-sm">{roleInfo.label}</span>
                  <span className="text-xs opacity-90">{roleInfo.description}</span>
                </div>
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <div className="p-2">
          <DropdownMenuItem className="p-3 rounded-lg hover:bg-slate-100 cursor-pointer">
            <Settings className="mr-3 h-5 w-5 text-slate-600" />
            <div>
              <div className="font-medium">Account Settings</div>
              <div className="text-xs text-slate-500">Manage your profile and preferences</div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="my-2" />
          
          <DropdownMenuItem 
            onClick={handleSignOut} 
            className="p-3 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
          >
            <LogOut className="mr-3 h-5 w-5" />
            <div>
              <div className="font-medium">Sign Out</div>
              <div className="text-xs text-red-500">End your secure session</div>
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
