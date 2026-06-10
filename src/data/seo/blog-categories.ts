export type BlogCategory = {
  slug: string;
  name: string;
  description: string;
  postSlugs: string[];
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    description: 'Expert insights on AI development, machine learning, NLP, generative AI, and intelligent agents from Pixelette Technologies.',
    postSlugs: [
      '10-profitable-ai-saas-ideas-to-build-right-now',
      'aiops-use-cases-in-it-operations',
      'best-ai-chatbot-development-services-company',
      'custom-ai-solutions-vs-pre-built-ai-comparison',
      'generative-ai-vs-conversational-ai',
      'high-impact-ai-business-solutions',
      'how-to-build-AI-model',
      'how-to-start-an-ai-business-in-2025',
      'how-to-use-ai-in-web-development',
      'natural-language-processing-techniques-for-ai-development',
      'top-5-ai-data-analytics-tools-for-enterprises-in-2025',
      'what-is-enterprise-conversational-ai-guide-a-non-technical-g',
      'use-ai-in-transportation',
    ],
  },
  {
    slug: 'blockchain-web3',
    name: 'Blockchain & Web3',
    description: 'In-depth articles on blockchain development, smart contracts, NFTs, DeFi, and Web3 applications.',
    postSlugs: [
      '10-features-for-nft-marketplace-development-plan',
      'beginners-guide-to-cryptocurrency-wallet-development',
      'blockchain-application-development-blueprint-plan',
      'blockchain-development-trends-2025',
      'building-business-using-blockchain-guide-for-entrepreneurs',
      'cryptocurrency-exchange-development-features-costs-and-tips',
      'cryptographic-hashing-blockchain-development-safety',
      'enterprise-blockchain-solutions-reshape-business',
      'hashgraph-vs-blockchain-comparison',
      'how-does-a-block-of-data-on-blockchain-get-locked',
      'how-to-apply-blockchain-in-development-of-finance-apps',
      'why-businesses-should-adopt-blockchain-accounting',
      'why-choose-dapp-development-company-blockchain-solutions',
    ],
  },
  {
    slug: 'software-development',
    name: 'Software Development',
    description: 'Practical guides on software development processes, agile vs waterfall, cost estimation, and IT outsourcing.',
    postSlugs: [
      'agile-vs-waterfall-methodologies-for-custom-software-solutions',
      'benefits-of-IT-managed-support-services-for-remote-teams',
      'custom-software-solutions-vs-off-the-shelf-software',
      'how-much-software-development-costs',
      'steps-software-development-process',
      'top-tools-to-develop-a-scalable-supply-chain-intelligence-pl',
    ],
  },
  {
    slug: 'mobile-web-design',
    name: 'Mobile, Web & Design',
    description: 'Articles on mobile app development, web development, AR/VR, IoT, and UI/UX design best practices.',
    postSlugs: [
      'ar-vs-vr-development-explained',
      'how-to-make-a-mobile-app-that-earns-real-money',
      'key-challenges-in-IoT-app-development',
      'ui-ux-design-role-in-ecommerce-development-sales',
    ],
  },
];

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find(cat => cat.slug === slug);
}

export function getCategoryForPost(postSlug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find(cat => cat.postSlugs.includes(postSlug));
}
