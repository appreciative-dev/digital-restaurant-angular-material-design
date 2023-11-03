import { Toolbar } from 'src/app/shared/model/toolbar.model'

export abstract class AuthConstants {
  static readonly toolbarSettings: Toolbar = {
    title: 'Users and last login',
  }
  static readonly collectionName = 'auth'
}
