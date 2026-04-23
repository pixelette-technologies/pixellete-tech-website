import type { Author } from '@/types/blog';

export const authors: Record<string, Author> = {
  'ammar-hanif': {
    key: 'ammar-hanif',
    name: 'Ammar Hanif',
    role: 'Junior Full Stack Developer',
  },
  'temur-khan': {
    key: 'temur-khan',
    name: 'Temur Khan',
    role: 'Chief Technology Officer',
  },
  'asid-hussain': {
    key: 'asid-hussain',
    name: 'Asid Hussain',
    role: 'Partnerships',
  },
  'rana-ashiq': {
    key: 'rana-ashiq',
    name: 'Rana Ashiq',
    role: 'Chief Executive Officer',
  },
  'faisal-jaswal': {
    key: 'faisal-jaswal',
    name: 'Faisal Jaswal',
  },
  'sara-illahi-panhwar': {
    key: 'sara-illahi-panhwar',
    name: 'Sara Illahi Panhwar',
  },
  'nabia-hassan-sabzwari': {
    key: 'nabia-hassan-sabzwari',
    name: 'Nabia Hassan Sabzwari',
  },
  'aimun-cheema': {
    key: 'aimun-cheema',
    name: 'Aimun Cheema',
  },
  'maryam-aslam': {
    key: 'maryam-aslam',
    name: 'Maryam Aslam',
  },
  'hamid-ayub': {
    key: 'hamid-ayub',
    name: 'Hamid Ayub',
  },
  'pixelette-team': {
    key: 'pixelette-team',
    name: 'Pixelette Team',
  },
};

export function getAuthor(key: string | undefined): Author {
  if (!key) return authors['pixelette-team']!;
  return authors[key] ?? authors['pixelette-team']!;
}
