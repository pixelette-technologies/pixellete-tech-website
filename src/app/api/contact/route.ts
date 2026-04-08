import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, projectOutline, caseStudySlug, intent } = body;

    // Validation
    if (!name || !email || !company || !projectOutline) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const isRequestPDF = intent === 'pdf-request';
    const source = caseStudySlug ? `case-study-${caseStudySlug}` : 'website';

    // Notification email to BD team
    await resend.emails.send({
      from: 'Pixelette Website <noreply@pixelettetech.com>',
      to: 'sales@pixelettetech.com',
      subject: isRequestPDF
        ? `PDF Requested — ${caseStudySlug} Case Study — ${company}`
        : `New Enquiry — ${caseStudySlug} Case Study — ${company}`,
      html: `
        <h2>${isRequestPDF ? 'PDF Request' : 'New Project Enquiry'}</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Company</strong></td><td>${company}</td></tr>
          <tr><td><strong>Source</strong></td><td>${source}</td></tr>
          <tr><td><strong>Intent</strong></td><td>${isRequestPDF ? 'PDF Download Request' : 'Project Enquiry'}</td></tr>
          <tr><td><strong>Project Outline</strong></td><td>${projectOutline}</td></tr>
        </table>
      `,
    });

    // Auto-response to prospect
    await resend.emails.send({
      from: 'Pixelette Technologies <noreply@pixelettetech.com>',
      to: email,
      subject: 'Thank you for contacting Pixelette Technologies',
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to Pixelette Technologies.
           We have received your enquiry and a member of our team
           will be in touch within one business day.</p>
        ${isRequestPDF ? '<p>We will also send you the case study PDF shortly.</p>' : ''}
        <p>In the meantime, you can explore more of our work at
           <a href="https://pixelettetech.com/case-studies">pixelettetech.com/case-studies</a>.</p>
        <p>Best regards,<br/>
           Business Development Team<br/>
           Pixelette Technologies</p>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Enquiry received. We will be in touch shortly.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
