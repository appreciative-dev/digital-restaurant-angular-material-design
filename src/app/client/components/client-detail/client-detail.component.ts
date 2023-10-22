import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { DaoClientService } from 'src/app/client/services/dao-client.service'
import { DaoPlateOrderService } from 'src/app/waiter/services/dao-plateorder.service'
import { MatTableDataSource } from '@angular/material/table'
import { MessageService } from 'src/app/services/dao-utils/message.service'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmationDialogComponent } from 'src/app/_bootstrap/components/confirmation-dialog/confirmation-dialog.component'

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

  constructor(private router: ActivatedRoute, private routerRedirect: Router, private dao: DaoClientService, private navRouter: Router, private dialog: MatDialog, private messageService: MessageService, private daoOrder: DaoPlateOrderService) {}

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
    let dialog = this.dialog.open(ConfirmationDialogComponent, {
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
    //     if (res.role == BUSINESS_ROLE.ADMIN) this.isAdmin = true
    //   }
    // })
  }
}
