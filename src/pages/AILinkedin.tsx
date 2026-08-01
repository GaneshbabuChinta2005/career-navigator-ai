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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Copy,
  Check,
  ArrowLeft,
  Linkedin,
  Lightbulb,
  Loader2,
  ListTodo
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface LinkedInOptimization {
  optimizedHeadline: string;
  aboutSummary: string;
  experienceEnhancements: {
    role: string;
    originalPoints: string;
    optimizedPoints: string[];
  }[];
  keywordSuggestions: string[];
  actionItems: string[];
}

const AILinkedin = () => {
  const { user } = useAuthStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [optimization, setOptimization] = useState<LinkedInOptimization | null>(null);
  const [copiedHeadline, setCopiedHeadline] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    currentTitle: "",
    targetRole: "",
    skills: "",
    experience: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptimize = async () => {
    if (!formData.name || !formData.targetRole) {
      toast.error("Please provide your name and target role.");
      return;
    }

    setIsGenerating(true);
    setOptimization(null);

    try {
      const response = await api.post("/ai-tools/linkedin", {
        name: formData.name,
        currentTitle: formData.currentTitle,
        experience: formData.experience,
        skills: formData.skills,
        targetRole: formData.targetRole,
      });

      if (response.data.status === "success") {
        setOptimization(response.data.data);
        toast.success("LinkedIn Optimization Ready! 🚀");
      } else {
        throw new Error(response.data.message || "Optimization failed.");
      }
    } catch (error: any) {
      console.error("LinkedIn optimization error:", error);
      toast.error(error.message || "Failed to optimize profile. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyHeadline = () => {
    if (!optimization) return;
    navigator.clipboard.writeText(optimization.optimizedHeadline);
    setCopiedHeadline(true);
    setTimeout(() => setCopiedHeadline(false), 2000);
    toast.success("Headline copied!");
  };

  const copySummary = () => {
    if (!optimization) return;
    navigator.clipboard.writeText(optimization.aboutSummary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
    toast.success("About summary copied!");
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
            <Linkedin className="h-7 w-7 text-[#0077B5]" />
            LinkedIn Profile Optimizer
          </h1>
          <p className="text-muted-foreground">
            Rank higher in recruiter searches and highlight key achievements.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Overview</CardTitle>
              <CardDescription>Tell us about your current status and target goals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetRole">Target Role *</Label>
                  <Input
                    id="targetRole"
                    value={formData.targetRole}
                    onChange={(e) => updateField("targetRole", e.target.value)}
                    placeholder="e.g. Staff React Engineer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentTitle">Current Title</Label>
                <Input
                  id="currentTitle"
                  value={formData.currentTitle}
                  onChange={(e) => updateField("currentTitle", e.target.value)}
                  placeholder="e.g. Frontend Engineer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Active Skills (comma separated)</Label>
                <Input
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => updateField("skills", e.target.value)}
                  placeholder="JavaScript, React, Node.js"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Recent Experience Bullets</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => updateField("experience", e.target.value)}
                  placeholder="Paste brief bullet points of your current or previous roles..."
                  rows={6}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleOptimize}
                disabled={isGenerating}
                className="w-full rounded-xl gap-2 bg-[#0077B5] hover:bg-[#006295]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Optimizing Profile...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Optimize Profile
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Outputs */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">Suggestions & Generated Content</CardTitle>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground animate-pulse">Running profile audit...</p>
                </div>
              ) : optimization ? (
                <div className="space-y-6">
                  {/* Headline */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground">Optimized Headline</h4>
                      <Button variant="ghost" size="sm" onClick={copyHeadline} className="rounded-xl h-8">
                        {copiedHeadline ? (
                          <Check className="h-3.5 w-3.5 mr-1 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 mr-1" />
                        )}
                        Copy
                      </Button>
                    </div>
                    <div className="text-sm border border-border bg-secondary/35 p-3 rounded-xl font-medium text-foreground">
                      {optimization.optimizedHeadline}
                    </div>
                  </div>

                  {/* About Summary */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground">Generated About Section</h4>
                      <Button variant="ghost" size="sm" onClick={copySummary} className="rounded-xl h-8">
                        {copiedSummary ? (
                          <Check className="h-3.5 w-3.5 mr-1 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 mr-1" />
                        )}
                        Copy
                      </Button>
                    </div>
                    <div className="text-xs leading-relaxed border border-border bg-secondary/35 p-3 rounded-xl text-muted-foreground whitespace-pre-wrap">
                      {optimization.aboutSummary}
                    </div>
                  </div>

                  {/* Bullet Enhancements */}
                  {optimization.experienceEnhancements && optimization.experienceEnhancements.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-foreground">Experience Enhancement suggestions</h4>
                      {optimization.experienceEnhancements.map((exp, idx) => (
                        <div key={idx} className="space-y-2 border-t pt-3">
                          <h5 className="text-xs font-bold text-foreground">{exp.role || "Target Role"}</h5>
                          <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                            {exp.optimizedPoints.map((pt, i) => (
                              <li key={i} className="hover:text-foreground transition-colors">{pt}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Keywords */}
                  {optimization.keywordSuggestions && optimization.keywordSuggestions.length > 0 && (
                    <div className="space-y-2 border-t pt-4">
                      <h4 className="text-sm font-semibold text-foreground">High-Traffic Keyword Suggestions</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {optimization.keywordSuggestions.map((kw, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {kw}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Items */}
                  {optimization.actionItems && optimization.actionItems.length > 0 && (
                    <div className="space-y-2 border-t pt-4">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <ListTodo className="w-4 h-4 text-emerald-500" />
                        Action Checklist
                      </h4>
                      <ul className="list-none text-xs text-muted-foreground space-y-1.5">
                        {optimization.actionItems.map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-24 text-muted-foreground">
                  <Linkedin className="h-16 w-16 mx-auto mb-4 opacity-10" />
                  <p className="font-medium">No Optimization Audits Run</p>
                  <p className="text-sm">Submit your profile overview to receive tailored recommendation scripts.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AILinkedin;
