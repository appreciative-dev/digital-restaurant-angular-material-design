import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { DaoEmployeeService } from '../../services/dao-employee.service'
import { MessageService } from 'src/app/services/dao-utils/message.service'
import { MatDialog } from '@angular/material/dialog'
import { DaoPlateOrderService } from 'src/app/waiter/services/dao-plateorder.service'
import { MatTableDataSource } from '@angular/material/table'
import { filter } from 'rxjs/operators'
import { ConfirmationDialogComponent } from 'src/app/_bootstrap/components/confirmation-dialog/confirmation-dialog.component'

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailComponent implements OnInit {
  item = {} as any
  itemId: string
  tableDatasource // = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns = ['date', 'price']

  constructor(private daoEmployee: DaoEmployeeService, private daoOrder: DaoPlateOrderService, private router: ActivatedRoute, private navRouter: Router, private dialog: MatDialog, private messageService: MessageService) {}

  ngOnInit(): void {
    this.itemId = this.router.snapshot.params['id']
    this.daoEmployee.getDocument(this.itemId).subscribe((res) => (this.item = res))
    this.daoOrder.getOrdersByWaiter(this.itemId).subscribe((res) => (this.tableDatasource = new MatTableDataSource(res)))
  }

  redirect(path, name): void {
    this.navRouter.navigate([path])
  }

  edit(): void {
    let newUser = {
      type: 'edit',
      id: this.itemId,
    }
    this.navRouter.navigate(['newemployee', newUser])
  }

  delete(): void {
    let dialog = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        type: 'delete-employee',
        autoFocus: false,
      },
    })
    dialog
      .afterClosed()
      .pipe(filter((val) => !!val))
      .subscribe(() => this.daoEmployee.deleteDocument(this.itemId).then(() => this.redirect('employeelist', 'Cambios')))
  }
}
