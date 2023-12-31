import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute, Router } from '@angular/router'
import { ExpensesFormComponent } from '../expenses-form/expenses-form.component'
import { Observable } from 'rxjs'
import { CdkTableDataSourceInput } from '@angular/cdk/table'
import { MessageService } from 'src/app/shared/services/message.service'
import { DaoExpensesService } from '../../services/dao-expenses.service'

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent implements OnInit {
  dataSourceObs: Observable<CdkTableDataSourceInput<any>>
  dataSourceColumn = ['waiter', 'timestamp', 'value', 'title']

  waiter
  waiterName
  orders

  sum
  amount

  isUpdatingOrders: boolean

  constructor(private dialog: MatDialog, private daoExpenses: DaoExpensesService, private route: ActivatedRoute, private messageService: MessageService) {}

  ngOnInit() {
    this.loadMarketExpenses()
    this.initTitle()
  }

  loadMarketExpenses() {
    this.dataSourceObs = this.daoExpenses.getAll()
  }

  addExpenses() {
    let dialog = this.dialog.open(ExpensesFormComponent, {
      width: '90%',
      height: 'auto',
      data: {
        autoFocus: false,
      },
    })
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.daoExpenses.createDocument(res)
      }
    })
  }

  initTitle() {
    this.messageService.setToolbarTitle(this.route.snapshot.data['title'])
  }
}
