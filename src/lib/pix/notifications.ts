import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface Lead {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  service_interest?: string;
  urgency?: string;
  language?: string;
  score?: number;
  classification?: string;
  signals?: string;
  session_id?: string;
  created_at?: string;
}

const TIER_COLORS: Record<string, string> = {
  urgent: '#991B1B',
  hot: '#DC2626',
  warm: '#D97706',
  cold: '#2563EB',
};

const TIER_LABELS: Record<string, string> = {
  urgent: 'URGENT',
  hot: 'HOT',
  warm: 'WARM',
  cold: 'COLD',
};

export async function sendLeadEmail(lead: Lead, conversationSummary: string) {
  const tier = lead.classification || 'cold';
  const tierColor = TIER_COLORS[tier] || '#2563EB';
  const tierLabel = TIER_LABELS[tier] || 'COLD';
  const signals = lead.signals ? JSON.parse(lead.signals) : [];

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#111;border-radius:12px;overflow:hidden;border:1px solid #1f1f1f;">
            <tr>
              <td style="background:linear-gradient(135deg,#0a0a0a 0%,#1a0a2e 40%,#2d1b4e 70%,#1a0a2e 100%);padding:28px 32px;text-align:center;border-bottom:1px solid #2d1b4e;">
                <img src="https://pixelettetech.com/images/company/logo.svg" alt="Pixelette Technologies" width="200" height="45" style="display:block;margin:0 auto;" />
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 0;">
                <table cellpadding="0" cellspacing="0"><tr>
                  <td style="background:${tierColor};color:#fff;font-size:12px;font-weight:700;padding:6px 16px;border-radius:20px;letter-spacing:1px;">
                    ${tierLabel} LEAD
                  </td>
                  <td style="padding-left:12px;color:#9ca3af;font-size:13px;">
                    Score: ${lead.score || 0}/100
                  </td>
                </tr></table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 4px;">
                <h1 style="margin:0;font-size:22px;color:#fff;font-weight:700;">
                  New Lead: ${lead.name || 'Anonymous'}
                </h1>
                <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">
                  ${lead.service_interest || 'General Enquiry'} | ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </td>
            </tr>
            <tr><td style="padding:20px 32px 0;"><hr style="border:none;border-top:1px solid #1f1f1f;margin:0;" /></td></tr>
            <tr>
              <td style="padding:20px 32px 0;">
                <p style="margin:0 0 12px;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Contact Details</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${lead.name ? `<tr><td style="padding:8px 0;border-bottom:1px solid #1f1f1f;width:120px;font-size:13px;color:#6b7280;">Name</td><td style="padding:8px 0;border-bottom:1px solid #1f1f1f;font-size:14px;color:#fff;">${lead.name}</td></tr>` : ''}
                  ${lead.email ? `<tr><td style="padding:8px 0;border-bottom:1px solid #1f1f1f;font-size:13px;color:#6b7280;">Email</td><td style="padding:8px 0;border-bottom:1px solid #1f1f1f;font-size:14px;color:#fff;"><a href="mailto:${lead.email}" style="color:#a78bfa;text-decoration:none;">${lead.email}</a></td></tr>` : ''}
                  ${lead.company ? `<tr><td style="padding:8px 0;border-bottom:1px solid #1f1f1f;font-size:13px;color:#6b7280;">Company</td><td style="padding:8px 0;border-bottom:1px solid #1f1f1f;font-size:14px;color:#fff;font-weight:600;">${lead.company}</td></tr>` : ''}
                  ${lead.website ? `<tr><td style="padding:8px 0;border-bottom:1px solid #1f1f1f;font-size:13px;color:#6b7280;">Website</td><td style="padding:8px 0;border-bottom:1px solid #1f1f1f;font-size:14px;color:#fff;">${lead.website}</td></tr>` : ''}
                  ${lead.language && lead.language !== 'English' ? `<tr><td style="padding:8px 0;border-bottom:1px solid #1f1f1f;font-size:13px;color:#6b7280;">Language</td><td style="padding:8px 0;border-bottom:1px solid #1f1f1f;font-size:14px;color:#fff;">${lead.language}</td></tr>` : ''}
                </table>
              </td>
            </tr>
            ${signals.length > 0 ? `
            <tr>
              <td style="padding:20px 32px 0;">
                <p style="margin:0 0 12px;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Scoring Signals</p>
                <div>${signals.map((s: string) => `<span style="display:inline-block;background:#1a1a2e;color:#a78bfa;padding:4px 12px;border-radius:20px;font-size:12px;margin:2px 4px 2px 0;">${s.replace(/_/g, ' ')}</span>`).join('')}</div>
              </td>
            </tr>` : ''}
            <tr>
              <td style="padding:20px 32px;">
                <p style="margin:0 0 12px;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Chat Summary</p>
                <div style="background:#1a1a1a;border:1px solid #1f1f1f;border-radius:8px;padding:16px;font-size:14px;color:#d1d5db;line-height:1.6;white-space:pre-wrap;">
                  ${conversationSummary}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 24px;">
                <div style="background:#0a1628;border:1px solid #1e3a5f;border-radius:8px;padding:16px;">
                  <p style="margin:0;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Recommended Next Step</p>
                  <p style="margin:0;font-size:14px;color:#d1d5db;">
                    ${tier === 'urgent' || tier === 'hot' ? 'Contact within 2 hours. This lead shows strong buying signals.' : tier === 'warm' ? 'Follow up within 24 hours with a personalised email.' : 'Add to nurture sequence. Monitor for re-engagement.'}
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="background:#0a0a0a;padding:20px 32px;text-align:center;border-top:1px solid #1f1f1f;">
                <p style="margin:0;font-size:12px;color:#6b7280;">Pix Lead Alert | <a href="https://pixelettetech.com" style="color:#a78bfa;text-decoration:none;">pixelettetech.com</a></p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;

  await resend.emails.send({
    from: `Pix Lead Alert <${process.env.FROM_EMAIL || 'pix@pixelettetech.com'}>`,
    to: process.env.SALES_EMAIL || 'sales@pixelettetech.com',
    replyTo: lead.email || undefined,
    subject: `New Lead - ${tierLabel} - ${lead.name || 'Anonymous'} - ${lead.service_interest || 'General'}`,
    html,
  });
}

export async function sendSlackAlert(lead: Lead) {
  const webhookUrl = process.env.PIX_SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const tier = lead.classification || 'cold';
  if (tier !== 'hot' && tier !== 'urgent') return;

  const payload = {
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: `${tier === 'urgent' ? '🔴' : '🟠'} ${tier.toUpperCase()} Lead: ${lead.name || 'Anonymous'}` },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Email:*\n${lead.email || 'Not captured'}` },
          { type: 'mrkdwn', text: `*Company:*\n${lead.company || 'Unknown'}` },
          { type: 'mrkdwn', text: `*Service:*\n${lead.service_interest || 'Unknown'}` },
          { type: 'mrkdwn', text: `*Score:*\n${lead.score || 0}/100` },
          { type: 'mrkdwn', text: `*Language:*\n${lead.language || 'English'}` },
        ],
      },
      ...(lead.email ? [{
        type: 'actions' as const,
        elements: [{
          type: 'button' as const,
          text: { type: 'plain_text' as const, text: 'Reply to Lead' },
          url: `mailto:${lead.email}?subject=Re: Your enquiry with Pixelette Technologies`,
          style: 'primary' as const,
        }],
      }] : []),
    ],
  };

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
