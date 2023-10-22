import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { DaoPlateOrderService } from '../../services/dao-plateorder.service'
import { Router } from '@angular/router'
import { MessageService } from 'src/app/services/dao-utils/message.service'

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent implements OnInit {
  PAGE_ITEMS_SIZE = 20

  datasource

  itemsListFirstQuery
  lastItem
  firstItem

  datasourceDelivered
  datasourcePaid
  displayedColumns = ['client', 'waiter', 'price']

  isLoadingCocinados: boolean

  constructor(
    private daoOrder: DaoPlateOrderService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadOrdersCocinado()
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase()
    this.datasource.filter = filterValue
  }

  redirect(path, id, name) {
    // this.router.navigate([path, id, "employee"]).then((res) => {
    //   this.messageService.setNavbarTitle(name)
    // })
  }

  preloadTabData(ev) {
    switch (ev) {
      case 0:
        this.loadOrdersCocinado()
        break
      case 1:
        this.loadOrdersEntregado()
        break
      case 2:
        this.loadOrdersCancelado()
        break
      default:
        break
    }
  }

  loadOrdersCocinado() {
    this.daoOrder.getOpenOrders().subscribe((res) => {
      this.datasource = new MatTableDataSource(res)
    })
  }

  loadOrdersEntregado() {
    this.daoOrder.getDeliveryOrders().subscribe((res) => {
      this.datasourceDelivered = new MatTableDataSource(res)
    })
  }

  loadOrdersCancelado() {
    this.isLoadingCocinados = true
    this.daoOrder
      .getPaidOrdersFirstPage(this.PAGE_ITEMS_SIZE)
      .subscribe((res) => {
        this.datasourcePaid = new MatTableDataSource(res)
        this.lastItem = [...res].pop()
        this.isLoadingCocinados = false
      })
  }

  nextCocinado() {
    this.daoOrder
      .getPaidOrdersNextPage(this.PAGE_ITEMS_SIZE, this.lastItem)
      .subscribe((res) => {
        this.datasourcePaid = new MatTableDataSource(res)
        this.firstItem = [...res][0]
        this.lastItem = [...res].slice(-1).pop()
      })
  }

  updateCocinado() {
    this.isLoadingCocinados = true
    this.firstItem = undefined
    this.daoOrder
      .getPaidOrdersFirstPage(this.PAGE_ITEMS_SIZE)
      .subscribe((res) => {
        setTimeout(() => {
          this.datasourcePaid = new MatTableDataSource(res)
          this.lastItem = [...res].pop()
          this.isLoadingCocinados = false
        }, 1000)
      })
  }

  previousCocinado() {
    this.daoOrder
      .getPaidOrdersPreviousPage(this.PAGE_ITEMS_SIZE, this.firstItem)
      .subscribe((res) => {
        this.datasourcePaid = new MatTableDataSource(res)
        this.firstItem = [...res][0]
        this.lastItem = [...res].pop()
      })
  }
}
