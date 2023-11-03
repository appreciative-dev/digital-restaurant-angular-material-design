import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { tap } from 'rxjs/operators'
import { AUTH_PROVIDER, AuthUser } from '../../services/auth.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  hasFirebasAuth: boolean
  userDisplayName: string
  readonly AUTH_PROVIDER = AUTH_PROVIDER

  authUser: any

  hasFacebookError: boolean
  hasGoogleError: boolean
  hasFacebookSameAccountError: boolean

  ngOnInit(): void {
    this.angularFireAuth.authState
      .pipe(
        tap((value: any) => {
          this.hasFirebasAuth = true
          if (value) {
            this.userDisplayName = value.displayName
            console.log(this.userDisplayName)
          } else {
            this.userDisplayName = null
          }

          this.cdr.markForCheck()
        })
      )
      .subscribe()
  }

  constructor(private authService: AuthService, private angularFireAuth: AngularFireAuth, private cdr: ChangeDetectorRef) {}

  login(provider: AUTH_PROVIDER) {
    this.hasGoogleError = false
    this.hasFacebookError = false
    this.hasFacebookSameAccountError = false
    switch (provider) {
      case AUTH_PROVIDER.GOOGLE:
        this.authService.loginWithGoogle().then((value) => this.verifyAuthUser(value))
        break
      case AUTH_PROVIDER.FACEBOOK:
        this.authService.loginWithGoogle().then((value) => this.verifyAuthUser(value))
        break
    }
  }

  verifyAuthUser(user) {
    if (user?.additionalUserInfo?.isNewUser) {
      const formattedUser: AuthUser = {
        displayName: user?.user?.displayName,
        providerId: user?.additionalUserInfo?.profile?.id,
        providerType: user?.additionalUserInfo?.providerId,
        authId: user?.user?.uid,
        email: user?.user?.email,
        photoURL: user?.user?.photoURL,
        locale: user?.additionalUserInfo?.profile?.locale,
        timestamp: user?.user?.metadata?.createdAt,
        isBlocked: false,
      }
      this.authService.createUser(formattedUser)
    } else {
      console.log('has auth')
    }
  }

  loginWithGoogle(): void {
    this.authService
      .loginWithGoogle()
      .then((value) => {
        console.log(value)
        if (value) {
          this.userDisplayName = value.user.displayName
          this.authUser = value?.additionalUserInfo?.isNewUser
          console.log(this.authUser)

          if (value?.additionalUserInfo?.isNewUser) {
          } else {
          }
        }
      })
      .catch((error) => {
        this.logError(error)
        this.hasGoogleError = true
      })
  }

  loginWithFacebook(): void {
    this.hasGoogleError = false
    this.hasFacebookError = false
    this.hasFacebookSameAccountError = false
    this.authService
      .loginWithFacebook()
      .then((res: any) => {
        if (res) {
          let newUser = res.additionalUserInfo.isNewUser
          this.userDisplayName = res.user.displayName
          this.authUser = res.user
          if (newUser == false) {
          } else {
          }
        }
      })
      .catch((error) => {
        this.logError(error)
        if (error?.code == 'auth/account-exists-with-different-credential') {
          this.hasFacebookSameAccountError = true
          this.hasFacebookError = true
        }
      })
  }

  logError(error): void {
    console.error('Auth error:')
    console.log(error)
  }

  hasAuthError(): boolean {
    return this.hasFacebookError || this.hasGoogleError || this.hasFacebookSameAccountError
  }
}
