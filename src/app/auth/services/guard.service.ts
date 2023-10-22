import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { MessageService } from 'src/app/services/dao-utils/message.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private IS_TEST_MODE: boolean = false

  authState: boolean

  constructor(private router: Router, private messageService: MessageService) {
    this.checkUser()
  }

  checkUser() {
    // this.messageService.userDataObs.subscribe((res) => {
    //   this.authState = res
    // })
  }

  canActivate() {
    if (this.authState) {
      return true
    } else {
      if (this.IS_TEST_MODE) {
        return true
      } else {
        // this.router.navigate(['/guard-error'])
        return true
      }
    }
  }
}
