import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { MessageService } from 'src/app/shared/services/message.service'
import { AppConfirmationDialogComponent } from 'src/app/shared/components/app-confirmation-dialog/app-confirmation-dialog.component'
import { DaoClientService } from '../../services/dao-client.service'
import { DaoPlateOrderService } from 'src/app/domains/waiter/services/dao-plateorder.service'

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDetailComponent implements OnInit {
  userData
  userId

  isNewClient: boolean
  isAdmin: boolean

  datasource
  displayedColumns = ['date', 'price']

  constructor(
    private router: ActivatedRoute,
    private routerRedirect: Router,
    private dao: DaoClientService,
    private navRouter: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    private daoOrder: DaoPlateOrderService
  ) {}

  ngOnInit() {
    this.userId = this.router.snapshot.params['id']
    this.getClientData(this.userId)
    this.getEmployeeInfo()
  }

  getClientData(id) {
    this.dao.getDocument(id).subscribe((res: any) => {
      this.userData = res
      if (this.userData.isApproved == false) this.isNewClient = true
    })
    this.daoOrder.getOrdersByClient(this.userId).subscribe((res) => {
      this.datasource = new MatTableDataSource(res)
    })
  }

  updateClientStatus(status) {
    if (status == 'c') {
      this.dao.updateStatus(this.userId).then((res) => {
        this.getClientData(this.userId)
        this.isNewClient = false
      })
    } else if (status == 'r') {
      this.dao.deleteClient(this.userId).then((res) => {
        this.routerRedirect.navigateByUrl('clientlist')
      })
    }
  }

  delete() {
    let dialog = this.dialog.open(AppConfirmationDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        type: 'delete-client',
        autoFocus: false,
      },
    })
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.dao.deleteClient(this.userId).then(() => {
          this.redirect('clientlist', 'Clientes')
        })
      }
    })
  }

  redirect(path, name) {
    // this.navRouter.navigate([path]).then((res) => {
    //   this.messageService.setNavbarTitle(name)
    // })
  }

  edit() {
    // this.navRouter.navigate(['newclient', this.userId]).then((res) => {
    //   this.messageService.setNavbarTitle('Editar Cliente')
    // })
  }

  getEmployeeInfo() {
    // this.messageService.userDataObs.subscribe((res) => {
    //   if (res) {
    //     if (res.role == AUTH_ROLE.ADMIN) this.isAdmin = true
    //   }
    // })
  }
}
