import config from '~/config.json';
//this consist of the side bar info 
export const navLinks = [
  {
    label: 'Projects',
    pathname: '/#project-1',
  },
  {
    label: 'Details',
    pathname: '/#details',
  },
  {
    label: 'Articles',
    pathname: '/articles',
  },
  {
    label: 'Contact',
    pathname: '/contact',
  },
];

export const socialLinks = [
  {
    label: 'Reddit',
    url: `https://www.reddit.com/user/${config.Reddit}`,
    icon: 'reddit',
  },
  {
    label: 'overflow',
    url: `https://stackoverflow.com/users/18501284/smit`,
    icon: 'stackoverflow',
  },
  {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
];
