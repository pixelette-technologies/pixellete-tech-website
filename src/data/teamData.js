// Real people behind Pixelette Technologies.
// Portraits are exported from the Figma "Our Team + AI Agents" design
// (photo + gradient glow, no text) and live in /public/images/team/.
// LinkedIn URLs currently point to the company page (placeholder) until
// personal profile URLs are confirmed.
const COMPANY_LINKEDIN = 'https://www.linkedin.com/company/pixelettetechnologies/';

export const teamData = [
  {
    image: '/images/team/asif-rana.jpg',
    name: 'Mr. Asif Ashiq Rana',
    role: 'CEO & Founder',
    linkedin: COMPANY_LINKEDIN,
  },
  {
    image: '/images/team/temur-khan.jpg',
    name: 'Temur Khan',
    role: 'Chief Technology Officer',
    linkedin: COMPANY_LINKEDIN,
  },
  {
    image: '/images/team/aliya-maqsood.jpg',
    name: 'Aliya Maqsood',
    role: 'Chief Brand & Marketing Officer',
    linkedin: COMPANY_LINKEDIN,
  },
  {
    image: '/images/team/ammar-hanif.jpg',
    name: 'Ammar Hanif',
    role: 'Chief AI Solutions Architect',
    linkedin: COMPANY_LINKEDIN,
  },
  {
    image: '/images/team/ayisha-khan.jpg',
    name: 'Ayisha Khan',
    role: 'Head of Client Success & Operations',
    linkedin: COMPANY_LINKEDIN,
  },
  {
    image: '/images/team/asid-hussain.jpg',
    name: 'Asid Hussain',
    role: 'Head of Growth & Strategic Partnerships',
    linkedin: COMPANY_LINKEDIN,
  },
  {
    image: '/images/team/daniel-tschinkel.jpg',
    name: 'Daniel C. Tschinkel',
    role: 'Head of Operations (DACH)',
    linkedin: COMPANY_LINKEDIN,
  },
  {
    image: '/images/team/eric-smithers.jpg',
    name: 'Eric R. Smithers',
    role: 'Managing Director (USA)',
    linkedin: COMPANY_LINKEDIN,
  },
  {
    image: '/images/team/barry-perkins.jpg',
    name: 'Barry Perkins',
    role: 'Managing Director (USA)',
    linkedin: COMPANY_LINKEDIN,
  },
];

// AI-agent persona cards. No LinkedIn — these are not people.
// Hidden until the 12 agent portraits are exported from Figma; the component
// skips the agents section when this array is empty. Repopulate with
// { image: '/images/team/agent-<name>.jpg', name, role } to enable.
export const agentsData = [];
