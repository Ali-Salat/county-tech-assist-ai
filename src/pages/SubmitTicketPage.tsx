
import { TicketForm } from "@/components/TicketForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SubmitTicketPage() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Submit Support Request</h1>
        <p className="text-lg text-slate-600">
          Get help from our ICT team by submitting a detailed support ticket
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <TicketForm />
      </div>
      
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Need Immediate Help?</CardTitle>
          <CardDescription>
            For urgent issues that need immediate attention
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Emergency Contact</h3>
              <p className="text-sm text-red-700">📞 Emergency Hotline</p>
              <p className="text-sm text-red-700">📧 helpdesk@wajir.go.ke</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Office Hours</h3>
              <p className="text-sm text-blue-700">Monday - Friday</p>
              <p className="text-sm text-blue-700">8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
