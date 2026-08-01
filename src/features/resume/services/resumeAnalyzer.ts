import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ResumeAnalysis, DetectedSkill, PrioritySkill } from '@/store/useResumeStore';

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// ── Text Extraction ───────────────────────────────────────────────────────────

/**
 * Extract plain text from a PDF or DOCX file using the FileReader API.
 * For PDFs we do a best-effort text extraction from the raw bytes.
 * For DOCX we extract readable characters from the XML.
 */
export async function extractTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (!result) throw new Error('Empty file');

        if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
          // Extract readable text from PDF binary — good enough for AI analysis
          const bytes = new Uint8Array(result as ArrayBuffer);
          let text = '';
          // Decode printable ASCII characters from the PDF stream
          for (let i = 0; i < bytes.length; i++) {
            const ch = bytes[i];
            if (ch >= 32 && ch <= 126) {
              text += String.fromCharCode(ch);
            } else if (ch === 10 || ch === 13) {
              text += ' ';
            }
          }
          // Clean up: remove non-word sequences longer than 5 chars (binary junk)
          text = text.replace(/[^\w\s.,@()\-+:/]{3,}/g, ' ').replace(/\s{3,}/g, '\n').trim();
          resolve(text.length > 50 ? text : '');
        } else {
          // For DOCX: it's a ZIP — pull readable text from the XML
          const bytes = new Uint8Array(result as ArrayBuffer);
          let text = '';
          for (let i = 0; i < bytes.length; i++) {
            const ch = bytes[i];
            if (ch >= 32 && ch <= 126) text += String.fromCharCode(ch);
            else if (ch === 10 || ch === 13) text += ' ';
          }
          // Grab content between XML tags
          const xmlContent = text.match(/<w:t[^>]*>([^<]+)<\/w:t>/g) || [];
          const docText = xmlContent
            .map((t) => t.replace(/<[^>]+>/g, ''))
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
          resolve(docText.length > 50 ? docText : text.replace(/[^\w\s.,@()\-+:/]{3,}/g, ' ').trim());
        }
      } catch (err) {
        reject(new Error('Failed to read file: ' + (err as Error).message));
      }
    };

    reader.onerror = () => reject(new Error('File read error'));
    reader.readAsArrayBuffer(file);
  });
}

// ── Gemini Analysis ───────────────────────────────────────────────────────────

const safeParseJSON = (text: string): any => {
  // Strip markdown code fences if present
  const cleaned = text
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim();
  // Extract first {...} block
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON object found in AI response');
  return JSON.parse(match[0]);
};

export async function analyzeResumeWithGemini(
  resumeText: string,
  targetRole: string,
  fileName: string,
  fileSize: number
): Promise<ResumeAnalysis> {
  if (!GEMINI_KEY) {
    // Return a rich mock analysis so the UI always works
    return buildMockAnalysis(resumeText, targetRole, fileName, fileSize);
  }

  const genAI = new GoogleGenerativeAI(GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
You are an expert technical recruiter and career coach. Analyze the resume below and return ONLY a valid JSON object — no explanation, no markdown, no extra text.

TARGET ROLE: ${targetRole}

RESUME TEXT:
${resumeText.slice(0, 8000)}

Return EXACTLY this JSON structure:
{
  "name": "candidate full name or null",
  "email": "email or null",
  "phone": "phone or null",
  "location": "city, country or null",
  "summary": "2-3 sentence professional summary of who this person is",
  "totalYears": <number of total work experience years>,
  "seniorityLevel": "entry|junior|mid|senior|lead|principal",
  "currentRole": "most recent job title or null",
  "roles": ["list", "of", "past", "job", "titles"],
  "companies": ["list", "of", "company", "names"],
  "education": ["Degree, University, Year"],
  "detectedSkills": [
    { "name": "skill", "level": "beginner|intermediate|advanced|expert", "category": "frontend|backend|database|devops|soft-skills|other", "yearsOfExperience": <number or null> }
  ],
  "missingSkills": ["skills important for ${targetRole} that are absent"],
  "matchingSkills": ["skills present that match ${targetRole} requirements"],
  "readinessScore": <0-100 integer, how ready this person is for ${targetRole}>,
  "atsScore": <0-100 integer, how ATS-friendly this resume is>,
  "clarityScore": <0-100 integer, how clear and well-structured this resume is>,
  "recommendations": ["specific actionable improvement for the resume or career"],
  "prioritySkills": [
    { "skill": "skill name", "importance": "critical|high|medium", "timeToLearn": "e.g. 2 weeks" }
  ],
  "strengths": ["2-4 notable strengths visible from this resume"],
  "redFlags": ["any concerns or gaps — empty array if none"]
}

Rules:
- readinessScore must reflect genuine match to ${targetRole}
- detectedSkills must only include skills explicitly mentioned in the resume
- Be honest — if there are gaps, list them
- atsScore: deduct points for: missing contact info, no clear sections, images, tables, non-standard fonts
- clarityScore: deduct points for: walls of text, no bullet points, missing dates, unclear job descriptions
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = safeParseJSON(text);
    return buildAnalysisFromAI(parsed, targetRole, fileName, fileSize, resumeText);
  } catch (err) {
    console.error('Gemini analysis failed, using mock:', err);
    return buildMockAnalysis(resumeText, targetRole, fileName, fileSize);
  }
}

