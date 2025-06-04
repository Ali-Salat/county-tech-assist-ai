
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TicketCategory } from "@/data/mockData";
import { createTicket, estimatePriority, getAIAssistance } from "@/utils/ticketUtils";
import { AIAssistant } from "./AIAssistant";
import { toast } from "@/components/ui/sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./AuthProvider";
import { AlertCircle, Loader2 } from "lucide-react";

const departmentOffices = {
  "Finance and Economic Planning": [
    "Budget Office", 
    "Procurement Office", 
    "Accounting Office", 
    "Revenue Collection", 
    "Audit Office"
  ],
  "Health Services": [
    "Medical Services",
    "Public Health Office",
    "Pharmacy Services",
    "Health Records",
    "Community Health"
  ],
  "ICT, Trade, Investment and Industry": [
    "System Administration",
    "Network Operations",
    "Help Desk",
    "Data Management",
    "ICT Policy Office"
  ],
  "Education, Social Welfare and Family Affairs": [
    "Education Office",
    "Social Welfare",
    "Family Affairs",
    "Early Childhood Development",
    "Adult Education"
  ],
  "Agriculture, Livestock and Veterinary Services": [
    "Crop Development",
    "Livestock Development",
    "Veterinary Services",
    "Agricultural Extension",
    "Research Office"
  ],
  "Lands, Public Works and Urban Development": [
    "Land Management",
    "Urban Planning",
    "Housing Development",
    "Survey Office",
    "Physical Planning"
  ],
  "Roads and Transport": [
    "Roads Department",
    "Transport Licensing",
    "Traffic Management",
    "Mechanical Services",
    "Road Maintenance"
  ],
  "Water Services": [
    "Water Supply",
    "Water Quality",
    "Infrastructure",
    "Customer Service",
    "Technical Services"
  ],
  "Office of the Governor, Public Service and County Administration": [
    "Governor's Office",
    "Public Service",
    "County Administration",
    "Public Relations",
    "Protocol Office"
  ],
  "Energy, Environment and Climate Change": [
    "Energy Office",
    "Environment Office",
    "Climate Change Unit",
    "Natural Resources",
    "Conservation Office"
  ]
};

interface TicketFormProps {
  onSuccess?: () => void;
}

