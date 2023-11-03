import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DaoEmployeeService } from '../../services/dao-employee.service'
import { Router, ActivatedRoute } from '@angular/router'
import { Employee } from '../../services/employee.model'
import { AUTH_ROLE } from 'src/app/auth/utils/auth.role'
import { MessageService } from 'src/app/shared/services/message.service'

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent implements OnInit {
  selectedRole: string
  form: FormGroup
  employee: Employee = {}
  employeeId
  employeeEmail
  isCreated: boolean

  roles = [
    { title: 'Gerente', role: AUTH_ROLE.ADMIN },
    { title: 'Cocinero', role: AUTH_ROLE.CHEF },
    { title: 'Mesero', role: AUTH_ROLE.WAITER },
    { title: 'Domiciliario', role: AUTH_ROLE.DELIVERY },
  ]

  isEditForm: boolean
  isLoaded: boolean

  constructor(private dao: DaoEmployeeService, private navRouter: Router, private messageService: MessageService, private router: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', {
        validators: Validators.required,
        updateOn: 'change',
      }),
      phone: new FormControl('', {
        updateOn: 'change',
      }),
      role: new FormControl('', {
        validators: Validators.required,
        updateOn: 'change',
      }),
    })
    let type = this.router.snapshot.params['type']
    if (type == 'new') {
      this.isEditForm = false
      this.employeeId = this.router.snapshot.params['id']
      this.form.get('name').setValue(this.router.snapshot.params['name'])
    } else if (type == 'edit') {
      this.isEditForm = true
      this.employeeId = this.router.snapshot.params['id']
      this.dao.getDocument(this.employeeId).subscribe((res) => {
        this.form.patchValue(res, { onlySelf: true })
      })
    }
  }

  save(form) {
    if (this.isEditForm) {
      this.dao.updateDocument(this.employeeId, form.value).then(() => {
        this.isLoaded = true
        setTimeout(() => {
          this.isLoaded = false
        }, 2000)
      })
    } else {
      let name = form.value.name
      let role = form.value.role
      let phone = form.value.phone
      this.dao.updateEmployee(this.employeeId, name, role, phone).then((res) => {
        this.redirect('employeelist', 'Cambios')
      })
    }
  }

  redirect(path, name) {
    this.navRouter.navigate([path])
  }
}
