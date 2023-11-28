import { DASHBOARD, PROFILE } from 'routes/screenNames';

export default {
  menu: [
    {
      id: '@drawer-item-0',
      icon: 'home',
      label: 'Resumo',
      routeName: DASHBOARD,
      active: true,
    },
    {
      id: '@drawer-item-1',
      icon: 'person',
      label: 'Perfil',
      routeName: PROFILE,
      active: false,
    },
  ],
};
