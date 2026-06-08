import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

let _model: GenerativeModel | null = null;

/**
 * Returns a singleton Gemini generative model instance.
 * Lazy-initializes on first call.
 */
export const getGeminiModel = (): GenerativeModel => {
    if (!_model) {
        const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
        if (!apiKey) {
            throw new Error('Gemini API key is not configured. Set VITE_GEMINI_API_KEY or GEMINI_API_KEY.');
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        _model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }
    return _model;
};

/**
 * Generates content from a prompt using the Gemini model and returns the text.
 */
export const generateContent = async (prompt: string): Promise<string> => {
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    return result.response.text();
};

/**
 * Parses a JSON object from a Gemini response string.
 * Throws if the response does not contain valid JSON.
 */
export const parseJsonResponse = <T>(text: string): T => {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('Failed to parse structured JSON from AI response');
    }
    return JSON.parse(jsonMatch[0]) as T;
};

/**
 * Helper that generates content and immediately parses the JSON result.
 */
export const generateStructuredContent = async <T>(prompt: string): Promise<T> => {
    const text = await generateContent(prompt);
    return parseJsonResponse<T>(text);
};
