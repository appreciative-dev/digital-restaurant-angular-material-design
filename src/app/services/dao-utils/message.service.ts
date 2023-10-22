import { Injectable, computed, signal } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  clientDataSub: BehaviorSubject<any> = new BehaviorSubject(null)
  clientDataObs: Observable<any> = this.clientDataSub.asObservable()

  userData = signal(null)
  setUserData = (data): void => this.userData.set(data)
  getUserData = computed(() => this.userData())

  toolbarTitle = signal(null)
  setToolbarTitle = (data) => setTimeout(() => this.toolbarTitle.set(data))
  getToolbarTitle = computed(() => this.toolbarTitle())
}