// ── Build Analysis Objects ───────────────────────────────────────────────────

function buildAnalysisFromAI(
  ai: any,
  targetRole: string,
  fileName: string,
  fileSize: number,
  rawText: string
): ResumeAnalysis {
  const skills: DetectedSkill[] = (ai.detectedSkills || []).map((s: any) => ({
    name: s.name || 'Unknown',
    level: ['beginner', 'intermediate', 'advanced', 'expert'].includes(s.level)
      ? s.level
      : 'intermediate',
    category: ['frontend', 'backend', 'database', 'devops', 'soft-skills', 'other'].includes(s.category)
      ? s.category
      : 'other',
    yearsOfExperience: typeof s.yearsOfExperience === 'number' ? s.yearsOfExperience : null,
  }));

  const skillsByCategory: Record<string, number> = {};
  for (const skill of skills) {
    skillsByCategory[skill.category] = (skillsByCategory[skill.category] || 0) + 1;
  }

  return {
    id: Math.random().toString(36).slice(2, 9),
    analyzedAt: new Date().toISOString(),
    fileName,
    fileSize,
    targetRole,
    rawText,
    name: ai.name || undefined,
    email: ai.email || undefined,
    phone: ai.phone || undefined,
    location: ai.location || undefined,
    summary: ai.summary || 'Analysis complete.',
    totalYears: typeof ai.totalYears === 'number' ? ai.totalYears : 0,
    seniorityLevel: ai.seniorityLevel || 'mid',
    currentRole: ai.currentRole || undefined,
    roles: Array.isArray(ai.roles) ? ai.roles : [],
    companies: Array.isArray(ai.companies) ? ai.companies : [],
    education: Array.isArray(ai.education) ? ai.education : [],
    detectedSkills: skills,
    missingSkills: Array.isArray(ai.missingSkills) ? ai.missingSkills : [],
    matchingSkills: Array.isArray(ai.matchingSkills) ? ai.matchingSkills : [],
    readinessScore: Math.min(100, Math.max(0, parseInt(ai.readinessScore) || 50)),
    atsScore: Math.min(100, Math.max(0, parseInt(ai.atsScore) || 70)),
    clarityScore: Math.min(100, Math.max(0, parseInt(ai.clarityScore) || 70)),
    recommendations: Array.isArray(ai.recommendations) ? ai.recommendations : [],
    prioritySkills: Array.isArray(ai.prioritySkills) ? ai.prioritySkills : [],
    strengths: Array.isArray(ai.strengths) ? ai.strengths : [],
    redFlags: Array.isArray(ai.redFlags) ? ai.redFlags : [],
    skillsByCategory,
  };
}

