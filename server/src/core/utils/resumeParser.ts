import fs from 'fs/promises';
import path from 'path';
import * as pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

async function extractFromPDF(filePath: string): Promise<string> {
    const dataBuffer = await fs.readFile(filePath);
    const data = await (pdfParse as any)(dataBuffer);
    return data.text;
}

async function extractFromDOC(filePath: string): Promise<string> {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
}

export async function extractResumeText(filePath: string): Promise<string> {
    const ext = path.extname(filePath).toLowerCase();
    try {
        let text: string;
        if (ext === '.pdf') {
            text = await extractFromPDF(filePath);
        } else if (ext === '.doc' || ext === '.docx') {
            text = await extractFromDOC(filePath);
        } else {
            throw new Error('Unsupported file format');
        }
        text = text.replace(/\s+/g, ' ').trim();
        if (!text || text.length < 50) throw new Error('Could not extract meaningful text from file');
        return text;
    } catch (error) {
        throw new Error(`Failed to extract text: ${(error as Error).message}`);
    }
}

export async function deleteFile(filePath: string): Promise<void> {
    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.error('Failed to delete file:', error);
    }
}
