import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Copy,
  Check,
  ArrowLeft,
  DollarSign,
  Lightbulb,
  Loader2,
  TrendingUp,
  MessageSquare,
  HelpCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface MarketInsights {
  low: number;
  median: number;
  high: number;
  currency: string;
  description: string;
}

interface SalaryNegotiationResult {
  marketInsights: MarketInsights;
  scripts: {
    email: string;
    verbal: string;
  };
  strategies: string[];
  objectionHandlers: {
    employerObjection: string;
    counterArgument: string;
  }[];
}

const AISalary = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<SalaryNegotiationResult | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedVerbal, setCopiedVerbal] = useState(false);

  const [formData, setFormData] = useState({
    role: "",
    experienceLevel: "mid",
    location: "",
    currentOffer: "",
    targetSalary: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.role || !formData.location) {
      toast.error("Please provide a job role and location.");
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const response = await api.post("/ai-tools/salary", {
        role: formData.role,
        experienceLevel: formData.experienceLevel,
        location: formData.location,
        currentOffer: formData.currentOffer,
        targetSalary: formData.targetSalary,
      });

      if (response.data.status === "success") {
        setResult(response.data.data);
        toast.success("Salary Negotiation Handbook Ready! 💸");
      } else {
        throw new Error(response.data.message || "Failed to generate negotiation strategy.");
      }
    } catch (error: any) {
      console.error("Salary negotiation error:", error);
      toast.error(error.message || "Failed to process negotiation insights. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyEmail = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.scripts.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
    toast.success("Email script copied!");
  };

  const copyVerbal = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.scripts.verbal);
    setCopiedVerbal(true);
    setTimeout(() => setCopiedVerbal(false), 2000);
    toast.success("Verbal pitch script copied!");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <Link to="/app/ai-tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors w-fit">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to LaunchPad
        </Link>
        <div className="text-center md:text-left space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <DollarSign className="h-7 w-7 text-emerald-500" />
            Salary Negotiator
          </h1>
          <p className="text-muted-foreground">
            Get personalized market context, discussion templates, and talking scripts.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Role Details</CardTitle>
              <CardDescription>Tell us about the target role and offer context.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Job Role / Title *</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => updateField("role", e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    value={formData.experienceLevel}
                    onValueChange={(val) => updateField("experienceLevel", val)}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                      <SelectItem value="lead">Lead / Principal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    placeholder="e.g. San Francisco, CA or Remote"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentOffer">Current Offer (Optional)</Label>
                  <Input
                    id="currentOffer"
                    value={formData.currentOffer}
                    onChange={(e) => updateField("currentOffer", e.target.value)}
                    placeholder="e.g. 110,000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetSalary">Target Salary (Optional)</Label>
                  <Input
                    id="targetSalary"
                    value={formData.targetSalary}
                    onChange={(e) => updateField("targetSalary", e.target.value)}
                    placeholder="e.g. 130,000"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full rounded-xl gap-2 bg-emerald-600 hover:bg-emerald-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Reviewing Market context...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Get Negotiation Guide
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Output Panel */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">Salary Guide & Talk Scripts</CardTitle>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground animate-pulse">Analyzing market values...</p>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  {/* Market Chart */}
                  <div className="space-y-3 bg-secondary/30 p-4 rounded-2xl border border-border">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      Estimated Market Bracket ({result.marketInsights.currency})
                    </h4>
                    
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Low: ${result.marketInsights.low.toLocaleString()}</span>
                        <span className="font-bold text-foreground">Median: ${result.marketInsights.median.toLocaleString()}</span>
                        <span>High: ${result.marketInsights.high.toLocaleString()}</span>
                      </div>
                      {/* Bar graph representing low, mid, high */}
                      <div className="w-full h-3 bg-secondary rounded-full overflow-hidden flex">
                        <div className="w-1/3 h-full bg-emerald-500/30" />
                        <div className="w-1/3 h-full bg-emerald-500" />
                        <div className="w-1/3 h-full bg-emerald-500/70" />
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                      {result.marketInsights.description}
                    </p>
                  </div>

                  {/* Email Script */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-violet-500" />
                        Negotiation Email Template
                      </h4>
                      <Button variant="ghost" size="sm" onClick={copyEmail} className="rounded-xl h-8">
                        {copiedEmail ? (
                          <Check className="h-3.5 w-3.5 mr-1 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 mr-1" />
                        )}
                        Copy
                      </Button>
                    </div>
                    <div className="text-xs leading-relaxed border border-border bg-secondary/35 p-3 rounded-xl text-muted-foreground whitespace-pre-wrap">
                      {result.scripts.email}
                    </div>
                  </div>

                  {/* Verbal pitch script */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                        Live Pitch talking points
                      </h4>
                      <Button variant="ghost" size="sm" onClick={copyVerbal} className="rounded-xl h-8">
                        {copiedVerbal ? (
                          <Check className="h-3.5 w-3.5 mr-1 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 mr-1" />
                        )}
                        Copy
                      </Button>
                    </div>
                    <div className="text-xs leading-relaxed border border-border bg-secondary/35 p-3 rounded-xl text-muted-foreground whitespace-pre-wrap">
                      {result.scripts.verbal}
                    </div>
                  </div>

                  {/* Negotiation Strategies */}
                  {result.strategies && result.strategies.length > 0 && (
                    <div className="space-y-2 border-t pt-4">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        Preparation Strategies
                      </h4>
                      <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                        {result.strategies.map((strat, i) => (
                          <li key={i}>{strat}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Objections Handlers */}
                  {result.objectionHandlers && result.objectionHandlers.length > 0 && (
                    <div className="space-y-3 border-t pt-4">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-indigo-500" />
                        Objection Responses
                      </h4>
                      {result.objectionHandlers.map((obj, i) => (
                        <div key={i} className="space-y-1 bg-secondary/20 p-3 rounded-xl border border-border text-xs">
                          <p className="font-bold text-foreground">Objection: "{obj.employerObjection}"</p>
                          <p className="text-muted-foreground leading-relaxed">Counter pitch: {obj.counterArgument}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-24 text-muted-foreground">
                  <DollarSign className="h-16 w-16 mx-auto mb-4 opacity-10" />
                  <p className="font-medium">No Negotiation Guides Compiled</p>
                  <p className="text-sm">Submit your role info to analyze target salary brackets and templates.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AISalary;
