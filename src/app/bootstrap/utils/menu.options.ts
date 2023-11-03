import { UserRole } from 'src/app/auth/utils/auth.model'

interface MenuOption {
  title?: string
  icon?: string
  link?: string
  roles?: Array<UserRole>
}

export const MENU_OPTIONS: Array<MenuOption> = [
  {
    title: 'Menú',
    icon: 'menu_book',
    link: 'waiter/menu',
    roles: ['admin', 'delivery', 'waiter'],
  },
  {
    title: 'Ordenes',
    icon: 'playlist_add_check',
    link: 'waiter/orders',
    roles: ['admin', 'waiter'],
  },
  {
    title: 'Domicilios',
    icon: 'directions_bike',
    link: 'waiter/delivery',
    roles: ['admin', 'delivery', 'waiter'],
  },
  {
    title: 'EXPENSES.NAVBAR',
    icon: 'shopping_cart',
    link: 'waiter/expenses',
    roles: ['admin', 'waiter'],
  },
  {
    title: 'CLIENTS.NAVBAR',
    icon: 'face',
    link: 'client',
    roles: ['admin', 'waiter'],
  },
  {
    title: 'Tablero',
    icon: 'content_paste',
    link: 'admin/menu-board',
    roles: ['admin'],
  },
  {
    title: 'Caja',
    icon: 'payments',
    link: 'admin/cash-desk',
    roles: ['admin'],
  },
  {
    title: 'RECIPES.NAVBAR',
    icon: 'edit',
    link: 'recipe',
    roles: ['admin'],
  },
  {
    title: 'Cambios',
    icon: 'people',
    link: 'employee/list',
    roles: ['admin'],
  },
  {
    title: 'Usuarios',
    icon: 'people',
    link: 'auth/users',
    roles: ['admin'],
  },
  {
    title: 'Perfil',
    icon: 'app_settings_alt',
    link: 'auth/profile',
    roles: ['admin', 'delivery', 'waiter'],
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
