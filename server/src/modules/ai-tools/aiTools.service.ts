import { generateStructuredContent } from '../../core/ai';
import { AppError } from '../../core/errors';

export class AiToolsService {
    async generateCoverLetter(input: {
        userInfo: { name: string; email: string; phone?: string; currentTitle: string; experience: string; skills: string; achievements?: string };
        jobInfo: { title: string; company: string; description: string; hiringManager?: string };
        tone: string;
        length: string;
    }) {
        return generateStructuredContent<any>(`
You are an expert career coach. Generate a personalized cover letter matching candidate details with a job description.
CANDIDATE: Name: ${input.userInfo.name}, Title: ${input.userInfo.currentTitle}, Experience: ${input.userInfo.experience}, Skills: ${input.userInfo.skills}, Achievements: ${input.userInfo.achievements || ''}
JOB: Position: ${input.jobInfo.title}, Company: ${input.jobInfo.company}, Hiring Manager: ${input.jobInfo.hiringManager || ''}, Description: ${input.jobInfo.description}
Generate a ${input.length} cover letter with a ${input.tone} tone.
Return ONLY valid JSON:
{
  "coverLetter": "string",
  "keyPoints": ["string"],
  "matchedSkills": ["string"],
  "suggestions": ["string"]
}`);
    }

    async optimizeLinkedIn(input: { name: string; currentTitle: string; experience: string; skills: string; targetRole: string }) {
        return generateStructuredContent<any>(`
You are an expert LinkedIn profile optimization specialist.
PROFILE: Name: ${input.name}, Title: ${input.currentTitle}, Target: ${input.targetRole}, Experience: ${input.experience}, Skills: ${input.skills}
Return ONLY valid JSON:
{
  "optimizedHeadline": "string",
  "aboutSummary": "string",
  "experienceEnhancements": [{ "role": "string", "originalPoints": "string", "optimizedPoints": ["string"] }],
  "keywordSuggestions": ["string"],
  "actionItems": ["string"]
}`);
    }

    async negotiateSalary(input: { role: string; experienceLevel: string; location: string; currentOffer?: string; targetSalary?: string }) {
        return generateStructuredContent<any>(`
You are a professional salary negotiator.
CONTEXT: Role: ${input.role}, Level: ${input.experienceLevel}, Location: ${input.location}, Offer: ${input.currentOffer || 'Not specified'}, Target: ${input.targetSalary || 'Not specified'}
Return ONLY valid JSON:
{
  "marketInsights": { "low": number, "median": number, "high": number, "currency": "USD", "description": "string" },
  "scripts": { "email": "string", "verbal": "string" },
  "strategies": ["string"],
  "objectionHandlers": [{ "employerObjection": "string", "counterArgument": "string" }]
}`);
    }
}

export const aiToolsService = new AiToolsService();
