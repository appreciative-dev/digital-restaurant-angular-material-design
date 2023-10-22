import { BUSINESS_ROLE } from 'src/app/_bootstrap/utils/bootstrap.model'

export class Employee {
  public name?: string
  public displayName?: string
  public email?: string
  public phone?: string
  public photoURL?: string
  public isApproved?: boolean
  public role?: BUSINESS_ROLE
  public uid?: string
  public timestamp?: Date
  public id?: string
}
