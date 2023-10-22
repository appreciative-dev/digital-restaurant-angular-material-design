export enum BUSINESS_ROLE {
  WAITER = "WAITER",
  DELIVERY = "DELIVERY",
  CHEF = "CHEF",
  ADMIN = "ADMIN",
}

export interface MenuOption {
  title?: string
  icon?: string
  link?: string
  roles?: string[]
}
