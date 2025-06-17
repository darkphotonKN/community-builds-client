import { NavType, NavTypeEnum } from '@/constants/enums';
import { logout } from '@/lib/auth/auth';

type NavItem = {
  name: string;
  type: NavTypeEnum;
  link?: string;
  onClick?: () => void;
};

type NavData = NavItem[];

export const navData: NavData = [
  {
    name: 'Tutorials',
    link: '/builds/create',
    type: NavType.standard,
  },
  {
    name: 'Builds',
    link: '/builds',
    type: NavType.standard,
  },
  {
    name: 'Example',
    link: '/example',
    type: NavType.standard,
  },
];

export const cornerNavData: NavData = [
  {
    name: 'Create Build',
    link: '/builds/create',
    type: NavType.standard,
  },
  {
    name: 'Register',
    link: '/signup',
    type: NavType.notAuthenticated,
  },
  {
    name: 'Login',
    link: '/login',
    type: NavType.notAuthenticated,
  },
  {
    name: 'Profile',
    link: '/profile',
    type: NavType.authenticated,
  },
  {
    name: 'Logout',
    type: NavType.authenticated,
    onClick: logout,
  },
];
