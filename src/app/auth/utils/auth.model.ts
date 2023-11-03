export interface User {
  id?: string
  name?: string
  timestamp?: Date
}

export type UserRole = 'waiter' | 'delivery' | 'chef' | 'admin' | 'client'
