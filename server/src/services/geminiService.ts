import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || '');

export const generateContent = async (prompt: string): Promise<string> => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error('Failed to generate AI content');
    }
};

export const parseResume = async (resumeText: string) => {
    const prompt = `
    Analyze the following resume text for a Software Engineering candidate.
    
    RESUME TEXT:
    ${resumeText}
    
    OUTPUT FORMAT (JSON ONLY):
    {
      "extracted_skills": [
        { "name": "Skill Name", "level": 0-100, "category": "Frontend|Backend|DevOps|Soft Skills" }
      ],
      "experience_summary": "One sentence summary.",
      "detected_role": "Most likely fit",
      "missing_critical_skills": ["Skill 1", "Skill 2"]
    }
  `;
    const result = await generateContent(prompt);
    return JSON.parse(result.replace(/```json|```/g, ''));
};

export const generateRoadmapAI = async (currentSkills: string[], targetRole: string) => {
    const prompt = `
    Create a detailed, week-by-week 30-day learning roadmap.
    
    CURRENT SKILLS: ${currentSkills.join(', ')}
    TARGET ROLE: ${targetRole}
    TIMEFRAME: 30 days
    
    REQUIREMENTS:
    1. Focus heavily on missing skills.
    2. Be practical (build projects).
    
    OUTPUT FORMAT (JSON ONLY):
    {
      "weeks": [
        {
          "week_number": 1,
          "theme": "Theme",
          "goals": ["Goal 1", "Goal 2"],
          "resources": [
            {"title": "Resource", "type": "Course|Article", "url": "null"}
          ],
          "project_task": "Build X"
        }
      ]
    }
  `;
    const result = await generateContent(prompt);
    return JSON.parse(result.replace(/```json|```/g, ''));
};
