import Anthropic from '@anthropic-ai/sdk';

interface DocumentAnalysis {
  documentType: string;
  summary: string;
  keyFindings: string[];
  techRequirements: string[];
  identifiedGaps: string[];
  recommendedServices: string[];
  urgencySignals: string[];
  rawText: string;
}

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // Dynamic import to avoid bundling issues
    const pdfParse = (await import('pdf-parse')).default;
    const data = await pdfParse(buffer);
    return (data.text || '').substring(0, 8000);
  } catch {
    return '';
  }
}

export async function extractTextFromImage(buffer: Buffer, mimeType: string): Promise<string> {
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const base64 = buffer.toString('base64');
    const mediaType = mimeType as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
          { type: 'text', text: 'Extract ALL text from this image. Return only the extracted text, nothing else.' },
        ],
      }],
    });

    const block = response.content[0];
    return block && block.type === 'text' ? block.text.substring(0, 8000) : '';
  } catch {
    return '';
  }
}

export async function analyseDocument(text: string, fileName: string): Promise<DocumentAnalysis | null> {
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [{
        role: 'user',
        content: `You are a technology analyst for Pixelette Technologies. Analyse this document and return a JSON object with these exact fields:
{"documentType":"type of document","summary":"2-3 sentence summary","keyFindings":["finding 1","finding 2"],"techRequirements":["req 1","req 2"],"identifiedGaps":["gap 1","gap 2"],"recommendedServices":["AI Development","Blockchain Development","Custom Software","Web Development","Mobile App","AR/VR","UI/UX Design","Staff Augmentation"],"urgencySignals":["signal 1"],"rawText":"first 500 chars of original text"}

Only include services from Pixelette's list that genuinely match the document content. Return ONLY the JSON, no other text.

File name: ${fileName}
Document content:
${text.substring(0, 6000)}`,
      }],
    });

    const block = response.content[0];
    const raw = block && block.type === 'text' ? block.text.trim() : '{}';
    const parsed = JSON.parse(raw);
    parsed.rawText = text.substring(0, 500);
    return parsed as DocumentAnalysis;
  } catch {
    return null;
  }
}

export function formatDocumentContext(analysis: DocumentAnalysis | null, fileName: string): string {
  if (!analysis) return '';

  const parts = [
    `[DOCUMENT UPLOADED: ${fileName}]`,
    `Type: ${analysis.documentType}`,
    `Summary: ${analysis.summary}`,
    analysis.keyFindings.length > 0 ? `Key findings: ${analysis.keyFindings.join('; ')}` : '',
    analysis.techRequirements.length > 0 ? `Tech requirements: ${analysis.techRequirements.join('; ')}` : '',
    analysis.identifiedGaps.length > 0 ? `Identified gaps: ${analysis.identifiedGaps.join('; ')}` : '',
    analysis.recommendedServices.length > 0 ? `Recommended Pixelette services: ${analysis.recommendedServices.join(', ')}` : '',
    analysis.urgencySignals.length > 0 ? `Urgency signals: ${analysis.urgencySignals.join('; ')}` : '',
    'Reference specific findings from this document naturally in your response. Do not say "I can see from your document" — instead weave the insights into the conversation as if you understand their situation.',
  ].filter(Boolean);

  return '\n\n' + parts.join('\n');
}

export function validateUpload(mimeType: string, fileSizeBytes: number): { valid: boolean; error?: string } {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(mimeType)) {
    return { valid: false, error: 'Please upload a PDF or image file (JPEG, PNG, WebP).' };
  }
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (fileSizeBytes > maxSize) {
    return { valid: false, error: 'File is too large. Maximum size is 10MB.' };
  }
  return { valid: true };
}

export function sanitiseFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, '_').substring(0, 100);
}
