
import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Crown, User, Wrench } from "lucide-react";

export default function UsersPage() {
  const { userProfile } = useAuth();

  // Only superusers and admins can access user management
  if (!userProfile || (userProfile.role !== 'superuser' && userProfile.role !== 'admin')) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Shield className="h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Access Restricted</h3>
          <p className="text-slate-600 text-center">You don't have permission to access user management.</p>
        </CardContent>
      </Card>
    );
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'superuser': return Crown;
      case 'admin': return Shield;
      case 'ict_officer': return Wrench;
      default: return User;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'superuser': return 'bg-red-600 text-white';
      case 'admin': return 'bg-blue-600 text-white';
      case 'ict_officer': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const sampleUsers = [
    { email: 'ellisalat@gmail.com', name: 'Ellis Alat', role: 'superuser', department: 'ICT, Trade, Investment and Industry' },
    { email: 'mshahid@wajir.go.ke', name: 'Mohamed Shahid', role: 'admin', department: 'ICT, Trade, Investment and Industry' },
    { email: 'abdulluthman@gmail.com', name: 'Abdul Uthman', role: 'ict_officer', department: 'ICT, Trade, Investment and Industry' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            System Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleUsers.map((user) => {
              const RoleIcon = getRoleIcon(user.role);
              return (
                <div key={user.email} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <RoleIcon className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{user.name}</h4>
                      <p className="text-sm text-slate-600">{user.email}</p>
                      <p className="text-sm text-slate-500">{user.department}</p>
                    </div>
                  </div>
                  <Badge className={getRoleBadge(user.role)}>
                    {user.role.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
