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
