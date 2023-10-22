import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { DaoPlateOrderService } from '../../../waiter/services/dao-plateorder.service'
import { PlateOrder } from '../../../_bootstrap/models/models'
import { MessageService } from 'src/app/services/dao-utils/message.service'
import { saveAs } from 'file-saver'
import * as moment from 'moment'
import * as htmlToImage from 'html-to-image'
import { PriceConfigurationComponent } from '../price-configuration/price-configuration.component'
import { PlateDetailComponent } from 'src/app/waiter/components/plate-detail/plate-detail.component'
import { ConfirmationDialogComponent } from 'src/app/_bootstrap/components/confirmation-dialog/confirmation-dialog.component'
import { DaoPlateService } from '../../services/dao-plate.service'

@Component({
  selector: 'app-menu-board',
  templateUrl: './menu-board.component.html',
  styleUrls: ['./menu-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlateListComponent implements OnInit {
  menuTitle = 'Smart Cafe'
  menuSubtitle = 'Restaurante'

  plateList
  entradasList
  plateOrder = {} as PlateOrder

  selectable = true
  removable = true

  showForm: boolean
  isLoading: boolean

  meatImg = 'assets/meat.png'
  chickenImg = 'assets/chicken.png'
  fishImg = 'assets/fish.png'
  vegImg = 'assets/veg.png'
  commonImg = 'assets/dish.png'

  toppingList = new Array()
  entradaList = new Array()
  bebidaList = new Array()
  postreItem = {} as any

  today = moment(new Date()).locale('es').format('dddd DD MMMM')

  hasPlates: boolean
  menuList = {} as any

  ordersAmountList = new Array()
  ordersOpen: any = {} as any
  enableCloseDay: boolean
  isUpdating: boolean

  constructor(private dialog: MatDialog, private router: Router, private daoOrder: DaoPlateOrderService, private messageService: MessageService, private dao: DaoPlateService) {}

  ngOnInit() {
    this.initServerData()
    this.initPaidOrders()
    this.verifyOpenOrders()
  }

  initPaidOrders() {
    this.daoOrder.getPaidOrders().subscribe((res) => {
      this.ordersAmountList = res
    })
  }

  initServerData() {
    this.dao.getMenuDelDia().subscribe((res: any) => {
      if (res?.open) {
        this.menuList = res
        this.plateList = res.plates
        this.entradasList = res.entradas
        this.entradaList = [...this.entradasList.entradaArray]
        this.bebidaList = [...this.entradasList.bebidaArray]
        this.toppingList = [...this.entradasList.toppingsList]
        let postreArr = [...this.toppingList]
        this.postreItem = postreArr.pop()
        this.toppingList = this.toppingList.slice(0, -1)
        this.hasPlates = true
      } else this.hasPlates = false
    })
  }

  addPlate() {
    this.showForm = true
  }

  openDetail(id) {
    let dialogRef = this.dialog.open(PlateDetailComponent, {
      width: '90%',
      maxHeight: '90vh',
      data: { id: id },
    })
    dialogRef.afterClosed().subscribe()
  }

  redirect(path, name) {
    // this.router.navigateByUrl(path).then((res) => {
    //   this.messageService.setNavbarTitle(name)
    // })
  }

  printMenu() {
    this.isLoading = true
    let name = 'Menú ' + this.today
    htmlToImage.toBlob(document.getElementById('print')).then((blob) => {
      saveAs(blob, name)
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    })
  }

  deleteItem(id) {
    this.dao.delete(id)
  }

  verifyOpenOrders() {
    this.daoOrder.getDeliveryOrders().subscribe((res) => {
      this.ordersOpen.delivery = res.length
      this.daoOrder.getOpenOrders().subscribe((res) => {
        this.ordersOpen.open = res.length
        this.enableCloseDay = true
      })
    })
  }

  clearMenu() {
    let dialog = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        type: 'delete-menu',
        orders: this.ordersOpen,
      },
      autoFocus: false,
    })
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.isUpdating = true
        this.menuList.closedAt = new Date()
        this.menuList.amountOfPlate = this.menuList.plates.map((a) => a.plato.amount).reduce((a, b) => a + b, 0)
        this.menuList.amountOfOrders = this.menuList.orders.length
        this.menuList.amountOfCash = this.menuList.orders.map((a) => a.totalPrice).reduce((a, b) => a + b, 0)
        this.menuList.amountOfBank = 0
        this.dao.createDocument(this.menuList).then((res) => {
          let redirectId = res.id
          this.dao.clearMenuDelDia().then(() => {
            let queries = this.ordersAmountList.map((element) => {
              return this.daoOrder.updateToArchiveOrder(element.id)
            })
            Promise.all(queries).then(() => {
              this.hasPlates = false
              this.isUpdating = false
              this.redirectById('menu', 'Historial Menu del Dia', redirectId)
            })
          })
        })
      }
    })
  }

  openPriceConfs() {
    this.dialog.open(PriceConfigurationComponent, {
      width: 'auto',
      height: 'auto',
      autoFocus: false,
    })
  }

  redirectById(path, name, id) {
    // this.router.navigate([path, id]).then(() => {
    //   this.messageService.setNavbarTitle(name)
    // })
  }
}