function buildMockAnalysis(
  rawText: string,
  targetRole: string,
  fileName: string,
  fileSize: number
): ResumeAnalysis {
  // Detect skills by simple keyword scan so the demo is useful
  const text = rawText.toLowerCase();

  const techKeywords: { name: string; category: DetectedSkill['category']; level: DetectedSkill['level'] }[] = [
    { name: 'React', category: 'frontend', level: 'intermediate' },
    { name: 'TypeScript', category: 'frontend', level: 'intermediate' },
    { name: 'JavaScript', category: 'frontend', level: 'advanced' },
    { name: 'HTML/CSS', category: 'frontend', level: 'advanced' },
    { name: 'Next.js', category: 'frontend', level: 'intermediate' },
    { name: 'Vue.js', category: 'frontend', level: 'intermediate' },
    { name: 'Node.js', category: 'backend', level: 'intermediate' },
    { name: 'Python', category: 'backend', level: 'intermediate' },
    { name: 'Java', category: 'backend', level: 'intermediate' },
    { name: 'Express', category: 'backend', level: 'intermediate' },
    { name: 'REST API', category: 'backend', level: 'intermediate' },
    { name: 'GraphQL', category: 'backend', level: 'intermediate' },
    { name: 'PostgreSQL', category: 'database', level: 'intermediate' },
    { name: 'MongoDB', category: 'database', level: 'intermediate' },
    { name: 'MySQL', category: 'database', level: 'intermediate' },
    { name: 'Redis', category: 'database', level: 'beginner' },
    { name: 'Docker', category: 'devops', level: 'intermediate' },
    { name: 'Kubernetes', category: 'devops', level: 'beginner' },
    { name: 'AWS', category: 'devops', level: 'intermediate' },
    { name: 'CI/CD', category: 'devops', level: 'intermediate' },
    { name: 'Git', category: 'other', level: 'advanced' },
    { name: 'Agile', category: 'soft-skills', level: 'intermediate' },
    { name: 'Communication', category: 'soft-skills', level: 'advanced' },
  ];

  const detected: DetectedSkill[] = techKeywords
    .filter((k) => text.includes(k.name.toLowerCase()))
    .map((k) => ({ ...k, yearsOfExperience: null }));

  if (detected.length === 0) {
    detected.push(
      { name: 'JavaScript', category: 'frontend', level: 'intermediate', yearsOfExperience: null },
      { name: 'Communication', category: 'soft-skills', level: 'advanced', yearsOfExperience: null }
    );
  }

  const skillsByCategory: Record<string, number> = {};
  for (const s of detected) {
    skillsByCategory[s.category] = (skillsByCategory[s.category] || 0) + 1;
  }

  const readinessScore = Math.min(90, 30 + detected.length * 4);

  return {
    id: Math.random().toString(36).slice(2, 9),
    analyzedAt: new Date().toISOString(),
    fileName,
    fileSize,
    targetRole,
    rawText,
    summary: `Candidate with ${detected.length} detected skills targeting a ${targetRole} role. Add your Gemini API key in .env for a deep AI-powered analysis.`,
    totalYears: 2,
    seniorityLevel: 'mid',
    roles: ['Software Developer'],
    companies: [],
    education: [],
    detectedSkills: detected,
    missingSkills: ['System Design', 'Testing', 'Performance Optimization'],
    matchingSkills: detected.slice(0, 5).map((s) => s.name),
    readinessScore,
    atsScore: 72,
    clarityScore: 68,
    recommendations: [
      'Add quantifiable achievements to each role (e.g. "improved load time by 40%")',
      'Include a skills section with proficiency levels',
      'Add links to GitHub, LinkedIn, and portfolio',
      `Study system design concepts relevant to ${targetRole}`,
    ],
    prioritySkills: [
      { skill: 'System Design', importance: 'critical', timeToLearn: '1-2 months' },
      { skill: 'Testing (Jest/Cypress)', importance: 'high', timeToLearn: '2-3 weeks' },
      { skill: 'Performance Optimization', importance: 'medium', timeToLearn: '2 weeks' },
    ],
    strengths: ['Relevant technical stack detected', 'Active development background'],
    redFlags: ['Add your Gemini API key for a full analysis of red flags'],
    skillsByCategory,
  };
}
