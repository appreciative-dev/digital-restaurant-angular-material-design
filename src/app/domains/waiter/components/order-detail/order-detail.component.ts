import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { MatSnackBar } from '@angular/material/snack-bar'
import { DaoPlateOrderService } from '../../services/dao-plateorder.service'
import { fadeInLeftOnEnterAnimation } from 'angular-animations'
import { PlateDetailComponent } from '../plate-detail/plate-detail.component'
import { AUTH_ROLE } from 'src/app/auth/utils/auth.role'
import { MessageService } from 'src/app/shared/services/message.service'
import { DaoClientService } from 'src/app/domains/client/services/dao-client.service'
import { DaoEmployeeService } from 'src/app/domains/employee/services/dao-employee.service'

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  animations: [fadeInLeftOnEnterAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailComponent implements OnInit {
  totalPrice
  deliveryPrice
  discountPrice
  waiter
  client = {} as any
  orderTime

  tableNumber: string
  paymentType
  change
  orderId
  comments

  userType: string
  isUserClient: boolean
  isUserEmployee: boolean

  menuSource
  menuSourceColumns = ['name', 'price']

  isTableOrder: boolean
  isDeliveryOrder: boolean

  isConfirmed: boolean
  isDelivered: boolean
  isPaid: boolean
  isRejected: boolean
  hasUserAccess: boolean

  isButtonReadyToAppear: boolean
  isAdmin: boolean
  isOldClient: boolean

  copiedPhone: number
  copiedAddress: string

  deliveryTime: string
  barList = new Array()

  isReadyToAppear: boolean

  constructor(
    private dao: DaoPlateOrderService,
    private daoOrder: DaoPlateOrderService,
    private daoClient: DaoClientService,
    private router: ActivatedRoute,
    private routerRedirect: Router,
    private snackBar: MatSnackBar,
    private messageService: MessageService,
    private daoEmployeeService: DaoEmployeeService,
    private auth: AngularFireAuth,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.orderId = this.router.snapshot.params['id']
    this.userType = this.router.snapshot.params['user']
    if (this.userType == 'employee') {
      this.isUserEmployee = true
      this.getCurrentUser()
    } else if (this.userType == 'client') this.isUserClient = true
    this.dao.getDocument(this.orderId).subscribe((res: any) => {
      console.log(res)
      if (res.bar) this.barList = res.bar
      this.orderTime = res.timestamp
      console.log(this.orderTime)

      this.comments = res.comments
      this.menuSource = new MatTableDataSource(res.chosenPlates)
      this.totalPrice = res.totalPrice
      this.discountPrice = res.discountPrice
      this.deliveryPrice = res.deliveryPrice
      this.waiter = res.waiter
      if (res.isTable == true) {
        this.isTableOrder = true
        if (res.table == 0) this.tableNumber = 'Recojer'
        else this.tableNumber = res.table
        this.paymentType = res.payment
        this.isReadyToAppear = true
        console.log(res)
        if (res.hasTableClientName) {
          this.client.name = res.tableClientName
          console.log(this.client.name)
          this.client.phone = res.tableClientPhone
        }
      } else {
        this.isDeliveryOrder = true
        this.deliveryTime = res.deliveryTime
        this.paymentType = res.payment
        if (res.payment == 'CASH') this.change = res.change
        this.client = res.address
        if (this.client) {
          let name = this.client.name.trim()
          this.daoClient.getClientByName(name).subscribe((res) => {
            this.isButtonReadyToAppear = true
            if (res.length > 0) this.isOldClient = true
          })
        }
        this.isReadyToAppear = true
      }
      if (res.isCooked) {
        this.isConfirmed = true
      }
      if (res.isDelivered) {
        this.isConfirmed = true
        this.isDelivered = true
      }
      if (res.isPaid) {
        this.isConfirmed = false
        this.isDelivered = false
        this.isPaid = true
      }
      if (res.isRejected) {
        this.isRejected = true
      }
    })
  }

  getCurrentUser() {
    this.auth.authState.subscribe((res) => {
      this.daoEmployeeService.getEmployeeByUid(res.uid).subscribe((res) => {
        this.updateRole(res[0].role)
      })
    })
  }

  updateRole(role) {
    switch (role) {
      case AUTH_ROLE.WAITER:
        this.hasUserAccess = true
        this.isAdmin = true
        break
      case AUTH_ROLE.DELIVERY:
        this.hasUserAccess = false
        break
      case AUTH_ROLE.CHEF:
        this.hasUserAccess = true
        break
      case AUTH_ROLE.ADMIN:
        this.hasUserAccess = true
        this.isAdmin = true
        break
    }
  }

  deliveryOrder() {
    this.daoOrder.updateDeliveryOrder(this.orderId, this.waiter)
  }

  cancelOrder() {
    this.daoOrder.updatePaidOrder(this.orderId, this.waiter)
  }

  openDetail(id) {
    this.dialog.open(PlateDetailComponent, {
      width: '90%',
      maxHeight: '90vh',
      data: { id: id },
    })
  }

  copyAddress() {
    const selBox = document.createElement('textarea')
    selBox.value = this.client.address
    document.body.appendChild(selBox)
    selBox.focus()
    selBox.select()
    document.execCommand('copy')
    document.body.removeChild(selBox)
    this.openSnackBar('Dirección fue copiada')
  }

  copyPhone() {
    const selBox = document.createElement('textarea')
    selBox.value = this.client.phone
    document.body.appendChild(selBox)
    selBox.focus()
    selBox.select()
    document.execCommand('copy')
    document.body.removeChild(selBox)
    this.openSnackBar('Teléfono fue copiado')
  }

  showCheckedClient(type) {
    switch (type) {
      case 'old':
        this.openSnackBar('Cliente con lo mismo nombre ya existe.')
        break
      case 'new':
        this.openSnackBar('Es cliente nuevo y no tiene registro en app.')
        break
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    })
  }

  redirect(path, name) {
    // this.routerRedirect.navigateByUrl(path).then((res) => {
    //   this.messageService.setNavbarTitle(name)
    // })
  }

  addNewClient() {
    // this.routerRedirect.navigate(["newclient", "new"]).then((res) => {
    //   this.messageService.setNavbarTitle("Cliente nuevo")
    //   this.messageService.setClientData(this.client)
    // })
  }
}
