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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Sparkles,
  Copy,
  Check,
  ArrowLeft,
  Building2,
  User,
  Lightbulb,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { api } from "@/lib/api";
import { toast } from "sonner";

type Tone = "professional" | "enthusiastic" | "confident" | "conversational";
type Length = "short" | "medium" | "long";

interface CoverLetterData {
  name: string;
  email: string;
  phone: string;
  currentTitle: string;
  experience: string;
  skills: string;
  achievements: string;
  jobTitle: string;
  company: string;
  hiringManager: string;
  jobDescription: string;
  tone: Tone;
  length: Length;
}

interface GeneratedCoverLetter {
  coverLetter: string;
  keyPoints: string[];
  matchedSkills: string[];
  suggestions: string[];
}

const AICoverLetter = () => {
  const { user } = useAuthStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState<GeneratedCoverLetter | null>(null);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState<CoverLetterData>({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    currentTitle: "",
    experience: "",
    skills: "",
    achievements: "",
    jobTitle: "",
    company: "",
    hiringManager: "",
    jobDescription: "",
    tone: "professional",
    length: "medium",
  });

  const updateField = (field: keyof CoverLetterData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.jobTitle || !formData.company || !formData.jobDescription) {
      toast.error("Please fill in the job title, company, and job description.");
      return;
    }

    setIsGenerating(true);
    setGeneratedLetter(null);

    try {
      const response = await api.post("/ai-tools/cover-letter", {
        userInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          currentTitle: formData.currentTitle,
          experience: formData.experience,
          skills: formData.skills,
          achievements: formData.achievements,
        },
        jobInfo: {
          title: formData.jobTitle,
          company: formData.company,
          description: formData.jobDescription,
          hiringManager: formData.hiringManager,
        },
        tone: formData.tone,
        length: formData.length,
      });

      if (response.data.status === "success") {
        setGeneratedLetter(response.data.data);
        toast.success("Cover Letter Generated Successfully! 🎉");
      } else {
        throw new Error(response.data.message || "Failed to generate cover letter.");
      }
    } catch (error: any) {
      console.error("Cover letter generation error:", error);
      toast.error(error.message || "Failed to generate cover letter. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedLetter) return;
    navigator.clipboard.writeText(generatedLetter.coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard!");
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
          <h1 className="text-3xl font-bold tracking-tight">Cover Letter Generator</h1>
          <p className="text-muted-foreground">
            Generate custom, targeted cover letters using AI insights.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-violet-500" />
                Candidate Profile
              </CardTitle>
              <CardDescription>Enter details about yourself and your background.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentTitle">Current Title</Label>
                  <Input
                    id="currentTitle"
                    value={formData.currentTitle}
                    onChange={(e) => updateField("currentTitle", e.target.value)}
                    placeholder="e.g. Frontend Developer"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Key Skills (comma separated)</Label>
                <Input
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => updateField("skills", e.target.value)}
                  placeholder="React, TypeScript, CSS, Node.js"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience Summary</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => updateField("experience", e.target.value)}
                  placeholder="Write a summary of your professional experience..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="achievements">Key Achievements (Optional)</Label>
                <Textarea
                  id="achievements"
                  value={formData.achievements}
                  onChange={(e) => updateField("achievements", e.target.value)}
                  placeholder="Write outstanding highlights you want to highlight..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5 text-blue-500" />
                Job Opportunity details
              </CardTitle>
              <CardDescription>Provide targets and job details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => updateField("jobTitle", e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => updateField("company", e.target.value)}
                    placeholder="e.g. Google"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hiringManager">Hiring Manager Name (Optional)</Label>
                <Input
                  id="hiringManager"
                  value={formData.hiringManager}
                  onChange={(e) => updateField("hiringManager", e.target.value)}
                  placeholder="e.g. Hiring Team or Jane Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description *</Label>
                <Textarea
                  id="jobDescription"
                  value={formData.jobDescription}
                  onChange={(e) => updateField("jobDescription", e.target.value)}
                  placeholder="Paste the job description or core responsibilities here..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generation Options</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select
                  value={formData.tone}
                  onValueChange={(val: Tone) => updateField("tone", val)}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    <SelectItem value="confident">Confident</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="length">Length</Label>
                <Select
                  value={formData.length}
                  onValueChange={(val: Length) => updateField("length", val)}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full rounded-xl gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Letter...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Cover Letter
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
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="h-5 w-5 text-indigo-500" />
                  Generated Letter
                </CardTitle>
                {generatedLetter && (
                  <Button variant="outline" size="sm" onClick={copyToClipboard} className="rounded-xl">
                    {copied ? (
                      <Check className="h-4 w-4 mr-1.5 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 mr-1.5" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground animate-pulse">AI is writing your letter...</p>
                </div>
              ) : generatedLetter ? (
                <div className="space-y-6">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground bg-secondary/30 p-4 rounded-2xl border border-border">
                    {generatedLetter.coverLetter}
                  </div>

                  {/* Highlights */}
                  {generatedLetter.keyPoints && generatedLetter.keyPoints.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground">Highlighted Points</h4>
                      <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                        {generatedLetter.keyPoints.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills addressed */}
                  {generatedLetter.matchedSkills && generatedLetter.matchedSkills.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground">Skills Addressed</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {generatedLetter.matchedSkills.map((sk, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {sk}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions */}
                  {generatedLetter.suggestions && generatedLetter.suggestions.length > 0 && (
                    <div className="border-t pt-4 space-y-2">
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        Recommendations for Personalization
                      </h4>
                      <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                        {generatedLetter.suggestions.map((sug, i) => (
                          <li key={i}>{sug}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-24 text-muted-foreground">
                  <Mail className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p className="font-medium">Form Not Submitted</p>
                  <p className="text-sm">Complete the details and hit Generate to build a letter.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AICoverLetter;
