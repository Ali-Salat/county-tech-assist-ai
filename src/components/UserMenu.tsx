
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
import { User, LogOut, Settings, Shield, UserCheck, Wrench } from 'lucide-react';
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
        return { label: 'Director ICT', icon: Shield, color: 'bg-red-100 text-red-800' };
      case 'admin':
        return { label: 'Senior ICT Officer', icon: UserCheck, color: 'bg-blue-100 text-blue-800' };
      case 'ict_officer':
        return { label: 'ICT Officer', icon: Wrench, color: 'bg-green-100 text-green-800' };
      default:
        return { label: 'User', icon: User, color: 'bg-gray-100 text-gray-800' };
    }
  };

  if (!user) return null;

  const roleInfo = userProfile ? getRoleInfo(userProfile.role) : getRoleInfo('user');
  const RoleIcon = roleInfo.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <User className="h-5 w-5" />
          {userProfile?.role && (
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="space-y-2">
            <div className="font-medium text-base">{userProfile?.name || user.email}</div>
            <div className="text-sm text-muted-foreground">{userProfile?.email || user.email}</div>
            <div className="text-xs text-muted-foreground">{userProfile?.department}</div>
            {userProfile?.title && (
              <div className="text-xs text-muted-foreground italic">{userProfile.title}</div>
            )}
            <Badge variant="secondary" className={`text-xs ${roleInfo.color} flex items-center gap-1 w-fit`}>
              <RoleIcon className="h-3 w-3" />
              {roleInfo.label}
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
