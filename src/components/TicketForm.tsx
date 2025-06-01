
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { departments, TicketCategory } from "@/data/mockData";
import { createTicket, estimatePriority, getAIAssistance } from "@/utils/ticketUtils";
import { AIAssistant } from "./AIAssistant";
import { toast } from "@/components/ui/sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./AuthProvider";

export function TicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TicketCategory>("hardware");
  const [showAssistance, setShowAssistance] = useState(false);
  const [aiSolutions, setAiSolutions] = useState<string[]>([]);

  const { userProfile, user } = useAuth();
  const queryClient = useQueryClient();

  const createTicketMutation = useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      toast.success("Ticket submitted successfully", {
        description: "Your ticket has been created and is being processed.",
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("hardware");
      setShowAssistance(false);
    },
    onError: (error) => {
      console.error('Error creating ticket:', error);
      toast.error("Failed to submit ticket", {
        description: "Please try again or contact support.",
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
        description: "Please sign in to submit a ticket.",
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
      submittedBy: {
        id: user.id,
        name: userProfile.name,
        email: userProfile.email,
        department: userProfile.department
      }
    });
  };

  if (!userProfile) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center py-12 text-muted-foreground">
            <p>Loading user profile...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
        <CardTitle className="text-xl font-bold">Submit a New Support Ticket</CardTitle>
        <CardDescription className="text-base">
          Please provide details about your ICT-related issue. Our team will respond promptly.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Your Name</Label>
              <Input 
                value={userProfile.name}
                disabled
                className="bg-slate-50 text-slate-600"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Email Address</Label>
              <Input 
                value={userProfile.email}
                disabled
                className="bg-slate-50 text-slate-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">Department</Label>
            <Input 
              value={userProfile.department}
              disabled
              className="bg-slate-50 text-slate-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-slate-700">Issue Title *</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief description of your issue"
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium text-slate-700">Issue Category *</Label>
            <Select 
              value={category} 
              onValueChange={(value) => setCategory(value as TicketCategory)}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hardware">🖥️ Hardware</SelectItem>
                <SelectItem value="software">💻 Software</SelectItem>
                <SelectItem value="network">🌐 Network</SelectItem>
                <SelectItem value="account">👤 Account/Access</SelectItem>
                <SelectItem value="email">📧 Email</SelectItem>
                <SelectItem value="printer">🖨️ Printer</SelectItem>
                <SelectItem value="other">📋 Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-slate-700">Detailed Description *</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide as much detail as possible about your issue, including any error messages, steps to reproduce, and impact on your work"
              rows={5}
              className="resize-none"
              required
            />
            <p className="text-xs text-slate-500">
              Tip: Include screenshots, error messages, and specific steps to help us resolve your issue faster.
            </p>
          </div>

          {showAssistance && (
            <AIAssistant solutions={aiSolutions} />
          )}
          
          <Button 
            type="submit" 
            className="w-full h-12 text-base font-medium" 
            disabled={createTicketMutation.isPending}
          >
            {createTicketMutation.isPending ? "Submitting..." : "Submit Support Ticket"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-slate-500 border-t bg-slate-50/50 rounded-b-lg px-6 py-4">
        <p>📞 For emergencies: helpdesk@wajir.go.ke</p>
        <p>⏰ Business hours: 8AM-5PM</p>
      </CardFooter>
    </Card>
  );
}
