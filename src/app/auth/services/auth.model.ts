export interface AuthUser {
  displayName: string
  providerId: string
  providerType: string
  authId: string
  email: string
  photoURL: string
  locale: string
  isBlocked: boolean
  timestamp: Date
}

export interface ProviderUserCredential {
  additionalUserInfo?: any
  credential: any
  operationType?: string
  user: any
}

export enum AUTH_PROVIDER {
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
}
