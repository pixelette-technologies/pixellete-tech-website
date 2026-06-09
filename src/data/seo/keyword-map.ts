/**
 * Canonical keyword-to-page mapping (P0-13).
 *
 * Rules:
 * - Each keyword maps to exactly ONE canonical page.
 * - If GSC shows a page already ranking for a keyword, that page wins.
 * - Cannibalisation candidates (two pages ranking for the same keyword) are
 *   flagged with `cannibalises` listing the competing URLs.
 *
 * Source: audit-cache/keywords.json + gsc_summary.json (2026-06-09, US market).
 * Regenerate when the keyword inventory or rankings shift.
 */

export type KeywordEntry = {
  keyword: string;
  canonicalPath: string;
  intent: 'informational' | 'commercial' | 'navigational' | 'transactional';
  cannibalises?: string[];
};

export const KEYWORD_MAP: KeywordEntry[] = [
  // ── Brand / Navigational ─────────────────────────────────────────────────
  {
    keyword: 'pixelette technologies',
    canonicalPath: '/',
    intent: 'navigational',
    cannibalises: [
      '/about-us',
      '/blog',
      '/case-studies',
      '/ai-development-services',
      '/blockchain-development-services',
      '/web-development-services',
      '/mobile-app-development-services',
      '/custom-software-development-services',
      '/ui-ux-design-services',
      '/ar-vr-development-services',
      '/quantum-development-services',
      '/it-outsourcing-services',
      '/staff-augmentation-services',
      '/dedicated-team-services',
      '/startup-funding',
      '/contact-us',
      '/pixelette-research',
      '/clutch-reviews',
      '/cancelation-refund-policy',
      '/privacy-policy',
      '/terms-conditions',
    ],
  },

  // ── AI Services ──────────────────────────────────────────────────────────
  {
    keyword: 'ai development services',
    canonicalPath: '/ai-development-services',
    intent: 'commercial',
  },
  {
    keyword: 'ai software development services',
    canonicalPath: '/ai-development-services',
    intent: 'commercial',
  },
  {
    keyword: 'generative ai development services',
    canonicalPath: '/ai-development-services',
    intent: 'commercial',
  },
  {
    keyword: 'ai application development services',
    canonicalPath: '/ai-development-services',
    intent: 'commercial',
  },
  {
    keyword: 'ai chatbot development services',
    canonicalPath: '/blog/best-ai-chatbot-development-services-company',
    intent: 'commercial',
  },
  {
    keyword: 'custom ai development services',
    canonicalPath: '/ai-development-services',
    intent: 'commercial',
  },
  {
    keyword: 'how to build an ai model',
    canonicalPath: '/blog/how-to-build-AI-model',
    intent: 'informational',
  },
  {
    keyword: 'generative ai vs conversational ai',
    canonicalPath: '/blog/generative-ai-vs-conversational-ai',
    intent: 'informational',
  },
  {
    keyword: 'ai business solutions',
    canonicalPath: '/blog/high-impact-ai-business-solutions',
    intent: 'informational',
  },
  {
    keyword: 'ai saas ideas',
    canonicalPath: '/blog/10-profitable-ai-saas-ideas-to-build-right-now',
    intent: 'informational',
  },
  {
    keyword: 'natural language processing techniques',
    canonicalPath: '/blog/natural-language-processing-techniques-for-ai-development',
    intent: 'informational',
  },
  {
    keyword: 'how to start an ai business',
    canonicalPath: '/blog/how-to-start-an-ai-business-in-2025',
    intent: 'informational',
  },
  {
    keyword: 'enterprise conversational ai',
    canonicalPath: '/blog/what-is-enterprise-conversational-ai-guide-a-non-technical-g',
    intent: 'informational',
  },
  {
    keyword: 'ai in transportation',
    canonicalPath: '/blog/use-ai-in-transportation',
    intent: 'informational',
  },
  {
    keyword: 'aiops use cases',
    canonicalPath: '/blog/aiops-use-cases-in-it-operations',
    intent: 'informational',
  },
  {
    keyword: 'ai data analytics tools',
    canonicalPath: '/blog/top-5-ai-data-analytics-tools-for-enterprises-in-2025',
    intent: 'informational',
  },

  // ── Blockchain Services ───────────────────────────────────────────────────
  {
    keyword: 'blockchain development services',
    canonicalPath: '/blockchain-development-services',
    intent: 'commercial',
  },
  {
    keyword: 'blockchain development company',
    canonicalPath: '/blockchain-development-services',
    intent: 'commercial',
  },
  {
    keyword: 'smart contract development',
    canonicalPath: '/blockchain-development-services',
    intent: 'commercial',
  },
  {
    keyword: 'dapp development company',
    canonicalPath: '/blog/why-choose-dapp-development-company-blockchain-solutions',
    intent: 'commercial',
  },
  {
    keyword: 'nft marketplace development',
    canonicalPath: '/blog/10-features-for-nft-marketplace-development-plan',
    intent: 'informational',
  },
  {
    keyword: 'cryptocurrency wallet development',
    canonicalPath: '/blog/beginners-guide-to-cryptocurrency-wallet-development',
    intent: 'informational',
  },
  {
    keyword: 'cryptocurrency exchange development',
    canonicalPath: '/blog/cryptocurrency-exchange-development-features-costs-and-tips',
    intent: 'informational',
  },
  {
    keyword: 'enterprise blockchain solutions',
    canonicalPath: '/blog/enterprise-blockchain-solutions-reshape-business',
    intent: 'informational',
  },
  {
    keyword: 'hashgraph vs blockchain',
    canonicalPath: '/blog/hashgraph-vs-blockchain-comparison',
    intent: 'informational',
  },
  {
    keyword: 'blockchain for finance apps',
    canonicalPath: '/blog/how-to-apply-blockchain-in-development-of-finance-apps',
    intent: 'informational',
  },
  {
    keyword: 'blockchain development trends',
    canonicalPath: '/blog/blockchain-development-trends-2025',
    intent: 'informational',
  },
  {
    keyword: 'blockchain for businesses',
    canonicalPath: '/blog/why-businesses-should-adopt-blockchain-accounting',
    intent: 'informational',
  },

  // ── Quantum Computing ─────────────────────────────────────────────────────
  {
    keyword: 'quantum computing development',
    canonicalPath: '/quantum-development-services',
    intent: 'commercial',
  },
  {
    keyword: 'quantum consultancy',
    canonicalPath: '/quantum-development-services',
    intent: 'commercial',
  },
  {
    keyword: 'post-quantum cryptography',
    canonicalPath: '/quantum-development-services',
    intent: 'informational',
  },

  // ── Web Development ───────────────────────────────────────────────────────
  {
    keyword: 'web development services',
    canonicalPath: '/web-development-services',
    intent: 'commercial',
  },
  {
    keyword: 'web development company',
    canonicalPath: '/web-development-services',
    intent: 'commercial',
  },
  {
    keyword: 'ai in web development',
    canonicalPath: '/blog/how-to-use-ai-in-web-development',
    intent: 'informational',
  },

  // ── Mobile Development ────────────────────────────────────────────────────
  {
    keyword: 'mobile app development services',
    canonicalPath: '/mobile-app-development-services',
    intent: 'commercial',
  },
  {
    keyword: 'mobile app development company',
    canonicalPath: '/mobile-app-development-services',
    intent: 'commercial',
  },
  {
    keyword: 'how to make a mobile app',
    canonicalPath: '/blog/how-to-make-a-mobile-app-that-earns-real-money',
    intent: 'informational',
  },
  {
    keyword: 'iot app development',
    canonicalPath: '/blog/key-challenges-in-IoT-app-development',
    intent: 'informational',
  },

  // ── UI/UX ─────────────────────────────────────────────────────────────────
  {
    keyword: 'ui ux design services',
    canonicalPath: '/ui-ux-design-services',
    intent: 'commercial',
  },
  {
    keyword: 'ui ux design role in ecommerce',
    canonicalPath: '/blog/ui-ux-design-role-in-ecommerce-development-sales',
    intent: 'informational',
  },

  // ── AR/VR ─────────────────────────────────────────────────────────────────
  {
    keyword: 'ar vr development services',
    canonicalPath: '/ar-vr-development-services',
    intent: 'commercial',
  },
  {
    keyword: 'ar vs vr development',
    canonicalPath: '/blog/ar-vs-vr-development-explained',
    intent: 'informational',
  },

  // ── Custom Software ───────────────────────────────────────────────────────
  {
    keyword: 'custom software development services',
    canonicalPath: '/custom-software-development-services',
    intent: 'commercial',
  },
  {
    keyword: 'custom software vs off the shelf',
    canonicalPath: '/blog/custom-software-solutions-vs-off-the-shelf-software',
    intent: 'informational',
  },
  {
    keyword: 'agile vs waterfall',
    canonicalPath: '/blog/agile-vs-waterfall-methodologies-for-custom-software-solutions',
    intent: 'informational',
  },
  {
    keyword: 'software development cost',
    canonicalPath: '/blog/how-much-software-development-costs',
    intent: 'informational',
  },
  {
    keyword: 'software development process',
    canonicalPath: '/blog/steps-software-development-process',
    intent: 'informational',
  },

  // ── Delivery Models ───────────────────────────────────────────────────────
  {
    keyword: 'it outsourcing services',
    canonicalPath: '/it-outsourcing-services',
    intent: 'commercial',
  },
  {
    keyword: 'staff augmentation services',
    canonicalPath: '/staff-augmentation-services',
    intent: 'commercial',
  },
  {
    keyword: 'dedicated team services',
    canonicalPath: '/dedicated-team-services',
    intent: 'commercial',
  },
  {
    keyword: 'managed it support services',
    canonicalPath: '/blog/benefits-of-IT-managed-support-services-for-remote-teams',
    intent: 'informational',
  },
  {
    keyword: 'supply chain intelligence platform',
    canonicalPath: '/blog/top-tools-to-develop-a-scalable-supply-chain-intelligence-pl',
    intent: 'informational',
  },

  // ── Company / Authority ───────────────────────────────────────────────────
  {
    keyword: 'startup funding programme',
    canonicalPath: '/startup-funding',
    intent: 'commercial',
  },
  {
    keyword: 'pixelette research',
    canonicalPath: '/pixelette-research',
    intent: 'navigational',
  },
];

/**
 * Resolve the canonical page path for a given keyword (case-insensitive).
 */
export function resolveCanonicalPage(keyword: string): KeywordEntry | undefined {
  const lower = keyword.toLowerCase();
  return KEYWORD_MAP.find(e => e.keyword.toLowerCase() === lower);
}

/**
 * Return all cannibalisation entries — keywords mapped to more than one
 * ranking page (where `cannibalises` is populated).
 */
export function getCannibalisation(): KeywordEntry[] {
  return KEYWORD_MAP.filter(e => e.cannibalises && e.cannibalises.length > 0);
}
