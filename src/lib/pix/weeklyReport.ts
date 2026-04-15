import { Resend } from 'resend';
import { getWeeklyStats } from './database';

const resend = new Resend(process.env.RESEND_API_KEY);

function kpiCard(value: string | number, label: string, color: string): string {
  return `<td style="width:25%;padding:4px;">
    <div style="background:#0d1117;border:1px solid #1b1f2b;border-radius:12px;padding:20px 16px;text-align:center;">
      <p style="margin:0;font-size:28px;font-weight:800;color:${color};letter-spacing:-0.5px;">${value}</p>
      <p style="margin:6px 0 0;font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">${label}</p>
    </div>
  </td>`;
}

function tierBar(label: string, count: number, total: number, color: string): string {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return `<tr>
    <td style="width:70px;padding:6px 0;font-size:13px;color:${color};font-weight:600;">${label}</td>
    <td style="padding:6px 8px;"><div style="background:#1b1f2b;border-radius:4px;height:14px;overflow:hidden;"><div style="background:${color};height:100%;width:${pct}%;border-radius:4px;min-width:${count > 0 ? '4px' : '0'};"></div></div></td>
    <td style="width:60px;padding:6px 0;font-size:13px;color:#94a3b8;text-align:right;">${count} <span style="color:#475569;font-size:11px;">(${pct}%)</span></td>
  </tr>`;
}

function tableRow(label: string, value: string | number, highlight?: boolean): string {
  return `<tr><td style="padding:8px 0;border-bottom:1px solid #1b1f2b;font-size:13px;color:#64748b;">${label}</td><td style="padding:8px 0;border-bottom:1px solid #1b1f2b;font-size:14px;color:${highlight ? '#c4b5fd' : '#e2e8f0'};text-align:right;font-weight:${highlight ? '600' : '400'};">${value}</td></tr>`;
}

