type NavigationLink = {
  key: string;
  label: string;
  url: string;
};

/**
 * Navigation links for the sidebar and bottom navbar.
 */
export const navigationLinks: NavigationLink[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    url: '/',
  },
  {
    key: 'transactions',
    label: 'Transactions',
    url: '/transactions',
  },
  {
    key: 'holdings',
    label: 'Holdings',
    url: '/holdings',
  },
  {
    key: 'profile',
    label: 'Profile',
    url: '/profile',
  },
];

export default navigationLinks;
