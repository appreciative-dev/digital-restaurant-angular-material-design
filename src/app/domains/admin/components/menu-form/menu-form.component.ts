import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { DaoRecipeService } from '../../../recipe/services/dao-recipe.service'
import { Router } from '@angular/router'
import { MatTableDataSource } from '@angular/material/table'
import { fadeInUpOnEnterAnimation, fadeInDownOnEnterAnimation, fadeOutDownOnLeaveAnimation } from 'angular-animations'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DaoPlateService } from '../../services/dao-plate.service'
import { AUTH_ROLE } from 'src/app/auth/utils/auth.role'
import { MessageService } from 'src/app/shared/services/message.service'
import { Cambio, Plate } from 'src/app/bootstrap/models/models'
import { DaoEmployeeService } from 'src/app/domains/employee/services/dao-employee.service'
import { DaoBarService } from 'src/app/domains/waiter/services/dao-bar.service'
import { DaoCambiosService } from '../../services/dao-cambios.service'

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss'],
  animations: [fadeOutDownOnLeaveAnimation(), fadeInDownOnEnterAnimation(), fadeInUpOnEnterAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuFormComponent implements OnInit {
  readonly AUTH_ROLE = AUTH_ROLE

  menuSource
  menuSourceColumns = ['name', 'delete']

  hasEntrada: boolean
  hasBebida: boolean
  addDrink: boolean

  showMainPlates: boolean
  showAllMenu: boolean
  showCambios: boolean

  entradaArray = new Array()
  bebidaArray = new Array()
  toppingsList = new Array()

  selectedEntrada3 = { name: '-' } as any
  selectedDrink = {} as Plate

  daoArray: Array<any>
  platoList: Array<any>
  entradaList: Array<any>
  bebidaList: Array<any>
  barList: Array<any>
  saladList: Array<any>
  dessertList: Array<any>
  riceList: Array<any>
  garnishList: Array<any>

  plate = {} as Plate
  plates = new Array()

  barSource
  barSourceColumns = ['name', 'price', 'remove']
  hasBarItems: boolean

  isBarItemUploading: boolean
  isLoading: boolean
  isFormDataLoaded: boolean

  hasEntradasValidationError: boolean

  form: FormGroup
  cambiosForm: FormGroup

  menuList = {} as any
  entradasMenuList = {} as any
  user = {} as any

  adminList: Array<any>
  chefList: Array<any>
  waiterList: Array<any>
  deliveryList: Array<any>

  cambiosEntity = new Cambio()
  PAGE_SIZE = 10
  hasNoCambiosError: boolean

  constructor(
    private dao: DaoRecipeService,
    private daoPlate: DaoPlateService,
    private daoEmployeeService: DaoEmployeeService,
    private daoBar: DaoBarService,
    private messageService: MessageService,
    private router: Router,
    private daoCambios: DaoCambiosService
  ) {}

  ngOnInit() {
    this.updateServerDataMenu()
    this.updateServerDataBar()
    this.initForm()
    this.getUserInfo()
    this.initEmployees()
  }

  getUserInfo() {
    // this.user = this.messageService.getUserData
    // console.log(this.user)
  }

  initForm() {
    this.form = new FormGroup({
      selectedEntrada1: new FormControl('', {
        validators: Validators.required,
      }),
      selectedEntrada2: new FormControl('', {
        validators: Validators.required,
      }),
      selectedEntrada3: new FormControl(null, {}),
      selectedBebida1: new FormControl('', {
        validators: Validators.required,
      }),
      selectedBebida2: new FormControl('', {
        validators: Validators.required,
      }),
      selectedSalad: new FormControl('', {
        validators: Validators.required,
      }),
      selectedRice: new FormControl('', {
        validators: Validators.required,
      }),
      selectedGarnish: new FormControl('', {
        validators: Validators.required,
      }),
      selectedPostre: new FormControl('', {
        validators: Validators.required,
      }),
    })
    this.cambiosForm = new FormGroup({
      admin: new FormControl(null, {
        validators: Validators.required,
      }),
      chef: new FormControl(null, {
        validators: Validators.required,
      }),
      waiter1: new FormControl(null, {
        validators: Validators.required,
      }),
      waiter2: new FormControl(null, {}),
      waiter3: new FormControl(null, {}),
      delivery: new FormControl(null, {}),
    })
  }

  initEmployees() {
    this.daoEmployeeService.getEmployees().subscribe((res) => {
      console.log(res)
      this.adminList = res.filter((res) => res.role == AUTH_ROLE.ADMIN)
      this.chefList = res.filter((res) => res.role == AUTH_ROLE.CHEF)
      this.waiterList = res.filter((res) => res.role == AUTH_ROLE.WAITER)
      this.deliveryList = res.filter((res) => res.role == AUTH_ROLE.DELIVERY)
    })
  }

  updateServerDataMenu() {
    this.dao.getAll().subscribe((res) => {
      this.daoArray = res
      this.daoArray.forEach((el) => {
        el.amount = 0
      })
      this.entradaList = this.daoArray.filter((res) => res.type == 'Entrada (sopa o fruta)')
      this.isFormDataLoaded = true
      this.bebidaList = this.daoArray.filter((res) => res.type == 'Bebida (jugo o limonada)')
      this.saladList = this.daoArray.filter((res) => res.type == 'Ensalada')
      this.riceList = this.daoArray.filter((res) => res.type == 'Arroz')
      this.garnishList = this.daoArray.filter((res) => res.type == 'Guarnición')
      this.dessertList = this.daoArray.filter((res) => res.type == 'Postre')
      this.barList = this.daoArray.filter((res) => res.type == 'Adicional')
      this.platoList = this.daoArray.filter((res) => res.type == 'Plato principal')
    })
  }

  updateServerDataBar() {
    this.daoBar.getAll().subscribe((res) => {
      if (res.length == 0) this.hasBarItems = false
      else {
        this.barSource = new MatTableDataSource(res)
        this.hasBarItems = true
        this.isBarItemUploading = false
        this.selectedDrink = null
        this.plate = {} as Plate
      }
    })
  }

  chooseEntradas(form) {
    this.hasEntradasValidationError = false
    if (form.valid) {
      this.entradaArray.push(form.value.selectedEntrada1)
      this.entradaArray.push(form.value.selectedEntrada2)
      if (form.value.selectedEntrada3 !== null) this.entradaArray.push(form.value.selectedEntrada3)
      this.bebidaArray.push(form.value.selectedBebida1)
      this.bebidaArray.push(form.value.selectedBebida2)
      this.toppingsList.push(form.value.selectedSalad)
      this.toppingsList.push(form.value.selectedRice)
      this.toppingsList.push(form.value.selectedGarnish)
      this.toppingsList.push(form.value.selectedPostre)
      this.hasEntrada = true
      this.hasBebida = true
      this.entradasMenuList.toppingsList = this.toppingsList
      this.entradasMenuList.entradaArray = this.entradaArray
      this.entradasMenuList.bebidaArray = this.bebidaArray
      setTimeout(() => (this.showMainPlates = true), 500)
    } else this.hasEntradasValidationError = true
  }

  chooseMainPlates() {
    this.showMainPlates = false
    setTimeout(() => {
      this.showCambios = true
    }, 500)
  }

  changeEntradas() {
    this.hasEntrada = false
    this.hasBebida = false
    this.showCambios = false
    this.showAllMenu = false
    this.addDrink = false
    this.plates = new Array()
    this.entradaArray = new Array()
    this.bebidaArray = new Array()
    this.toppingsList = new Array()
    this.platoList.forEach((el) => (el.isAdded = false))
  }

  addBarDrink() {
    this.hasEntrada = true
    this.hasBebida = true
    this.addDrink = true
  }

  skipEntrada() {
    this.hasEntrada = true
    this.hasBebida = true
    setTimeout(() => {
      this.showMainPlates = true
    }, 500)
  }

  addPlate(item) {
    console.log(item)
    if (!item.isAdded) {
      this.plate.plato = item
      this.plate.timestamp = new Date()
      this.plates.push(this.plate)
      this.plate = {} as any
    } else {
      this.plates = this.plates.filter((el) => {
        return el.plato.name !== item.name
      })
      this.plate = {} as any
    }
  }

  savePlates() {
    this.isLoading = true
    this.menuList.plates = this.plates
    this.menuList.entradas = this.entradasMenuList
    this.menuList.cambios = { ...this.cambiosEntity }
    this.menuList.createdBy = 'user mock'
    this.menuList.createdAt = new Date()
    this.menuList.open = true
    this.menuList.orders = new Array()
    this.daoCambios.createDocument({ ...this.cambiosEntity }).then(() => {
      this.daoPlate.updateMenuDelDia(this.menuList).then(() => {
        this.isLoading = false
        this.router.navigateByUrl('platelist')
      })
    })
  }

  saveDrink() {
    this.isBarItemUploading = true
    this.plate.plato = this.selectedDrink
    this.plate.name = this.selectedDrink.name
    this.plate.price = this.selectedDrink.price
    this.plate.timestamp = new Date()
    this.daoBar.createDocument(this.plate).then(() => {
      this.updateServerDataBar()
    })
  }

  redirect(path, name) {
    // this.router.navigateByUrl(path).then((res) => {
    //   this.messageService.setNavbarTitle(name)
    // })
  }

  removeItem(id) {
    this.daoBar.delete(id).then(() => {
      this.updateServerDataBar()
    })
  }

  repeatCambios() {
    this.daoCambios.getLastCambio().subscribe((res) => {
      if (res.length == 0) {
        this.hasNoCambiosError = true
      } else {
        let item = res[0]
        this.cambiosForm.get('admin').setValue(item.cargo[0])
        this.cambiosForm.get('chef').setValue(item.cargo[1])
        this.cambiosForm.get('waiter1').setValue(item.cargo[2])
        if (item.cargo[3]) {
          this.cambiosForm.get('waiter2').setValue(item.cargo[3])
        }
        if (item.cargo[4]) {
          this.cambiosForm.get('waiter3').setValue(item.cargo[4])
        }
        if (item.cargo[5]) {
          this.cambiosForm.get('delivery').setValue(item.cargo[5])
        }
      }
    })
  }

  updateCambios(form) {
    this.cambiosEntity.timestamp = new Date()
    this.cambiosEntity.cargo.push(form.value.admin)
    this.cambiosEntity.cargo.push(form.value.chef)
    this.cambiosEntity.cargo.push(form.value.waiter1)
    this.cambiosEntity.cargo.push(form.value.waiter2)
    this.cambiosEntity.cargo.push(form.value.waiter3)
    this.cambiosEntity.cargo.push(form.value.delivery)
    this.showCambios = false
    setTimeout(() => {
      this.showAllMenu = true
    }, 500)
  }

  compareCambioUsers(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id
  }
}
