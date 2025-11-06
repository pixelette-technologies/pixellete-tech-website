export const navMenus = [
  {
    id: 1,
    name: 'Home',
    to: '/',
  },
  {
    id: 2,
    name: 'Services',
    subMenus: [
      {
        id: 3,
        name: 'AI Development',
        to: '/ai-development-services',
      },
      {
        id: 4,
        name: 'Blockchain Development',
        to: '/blockchain-development-services',
      },
      { id: 5, name: 'AR/VR Development ', to: '/ar-vr-development-services' },
      { id: 6, name: 'Web Development', to: '/web-development-services' },
      { id: 7, name: 'Mobile Application Development', to: '/mobile-app-development-services' },
      { id: 8, name: 'Custom Software Development', to: '/custom-software-development-services' },
      { id: 9, name: 'UI/UX Design', to: '/ui-ux-design-services' },

      // {
      //   name: "Digital Marketing",
      //   to: "digital-marketing",
      // },
      // {
      //   name: "Staff Augmented",
      //   to: "staff-augmented",
      // },

    ],
  },
  {
    id: 10,
    name: 'How We Work',
    subMenus: [
      {
        id: 11,
        name: 'Complete Outsourcing',
        to: '/it-outsourcing-services',

      },
      {
        id: 12,
        name: 'Staff Augmentation',
        to: '/staff-augmentation-services',
      },
      { id: 13, name: 'Dedicated Teams', to: '/dedicated-team-services' },
    ],
  },
  {
    id: 14,
    name: 'About Us',
    to: '/about-us',
  },
  { id: 15, name: 'Case Studies', to: '/case-studies' },
  { id: 16, name: 'Blogs', to: '/blog' },
];
