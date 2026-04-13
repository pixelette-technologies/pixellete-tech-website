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

const TIER_CONFIG: Record<string, { color: string; bg: string; label: string; icon: string }> = {
  urgent: { color: '#fff', bg: '#991B1B', label: 'URGENT', icon: '🔴' },
  hot: { color: '#fff', bg: '#DC2626', label: 'HOT', icon: '🟠' },
  warm: { color: '#fff', bg: '#D97706', label: 'WARM', icon: '🟡' },
  cold: { color: '#fff', bg: '#2563EB', label: 'COLD', icon: '🔵' },
};

function scoreGauge(score: number): string {
  const pct = Math.min(score, 100);
  const color = pct >= 76 ? '#991B1B' : pct >= 51 ? '#DC2626' : pct >= 26 ? '#D97706' : '#2563EB';
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0;">
      <tr>
        <td style="width:50px;font-size:28px;font-weight:800;color:${color};vertical-align:middle;">${score}</td>
        <td style="vertical-align:middle;padding-left:12px;">
          <div style="background:#1a1a2e;border-radius:6px;height:10px;width:100%;overflow:hidden;">
            <div style="background:${color};height:100%;width:${pct}%;border-radius:6px;transition:width 0.3s;"></div>
          </div>
          <p style="margin:4px 0 0;font-size:11px;color:#6b7280;">out of 100</p>
        </td>
      </tr>
    </table>`;
}

function fieldRow(label: string, value: string, isLink?: boolean): string {
  if (!value) return '';
  const display = isLink ? `<a href="mailto:${value}" style="color:#a78bfa;text-decoration:none;font-weight:500;">${value}</a>` : `<span style="color:#f1f5f9;">${value}</span>`;
  return `<tr><td style="padding:10px 0;border-bottom:1px solid #1a1a2e;width:130px;font-size:13px;color:#64748b;font-weight:500;">${label}</td><td style="padding:10px 0;border-bottom:1px solid #1a1a2e;font-size:14px;">${display}</td></tr>`;
}

export async function sendLeadEmail(lead: Lead, conversationSummary: string) {
  const tier = lead.classification || 'cold';
  const config = TIER_CONFIG[tier] || TIER_CONFIG.cold;
  const signals: string[] = lead.signals ? JSON.parse(lead.signals) : [];
  const now = new Date();
  const timestamp = now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const urgencyNote = tier === 'urgent'
    ? 'Respond within 1 hour. Multiple strong buying signals detected.'
    : tier === 'hot'
      ? 'Respond within 2 hours. This lead is actively evaluating.'
      : tier === 'warm'
        ? 'Follow up within 24 hours with a tailored email.'
        : 'Add to nurture sequence. Monitor for future engagement.';

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#080a0f;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#080a0f;padding:24px 0;">
<tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="background:#0d1117;border-radius:16px;overflow:hidden;border:1px solid #1b1f2b;">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#0a0a1a 0%,#1a0a2e 50%,#2d1b4e 100%);padding:24px 32px;border-bottom:1px solid #2d1b4e;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td><img src="https://pixelettetech.com/images/company/logo.svg" alt="Pixelette" width="180" height="40" style="display:block;" /></td>
      <td align="right"><span style="background:${config.bg};color:${config.color};font-size:11px;font-weight:700;padding:5px 14px;border-radius:20px;letter-spacing:1.5px;">${config.icon} ${config.label}</span></td>
    </tr></table>
  </td></tr>

  <!-- Lead name + service -->
  <tr><td style="padding:28px 32px 0;">
    <h1 style="margin:0;font-size:24px;color:#f8fafc;font-weight:700;letter-spacing:-0.3px;">${lead.name || 'Anonymous Visitor'}</h1>
    <p style="margin:6px 0 0;font-size:14px;color:#64748b;">${lead.service_interest || 'General Enquiry'} &middot; ${timestamp}</p>
  </td></tr>

  <!-- Score gauge -->
  <tr><td style="padding:20px 32px 0;">
    <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:1.5px;">Lead Score</p>
    ${scoreGauge(lead.score || 0)}
  </td></tr>

  <!-- Divider -->
  <tr><td style="padding:16px 32px 0;"><div style="border-top:1px solid #1b1f2b;"></div></td></tr>

  <!-- Contact details -->
  <tr><td style="padding:20px 32px 0;">
    <p style="margin:0 0 12px;font-size:11px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:1.5px;">Contact</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${fieldRow('Name', lead.name || '')}
      ${fieldRow('Email', lead.email || '', true)}
      ${fieldRow('Company', lead.company || '')}
      ${fieldRow('Website', lead.website || '')}
      ${lead.urgency && lead.urgency !== 'unknown' ? fieldRow('Urgency', lead.urgency.charAt(0).toUpperCase() + lead.urgency.slice(1)) : ''}
      ${lead.language && lead.language !== 'English' ? fieldRow('Language', lead.language) : ''}
    </table>
  </td></tr>

  <!-- Signals -->
  ${signals.length > 0 ? `<tr><td style="padding:24px 32px 0;">
    <p style="margin:0 0 12px;font-size:11px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:1.5px;">Detected Signals</p>
    <div style="line-height:2.2;">${signals.map(s => `<span style="display:inline-block;background:rgba(109,40,217,0.12);color:#c4b5fd;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:500;margin:0 6px 6px 0;border:1px solid rgba(109,40,217,0.2);">${s.replace(/_/g, ' ')}</span>`).join('')}</div>
  </td></tr>` : ''}

  <!-- Chat summary -->
  <tr><td style="padding:24px 32px;">
    <p style="margin:0 0 12px;font-size:11px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:1.5px;">Conversation</p>
    <div style="background:#0a0c12;border:1px solid #1b1f2b;border-radius:10px;padding:18px;font-size:13px;color:#94a3b8;line-height:1.7;white-space:pre-wrap;max-height:300px;overflow:auto;">${conversationSummary}</div>
  </td></tr>

  <!-- Action box -->
  <tr><td style="padding:0 32px 28px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#0a1628,#111827);border:1px solid #1e3a5f;border-radius:10px;"><tr><td style="padding:18px 20px;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#6d28d9;text-transform:uppercase;letter-spacing:1.5px;">Action Required</p>
      <p style="margin:0;font-size:14px;color:#e2e8f0;line-height:1.5;">${urgencyNote}</p>
      ${lead.email ? `<table cellpadding="0" cellspacing="0" style="margin-top:14px;"><tr><td style="background:#6d28d9;border-radius:8px;padding:10px 24px;"><a href="mailto:${lead.email}?subject=Re: Your enquiry with Pixelette Technologies" style="color:#fff;text-decoration:none;font-size:13px;font-weight:600;">Reply to ${lead.name || 'Lead'}</a></td></tr></table>` : ''}
    </td></tr></table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#080a0f;padding:16px 32px;text-align:center;border-top:1px solid #1b1f2b;">
    <p style="margin:0;font-size:11px;color:#475569;">Pix Lead Intelligence &middot; <a href="https://pixelettetech.com" style="color:#6d28d9;text-decoration:none;">pixelettetech.com</a></p>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;

  await resend.emails.send({
    from: `Pix Lead Alert <${process.env.FROM_EMAIL || 'pix@pixelettetech.com'}>`,
    to: process.env.SALES_EMAIL || 'sales@pixelettetech.com',
    replyTo: lead.email || undefined,
    subject: `${config.icon} ${config.label} Lead: ${lead.name || 'Anonymous'} — ${lead.service_interest || 'General'} (${lead.score || 0}/100)`,
    html,
  });
}

export async function sendSlackAlert(lead: Lead) {
  const webhookUrl = process.env.PIX_SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const tier = lead.classification || 'cold';
  if (tier !== 'hot' && tier !== 'urgent') return;

  const config = TIER_CONFIG[tier] || TIER_CONFIG.cold;

  const payload = {
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: `${config.icon} ${config.label} Lead: ${lead.name || 'Anonymous'}` },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Email:*\n${lead.email || 'Not captured'}` },
          { type: 'mrkdwn', text: `*Company:*\n${lead.company || 'Unknown'}` },
          { type: 'mrkdwn', text: `*Service:*\n${lead.service_interest || 'Unknown'}` },
          { type: 'mrkdwn', text: `*Score:*\n${lead.score || 0}/100` },
          { type: 'mrkdwn', text: `*Language:*\n${lead.language || 'English'}` },
          { type: 'mrkdwn', text: `*Urgency:*\n${lead.urgency || 'Unknown'}` },
        ],
      },
      ...(lead.email ? [{
        type: 'actions' as const,
        elements: [{
          type: 'button' as const,
          text: { type: 'plain_text' as const, text: `Reply to ${lead.name || 'Lead'}` },
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