export function TicketForm({ onSuccess }: TicketFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TicketCategory>("hardware");
  const [specificOffice, setSpecificOffice] = useState("");
  const [showAssistance, setShowAssistance] = useState(false);
  const [aiSolutions, setAiSolutions] = useState<string[]>([]);

  const { userProfile, user, loading } = useAuth();
  const queryClient = useQueryClient();

  const createTicketMutation = useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      toast.success("Ticket submitted successfully", {
        description: "Your ticket has been created and is being processed by our ICT team.",
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("hardware");
      setSpecificOffice("");
      setShowAssistance(false);
      
      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      console.error('Error creating ticket:', error);
      toast.error("Failed to submit ticket", {
        description: "Please try again or contact our help desk directly.",
      });
    },
  });

  useEffect(() => {
    // Reset AI assistance when description changes
    if (description.length > 20 && category) {
      setShowAssistance(true);
      setAiSolutions(getAIAssistance(description, category));
    } else {
      setShowAssistance(false);
    }
  }, [description, category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userProfile || !user) {
      toast.error("Authentication required", {
        description: "Please sign in to submit a support ticket.",
      });
      return;
    }

    if (!specificOffice) {
      toast.error("Specific office required", {
        description: "Please select your specific office or unit.",
      });
      return;
    }

    const priority = estimatePriority(description, category);
    
    createTicketMutation.mutate({
      title,
      description,
      category,
      priority,
      status: 'open',
      department: userProfile.department,
      specificOffice,
      submittedBy: {
        id: user.id,
        name: userProfile.name,
        email: userProfile.email,
        department: userProfile.department
      }
    });
  };

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
        <CardContent className="p-8">
          <div className="text-center py-16 text-slate-600">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-lg font-medium">Loading your profile...</p>
            <p className="text-sm mt-2">Please wait while we verify your credentials</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userProfile) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-xl border-0 bg-gradient-to-br from-red-50 to-orange-50">
        <CardContent className="p-8">
          <div className="text-center py-16 text-red-600">
            <AlertCircle className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg font-medium">Unable to load user profile</p>
            <p className="text-sm mt-2">Please refresh the page or contact system administrator</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const availableOffices = departmentOffices[userProfile.department as keyof typeof departmentOffices] || [];

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50 to-white backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-t-lg text-white">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">+</span>
          </div>
          Submit New Support Request
        </CardTitle>
        <CardDescription className="text-blue-100 text-base">
          Submit your ICT-related issue to Wajir County Government ICT Department. Our professional team will respond within 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                👤 Your Name
              </Label>
              <Input 
                value={userProfile.name}
                disabled
                className="bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 font-medium border-slate-300 h-12"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                📧 Email Address
              </Label>
              <Input 
                value={userProfile.email}
                disabled
                className="bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 font-medium border-slate-300 h-12"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                🏢 Department
              </Label>
              <Input 
                value={userProfile.department}
                disabled
                className="bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 font-medium border-slate-300 h-12"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="specific-office" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                🎯 Specific Office/Unit <span className="text-red-500">*</span>
              </Label>
              <Select value={specificOffice} onValueChange={setSpecificOffice}>
                <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500 transition-colors">
                  <SelectValue placeholder="Select your office/unit" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {availableOffices.map((office) => (
                    <SelectItem key={office} value={office} className="py-3">
                      {office}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="title" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              📝 Issue Title <span className="text-red-500">*</span>
            </Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief, descriptive title of your ICT issue"
              className="h-12 border-slate-300 focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="category" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              📂 Issue Category <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={category} 
              onValueChange={(value) => setCategory(value as TicketCategory)}
            >
              <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500 transition-colors">
                <SelectValue placeholder="Select issue category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hardware" className="py-3">🖥️ Hardware Issues</SelectItem>
                <SelectItem value="software" className="py-3">💻 Software Issues</SelectItem>
                <SelectItem value="network" className="py-3">🌐 Network & Connectivity</SelectItem>
                <SelectItem value="account" className="py-3">👤 Account & Access Issues</SelectItem>
                <SelectItem value="email" className="py-3">📧 Email Problems</SelectItem>
                <SelectItem value="printer" className="py-3">🖨️ Printer Issues</SelectItem>
                <SelectItem value="other" className="py-3">📋 Other ICT Issues</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              📄 Detailed Description <span className="text-red-500">*</span>
            </Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide comprehensive details about your issue:&#10;• What exactly happened?&#10;• When did it start?&#10;• What error messages did you see?&#10;• What steps have you already tried?&#10;• How is this affecting your work?"
              rows={6}
              className="resize-none border-slate-300 focus:border-blue-500 transition-colors"
              required
            />
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs text-blue-700 flex items-center gap-2">
                <span className="text-base">💡</span>
                <strong>Pro Tip:</strong> Include screenshots, error codes, and specific steps to help our ICT team resolve your issue faster and more efficiently.
              </p>
            </div>
          </div>

          {showAssistance && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
              <AIAssistant solutions={aiSolutions} />
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]" 
            disabled={createTicketMutation.isPending || !specificOffice}
          >
            {createTicketMutation.isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting Request...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                🚀 Submit Support Request
              </div>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-slate-600 border-t bg-gradient-to-r from-slate-50 to-blue-50 rounded-b-lg px-8 py-6">
        <div className="flex items-center gap-2">
          <span className="text-lg">📞</span>
          <span><strong>Emergency:</strong> helpdesk@wajir.go.ke</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">⏰</span>
          <span><strong>Hours:</strong> 8:00 AM - 5:00 PM</span>
        </div>
      </CardFooter>
    </Card>
  );
}
