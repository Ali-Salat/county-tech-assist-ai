
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Save, Shield } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function SettingsPage() {
  const { userProfile } = useAuth();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="system-name">System Name</Label>
                <Input id="system-name" defaultValue="Wajir County ICT Help Desk" />
              </div>
              <div>
                <Label htmlFor="admin-email">Administrator Email</Label>
                <Input id="admin-email" defaultValue="admin@wajir.go.ke" />
              </div>
              <div>
                <Label htmlFor="support-phone">Support Phone</Label>
                <Input id="support-phone" defaultValue="+254 XXX XXX XXX" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="ticket-prefix">Ticket ID Prefix</Label>
                <Input id="ticket-prefix" defaultValue="WCG-ICT-" />
              </div>
              <div>
                <Label htmlFor="auto-assign">Auto-assign Tickets</Label>
                <select className="w-full p-2 border rounded-md">
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div>
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input id="notification-email" defaultValue="notifications@wajir.go.ke" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {userProfile?.role === 'superuser' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Shield className="h-5 w-5" />
              Advanced Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="text-red-800 text-sm">
                These settings are only available to system administrators. 
                Changes here can affect system security and functionality.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
