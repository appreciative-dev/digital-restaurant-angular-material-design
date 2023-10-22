import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { DaoPlateOrderService } from '../../services/dao-plateorder.service'
import { PlateOrder } from '../../../_bootstrap/models/models'
import { fadeInOnEnterAnimation, rubberBandOnEnterAnimation } from 'angular-animations'
import { MessageService } from 'src/app/services/dao-utils/message.service'
import { PlateDetailComponent } from '../plate-detail/plate-detail.component'
import { DaoBarService } from '../../services/dao-bar.service'
import { DaoPlateService } from 'src/app/admin/services/dao-plate.service'

@Component({
  selector: 'app-menudeldia',
  templateUrl: './menudeldia.component.html',
  styleUrls: ['./menudeldia.component.scss'],
  animations: [fadeInOnEnterAnimation(), rubberBandOnEnterAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenudeldiaComponent implements OnInit {
  menuTableArray = new Array()
  barTableArray = new Array()

  plateList = new Array()
  barList = new Array()
  entradasList = new Array()
  plateOrder = {} as PlateOrder

  toppingList = new Array()
  entradaList = new Array()
  bebidaList = new Array()
  postreItem = {} as any
  chosenPlate = {} as any

  meatImg = 'assets/meat.png'
  chickenImg = 'assets/chicken.png'
  fishImg = 'assets/fish.png'
  vegImg = 'assets/veg.png'
  commonImg = 'assets/dish.png'

  isMenuUpdated: boolean
  hasNoOrder: boolean
  hasEmptyMenu: boolean

  hasDeleteAuth: boolean
  menuEntry: any
  plateRedirectEntry = {} as any

  constructor(private dialog: MatDialog, private router: Router, private messageService: MessageService, private daoOrder: DaoPlateOrderService, private daoBar: DaoBarService, private dao: DaoPlateService) {}

  ngOnInit(): void {
    this.initServerData()
    this.getWaiterInfo()
  }

  initServerData() {
    this.plateOrder.tempPlates = []
    this.dao.getMenuDelDia().subscribe((res: any) => {
      if (res?.open) {
        this.menuEntry = res
        let tempArray: [] = res.plates
        tempArray.sort(function (a: any, b: any) {
          var dateA: any = new Date(a.timestamp)
          var dateB: any = new Date(b.timestamp)
          return dateA - dateB
        })
        this.menuTableArray = tempArray
        this.entradasList = res.entradas
        this.entradaList = res.entradas.entradaArray
        this.bebidaList = res.entradas.bebidaArray
        this.toppingList = res.entradas.toppingsList
        let postreArr = new Array()
        postreArr = [...this.toppingList]
        this.postreItem = postreArr.pop()
        this.toppingList = this.toppingList.slice(0, -1)
        this.isMenuUpdated = true
      } else {
        this.hasEmptyMenu = true
        this.isMenuUpdated = false
      }
    })
    this.daoBar.getAll().subscribe((res) => {
      this.barTableArray = res
    })
  }

  addItem(item) {
    this.plateRedirectEntry = item
    this.plateRedirectEntry.entradas = this.menuEntry.entradas
    this.plateOrder.tempPlates.push(this.plateRedirectEntry)
    this.plateList = this.plateOrder.tempPlates
  }

  addBarItem(item) {
    this.barList.push(item)
  }

  removeItem(name): void {
    const index = this.plateOrder.tempPlates.indexOf(name)
    if (index >= 0) {
      this.plateOrder.tempPlates.splice(index, 1)
    }
  }

  removeBarItem(name): void {
    const index = this.barList.indexOf(name)
    if (index >= 0) {
      this.barList.splice(index, 1)
    }
  }

  save() {
    this.daoOrder.barList = this.barList
    this.daoOrder.entradasList = this.entradasList
    this.daoOrder.orderTemp = this.plateOrder
    this.router.navigate(['/client/checkout'])
  }

  openDetail(item, index) {
    this.chosenPlate = item
    let dialog = this.dialog.open(PlateDetailComponent, {
      width: '90%',
      height: 'auto',
      data: {
        plateDetail: true,
        plate: this.chosenPlate,
        autoFocus: false,
      },
    })
    dialog.afterClosed().subscribe((res) => {
      if (res == 'add') {
        this.addItem(this.chosenPlate)
      }
      if (res == 'remove') {
        this.menuEntry.plates[index].plato.isRemoved = true
        this.dao.updateMenuDelDia(this.menuEntry).then((res) => {
          this.initServerData()
        })
      }
    })
  }

  openEntradaDetail(item, index) {
    if (this.hasDeleteAuth) {
      let dialog = this.dialog.open(PlateDetailComponent, {
        width: '90%',
        height: 'auto',
        data: {
          entradaDetail: true,
          plate: item,
          autoFocus: false,
        },
      })
      dialog.afterClosed().subscribe((res) => {
        if (res == 'remove') {
          switch (item.type) {
            case 'Entrada (sopa o fruta)':
              this.menuEntry.entradas.entradaArray[index].isRemoved = true
              break
            case 'Bebida (jugo o limonada)':
              this.menuEntry.entradas.bebidaArray[index].isRemoved = true
              break
            case 'Ensalada':
              this.menuEntry.entradas.toppingsList[index].isRemoved = true
              break
            case 'Arroz':
              this.menuEntry.entradas.toppingsList[index].isRemoved = true
              break
            case 'Guarnición':
              this.menuEntry.entradas.toppingsList[index].isRemoved = true
              break
            case 'Postre':
              this.menuEntry.entradas.toppingsList[3].isRemoved = true
              break
          }
          this.dao.updateMenuDelDia(this.menuEntry).then((res) => {
            this.initServerData()
          })
        }
      })
    }
  }

  getWaiterInfo() {
    // this.messageService.userDataObs.subscribe((res) => {
    //   if (res) {
    //     if (res.role == BUSINESS_ROLE.ADMIN) this.hasDeleteAuth = true
    //   }
    // })
  }

  showNoOrder() {
    this.hasNoOrder = true
  }
}
