import { BUSINESS_ROLE, MenuOption } from './bootstrap.model'

export const MENU_OPTIONS: Array<MenuOption> = [
  {
    title: 'Menú',
    icon: 'menu_book',
    link: 'waiter/menu',
    roles: [BUSINESS_ROLE.ADMIN, BUSINESS_ROLE.DELIVERY, BUSINESS_ROLE.WAITER],
  },
  {
    title: 'Ordenes',
    icon: 'playlist_add_check',
    link: 'waiter/orders',
    roles: [BUSINESS_ROLE.ADMIN, BUSINESS_ROLE.WAITER],
  },
  {
    title: 'Domicilios',
    icon: 'directions_bike',
    link: 'waiter/delivery',
    roles: [BUSINESS_ROLE.ADMIN, BUSINESS_ROLE.DELIVERY, BUSINESS_ROLE.WAITER],
  },
  {
    title: 'EXPENSES.NAVBAR',
    icon: 'shopping_cart',
    link: 'waiter/expenses',
    roles: [BUSINESS_ROLE.ADMIN, BUSINESS_ROLE.WAITER],
  },
  {
    title: 'CLIENTS.NAVBAR',
    icon: 'face',
    link: 'client',
    roles: [BUSINESS_ROLE.ADMIN, BUSINESS_ROLE.WAITER],
  },
  {
    title: 'Tablero',
    icon: 'content_paste',
    link: 'admin/menu-board',
    roles: [BUSINESS_ROLE.ADMIN],
  },
  {
    title: 'Caja',
    icon: 'payments',
    link: 'admin/cash-desk',
    roles: [BUSINESS_ROLE.ADMIN],
  },
  {
    title: 'RECIPES.NAVBAR',
    icon: 'edit',
    link: 'recipe',
    roles: [BUSINESS_ROLE.ADMIN],
  },
  {
    title: 'Cambios',
    icon: 'people',
    link: 'employee/list',
    roles: [BUSINESS_ROLE.ADMIN],
  },
  {
    title: 'Usuarios',
    icon: 'people',
    link: 'auth/users',
    roles: [BUSINESS_ROLE.ADMIN],
  },
  {
    title: 'Perfil',
    icon: 'app_settings_alt',
    link: 'auth/profile',
    roles: [BUSINESS_ROLE.ADMIN, BUSINESS_ROLE.DELIVERY, BUSINESS_ROLE.WAITER],
  },
]

export const CLIENT_MENU_OPTIONS: Array<MenuOption> = [
  {
    title: 'Menú del Día',
    icon: '/assets/menu.png',
    link: 'waiter/menu',
  },
  {
    title: 'Domicilios',
    icon: '/assets/delivery.png',
    link: 'waiter/menu',
  },
  {
    title: 'Regístrarse',
    icon: '/assets/register.png',
    link: 'auth/login',
  },
  {
    title: 'Cuenta',
    icon: '/assets/account.png',
    link: 'auth/profile',
  },
  {
    title: 'Web App',
    icon: '/assets/phone.png',
    link: 'appinfo',
  },
  {
    title: 'Direción',
    icon: '/assets/address.png',
    link: '/',
  },
]
