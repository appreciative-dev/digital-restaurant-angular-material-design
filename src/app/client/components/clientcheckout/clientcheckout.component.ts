import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DaoPlateOrderService } from '../../../waiter/services/dao-plateorder.service'
import { PlateOrder, ClientAddress, OrderTemplate, Recipe } from '../../../_bootstrap/models/models'
import { DaoClientService } from 'src/app/client/services/dao-client.service'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Observable } from 'rxjs'
import { startWith, map } from 'rxjs/operators'
import { MessageService } from 'src/app/services/dao-utils/message.service'
import { DaoPriceService } from 'src/app/admin/services/dao-price.service'
import { zoomOutUpOnLeaveAnimation, expandOnEnterAnimation, collapseOnLeaveAnimation, fadeInUpOnEnterAnimation } from 'angular-animations'
import { DaoRecipeHistoryService } from 'src/app/recipe/services/dao-recipe-history.service'
import { DaoDeliveryService } from 'src/app/waiter/services/dao-delivery.service'
import { DaoPlateService } from 'src/app/admin/services/dao-plate.service'

@Component({
  selector: 'app-clientcheckout',
  templateUrl: './clientcheckout.component.html',
  styleUrls: ['./clientcheckout.component.scss'],
  animations: [zoomOutUpOnLeaveAnimation(), expandOnEnterAnimation(), collapseOnLeaveAnimation(), fadeInUpOnEnterAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCheckoutComponent implements OnInit {
  plates: Array<any> = new Array()
  platesAmount: number
  chosenPlato
  dishes
  totalPrice
  order: PlateOrder = {} as PlateOrder
  dishTemplate = {} as Recipe
  isCash: boolean

  form: FormGroup
  hasOrder: boolean = false

  entradaList = new Array()
  bebidaList = new Array()
  toppingsList = new Array()
  selectedPlato
  selectedEntrada
  selectedBebida

  clientData: any
  isClientRegistered: boolean

  deliveryTime: string = 'Ahora'
  isNowDelivery: boolean = true

  clientFormControl = new FormControl()
  filteredClients: Observable<any[]>
  clientList = new Array()

  hasClientAccess: boolean
  hasFormError: boolean
  hasEntradaError: boolean
  hasBebidaError: boolean
  hasPaymentTypeError: boolean

  orderRedirectId: string
  recipeHistoryList = new Array()
  hasOrderRedirect: boolean
  hasLoader: boolean

  menuEntry = {} as any
  barList = new Array()
  entradasTemp: any
  hasAdicionales: boolean

  isUploading: boolean

  hasDiscount: boolean
  discountAmount: number
  hasDelivery: boolean
  deliveryAmount: number

  isTableGrid: boolean
  isDeliveryGrid: boolean = true

  chosenTable: number = null
  orderType: string
  waiter: any
  hasNoTableError: boolean
  orderId: string

  tablePayment: FormControl = new FormControl(null, Validators.required)
  hasTableWithClient: boolean
  extraClientName: FormControl = new FormControl()
  extraClientPhone: FormControl = new FormControl()

  totalOrderList: Array<any>

  constructor(
    private dao: DaoDeliveryService,
    private daoPrice: DaoPriceService,
    private daoPlate: DaoPlateOrderService,
    private messageService: MessageService,
    private daoMenu: DaoPlateService,
    private afAuthState: AngularFireAuth,
    private daoClient: DaoClientService,
    private navRouter: Router,
    private daoHistory: DaoRecipeHistoryService
  ) {}

  ngOnInit() {
    this.validateOrder()
    this.initForm()
    this.initExtraPrices()
    this.getAllClients()
    this.getClient()
  }

  validateOrder() {
    this.plates = this.daoPlate.orderTemp.tempPlates
    if (this.plates?.length !== 0) {
      this.hasOrder = true
      this.platesAmount = this.plates?.length
    } else this.plates = []
  }

  initExtraPrices() {
    this.daoPrice.getDiscountPrice().subscribe((res: any) => {
      this.discountAmount = res?.amount
      this.hasDiscount = res?.isActive
      if (this.hasDiscount == false) this.discountAmount = 0
    })
    this.daoPrice.getDeliveryPrice().subscribe((res: any) => {
      this.deliveryAmount = res?.amount
      this.hasDelivery = res?.isActive
      if (this.hasDelivery == false) this.deliveryAmount = 0
      this.createOrderTemplate()
    })
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

  initForm() {
    this.form = new FormGroup({
      name: new FormControl('', {
        validators: Validators.required,
        updateOn: 'change',
      }),
      address: new FormControl('', {
        validators: Validators.required,
        updateOn: 'change',
      }),
      phone: new FormControl('', {
        validators: Validators.required,
        updateOn: 'change',
      }),
      payment: new FormControl('', {
        validators: Validators.required,
        updateOn: 'change',
      }),
      change: new FormControl('', {
        updateOn: 'change',
      }),
      comments: new FormControl('', {
        updateOn: 'change',
      }),
    })
  }

  createOrderTemplate() {
    this.entradasTemp = this.daoPlate.entradasList
    this.plates = this.daoPlate.orderTemp.tempPlates

    console.log(this.plates)
    this.barList = this.daoPlate.barList
    this.order.chosenPlates = [] as Array<OrderTemplate>

    if (this.barList.length > 0) this.hasAdicionales = true
    else this.hasAdicionales = false
    console.log(this.barList)

    this.plates.forEach((el) => {
      let objectTemp = {
        entrada: {
          name: 'NA',
          id: null,
        },
        bebida: {
          name: 'NA',
          id: null,
        },
        ensalada: {
          name: el.entradas.toppingsList[0].name,
          id: el.entradas.toppingsList[0].id,
        },
        garnish: {
          name: el.entradas.toppingsList[0].name,
          id: el.entradas.toppingsList[0].id,
        },
        rice: {
          name: el.entradas.toppingsList[0].name,
          id: el.entradas.toppingsList[0].id,
        },
        postre: {
          name: el.entradas.toppingsList[0].name,
          id: el.entradas.toppingsList[0].id,
        },
        plato: el,
      }
      this.order.chosenPlates.push(objectTemp)
    })
    let platePrice = this.plates.map((a) => a.price).reduce((a, b) => a + b, 0)
    let barPrice = this.barList.map((a) => a.price).reduce((a, b) => a + b, 0)
    this.totalPrice = platePrice + barPrice + this.platesAmount * this.deliveryAmount - this.platesAmount * this.discountAmount
  }

  getClient() {
    this.afAuthState.authState.subscribe((res) => {
      if (res) {
        this.daoClient.getClientByUID(res.uid).subscribe((res) => {
          if (res.length > 0) {
            this.clientData = res.pop()
            if (this.clientData.name) {
              this.form.get('name').setValue(this.clientData.name)
            }
            if (this.clientData.address) {
              this.form.get('address').setValue(this.clientData.address)
              this.form.get('phone').setValue(this.clientData.phone)
            }
            if (this.clientData.id) {
              this.isClientRegistered = true
            }
          }
        })
      }
    })
    // this.messageService.userDataObs.subscribe((res) => {
    //   if (res) {
    //     this.waiter = res
    //     if (res.role !== BUSINESS_ROLE.DELIVERY) {
    //       this.hasClientAccess = true
    //     }
    //     if (res.role == BUSINESS_ROLE.ADMIN) {
    //       this.chooseOrderType("delivery")
    //       this.orderType = "delivery"
    //     }
    //     if (res.role == BUSINESS_ROLE.WAITER) {
    //       this.chooseOrderType("table")
    //       this.orderType = "table"
    //     }
    //   }
    // })
  }

  confirmDelivery(form) {
    this.initMenuEntry()
    this.isUploading = false
    this.hasFormError = false
    this.hasEntradaError = false
    this.hasBebidaError = false
    this.hasPaymentTypeError = false
    let skippedEntrada = this.order.chosenPlates.find((el) => {
      return el.entrada.name == 'NA'
    })
    let skippedBebida = this.order.chosenPlates.find((el) => {
      return el.bebida.name == 'NA'
    })
    if (!skippedEntrada && !skippedBebida && form.valid) {
      if (form.valid) {
        this.order.address = {} as ClientAddress
        this.order.address.address = form.value.address
        this.order.address.phone = form.value.phone
        this.order.address.name = form.value.name
        this.order.payment = form.value.payment
        this.order.change = form.value.change
        this.order.comments = form.value.comments
        this.isUploading = true
        this.order.timestamp = new Date()
        this.order.isCooked = false
        this.order.isPaid = false
        this.order.isArchived = false
        this.order.hasWaiter = false
        if (this.isClientRegistered) this.order.client = this.clientData
        if (this.hasAdicionales) {
          this.order.bar = this.barList
        }
        this.order.totalPrice = this.totalPrice
        if (this.hasDelivery) this.order.deliveryPrice = this.platesAmount * this.deliveryAmount
        if (this.hasDiscount) this.order.discountPrice = this.platesAmount * this.discountAmount
        this.order.deliveryTime = this.deliveryTime
        this.dao.createDocument(this.order).then((res: any) => {
          this.orderRedirectId = res.id
          if (this.waiter) {
            this.navRouter.navigate(['/delivery'])
          } else {
            this.hasOrderRedirect = true
            setTimeout(() => {
              this.hasLoader = true
            }, 2000)
            setTimeout(() => {
              this.hasLoader = false
              this.isUploading = false
              this.navRouter.navigate(['/clientorder', this.orderRedirectId, this.deliveryTime])
            }, 4000)
          }
        })
      }
    } else {
      if (skippedEntrada) this.hasEntradaError = true
      else this.hasEntradaError = false
      if (skippedBebida) this.hasBebidaError = true
      else this.hasBebidaError = false
      if (form.invalid) {
        this.form.markAllAsTouched()
        this.hasFormError = true
        if (form.controls.payment.errors.required == true) this.hasPaymentTypeError = true
        else this.hasPaymentTypeError = false
      } else this.hasFormError = false
    }
  }

  confirmTableOrder() {
    this.initMenuEntry()
    this.isUploading = false
    this.hasEntradaError = false
    this.hasBebidaError = false
    this.hasNoTableError = false
    let skippedEntrada = this.order?.chosenPlates.find((el) => {
      return el.entrada.name == 'NA'
    })
    let skippedBebida = this.order?.chosenPlates.find((el) => {
      return el.bebida.name == 'NA'
    })
    if (!skippedEntrada && !skippedBebida && this.chosenTable !== null && this.tablePayment.errors == null) {
      this.isUploading = true
      this.order.waiter = this.waiter
      this.order.timestamp = new Date()
      this.order.isCooked = true
      this.order.isPaid = false
      this.order.isDelivered = false
      this.order.isArchived = false
      this.order.hasWaiter = true
      this.order.isTable = true
      this.order.table = this.chosenTable
      console.log(this.hasTableWithClient)
      if (this.hasTableWithClient) {
        this.order.tableClientName = this.extraClientName.value
        console.log(this.order.tableClientName)
        this.order.tableClientPhone = this.extraClientPhone.value
        this.order.hasTableClientName = true
      }
      this.order.payment = this.tablePayment.value
      if (this.hasAdicionales) {
        this.order.bar = this.barList
      }
      this.order.totalPrice = this.totalPrice
      if (this.hasDiscount) this.order.discountPrice = this.platesAmount * this.discountAmount
      this.daoPlate.createDocument(this.order).then((res) => {
        this.orderId = res.id
        this.order.chosenPlates.forEach((el) => {
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
          if (this.hasAdicionales) {
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
        let queries = this.recipeHistoryList.map((el) => {
          console.log(el)
          return this.daoHistory.createDocument(el)
        })
        Promise.all(queries).then(() => {
          this.updateMenuHistoryAmount()
        })
      })
    } else {
      if (this.chosenTable == null) this.hasNoTableError = true
      else this.hasNoTableError = false
      if (skippedEntrada) this.hasEntradaError = true
      else this.hasEntradaError = false
      if (skippedBebida) this.hasBebidaError = true
      else this.hasBebidaError = false
      if (this.tablePayment.errors['required']) this.hasPaymentTypeError = true
      else this.hasPaymentTypeError = false
    }
  }

  updateMenuHistoryAmount() {
    this.menuEntry.plates.forEach((el) => {
      let filtereListBySameItemsOfOrderPlateAmount = this.plates.filter((innerEl) => {
        return innerEl.id == el.plato.id
      })
      let amount = filtereListBySameItemsOfOrderPlateAmount.length
      let item = filtereListBySameItemsOfOrderPlateAmount.pop()
      if (amount > 0) {
        let sameItemIndex = this.menuEntry.plates
          .map((el) => {
            return el.plato.id
          })
          .indexOf(item.id)
        let oldAmount: number = this.menuEntry.plates[sameItemIndex].plato.amount
        let newAmount: number = oldAmount + amount
        this.menuEntry.plates[sameItemIndex].plato.amount = newAmount
      }
    })

    /*
    console.warn("entradas updating ..")
    this.menuEntry.entradas.entradaArray.forEach(el => {
      let filtereListBySameItemsOfOrderPlateAmount = this.menuEntry.entradas.entradaArray.filter((innerEl, i) => {
        console.log(this.order.chosenPlates[i].entrada.id)
        console.log(innerEl.id)
        return innerEl.id == this.order.chosenPlates[i].entrada.id
      })

      let amount = filtereListBySameItemsOfOrderPlateAmount.length
      let item = filtereListBySameItemsOfOrderPlateAmount.pop()
      console.log(amount)
      console.log(item)

      if(amount > 0) {
        let sameItemIndex = this.menuEntry.entradas.entradaArray.map(el => {
          return el.id
        }).indexOf(item.id)
        console.log(sameItemIndex)
        let oldAmount: number = this.menuEntry.entradas.entradaArray[sameItemIndex].amount
        console.log(oldAmount)
        let newAmount: number = oldAmount + amount
        console.log(newAmount)
        this.menuEntry.entradas.entradaArray[sameItemIndex].amount = newAmount
        console.log(this.menuEntry.entradas.entradaArray[sameItemIndex])
      }
    })

    console.warn("bebidas updating ..")
    this.menuTemp.entradas.entradaArray.forEach(el => {
      console.log(el)
      let filteredBySameItemsArray = this.plates.filter(innerEl => {
        return innerEl.id == el.id
      })

      let amount = filteredBySameItemsArray.length
      let item = filteredBySameItemsArray.pop()
      console.log(amount)
      console.log(item)

      if(amount > 0) {
        let sameItemIndex = this.menuTemp.entradas.entradaArray.map(el => {
          return el.id
        }).indexOf(item.id)
        console.log(sameItemIndex)
        let oldAmount: number = this.menuTemp.entradas.entradaArray[sameItemIndex].amount
        console.log(oldAmount)
        let newAmount: number = oldAmount + amount
        console.log(newAmount)
        this.menuTemp.entradas.entradaArray[sameItemIndex].amount = newAmount
        console.log(this.menuTemp.entradas.entradaArray[sameItemIndex])
      }
    })

    console.warn("toppings updating ..")
    this.menuTemp.entradas.entradaArray.forEach(el => {
      console.log(el)
      let filteredBySameItemsArray = this.plates.filter(innerEl => {
        return innerEl.id == el.id
      })

      let amount = filteredBySameItemsArray.length
      let item = filteredBySameItemsArray.pop()
      console.log(amount)
      console.log(item)

      if(amount > 0) {
        let sameItemIndex = this.menuTemp.entradas.entradaArray.map(el => {
          return el.id
        }).indexOf(item.id)
        console.log(sameItemIndex)
        let oldAmount: number = this.menuTemp.entradas.entradaArray[sameItemIndex].amount
        console.log(oldAmount)
        let newAmount: number = oldAmount + amount
        console.log(newAmount)
        this.menuTemp.entradas.entradaArray[sameItemIndex].amount = newAmount
        console.log(this.menuTemp.entradas.entradaArray[sameItemIndex])
      }
    }) */

    if (!this.menuEntry.orders) this.menuEntry.orders = new Array()
    this.menuEntry.orders.push(this.order)
    this.daoMenu.updateMenuAmount(this.menuEntry).then(() => {
      this.isUploading = false
      this.navRouter.navigate(['/waiter/orderdetail', this.orderId, 'employee'])
    })
  }

  chooseCash(ev) {
    if (ev == 'CASH') {
      this.isCash = true
      this.form.get('change').setValidators([Validators.required])
      this.form.updateValueAndValidity()
    } else {
      this.isCash = false
      this.form.get('change').setValidators([])
      this.form.get('change').setValue(null)
      this.form.updateValueAndValidity()
    }
  }

  chooseEntrada(event, i) {
    if (event == 'skip') {
      this.order.chosenPlates[i].entrada.id = null
      this.order.chosenPlates[i].entrada.name = 'Sin entrada'
    } else {
      this.order.chosenPlates[i].entrada.id = event.id
      this.order.chosenPlates[i].entrada.name = event.name
    }
  }

  chooseBebida(event, i) {
    if (event == 'skip') {
      this.order.chosenPlates[i].bebida.id = null
      this.order.chosenPlates[i].bebida.name = 'Sin bebida'
    } else {
      this.order.chosenPlates[i].bebida.id = event.id
      this.order.chosenPlates[i].bebida.name = event.name
    }
  }

  chooseToppings(event, i) {
    if (event.type == 'Ensalada') {
      if (this.order.chosenPlates[i].ensalada.id !== event.id) {
        this.order.chosenPlates[i].ensalada.id = event.id
        this.order.chosenPlates[i].ensalada.name = event.name
      } else {
        this.order.chosenPlates[i].ensalada.id = null
        this.order.chosenPlates[i].ensalada.name = 'NA'
      }
    } else if (event.type == 'Arroz') {
      if (this.order.chosenPlates[i].rice.id !== event.id) {
        this.order.chosenPlates[i].rice.id = event.id
        this.order.chosenPlates[i].rice.name = event.name
      } else {
        this.order.chosenPlates[i].rice.id = null
        this.order.chosenPlates[i].rice.name = 'NA'
      }
    } else if (event.type == 'Guarnición') {
      if (this.order.chosenPlates[i].garnish.id !== event.id) {
        this.order.chosenPlates[i].garnish.id = event.id
        this.order.chosenPlates[i].garnish.name = event.name
      } else {
        this.order.chosenPlates[i].garnish.id = null
        this.order.chosenPlates[i].garnish.name = 'NA'
      }
    } else if (event.type == 'Postre') {
      if (this.order.chosenPlates[i].postre.id !== event.id) {
        this.order.chosenPlates[i].postre.id = event.id
        this.order.chosenPlates[i].postre.name = event.name
      } else {
        this.order.chosenPlates[i].postre.id = null
        this.order.chosenPlates[i].postre.name = 'NA'
      }
    }
  }

  updateTime(type) {
    if (type == 'Ahora') {
      this.isNowDelivery = true
      this.deliveryTime = 'Ahora'
    } else {
      // let amazingTimePicker = this.timePicker.open(
      //   {
      //     time: "12:00",
      //     theme: "material-blue",
      //     changeToMinutes: true,
      //     onlyPM: true,
      //     preference: {
      //       labels: {
      //         cancel: "Cerrar",
      //         ok: "Confirmar"
      //       }
      //     }
      //   }
      // )
      // amazingTimePicker.afterClose().subscribe( time => {
      //   this.deliveryTime = time
      //   this.isNowDelivery = false
      // })
    }
  }

  getAllClients() {
    this.daoClient.getAll().subscribe((res) => {
      this.clientList = res
      this.filteredClients = this.clientFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.name)),
        map((name) => (name ? this.filterAutocompleteName(name) : this.clientList.slice()))
      )
    })
  }

  displayFn(item): string {
    return item && item.name ? item.name : ''
  }

  filterAutocompleteName(name: string) {
    const filterValue = name.toLowerCase()
    return this.clientList.filter((option) => option.name.toLowerCase().indexOf(filterValue) === 0)
  }

  addClientData(item) {
    this.form.reset()
    this.clientData = item
    if (this.clientData.name) {
      this.form.get('name').setValue(this.clientData.name)
    }
    if (this.clientData.address) {
      this.form.get('address').setValue(this.clientData.address)
      this.form.get('phone').setValue(this.clientData.phone)
    }
    if (this.clientData.id) {
      this.isClientRegistered = true
    }
  }

  redirect(path, name) {
    // this.navRouter.navigate([path, 'new']).then(() => {
    //   this.messageService.setNavbarTitle(name)
    // })
  }

  redirectByName(path, name) {
    // this.navRouter.navigateByUrl(path).then(() => {
    //   this.messageService.setNavbarTitle(name)
    // })
  }

  chooseOrderType(type) {
    if (type == 'table') {
      this.isTableGrid = true
      this.isDeliveryGrid = false
    } else if (type == 'delivery') {
      this.isTableGrid = false
      this.isDeliveryGrid = true
    }
  }

  showClientForTable() {
    if (this.hasTableWithClient) this.hasTableWithClient = false
    else this.hasTableWithClient = true
  }

  attachTableToOrder(ev) {
    this.chosenTable = ev
  }
}
