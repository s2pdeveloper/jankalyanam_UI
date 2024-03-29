import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW',
    },
  },
  {
    name: 'User',
    title: true,
  },
  {
    name: 'Admins',
    url: '/users/users',
    icon: 'icon-user',
  },
  {
    name: 'Donate',
    url: '/donate/list',
    icon: 'icon-user',
  },
  {
    name: 'Blood Request',
    url: '/blood-request/list',
    icon: 'icon-user',
  },
  {
    name: 'Advertise',
    url: '/advertise/list',
    icon: 'icon-user',
  },
  
  
];