export async function generateAndSendWeeklyReport() {
  const stats = await getWeeklyStats();

  const totalLeads = stats.leads.length;
  const totalConvs = stats.conversations.length;
  const avgScore = totalLeads > 0 ? Math.round(stats.leads.reduce((s, l) => s + (l.score || 0), 0) / totalLeads) : 0;
  const avgMsgs = totalConvs > 0 ? Math.round(stats.conversations.reduce((s, c) => s + (c.message_count || 0), 0) / totalConvs) : 0;

  const tiers = { urgent: 0, hot: 0, warm: 0, cold: 0 };
  stats.leads.forEach(l => { if (l.classification in tiers) tiers[l.classification as keyof typeof tiers]++; });

  const services: Record<string, number> = {};
  stats.leads.forEach(l => { const s = l.service_interest || 'Unknown'; services[s] = (services[s] || 0) + 1; });
  const topServices = Object.entries(services).sort((a, b) => b[1] - a[1]).slice(0, 6);

  const languages: Record<string, number> = {};
  stats.leads.forEach(l => { const lang = l.language || 'English'; languages[lang] = (languages[lang] || 0) + 1; });

  const topics: Record<string, number> = {};
  stats.questions.forEach(q => { const t = q.topic || 'general'; topics[t] = (topics[t] || 0) + 1; });
  const topTopics = Object.entries(topics).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const aiRatings = stats.quality.filter(q => q.ai_rating).map(q => q.ai_rating);
  const avgAi = aiRatings.length > 0 ? (aiRatings.reduce((s, r) => s + r, 0) / aiRatings.length).toFixed(1) : '--';
  const visRatings = stats.quality.filter(q => q.visitor_rating).map(q => q.visitor_rating);
  const avgVis = visRatings.length > 0 ? (visRatings.reduce((s, r) => s + r, 0) / visRatings.length).toFixed(1) : '--';

  // Abandoned leads (0 messages) and early abandoned (1-2 messages)
  const abandoned = stats.leads.filter(l => {
    const conv = stats.conversations.find(c => c.session_id === l.session_id);
    return !conv || (conv.message_count || 0) === 0;
  });
  const earlyAbandoned = stats.leads.filter(l => {
    const conv = stats.conversations.find(c => c.session_id === l.session_id);
    return conv && (conv.message_count || 0) >= 1 && (conv.message_count || 0) <= 2;
  });

  // Flagged leads (abusive or irrelevant)
  const flaggedLeads = stats.leads.filter(l => l.status === 'abusive' || l.status === 'irrelevant');

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const fmt = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const dateRange = `${fmt(weekAgo)} — ${fmt(now)} ${now.getFullYear()}`;

  const hotUrgentCount = tiers.hot + tiers.urgent;
  const conversionRate = totalLeads > 0 ? Math.round((hotUrgentCount / totalLeads) * 100) : 0;

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#080a0f;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#080a0f;padding:24px 0;">
<tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="background:#0d1117;border-radius:16px;overflow:hidden;border:1px solid #1b1f2b;">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#0a0a1a 0%,#1a0a2e 50%,#2d1b4e 100%);padding:24px 32px;border-bottom:1px solid #2d1b4e;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td><img src="https://pixelettetech.com/images/company/logo.svg" alt="Pixelette" width="180" height="40" style="display:block;" /></td>
      <td align="right"><span style="color:#a78bfa;font-size:12px;font-weight:600;letter-spacing:0.5px;">Weekly Report</span></td>
    </tr></table>
  </td></tr>

  <!-- Title -->
  <tr><td style="padding:28px 32px 8px;">
    <h1 style="margin:0;font-size:22px;color:#f8fafc;font-weight:700;">Ada Performance Report</h1>
    <p style="margin:6px 0 0;font-size:14px;color:#64748b;">${dateRange} &middot; ${totalLeads} lead${totalLeads !== 1 ? 's' : ''} captured</p>
  </td></tr>

  <!-- KPI Cards -->
  <tr><td style="padding:20px 28px 0;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      ${kpiCard(totalLeads, 'Total Leads', '#f8fafc')}
      ${kpiCard(totalConvs, 'Conversations', '#f8fafc')}
      ${kpiCard(avgScore, 'Avg Score', avgScore >= 51 ? '#DC2626' : avgScore >= 26 ? '#D97706' : '#2563EB')}
      ${kpiCard(avgMsgs, 'Avg Messages', '#f8fafc')}
    </tr></table>
  </td></tr>

  <!-- Conversion highlight -->
  <tr><td style="padding:20px 32px 0;">
    <div style="background:linear-gradient(135deg,#0a1628,#111827);border:1px solid #1e3a5f;border-radius:10px;padding:16px 20px;display:flex;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="font-size:13px;color:#94a3b8;">Hot + Urgent leads this week</td>
        <td align="right" style="font-size:20px;font-weight:800;color:${hotUrgentCount > 0 ? '#DC2626' : '#475569'};">${hotUrgentCount} <span style="font-size:12px;font-weight:500;color:#64748b;">(${conversionRate}%)</span></td>
      </tr></table>
    </div>
  </td></tr>

  <!-- Tier breakdown -->
  <tr><td style="padding:24px 32px 0;">
    <p style="margin:0 0 14px;font-size:11px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:1.5px;">Lead Classification</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${tierBar('Urgent', tiers.urgent, totalLeads, '#991B1B')}
      ${tierBar('Hot', tiers.hot, totalLeads, '#DC2626')}
      ${tierBar('Warm', tiers.warm, totalLeads, '#D97706')}
      ${tierBar('Cold', tiers.cold, totalLeads, '#2563EB')}
    </table>
  </td></tr>

  <!-- Services + Quality side by side -->
  <tr><td style="padding:24px 32px 0;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="width:50%;vertical-align:top;padding-right:12px;">
        <p style="margin:0 0 10px;font-size:11px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:1.5px;">Top Services</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${topServices.map(([s, c]) => tableRow(s, c)).join('')}
        </table>
      </td>
      <td style="width:50%;vertical-align:top;padding-left:12px;">
        <p style="margin:0 0 10px;font-size:11px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:1.5px;">Quality</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${tableRow('AI Self-Rating', `${avgAi}/10`, true)}
          ${tableRow('Visitor Rating', `${avgVis}/5`, true)}
          ${tableRow('AI Checks', `${aiRatings.length}`)}
          ${tableRow('Visitor Reviews', `${visRatings.length}`)}
        </table>
      </td>
    </tr></table>
  </td></tr>

  <!-- Topics -->
  ${topTopics.length > 0 ? `<tr><td style="padding:24px 32px 0;">
    <p style="margin:0 0 10px;font-size:11px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:1.5px;">Top Question Topics</p>
    <div style="line-height:2.2;">${topTopics.map(([t, c]) => `<span style="display:inline-block;background:rgba(109,40,217,0.12);color:#c4b5fd;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:500;margin:0 6px 6px 0;border:1px solid rgba(109,40,217,0.2);">${t} (${c})</span>`).join('')}</div>
  </td></tr>` : ''}

  <!-- Languages -->
  ${Object.keys(languages).length > 1 ? `<tr><td style="padding:20px 32px 0;">
    <p style="margin:0 0 10px;font-size:11px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:1.5px;">Languages</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${Object.entries(languages).sort((a, b) => b[1] - a[1]).map(([l, c]) => tableRow(l, c)).join('')}
    </table>
  </td></tr>` : ''}

  <!-- Abandoned Leads -->
  ${abandoned.length > 0 ? `<tr><td style="padding:20px 32px 0;">
    <p style="margin:0 0 10px;font-size:11px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:1.5px;">Abandoned (0 messages) — ${abandoned.length}</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${abandoned.slice(0, 10).map(l => `<tr><td style="padding:6px 0;border-bottom:1px solid #1b1f2b;font-size:13px;color:#e2e8f0;">${l.name || 'Anonymous'}</td><td style="padding:6px 0;border-bottom:1px solid #1b1f2b;font-size:13px;color:#a78bfa;text-align:right;">${l.email || 'No email'}</td></tr>`).join('')}
    </table>
  </td></tr>` : ''}

  ${earlyAbandoned.length > 0 ? `<tr><td style="padding:20px 32px 0;">
    <p style="margin:0 0 10px;font-size:11px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:1.5px;">Early Abandoned (1-2 messages) — ${earlyAbandoned.length}</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${earlyAbandoned.slice(0, 10).map(l => `<tr><td style="padding:6px 0;border-bottom:1px solid #1b1f2b;font-size:13px;color:#e2e8f0;">${l.name || 'Anonymous'}</td><td style="padding:6px 0;border-bottom:1px solid #1b1f2b;font-size:13px;color:#a78bfa;text-align:right;">${l.email || 'No email'}</td></tr>`).join('')}
    </table>
  </td></tr>` : ''}

  <!-- Flagged Leads -->
  ${flaggedLeads.length > 0 ? `<tr><td style="padding:20px 32px 0;">
    <p style="margin:0 0 10px;font-size:11px;font-weight:600;color:#DC2626;text-transform:uppercase;letter-spacing:1.5px;">Flagged (${flaggedLeads.length})</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${flaggedLeads.slice(0, 10).map(l => `<tr><td style="padding:6px 0;border-bottom:1px solid #1b1f2b;font-size:13px;color:#e2e8f0;">${l.name || 'Anonymous'}</td><td style="padding:6px 0;border-bottom:1px solid #1b1f2b;font-size:13px;color:#DC2626;text-align:center;">${l.status}</td><td style="padding:6px 0;border-bottom:1px solid #1b1f2b;font-size:13px;color:#64748b;text-align:right;">${l.email || 'No email'}</td></tr>`).join('')}
    </table>
  </td></tr>` : ''}

  <!-- Spacer -->
  <tr><td style="padding:16px;"></td></tr>

  <!-- Footer -->
  <tr><td style="background:#080a0f;padding:16px 32px;text-align:center;border-top:1px solid #1b1f2b;">
    <p style="margin:0;font-size:11px;color:#475569;">Ada Weekly Intelligence &middot; <a href="https://pixelettetech.com" style="color:#6d28d9;text-decoration:none;">pixelettetech.com</a></p>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;

  const recipients = [
    process.env.WEEKLY_REPORT_EMAIL || 'rana@pixelette.tech',
    process.env.SALES_EMAIL || 'sales@pixelettetech.com',
  ].filter(Boolean);

  await resend.emails.send({
    from: `Ada Reports <${process.env.FROM_EMAIL || 'pix@pixelettetech.com'}>`,
    to: recipients,
    subject: `Ada Weekly Report — ${dateRange} — ${totalLeads} leads (${hotUrgentCount} hot/urgent)`,
    html,
  });

  return { totalLeads, totalConversations: totalConvs, avgScore, tiers };
}
