import type { InterviewQuestion, QuestionResponse } from '@/store/useInterviewStore';

/**
 * Evaluates a text answer against the question and returns a score + feedback.
 * This is a heuristic scorer — no external API needed.
 */
export function scoreAnswer(
  question: InterviewQuestion,
  answer: string,
  timeTaken: number
): QuestionResponse {
  const trimmed = answer.trim();
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;

  // Behavioral questions: score based on length and STAR keywords
  if (question.category === 'behavioral') {
    return scoreBehavioral(question, trimmed, wordCount, timeTaken);
  }

  // Technical / system-design: score based on keyword coverage
  return scoreTechnical(question, trimmed, wordCount, timeTaken);
}

function scoreBehavioral(
  question: InterviewQuestion,
  answer: string,
  wordCount: number,
  timeTaken: number
): QuestionResponse {
  let score = 0;
  const feedbackParts: string[] = [];
  const lower = answer.toLowerCase();

  // Length check
  if (wordCount < 20) {
    score += 1;
    feedbackParts.push('Your answer was very brief. Behavioral questions benefit from detailed stories.');
  } else if (wordCount < 60) {
    score += 4;
    feedbackParts.push('Good start — try adding more context and outcome detail.');
  } else if (wordCount < 120) {
    score += 6;
    feedbackParts.push('Good length. Make sure you cover the outcome clearly.');
  } else {
    score += 7;
  }

  // STAR method keywords
  const starKeywords = {
    situation: ['situation', 'context', 'was working', 'at the time', 'project'],
    task: ['task', 'responsibility', 'challenge', 'needed to', 'had to'],
    action: ['i did', 'i decided', 'i implemented', 'i worked', 'i reached out', 'i proposed', 'i created', 'i built'],
    result: ['result', 'outcome', 'achieved', 'improved', 'reduced', 'increased', 'led to', 'resulted'],
  };

  let starScore = 0;
  for (const [part, keywords] of Object.entries(starKeywords)) {
    if (keywords.some((k) => lower.includes(k))) {
      starScore++;
    } else {
      feedbackParts.push(`Tip: Include the ${part.toUpperCase()} component of the STAR method.`);
    }
  }

  score = Math.min(10, score + starScore * 0.75);

  // Penalise very fast answers on hard questions
  if (timeTaken < 15 && wordCount < 30) {
    score = Math.max(1, score - 2);
    feedbackParts.push('You answered very quickly — take time to structure your thoughts.');
  }

  const finalScore = Math.round(score);
  return {
    questionId: question.id,
    answer,
    score: finalScore,
    feedback: buildFeedback(finalScore, feedbackParts, question.category),
    timeTaken,
  };
}

function scoreTechnical(
  question: InterviewQuestion,
  answer: string,
  wordCount: number,
  timeTaken: number
): QuestionResponse {
  let score = 0;
  const feedbackParts: string[] = [];
  const lower = answer.toLowerCase();

  // Length / depth check
  if (wordCount < 15) {
    score += 1;
    feedbackParts.push('Your answer was too short. Technical questions require explanation and reasoning.');
  } else if (wordCount < 40) {
    score += 3;
    feedbackParts.push('Add more depth — explain the why, not just the what.');
  } else if (wordCount < 80) {
    score += 5;
  } else {
    score += 6;
  }

  // Keyword matching against sample answer
  if (question.sampleAnswer) {
    const sampleWords = extractKeywords(question.sampleAnswer);
    const answerWords = extractKeywords(answer);
    const coverage = sampleWords.filter((w) => answerWords.includes(w)).length;
    const ratio = sampleWords.length > 0 ? coverage / sampleWords.length : 0;

    if (ratio >= 0.6) {
      score += 4;
    } else if (ratio >= 0.35) {
      score += 2;
      feedbackParts.push('You covered some key concepts — review the hint for gaps.');
    } else if (ratio >= 0.15) {
      score += 1;
      feedbackParts.push('Several important concepts were missing from your answer.');
    } else {
      feedbackParts.push('The core technical concepts weren\'t addressed. Study this topic further.');
    }
  } else {
    // No sample answer — score by length/quality heuristic only
    if (lower.includes('example') || lower.includes('for instance') || lower.includes('such as')) {
      score += 1;
    }
    if (lower.includes('trade-off') || lower.includes('however') || lower.includes('but')) {
      score += 1;
    }
    if (lower.includes('because') || lower.includes('therefore') || lower.includes('this means')) {
      score += 1;
    }
  }

  // Difficulty modifier
  const difficulty = question.difficulty;
  if (difficulty === 'easy' && score < 5) {
    feedbackParts.push('This was a foundational question — aim for complete, confident answers.');
  }

  score = Math.min(10, score);
  const finalScore = Math.round(score);

  return {
    questionId: question.id,
    answer,
    score: finalScore,
    feedback: buildFeedback(finalScore, feedbackParts, question.category),
    timeTaken,
  };
}

function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    'the', 'a', 'an', 'is', 'are', 'was', 'were', 'it', 'its', 'this', 'that',
    'with', 'for', 'of', 'in', 'on', 'at', 'to', 'by', 'and', 'or', 'but',
    'can', 'will', 'would', 'should', 'may', 'might', 'when', 'which',
    'how', 'what', 'why', 'you', 'we', 'they', 'he', 'she', 'i', 'be',
    'have', 'has', 'had', 'do', 'does', 'did', 'not', 'from', 'as', 'more',
  ]);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));
}

function buildFeedback(
  score: number,
  parts: string[],
  category: string
): string {
  let prefix = '';
  if (score >= 9) {
    prefix = '🌟 Excellent answer!';
  } else if (score >= 7) {
    prefix = '✅ Strong answer with good depth.';
  } else if (score >= 5) {
    prefix = '👍 Decent answer — some areas to strengthen.';
  } else if (score >= 3) {
    prefix = '⚠️ Partial answer — key concepts were missing.';
  } else {
    prefix = '❌ Needs significant improvement.';
  }

  if (parts.length === 0) {
    return `${prefix} You demonstrated solid understanding of this ${category} topic.`;
  }

  return `${prefix} ${parts.join(' ')}`;
}

export function computeSessionResults(responses: QuestionResponse[]): {
  totalScore: number;
  strengths: string[];
  improvements: string[];
} {
  if (responses.length === 0) {
    return { totalScore: 0, strengths: [], improvements: [] };
  }

  const avg = responses.reduce((s, r) => s + r.score, 0) / responses.length;
  const totalScore = Math.round(avg * 10); // Convert 0-10 avg to 0-100 percentage

  const strengths: string[] = [];
  const improvements: string[] = [];

  responses.forEach((r, i) => {
    const label = `Q${i + 1}`;
    if (r.score >= 7) {
      strengths.push(label);
    } else if (r.score < 5) {
      improvements.push(label);
    }
  });

  return { totalScore, strengths, improvements };
}
