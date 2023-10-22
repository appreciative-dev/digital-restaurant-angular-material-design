import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DaoPlateOrderService } from '../../services/dao-plateorder.service'
import { PlateOrder, OrderTemplate } from '../../../_bootstrap/models/models'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { DaoEmployeeService } from 'src/app/employee/services/dao-employee.service'

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent implements OnInit {
  plates
  comments = ''
  totalPrice
  waiter
  order: PlateOrder = {} as PlateOrder

  tables = ['S-1', 'S-2', 'S-3', 'G-1', 'G-2', 'B-1', 'B-2']
  selectedTable

  form: FormGroup
  hasOrder: boolean = false

  constructor(private dao: DaoPlateOrderService, private daoEmployeeService: DaoEmployeeService, private navRouter: Router, private auth: AngularFireAuth, private router: ActivatedRoute) {}

  ngOnInit() {
    this.getUserData()
    this.createOrderTemplate()
    this.form = new FormGroup({
      table: new FormControl('', {
        validators: Validators.required,
        updateOn: 'change',
      }),
      comments: new FormControl('', {
        updateOn: 'change',
      }),
    })
  }

  getUserData() {
    this.auth.authState.subscribe((res) => {
      this.daoEmployeeService.getEmployeeByUid(res.uid).subscribe((res) => (this.waiter = res.pop()))
    })
  }

  confirm(form) {
    this.order.timestamp = new Date()
    this.order.isCooked = false
    this.order.isPaid = false
    this.order.hasWaiter = true
    this.order.waiter = this.waiter
    this.order.totalPrice = this.totalPrice
    this.order.comments = form.value.comments
    this.order.table = form.value.table
    this.order.FBbug = 'yes'
    this.dao.createDocument(this.order).then((res) => this.navRouter.navigate(['/orderdetail', res.id]))
  }

  chooseEntrada(event, i) {
    this.order.chosenPlates[i].entrada.id = event.id
    this.order.chosenPlates[i].entrada.name = event.name
  }

  chooseBebida(event, i) {
    this.order.chosenPlates[i].bebida.id = event.id
    this.order.chosenPlates[i].bebida.name = event.name
  }

  createOrderTemplate() {
    this.plates = this.dao.orderTemp.tempPlates
    this.order.chosenPlates = [] as Array<OrderTemplate>
    this.plates.forEach((el) => {
      let objectTemp = {
        entrada: { name: '', id: '' },
        bebida: { name: '', id: '' },
        plato: el.plato,
      }
      this.order.chosenPlates.push(objectTemp)
    })
    this.totalPrice = this.plates.map((a) => a.price).reduce((a, b) => a + b, 0)
    if (this.plates.length !== 0) this.hasOrder = true
    else this.plates = []
  }
}
