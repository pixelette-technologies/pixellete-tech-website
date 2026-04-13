import { Resend } from 'resend';
import { getWeeklyStats } from './database';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function generateAndSendWeeklyReport() {
  const stats = await getWeeklyStats();

  const totalLeads = stats.leads.length;
  const totalConversations = stats.conversations.length;
  const avgScore = totalLeads > 0
    ? Math.round(stats.leads.reduce((sum, l) => sum + (l.score || 0), 0) / totalLeads)
    : 0;
  const avgMessages = totalConversations > 0
    ? Math.round(stats.conversations.reduce((sum, c) => sum + (c.message_count || 0), 0) / totalConversations)
    : 0;

  const tiers = { cold: 0, warm: 0, hot: 0, urgent: 0 };
  stats.leads.forEach(l => { tiers[l.classification as keyof typeof tiers] = (tiers[l.classification as keyof typeof tiers] || 0) + 1; });

  const services: Record<string, number> = {};
  stats.leads.forEach(l => {
    const s = l.service_interest || 'Unknown';
    services[s] = (services[s] || 0) + 1;
  });

  const languages: Record<string, number> = {};
  stats.leads.forEach(l => {
    const lang = l.language || 'English';
    languages[lang] = (languages[lang] || 0) + 1;
  });

  const topics: Record<string, number> = {};
  stats.questions.forEach(q => {
    const t = q.topic || 'general';
    topics[t] = (topics[t] || 0) + 1;
  });
  const topTopics = Object.entries(topics).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const aiRatings = stats.quality.filter(q => q.ai_rating).map(q => q.ai_rating);
  const avgAiRating = aiRatings.length > 0 ? (aiRatings.reduce((s, r) => s + r, 0) / aiRatings.length).toFixed(1) : 'N/A';

  const visitorRatings = stats.quality.filter(q => q.visitor_rating).map(q => q.visitor_rating);
  const avgVisitorRating = visitorRatings.length > 0 ? (visitorRatings.reduce((s, r) => s + r, 0) / visitorRatings.length).toFixed(1) : 'N/A';

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const dateRange = `${weekAgo.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} to ${now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;

  const tierBar = (count: number, color: string) => {
    const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
    return `<div style="display:flex;align-items:center;margin:4px 0;"><span style="width:80px;font-size:13px;color:#d1d5db;">${count} (${pct}%)</span><div style="flex:1;background:#1f1f1f;border-radius:4px;height:16px;"><div style="width:${pct}%;background:${color};height:100%;border-radius:4px;"></div></div></div>`;
  };

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
              <td style="padding:24px 32px;">
                <h1 style="margin:0;font-size:20px;color:#fff;">Pix Weekly Report</h1>
                <p style="margin:4px 0 0;font-size:14px;color:#6b7280;">${dateRange} | ${totalLeads} leads</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 20px;">
                <table width="100%" cellpadding="0" cellspacing="8">
                  <tr>
                    <td style="background:#1a1a1a;border-radius:8px;padding:16px;text-align:center;width:25%;"><p style="margin:0;font-size:24px;color:#fff;font-weight:700;">${totalLeads}</p><p style="margin:4px 0 0;font-size:11px;color:#6b7280;text-transform:uppercase;">Leads</p></td>
                    <td style="background:#1a1a1a;border-radius:8px;padding:16px;text-align:center;width:25%;"><p style="margin:0;font-size:24px;color:#fff;font-weight:700;">${totalConversations}</p><p style="margin:4px 0 0;font-size:11px;color:#6b7280;text-transform:uppercase;">Chats</p></td>
                    <td style="background:#1a1a1a;border-radius:8px;padding:16px;text-align:center;width:25%;"><p style="margin:0;font-size:24px;color:#fff;font-weight:700;">${avgScore}</p><p style="margin:4px 0 0;font-size:11px;color:#6b7280;text-transform:uppercase;">Avg Score</p></td>
                    <td style="background:#1a1a1a;border-radius:8px;padding:16px;text-align:center;width:25%;"><p style="margin:0;font-size:24px;color:#fff;font-weight:700;">${avgMessages}</p><p style="margin:4px 0 0;font-size:11px;color:#6b7280;text-transform:uppercase;">Avg Msgs</p></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 20px;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Lead Tiers</p>
                <p style="margin:0;font-size:13px;color:#991B1B;">Urgent</p>${tierBar(tiers.urgent, '#991B1B')}
                <p style="margin:0;font-size:13px;color:#DC2626;">Hot</p>${tierBar(tiers.hot, '#DC2626')}
                <p style="margin:0;font-size:13px;color:#D97706;">Warm</p>${tierBar(tiers.warm, '#D97706')}
                <p style="margin:0;font-size:13px;color:#2563EB;">Cold</p>${tierBar(tiers.cold, '#2563EB')}
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 20px;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Top Services</p>
                ${Object.entries(services).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([s, c]) => `<p style="margin:4px 0;font-size:13px;color:#d1d5db;">${s}: <strong>${c}</strong></p>`).join('')}
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 20px;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Quality Ratings</p>
                <p style="margin:4px 0;font-size:13px;color:#d1d5db;">AI Self-Rating: <strong>${avgAiRating}/10</strong></p>
                <p style="margin:4px 0;font-size:13px;color:#d1d5db;">Visitor Rating: <strong>${avgVisitorRating}/5</strong></p>
              </td>
            </tr>
            ${topTopics.length > 0 ? `
            <tr>
              <td style="padding:0 32px 20px;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Top Question Topics</p>
                ${topTopics.map(([t, c]) => `<p style="margin:4px 0;font-size:13px;color:#d1d5db;">${t}: <strong>${c}</strong></p>`).join('')}
              </td>
            </tr>` : ''}
            ${Object.keys(languages).length > 1 ? `
            <tr>
              <td style="padding:0 32px 20px;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Languages</p>
                ${Object.entries(languages).map(([l, c]) => `<p style="margin:4px 0;font-size:13px;color:#d1d5db;">${l}: <strong>${c}</strong></p>`).join('')}
              </td>
            </tr>` : ''}
            <tr>
              <td style="background:#0a0a0a;padding:20px 32px;text-align:center;border-top:1px solid #1f1f1f;">
                <p style="margin:0;font-size:12px;color:#6b7280;">Pix Weekly Report | <a href="https://pixelettetech.com" style="color:#a78bfa;text-decoration:none;">pixelettetech.com</a></p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;

  const recipients = [
    process.env.WEEKLY_REPORT_EMAIL || 'asif@pixelettetech.com',
    process.env.SALES_EMAIL || 'sales@pixelettetech.com',
  ].filter(Boolean);

  await resend.emails.send({
    from: `Pix Reports <${process.env.FROM_EMAIL || 'pix@pixelettetech.com'}>`,
    to: recipients,
    subject: `Pix Weekly Report - ${dateRange} - ${totalLeads} leads`,
    html,
  });

  return { totalLeads, totalConversations, avgScore, tiers };
}
