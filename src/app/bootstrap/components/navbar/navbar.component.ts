import { Component, ViewChild, OnInit, Signal } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav'
import * as moment from 'moment'
import { Observable } from 'rxjs'
import { CLIENT_MENU_OPTIONS, MENU_OPTIONS } from '../../utils/menu.options'
import { TranslateService } from '@ngx-translate/core'
import { AUTH_ROLE } from 'src/app/auth/utils/auth.role'
import { MessageService } from 'src/app/shared/services/message.service'
import { DaoEmployeeService } from 'src/app/domains/employee/services/dao-employee.service'
import { DaoClientService } from 'src/app/domains/client/services/dao-client.service'
import { DaoDeliveryService } from 'src/app/domains/waiter/services/dao-delivery.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer
  mode: MatDrawerMode

  menuTitle = 'Smart'
  menuSubtitle = 'Restaurant'
  toolbarTitleObs: Observable<string>

  readonly TODAY_DATE = moment(new Date()).locale('es').format('DD MMMM')

  employee = {} as any
  role: string
  hasNewDelivery: boolean
  hasNewClient: boolean
  newClientList = new Array()
  toolBarTitle: Signal<string>

  hasFirebaseAuth: boolean
  hasEmployeeAuth: boolean
  isUserUpdated: boolean

  isWaiter: boolean
  isAdmin: boolean
  isCook: boolean
  isDelivery: boolean

  isDesktopSize: boolean
  routerOutletContainerBackgroundColor: string
  routerOutletContainerHeight: string
  matDrawerContentBackgroundColor: string
  matToolbarRowButtonMargin: string

  readonly AUTH_ROLE = AUTH_ROLE
  readonly MENU_OPTIONS = MENU_OPTIONS
  readonly CLIENT_MENU_OPTIONS = CLIENT_MENU_OPTIONS

  constructor(
    private angularFireAuth: AngularFireAuth,
    private daoEmployeeService: DaoEmployeeService,
    private daoClient: DaoClientService,
    private router: Router,
    private messageService: MessageService,
    private daoDeliveryService: DaoDeliveryService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initUserData()
    this.checkDelivery()
    this.checkClient()
    this.updateRedirectTitle()
    this.updateScreenSize()
    this.initTranslate()
  }

  initTranslate() {
    this.translate.addLangs(['es', 'pt', 'en'])
    this.translate.setDefaultLang('es')
    const lang = this.translate.getBrowserLang()
    this.translate.use(lang.match(/es|en/) ? lang : 'es')
  }

  initUserData(): void {
    this.angularFireAuth.authState.subscribe((auth) => {
      console.log(auth)

      if (auth) {
        this.hasFirebaseAuth = true
        this.daoEmployeeService.getDocument(auth.uid).subscribe((value) => {
          this.isUserUpdated = true
          if (value) {
            this.employee = value
            this.hasEmployeeAuth = true
            this.messageService.setUserData(value)
          }
        })
      } else {
        this.isUserUpdated = true
        this.hasFirebaseAuth = false
        this.hasEmployeeAuth = false
      }
    })
  }

  checkDelivery(): void {
    // this.daoDeliveryService.checkDelivery().subscribe((value) => {
    //   if (value?.length) this.hasNewDelivery = true
    //   else this.hasNewDelivery = false
    // })
  }

  checkClient(): void {
    // this.daoClient.getNewClients().subscribe((value) => {
    //   if (value.length !== 0) this.hasNewClient = true
    //   else this.hasNewClient = false
    // })
  }

  toggleDrawer(): void {
    if (this.isDesktopSize == false) this.drawer.toggle()
  }

  updateRedirectTitle(): void {
    this.toolBarTitle = this.messageService.getToolbarTitle
  }

  onActivateRouter(): void {
    window.scroll(0, 0)
  }

  updateScreenSize(): void {
    const screenWidth = window.screen.width
    if (screenWidth > 800) {
      this.isDesktopSize = true
      this.routerOutletContainerBackgroundColor = '#efefef'
      this.routerOutletContainerHeight = 'calc(100vh - 64px)'
      this.matDrawerContentBackgroundColor = '#ddd'
      this.matToolbarRowButtonMargin = '15px'
      this.mode = 'side'
    } else {
      this.isDesktopSize = false
      this.routerOutletContainerBackgroundColor = '#fff'
      this.routerOutletContainerHeight = 'calc(100vh - 56px)'
      this.matDrawerContentBackgroundColor = '#efefef'
      this.matToolbarRowButtonMargin = '0px'
      this.mode = 'over'
    }
  }

  changeLanguage(lang) {
    this.translate.use(lang)
  }
}
