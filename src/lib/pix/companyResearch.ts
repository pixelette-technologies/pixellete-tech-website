import axios from 'axios';

export interface CompanyData {
  name: string;
  domain: string | null;
  industry: string | null;
  employeeCount: number | null;
  employeeRange: string | null;
  location: string | null;
  country: string | null;
  fundingTotal: number | null;
  fundingStage: string | null;
  techStack: string[];
  description: string | null;
  linkedin: string | null;
  founded: number | null;
  type: string | null;
  tags: string[];
}

export async function enrichCompany(companyName: string, domain?: string): Promise<CompanyData | null> {
  try {
    const apiKey = process.env.CLEARBIT_API_KEY;
    if (!apiKey || apiKey === 'your_clearbit_api_key_here') return null;

    let url: string;
    if (domain) {
      url = `https://company.clearbit.com/v2/companies/find?domain=${encodeURIComponent(domain)}`;
    } else {
      url = `https://company.clearbit.com/v1/companies/search?name=${encodeURIComponent(companyName)}&limit=1`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = domain ? response.data : response.data?.results?.[0];
    if (!data) return null;

    return {
      name: data.name || companyName,
      domain: data.domain || null,
      industry: data.category?.industry || null,
      employeeCount: data.metrics?.employees || null,
      employeeRange: data.metrics?.employeesRange || null,
      location: data.location || null,
      country: data.geo?.country || null,
      fundingTotal: data.metrics?.raised || null,
      fundingStage: data.crunchbase?.handle ? 'Venture-backed' : null,
      techStack: data.tech || [],
      description: data.description || null,
      linkedin: data.linkedin?.handle ? `linkedin.com/company/${data.linkedin.handle}` : null,
      founded: data.foundedYear || null,
      type: data.type || null,
      tags: data.tags || [],
    };
  } catch (err: unknown) {
    const axiosErr = err as { response?: { status?: number }; message?: string };
    if (axiosErr.response?.status === 404) return null;
    if (axiosErr.response?.status === 402) {
      console.error('Clearbit quota exceeded');
      return null;
    }
    console.error('Company enrichment failed:', axiosErr.message);
    return null;
  }
}

export function formatCompanyContext(company: CompanyData): string {
  const parts: string[] = [];
  if (company.industry) parts.push(`Industry: ${company.industry}`);
  if (company.employeeRange || company.employeeCount) parts.push(`Size: ${company.employeeRange || company.employeeCount + ' employees'}`);
  if (company.location) parts.push(`Location: ${company.location}`);
  if (company.fundingTotal) {
    const millions = Math.round(company.fundingTotal / 1000000);
    parts.push(`Funding: $${millions}M raised`);
  }
  if (company.techStack?.length > 0) parts.push(`Tech stack: ${company.techStack.slice(0, 5).join(', ')}`);
  if (company.description) parts.push(`About: ${company.description.substring(0, 150)}`);
  if (parts.length === 0) return '';
  return `\n\n[COMPANY INTELLIGENCE — ${company.name.toUpperCase()}]\n${parts.join('\n')}\nUse this context to personalise your response. Reference what their company does. Do not mention that you looked them up.`;
}

export function extractDomainFromEmail(email: string): string | null {
  if (!email) return null;
  const domain = email.split('@')[1];
  if (!domain) return null;
  const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'protonmail.com', 'aol.com', 'live.com'];
  if (freeDomains.includes(domain)) return null;
  return domain;
}
