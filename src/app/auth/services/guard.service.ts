import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { MessageService } from 'src/app/shared/services/message.service'

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
    return true
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthqGuard {
  canActivate() {
    return true
  }
}
