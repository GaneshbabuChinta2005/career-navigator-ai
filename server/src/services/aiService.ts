import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || '');

/**
 * AI PROMPT LIBRARY - Production-Grade Structured Prompts
 */

/**
 * Extract skills from resume text
 */
export const analyzeResumeSkills = async (resumeText: string, targetRole: string): Promise<any> => {
    const prompt = `
You are an expert technical recruiter and career coach. Analyze the following resume and extract structured information.

TARGET ROLE: ${targetRole}

RESUME TEXT:
${resumeText}

Task: Extract and categorize the candidate's skills.

Return ONLY valid JSON in this exact format:
{
  "detectedSkills": [
    {
      "name": "skill name",
      "level": "beginner|intermediate|advanced|expert",
      "category": "frontend|backend|database|devops|soft-skills|other",
      "yearsOfExperience": number or null
    }
  ],
  "experience": {
    "totalYears": number,
    "roles": ["role1", "role2"]
  },
  "summary": "brief 2-3 sentence summary of the candidate"
}

Be precise. Only include skills explicitly mentioned or strongly implied.
`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('Failed to parse AI response');
    }

    return JSON.parse(jsonMatch[0]);
};

/**
 * Perform skill gap analysis
 */
export const performSkillGapAnalysis = async (
    userSkills: any[],
    targetRole: string
): Promise<any> => {
    const prompt = `
You are a senior career advisor. Analyze the skill gap for a ${targetRole} role.

CURRENT SKILLS:
${JSON.stringify(userSkills, null, 2)}

Task: Identify what's missing for a strong ${targetRole} candidate.

Return ONLY valid JSON:
{
  "missingSkills": ["skill1", "skill2", ...],
  "matchingSkills": ["skill1", "skill2", ...],
  "readinessScore": number (0-100),
  "recommendations": [
    "actionable recommendation 1",
    "actionable recommendation 2"
  ],
  "prioritySkills": [
    {
      "skill": "skill name",
      "importance": "critical|high|medium",
      "timeToLearn": "1-2 weeks|1-2 months|3-6 months"
    }
  ]
}

Be realistic and specific. Focus on skills that truly matter for ${targetRole}.
`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('Failed to parse AI response');
    }

    return JSON.parse(jsonMatch[0]);
};

/**
 * Generate personalized learning roadmap
 */
export const generateLearningRoadmap = async (
    targetRole: string,
    currentSkills: any[],
    missingSkills: string[],
    timeline: number // days
): Promise<any> => {
    const prompt = `
You are an expert learning path designer. Create a ${timeline}-day roadmap for someone to become job-ready as a ${targetRole}.

CURRENT SKILLS:
${JSON.stringify(currentSkills, null, 2)}

SKILLS TO LEARN:
${missingSkills.join(', ')}

Task: Design a week-by-week learning plan.

Return ONLY valid JSON:
{
  "title": "${targetRole} Mastery Roadmap",
  "duration": ${timeline},
  "weeks": [
    {
      "weekNumber": 1,
      "focus": "Week theme",
      "goals": ["goal1", "goal2"],
      "tasks": [
        {
          "title": "Task name",
          "description": "What to do",
          "estimatedHours": number,
          "completed": false
        }
      ],
      "resources": [
        {
          "title": "Resource name",
          "url": "https://example.com",
          "type": "video|article|course|documentation"
        }
      ]
    }
  ]
}

Make it practical, achievable, and include real resources (prefer free/official docs).
`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('Failed to parse AI response');
    }

    return JSON.parse(jsonMatch[0]);
};

/**
 * Match job description with user skills
 */
export const matchJobDescription = async (
    jobDescription: string,
    userSkills: any[]
): Promise<any> => {
    const prompt = `
You are a job matching AI. Analyze how well a candidate matches a job description.

JOB DESCRIPTION:
${jobDescription}

CANDIDATE SKILLS:
${JSON.stringify(userSkills, null, 2)}

Task: Calculate match score and provide insights.

Return ONLY valid JSON:
{
  "matchScore": number (0-100),
  "matchingSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "recommendation": "detailed paragraph on whether to apply and how to improve",
  "priority": "high|medium|low"
}

Be honest about the match quality.
`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('Failed to parse AI response');
    }

    return JSON.parse(jsonMatch[0]);
};

/**
 * Analyze interview feedback for patterns
 */
export const analyzeInterviewPatterns = async (feedbackHistory: any[]): Promise<any> => {
    const prompt = `
You are a career coach analyzing interview performance patterns.

INTERVIEW HISTORY:
${JSON.stringify(feedbackHistory, null, 2)}

Task: Identify recurring weaknesses and provide actionable advice.

Return ONLY valid JSON:
{
  "recurringWeaknesses": [
    {
      "area": "weakness name",
      "frequency": number,
      "impact": "high|medium|low"
    }
  ],
  "strengths": ["strength1", "strength2"],
  "recommendations": [
    "specific action to improve weakness 1",
    "specific action to improve weakness 2"
  ],
  "overallTrend": "improving|stable|declining"
}

Focus on patterns across multiple interviews.
`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('Failed to parse AI response');
    }

    return JSON.parse(jsonMatch[0]);
};

