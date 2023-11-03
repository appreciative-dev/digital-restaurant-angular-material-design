import { AUTH_ROLE } from 'src/app/auth/utils/auth.role'

export class Employee {
  public name?: string
  public displayName?: string
  public email?: string
  public phone?: string
  public photoURL?: string
  public isApproved?: boolean
  public role?: AUTH_ROLE
  public uid?: string
  public timestamp?: Date
  public id?: string
}
