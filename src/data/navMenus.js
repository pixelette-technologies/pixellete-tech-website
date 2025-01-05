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
        name: 'Artificial Intelligence',
        to: '/ai-services',
      },
      {
        id: 4,
        name: 'Blockchain Development',
        to: '/blockchain-development',
      },
      { id: 5, name: 'Virtual/Augmented Reality', to: '/vr-ar' },
      { id: 6, name: 'Web Development', to: '/web-development' },
      { id: 7, name: 'Mobile Application Development', to: '/mobile-development' },
      { id: 8, name: 'Custom Software Development', to: '/custom-software-development' },
      { id: 9, name: 'User Interface (UI) and User Experience (UX) Design', to: '/ui-ux' },

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
    name: 'How it works',
    subMenus: [
      {
        id: 11,
        name: 'Complete Outsourcing',
        to: '/deliver',

      },
      {
        id: 12,
        name: 'Staff Augmentation',
        to: '/supplement',
      },
      { id: 13, name: 'Dedicated Teams', to: '/deploy' },
    ],
  },
  {
    id: 14,
    name: 'About Us',
    to: '/about-us',
  },
  { id: 15, name: 'Case Studies', to: '/case-studies' },
  { id: 16, name: 'Blogs', to: '/blogs' },
];