/**
 * Career mentor chat response
 */
export const mentorChat = async (
    message: string,
    userContext: { skills: any[]; targetRole: string; recentActivity?: string }
): Promise<string> => {
    const prompt = `
You are an experienced career mentor specializing in ${userContext.targetRole} roles.

USER CONTEXT:
- Target Role: ${userContext.targetRole}
- Skills: ${JSON.stringify(userContext.skills)}
${userContext.recentActivity ? `- Recent Activity: ${userContext.recentActivity}` : ''}

USER MESSAGE: ${message}

Provide helpful, personalized career advice. Be encouraging but realistic. Keep responses concise (2-3 paragraphs max).
`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    return result.response.text();
};

/**
 * Generate a personalized cover letter matching candidate details with a job description.
 */
export const generateCoverLetter = async (input: {
    userInfo: {
        name: string;
        email: string;
        phone?: string;
        currentTitle: string;
        experience: string;
        skills: string;
        achievements?: string;
    };
    jobInfo: {
        title: string;
        company: string;
        description: string;
        hiringManager?: string;
    };
    tone: string;
    length: string;
}): Promise<any> => {
    const prompt = `
You are an expert career coach. Generate a personalized cover letter matching candidate details with a job description.

CANDIDATE INFORMATION:
Name: ${input.userInfo.name}
Email: ${input.userInfo.email}
Phone: ${input.userInfo.phone || ''}
Current Title: ${input.userInfo.currentTitle}
Experience: ${input.userInfo.experience}
Skills: ${input.userInfo.skills}
Achievements: ${input.userInfo.achievements || ''}

JOB DETAILS:
Position: ${input.jobInfo.title}
Company: ${input.jobInfo.company}
Hiring Manager: ${input.jobInfo.hiringManager || ''}
Job Description: ${input.jobInfo.description}

Generate a ${input.length} cover letter with a ${input.tone} tone.

Return ONLY valid JSON in this exact format:
{
  "coverLetter": "The complete text of the cover letter. Use single newlines for spacing. Do not include address blocks or placeholders like [Your Name]. Use the details provided directly.",
  "keyPoints": ["Highlighted point 1", "Highlighted point 2"],
  "matchedSkills": ["Skill 1", "Skill 2"],
  "suggestions": ["Tip for personalization 1", "Tip for personalization 2"]
}
`;
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('Failed to parse AI response');
    }
    return JSON.parse(jsonMatch[0]);
};

/**
 * Evaluate user skills/experience and suggest LinkedIn profile enhancements.
 */
export const optimizeLinkedInProfile = async (input: {
    name: string;
    currentTitle: string;
    experience: string;
    skills: string;
    targetRole: string;
}): Promise<any> => {
    const prompt = `
You are an expert LinkedIn profile optimization specialist. Analyze the user's profile and target role to provide suggestions.

PROFILE DETAILS:
Name: ${input.name}
Current Title: ${input.currentTitle}
Target Role: ${input.targetRole}
Experience: ${input.experience}
Skills: ${input.skills}

Return ONLY valid JSON in this exact format:
{
  "optimizedHeadline": "A compelling, keyword-rich LinkedIn headline (max 220 chars)",
  "aboutSummary": "An engaging, professional 'About' section written in first-person (3-4 paragraphs)",
  "experienceEnhancements": [
    {
      "role": "Role Name",
      "originalPoints": "Overview of original description",
      "optimizedPoints": ["Bullet point 1 using action verbs and metrics", "Bullet point 2 using action verbs and metrics"]
    }
  ],
  "keywordSuggestions": ["keyword1", "keyword2"],
  "actionItems": ["Actionable step 1 to improve visibility", "Actionable step 2 to improve visibility"]
}
`;
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('Failed to parse AI response');
    }
    return JSON.parse(jsonMatch[0]);
};

/**
 * Analyze context to build a negotiation script and strategy.
 */
export const negotiateSalary = async (input: {
    role: string;
    experienceLevel: string;
    location: string;
    currentOffer?: string;
    targetSalary?: string;
}): Promise<any> => {
    const prompt = `
You are a professional salary negotiator. Build a negotiation script and strategy handbook.

NEGOTIATION CONTEXT:
Role: ${input.role}
Experience Level: ${input.experienceLevel}
Location: ${input.location}
Current Offer: ${input.currentOffer || 'Not specified'}
Target Salary: ${input.targetSalary || 'Not specified'}

Return ONLY valid JSON in this exact format:
{
  "marketInsights": {
    "low": number (e.g. 70000),
    "median": number (e.g. 95000),
    "high": number (e.g. 130000),
    "currency": "USD",
    "description": "Brief description of the market status for this role"
  },
  "scripts": {
    "email": "An email draft asking for a salary revision professionally",
    "verbal": "A verbal script/talking points to use during a live discussion"
  },
  "strategies": ["Negotiation strategy 1", "Negotiation strategy 2"],
  "objectionHandlers": [
    {
      "employerObjection": "Employer's reason for not paying more (e.g. budget limits)",
      "counterArgument": "The candidate's response scripts and counter reasoning"
    }
  ]
}
`;
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('Failed to parse AI response');
    }
    return JSON.parse(jsonMatch[0]);
};
