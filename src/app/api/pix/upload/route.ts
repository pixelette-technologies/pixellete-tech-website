import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getIpFromRequest } from '@/lib/pix/rateLimit';
import { upsertLead } from '@/lib/pix/database';
import {
  extractTextFromPDF,
  extractTextFromImage,
  analyseDocument,
  formatDocumentContext,
  validateUpload,
  sanitiseFileName,
} from '@/lib/pix/documentProcessor';

export async function POST(req: NextRequest) {
  try {
    const ip = getIpFromRequest(req);
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: rateCheck.message }, { status: 429 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const sessionId = formData.get('sessionId') as string | null;

    if (!file || !sessionId) {
      return NextResponse.json({ error: 'File and session ID required.' }, { status: 400 });
    }

    const validation = validateUpload(file.type, file.size);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = sanitiseFileName(file.name);

    let extractedText = '';
    if (file.type === 'application/pdf') {
      extractedText = await extractTextFromPDF(buffer);
    } else {
      extractedText = await extractTextFromImage(buffer, file.type);
    }

    if (extractedText.length < 50) {
      return NextResponse.json({
        error: 'The document could not be read clearly. Please try a different file or paste the content directly in the chat.',
      }, { status: 400 });
    }

    const analysis = await analyseDocument(extractedText, safeName);
    const context = formatDocumentContext(analysis, safeName);

    // Update lead with urgency signals if found
    if (analysis?.urgencySignals && analysis.urgencySignals.length > 0) {
      await upsertLead(sessionId, {
        urgency: 'urgent',
        notes: `Document uploaded: ${safeName}. Urgency signals: ${analysis.urgencySignals.join(', ')}`,
      });
    }

    return NextResponse.json({
      success: true,
      fileName: safeName,
      documentType: analysis?.documentType || 'Unknown',
      summary: analysis?.summary || '',
      keyFindings: analysis?.keyFindings || [],
      identifiedGaps: analysis?.identifiedGaps || [],
      recommendedServices: analysis?.recommendedServices || [],
      context,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to process document. Please try again.' }, { status: 500 });
  }
}
