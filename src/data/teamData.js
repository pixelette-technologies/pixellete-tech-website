// Real people behind Pixelette Technologies.
// Portraits are exported from the Figma "Our Team + AI Agents" design
// (photo + gradient glow, no text) and live in /public/images/team/.
// LinkedIn URLs are the members' personal profiles where known; the two
// still pending (Ayisha Khan, Syed Bilal Rashid) fall back to the company
// page until their personal profile URLs are supplied.
const COMPANY_LINKEDIN = 'https://www.linkedin.com/company/pixelettetechnologies/';

export const teamData = [
  {
    image: '/images/team/asif-rana.jpg',
    name: 'Mr. Asif Ashiq Rana',
    role: 'CEO & Founder',
    linkedin: 'https://www.linkedin.com/in/rana-khan-asif/',
  },
  {
    image: '/images/team/temur-khan.jpg',
    name: 'Temur Khan',
    role: 'Chief Technology Officer',
    linkedin: 'https://www.linkedin.com/in/temurkhan/',
  },
  {
    image: '/images/team/aliya-maqsood.jpg',
    name: 'Aliya Maqsood',
    role: 'Chief Brand & Marketing Officer',
    linkedin: 'https://www.linkedin.com/in/aliya-maqsood-25643b25b/',
  },
  {
    image: '/images/team/ammar-hanif.jpg',
    name: 'Ammar Hanif',
    role: 'Chief AI Solutions Architect',
    linkedin: 'https://www.linkedin.com/in/ammarhanif8/',
  },
  {
    image: '/images/team/eric-smithers.jpg',
    name: 'Eric R. Smithers',
    role: 'Managing Director (USA)',
    linkedin: 'https://www.linkedin.com/in/eric-r-smithers-2677565/',
  },
  {
    image: '/images/team/barry-perkins.jpg',
    name: 'Barry Perkins',
    role: 'Managing Director (USA)',
    linkedin: 'https://www.linkedin.com/in/barrynperkins/',
  },
  {
    image: '/images/team/ayisha-khan.jpg',
    name: 'Ayisha Khan',
    role: 'Head of Client Success & Operations',
    linkedin: COMPANY_LINKEDIN,
  },
  {
    image: '/images/team/daniel-tschinkel.jpg',
    name: 'Daniel C. Tschinkel',
    role: 'Head of Operations (DACH)',
    linkedin: 'https://www.linkedin.com/in/daniel-tschinkel/',
  },
  {
    image: '/images/team/syed-bilal-rashid.jpg',
    name: 'Syed Bilal Rashid',
    role: 'Blockchain Solutions Architect',
    linkedin: COMPANY_LINKEDIN,
  },
];

// AI-agent persona cards. No LinkedIn — these are not people.
// Portraits exported from the Figma "Our Team + AI Agents" design (photo +
// gradient glow, no text) and live in /public/images/team/agent-*.jpg.
// Order matches the Figma grid (left-to-right, top-to-bottom). The component
// renders the agents section only when this array is non-empty.
export const agentsData = [
  {
    image: '/images/team/agent-nova.jpg',
    name: 'Nova',
    role: 'AI Strategist',
  },
  {
    image: '/images/team/agent-atlas.jpg',
    name: 'Atlas',
    role: 'Solution Architect',
  },
  {
    image: '/images/team/agent-forge.jpg',
    name: 'Forge',
    role: 'Development Agent',
  },
  {
    image: '/images/team/agent-cipher.jpg',
    name: 'Cipher',
    role: 'Blockchain Agent',
  },
  {
    image: '/images/team/agent-sentinel.jpg',
    name: 'Sentinel',
    role: 'Cybersecurity Agent',
  },
  {
    image: '/images/team/agent-vision.jpg',
    name: 'Vision',
    role: 'UX & Product Agent',
  },
  {
    image: '/images/team/agent-orion.jpg',
    name: 'Orion',
    role: 'Cloud & DevOps Agent',
  },
  {
    image: '/images/team/agent-echo.jpg',
    name: 'Echo',
    role: 'Automation Agent',
  },
  {
    image: '/images/team/agent-cortex.jpg',
    name: 'Cortex',
    role: 'Data Intelligence Agent',
  },
  {
    image: '/images/team/agent-helix.jpg',
    name: 'Helix',
    role: 'Machine Learning Agent',
  },
  {
    image: '/images/team/agent-pulse.jpg',
    name: 'Pulse',
    role: 'Growth & Marketing Agent',
  },
  {
    image: '/images/team/agent-aria.jpg',
    name: 'Aria',
    role: 'Conversational AI Agent',
  },
];
