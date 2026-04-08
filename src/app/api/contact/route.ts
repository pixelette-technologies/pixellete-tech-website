import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      projectType,
      budget,
      heardFrom,
      message,
      consent,
      caseStudySlug,
      intent,
    } = body;

    // Validation
    if (!firstName || !lastName || !email || !message || !consent) {
      return NextResponse.json(
        { error: 'Please fill in all required fields and accept the consent checkbox.' },
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
    const source = caseStudySlug ? `case-study-${caseStudySlug}` : 'contact-page';

    // Notification email to BD team
    await resend.emails.send({
      from: 'Pixelette Website <noreply@pixelettetech.com>',
      to: 'sales@pixelettetech.com',
      subject: isRequestPDF
        ? `PDF Requested — ${caseStudySlug} Case Study — ${company || firstName}`
        : `New Enquiry — ${source} — ${company || firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

                <!-- Logo Header -->
                <tr>
                  <td style="background:#0a0a0a;padding:28px 32px;text-align:center;">
                    <img src="https://pixelettetech.com/images/logo/short-logo-purple.png" alt="Pixelette Technologies" width="48" height="48" style="display:inline-block;vertical-align:middle;" />
                    <span style="color:#ffffff;font-size:20px;font-weight:700;margin-left:12px;vertical-align:middle;">Pixelette Technologies</span>
                  </td>
                </tr>

                <!-- Badge -->
                <tr>
                  <td style="padding:24px 32px 0;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="background:${isRequestPDF ? '#fef3c7' : '#dbeafe'};color:${isRequestPDF ? '#92400e' : '#1e40af'};font-size:12px;font-weight:600;padding:6px 14px;border-radius:20px;text-transform:uppercase;letter-spacing:0.5px;">
                        ${isRequestPDF ? '📄 PDF Request' : '🔔 New Enquiry'}
                      </td>
                    </tr></table>
                  </td>
                </tr>

                <!-- Title -->
                <tr>
                  <td style="padding:16px 32px 4px;">
                    <h1 style="margin:0;font-size:22px;color:#111827;font-weight:700;">
                      ${isRequestPDF ? 'PDF Request' : 'New Project Enquiry'}
                    </h1>
                    <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">
                      Submitted via ${source} · ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr><td style="padding:20px 32px 0;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" /></td></tr>

                <!-- Contact Info -->
                <tr>
                  <td style="padding:20px 32px 0;">
                    <p style="margin:0 0 12px;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Contact Details</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;width:140px;font-size:13px;color:#6b7280;font-weight:600;">Name</td>
                        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#111827;">${firstName} ${lastName}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;font-weight:600;">Email</td>
                        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#111827;"><a href="mailto:${email}" style="color:#6d28d9;text-decoration:none;">${email}</a></td>
                      </tr>
                      ${phone ? `<tr>
                        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;font-weight:600;">Phone</td>
                        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#111827;">${phone}</td>
                      </tr>` : ''}
                      ${company ? `<tr>
                        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;font-weight:600;">Company</td>
                        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#111827;font-weight:600;">${company}</td>
                      </tr>` : ''}
                      ${jobTitle ? `<tr>
                        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;font-weight:600;">Job Title</td>
                        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#111827;">${jobTitle}</td>
                      </tr>` : ''}
                    </table>
                  </td>
                </tr>

                <!-- Project Info -->
                <tr>
                  <td style="padding:24px 32px 0;">
                    <p style="margin:0 0 12px;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Project Details</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${projectType ? `<tr>
                        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;width:140px;font-size:13px;color:#6b7280;font-weight:600;">Project Type</td>
                        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#111827;">${projectType}</td>
                      </tr>` : ''}
                      ${budget ? `<tr>
                        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;font-weight:600;">Budget</td>
                        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#111827;">${budget}</td>
                      </tr>` : ''}
                      ${heardFrom ? `<tr>
                        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;font-weight:600;">Heard From</td>
                        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#111827;">${heardFrom}</td>
                      </tr>` : ''}
                    </table>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="padding:24px 32px;">
                    <p style="margin:0 0 12px;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Message</p>
                    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;font-size:14px;color:#374151;line-height:1.6;">
                      ${message}
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:12px;color:#9ca3af;">
                      This lead was submitted via <strong>pixelettetech.com</strong> · Reply directly to <a href="mailto:${email}" style="color:#6d28d9;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    // Auto-response to prospect
    await resend.emails.send({
      from: 'Pixelette Technologies <noreply@pixelettetech.com>',
      to: email,
      subject: 'Thank you for contacting Pixelette Technologies',
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

                <!-- Logo Header -->
                <tr>
                  <td style="background:#0a0a0a;padding:28px 32px;text-align:center;">
                    <img src="https://pixelettetech.com/images/logo/short-logo-purple.png" alt="Pixelette Technologies" width="48" height="48" style="display:inline-block;vertical-align:middle;" />
                    <span style="color:#ffffff;font-size:20px;font-weight:700;margin-left:12px;vertical-align:middle;">Pixelette Technologies</span>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:32px;">
                    <h1 style="margin:0 0 20px;font-size:22px;color:#111827;font-weight:700;">Thank you, ${firstName}.</h1>
                    <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">
                      We have received your enquiry and a member of our team will be in touch within one business day.
                    </p>
                    ${isRequestPDF ? '<p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">We will also send you the case study PDF shortly.</p>' : ''}
                    <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.7;">
                      In the meantime, you can explore more of our work:
                    </p>
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="background:#0a0a0a;border-radius:8px;padding:14px 28px;">
                        <a href="https://pixelettetech.com/case-studies" style="color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;">View Our Case Studies →</a>
                      </td>
                    </tr></table>
                  </td>
                </tr>

                <!-- Sign-off -->
                <tr>
                  <td style="padding:0 32px 32px;">
                    <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6;">
                      Best regards,<br/>
                      <strong style="color:#111827;">Business Development Team</strong><br/>
                      Pixelette Technologies
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:12px;color:#9ca3af;">
                      Pixelette Technologies Ltd · London, United Kingdom<br/>
                      <a href="https://pixelettetech.com" style="color:#6d28d9;text-decoration:none;">pixelettetech.com</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
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
