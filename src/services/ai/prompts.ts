export const SKILL_GAP_PROMPT = (skills: Record<string, number>, targetRole: string) => `
You are a career coach for software developers. Analyze these skills and provide actionable insights.

Current Skills (0-100 scale):
${Object.entries(skills).map(([skill, level]) => `- ${skill}: ${level}%`).join('\n')}

Target Role: ${targetRole}

Provide a JSON response with:
1. criticalGaps: array of skills below 50% that are essential
2. importantGaps: array of skills 50-70% that need improvement
3. recommendations: array of 3-5 specific action items
4. estimatedTime: realistic timeframe to reach readiness
5. resources: suggested learning paths per critical skill

Format as valid JSON only.
`;

export const CAREER_COACH_PROMPT = (question: string, context?: string) => `
You are an expert career coach specializing in software development careers.

${context ? `Context: ${context}` : ''}

Question: ${question}

Provide helpful, actionable advice in a friendly tone. Keep responses concise (2-3 paragraphs max).
Include specific action items when relevant.
`;

export const ROADMAP_GENERATOR_PROMPT = (gaps: string[], timeframe: number) => `
Create a ${timeframe}-day learning roadmap for these skills:
${gaps.map(gap => `- ${gap}`).join('\n')}

Provide week-by-week breakdown with:
- Specific learning goals
- Recommended resources (courses, docs, practice)
- Time estimates
- Milestones

Format as markdown.
`;

export const ROADMAP_STRUCTURED_PROMPT = (
    targetRole: string,
    currentSkills: string,
    timeline: number,
    focusAreas: string
) => `
You are an expert career learning path designer. Create a detailed, realistic ${timeline}-day learning roadmap for someone aiming to become a ${targetRole}.

CURRENT SKILLS: ${currentSkills || 'Not specified'}
FOCUS AREAS: ${focusAreas || 'General preparation'}

Design the roadmap as ${Math.ceil(timeline / 30)} phases of roughly 30 days each.

Return ONLY valid JSON in this EXACT format (no markdown, no extra text):
{
  "phases": [
    {
      "title": "30-Day Foundation",
      "color": "cyan",
      "weeks": [
        {
          "title": "Week 1: Topic Name",
          "tasks": [
            {
              "title": "Specific task to complete",
              "priority": "high",
              "resource": "https://real-url.com or descriptive note"
            }
          ]
        }
      ]
    }
  ]
}

RULES:
- Use exactly ${Math.ceil(timeline / 30)} phase(s)
- Phase titles must follow pattern: "30-Day X", "60-Day X", "90-Day X", etc.
- Colors must rotate through: "cyan", "violet", "pink", "emerald", "orange"
- Each phase must have 2-4 weeks
- Each week must have 2-5 specific, actionable tasks
- Priority must be one of: "high", "medium", "low"
- resources should be real URLs when possible (official docs, free courses like FreeCodeCamp, MDN, etc.)
- Tasks should be concrete and achievable within the week
- Focus on skills most relevant to ${targetRole}
`;

export const INTERVIEW_PREP_PROMPT = (role: string, skillLevel: string) => `
Generate 5 interview questions for a ${role} position.
Candidate skill level: ${skillLevel}

Include:
- 2 technical questions
- 1 system design question
- 1 behavioral question  
- 1 coding problem

Format each with question and a brief hint.
`;
