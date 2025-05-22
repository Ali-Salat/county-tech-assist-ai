
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

export function TicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TicketCategory>("hardware");
  const [department, setDepartment] = useState(departments[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showAssistance, setShowAssistance] = useState(false);
  const [aiSolutions, setAiSolutions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    
    try {
      const priority = estimatePriority(description, category);
      
      createTicket({
        title,
        description,
        category,
        priority,
        status: 'open',
        department,
        submittedBy: {
          id: Math.random().toString(36).substring(2, 9),
          name,
          email,
          department
        }
      });
      
      toast.success("Ticket submitted successfully", {
        description: "Your ticket has been created and is being processed.",
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("hardware");
      setDepartment(departments[0]);
      setShowAssistance(false);
    } catch (error) {
      toast.error("Failed to submit ticket", {
        description: "Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit a New Support Ticket</CardTitle>
        <CardDescription>
          Please provide details about your ICT-related issue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ali.salat@wajir.go.ke"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select 
                value={department} 
                onValueChange={setDepartment}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Issue Title</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief description of your issue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Issue Category</Label>
              <Select 
                value={category} 
                onValueChange={(value) => setCategory(value as TicketCategory)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="network">Network</SelectItem>
                  <SelectItem value="account">Account/Access</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="printer">Printer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide as much detail as possible about your issue"
                rows={4}
                required
              />
            </div>

            {showAssistance && (
              <AIAssistant solutions={aiSolutions} />
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Ticket"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-gray-500 border-t pt-4">
        <p>All tickets are processed during business hours (8AM-5PM)</p>
        <p>For emergencies call ext. 1234</p>
      </CardFooter>
    </Card>
  );
}
