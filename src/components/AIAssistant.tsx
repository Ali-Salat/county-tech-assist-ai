
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface AIAssistantProps {
  solutions: string[];
}

export function AIAssistant({ solutions }: AIAssistantProps) {
  const [solutionTried, setSolutionTried] = useState<Record<number, boolean>>({});
  const [expanded, setExpanded] = useState(true);
  
  const markAsTried = (index: number) => {
    setSolutionTried(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  if (!expanded) {
    return (
      <Button 
        variant="outline" 
        onClick={() => setExpanded(true)}
        className="w-full text-sm"
      >
        Show AI troubleshooting suggestions
      </Button>
    );
  }
  
  return (
    <Card className="bg-accent border-primary/20 animate-fadeIn">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base">AI Troubleshooting Assistant</CardTitle>
            <CardDescription>
              We found some potential solutions for your issue
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setExpanded(false)}
            className="text-xs"
          >
            Hide
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {solutions.map((solution, index) => (
            <li key={index} className="flex items-start gap-2">
              <Button
                variant="outline"
                size="icon"
                className={`h-6 w-6 rounded-full mt-0.5 ${
                  solutionTried[index] ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => markAsTried(index)}
              >
                {solutionTried[index] && <Check className="h-3 w-3" />}
              </Button>
              <span className={`text-sm ${solutionTried[index] ? "line-through opacity-70" : ""}`}>
                {solution}
              </span>
            </li>
          ))}
        </ul>
        {solutions.length > 0 && (
          <p className="text-sm mt-4 text-muted-foreground">
            Did these solutions fix your issue? If not, proceed with ticket submission.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
