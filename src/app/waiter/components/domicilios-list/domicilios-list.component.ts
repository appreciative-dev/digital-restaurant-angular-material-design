import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { DaoPlateOrderService } from '../../services/dao-plateorder.service'
import { PlateOrder, RecipeHistory } from '../../../_bootstrap/models/models'
import { MessageService } from 'src/app/services/dao-utils/message.service'
import { DaoRecipeHistoryService } from 'src/app/recipe/services/dao-recipe-history.service'
import { PlateDetailComponent } from '../plate-detail/plate-detail.component'
import { ConfirmationDialogComponent } from 'src/app/_bootstrap/components/confirmation-dialog/confirmation-dialog.component'
import { DaoPlateService } from 'src/app/admin/services/dao-plate.service'
import { DaoDeliveryService } from '../../services/dao-delivery.service'

@Component({
  selector: 'app-domicilios-list',
  templateUrl: './domicilios-list.component.html',
  styleUrls: ['./domicilios-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DomiciliosListComponent implements OnInit {
  datasource
  datasourceRejectedOrders
  displayedColumns = ['client', 'plates']
  datasourceAcceptedOrders
  displayedColumnsAcceptedOrders = ['waiter', 'plates']

  orders = new Array()
  order: PlateOrder = {} as PlateOrder
  orderId
  deliveryOrderId

  waiter = {} as any
  deliveryOrder
  recipeHistoryList: Array<RecipeHistory> = new Array()

  hasBar: boolean
  barList = new Array()
  menuEntry = {} as any

  isLoadingAcceptedDelivery: boolean
  isDeletingAcceptedDelivery: boolean
  isLoadingRejectedDelivery: boolean
  isDeletingRejectedDelivery: boolean

  isAdmin: boolean
  isViewConfirmed: boolean
  isViewRejected: boolean

  redirectOrderId: string

  PAGE_ITEMS_SIZE = 20
  firstItem
  lastItem

  constructor(private dialog: MatDialog, private router: Router, private daoMenu: DaoPlateService, private daoOrder: DaoPlateOrderService, private messageService: MessageService, private daoHistory: DaoRecipeHistoryService, private daoDomi: DaoDeliveryService) {}

  ngOnInit() {
    this.getWaiterInfo()
    this.loadNewDelivery()
  }

  preloadTabData(ev) {
    this.isViewConfirmed = false
    this.isViewRejected = false
    switch (ev) {
      case 0:
        this.loadNewDelivery()
        break
      case 1:
        this.loadAcceptedDelivery()
        this.isViewConfirmed = true
        break
      case 2:
        this.loadRejectedDelivery()
        this.isViewRejected = true
        break
      default:
        break
    }
  }

  loadNewDelivery() {
    this.daoDomi.getAllOrders().subscribe((res) => {
      this.datasource = new MatTableDataSource(res)
    })
  }

  loadAcceptedDelivery() {
    this.isLoadingAcceptedDelivery = true
    this.daoDomi.getAcceptedOrdersFirstPage(this.PAGE_ITEMS_SIZE).subscribe((res) => {
      this.datasourceAcceptedOrders = new MatTableDataSource(res)
      this.lastItem = [...res].pop()
      this.isLoadingAcceptedDelivery = false
    })
  }

  loadRejectedDelivery() {
    this.isLoadingRejectedDelivery = true
    this.daoDomi.getRejectedOrders().subscribe((res) => {
      this.datasourceRejectedOrders = new MatTableDataSource(res)
      this.isLoadingRejectedDelivery = false
    })
  }

  getWaiterInfo() {
    // this.messageService.userDataObs.subscribe((res) => {
    //   this.waiter = res
    //   if (this.waiter?.role == BUSINESS_ROLE.ADMIN) this.isAdmin = true
    // })
  }

  showDeliveryDetail(data) {
    this.deliveryOrder = data
    let dialogRef = this.dialog.open(PlateDetailComponent, {
      width: 'auto',
      maxHeight: 'auto',
      autoFocus: false,
      data: { deliveryInfo: data },
    })
    dialogRef.afterClosed().subscribe((res) => {
      if (res == true) {
        this.confirmOrder()
      } else if (res == 'delete') {
        this.rejectOrder()
      }
    })
  }

  showConfirmedDelivery(id, data) {
    this.daoOrder.getDocument(id).subscribe((res) => {
      let dialogRef = this.dialog.open(PlateDetailComponent, {
        width: 'auto',
        maxHeight: 'auto',
        autoFocus: false,
        data: {
          deliveryInfo: data,
          showRedirect: true,
        },
      })
      dialogRef.afterClosed().subscribe((res) => {
        if (res == 'redirect') {
          this.router.navigate(['/orderdetail', id, 'employee'])
        }
      })
    })
  }

  showRejectedDelivery(data) {
    this.dialog.open(PlateDetailComponent, {
      width: 'auto',
      minWidth: '30%',
      maxHeight: 'auto',
      autoFocus: false,
      data: {
        deliveryInfo: data,
        isRejected: true,
      },
    })
  }

  confirmOrder() {
    this.initMenuEntry()
    this.order.timestamp = new Date()
    this.order.hasWaiter = true
    this.order.waiter = this.waiter
    if (this.deliveryOrder.client) this.order.client = this.deliveryOrder.client
    if (this.deliveryOrder.bar) {
      this.hasBar = true
      this.barList = this.deliveryOrder.bar
      this.order.bar = this.deliveryOrder.bar
    }
    this.order.chosenPlates = this.deliveryOrder.chosenPlates
    this.order.totalPrice = this.deliveryOrder.totalPrice
    if (this.deliveryOrder.discountPrice) this.order.discountPrice = this.deliveryOrder.discountPrice
    if (this.deliveryOrder.deliveryPrice) this.order.deliveryPrice = this.deliveryOrder.deliveryPrice
    this.order.comments = this.deliveryOrder.comments
    this.order.change = this.deliveryOrder.change
    this.order.type = 'DOMICILIO'

    // change when kitchen will be included
    this.order.isCooked = true

    this.order.isDelivered = false
    this.order.isPaid = false
    this.order.payment = this.deliveryOrder.payment
    this.order.address = this.deliveryOrder.address
    this.order.deliveryTime = this.deliveryOrder.deliveryTime
    this.daoOrder.createDocument(this.order).then((res) => {
      this.orderId = res.id
      this.deliveryOrder.chosenPlates.forEach((el) => {
        this.recipeHistoryList.push({
          id: el.bebida.id,
          name: el.bebida.name,
          timestamp: new Date(),
          type: 'Bebida (jugo o limonada)',
        })
        this.recipeHistoryList.push({
          id: el.entrada.id,
          name: el.entrada.name,
          timestamp: new Date(),
          type: 'Entrada (sopa o fruta)',
        })
        this.recipeHistoryList.push({
          id: el.ensalada.id,
          name: el.ensalada.name,
          timestamp: new Date(),
          type: 'Ensalada',
        })
        this.recipeHistoryList.push({
          id: el.rice.id,
          name: el.rice.name,
          timestamp: new Date(),
          type: 'Arroz',
        })
        this.recipeHistoryList.push({
          id: el.garnish.id,
          name: el.garnish.name,
          timestamp: new Date(),
          type: 'Guarnición',
        })
        this.recipeHistoryList.push({
          id: el.plato.id,
          name: el.plato.name,
          timestamp: new Date(),
          type: 'Plato principal',
        })
        this.recipeHistoryList.push({
          id: el.postre.id,
          name: el.postre.name,
          timestamp: new Date(),
          type: 'Postre',
        })
        if (this.hasBar) {
          this.barList.forEach((el) => {
            this.recipeHistoryList.push({
              id: el.id,
              name: el.name,
              timestamp: new Date(),
              type: 'Adicional',
            })
          })
        }
      })
      this.daoDomi.updateDocument(this.deliveryOrder.id, this.waiter, this.orderId).then(() => {
        let queries = this.recipeHistoryList.map((el) => {
          return this.daoHistory.createDocument(el)
        })
        Promise.all(queries).then((res) => {
          this.menuEntry.plates.forEach((el) => {
            let filtereListBySameItemsOfOrderPlateAmount = this.order.chosenPlates.filter((innerEl) => {
              return innerEl.plato.id == el.plato.id
            })
            let amount = filtereListBySameItemsOfOrderPlateAmount.length
            let item = filtereListBySameItemsOfOrderPlateAmount.pop()
            if (amount > 0) {
              let sameItemIndex = this.menuEntry.plates
                .map((el) => {
                  return el.plato.id
                })
                .indexOf(item.plato.id)
              let oldAmount: number = this.menuEntry.plates[sameItemIndex].plato.amount
              let newAmount: number = oldAmount + amount
              this.menuEntry.plates[sameItemIndex].plato.amount = newAmount
            }
          })
          if (!this.menuEntry.orders) this.menuEntry.orders = new Array()
          this.menuEntry.orders.push(this.order)
          this.daoMenu.updateMenuAmount(this.menuEntry).then(() => {
            this.router.navigate(['/orderdetail', this.orderId, 'employee'])
          })
        })
      })
    })
  }

  rejectOrder() {
    this.order.timestamp = new Date()
    this.order.hasWaiter = true
    this.order.waiter = this.waiter
    if (this.deliveryOrder.client) this.order.client = this.deliveryOrder.client
    this.order.chosenPlates = this.deliveryOrder.chosenPlates
    this.order.totalPrice = this.deliveryOrder.totalPrice
    this.order.comments = this.deliveryOrder.comments
    this.order.type = 'DOMICILIO'
    this.order.payment = this.deliveryOrder.payment
    this.order.address = this.deliveryOrder.address
    this.order.isRejected = true
    this.order.isCooked = true
    this.order.isDelivered = true
    this.order.isPaid = true
    this.order.rejectedAt = new Date()
    this.daoDomi.rejectDelivery(this.deliveryOrder.id, this.order)
  }

  initMenuEntry() {
    this.daoMenu.getMenuDelDia().subscribe((res: any) => {
      this.menuEntry = res
      /*
      this.menuEntry.entradas.entradaArray
      this.menuEntry.entradas.bebidaArray
      this.menuEntry.entradas.toppingsList
      */
    })
  }

  showOrder(id) {
    this.router.navigate(['/orderdetail', id, 'employee'])
  }

  redirect(path, name) {
    // this.router.navigateByUrl(path).then((res) => {
    //   this.messageService.setNavbarTitle(name)
    // })
  }

  clearAllConfirmed() {
    let dialog = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        type: 'delete-delivery-list',
        autoFocus: false,
      },
    })
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.clearAllConfirmedOneByOne()
      }
    })
  }

  clearAllRejected() {
    let dialog = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        type: 'delete-delivery-list-rejected',
        autoFocus: false,
      },
    })
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.clearAllRejectedOneByOne()
      }
    })
  }

  clearAllConfirmedOneByOne() {
    this.isLoadingAcceptedDelivery = true
    this.isDeletingAcceptedDelivery = true
    let queries = this.datasourceAcceptedOrders.data.map((element) => {
      return this.daoDomi.delete(element.id)
    })
    Promise.all(queries).then((res) => {
      this.isLoadingAcceptedDelivery = false
      this.isDeletingAcceptedDelivery = false
    })
  }

  clearAllRejectedOneByOne() {
    this.isLoadingRejectedDelivery = true
    this.isDeletingRejectedDelivery = true
    let queries = this.datasourceRejectedOrders.data.map((element) => {
      return this.daoDomi.delete(element.id)
    })
    Promise.all(queries).then((res) => {
      this.isLoadingRejectedDelivery = false
      this.isDeletingRejectedDelivery = false
    })
  }

  nextPage() {
    this.daoDomi.getAcceptedOrdersNextPage(this.PAGE_ITEMS_SIZE, this.lastItem).subscribe((res) => {
      this.datasourceAcceptedOrders = new MatTableDataSource(res)
      this.firstItem = [...res][0]
      this.lastItem = [...res].pop()
    })
  }

  updatePage() {
    this.isLoadingAcceptedDelivery = true
    this.firstItem = undefined
    this.daoDomi.getAcceptedOrdersFirstPage(this.PAGE_ITEMS_SIZE).subscribe((res) => {
      setTimeout(() => {
        this.datasourceAcceptedOrders = new MatTableDataSource(res)
        this.lastItem = [...res].pop()
        this.isLoadingAcceptedDelivery = false
      }, 1000)
    })
  }

  previousPage() {
    this.daoDomi.getAcceptedOrdersPreviousPage(this.PAGE_ITEMS_SIZE, this.firstItem).subscribe((res) => {
      this.datasourceAcceptedOrders = new MatTableDataSource(res)
      this.firstItem = [...res][0]
      this.lastItem = [...res].pop()
    })
  }
}
