import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { MatTableDataSource } from '@angular/material/table'
import { DaoClientService } from 'src/app/client/services/dao-client.service'
import { DaoPlateOrderService } from 'src/app/waiter/services/dao-plateorder.service'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  userData
  userId
  role

  isClient: boolean
  isEmployee: boolean
  clientData
  employeeData

  datasource = new MatTableDataSource()
  displayedColumns = ['date', 'price']

  form: FormGroup

  isLoaded: boolean
  versionBuildDate: string = '29 de Septembre 2023'

  constructor(
    private afAuthState: AngularFireAuth,
    private auth: AuthService,
    private daoClient: DaoClientService,
    private daoOrder: DaoPlateOrderService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initForm()
    this.getUserData()
  }

  getUserData() {
    this.afAuthState.authState.subscribe((res) => {
      if (res) {
        this.userData = res
        this.cdr.markForCheck()
        this.daoClient.getClientByUID(res.uid).subscribe((res) => {
          if (res.length === 0) {
            this.isEmployee = true
          } else {
            this.isClient = true
            this.clientData = res.pop()
            this.userId = this.clientData.id
            if (this.clientData.name) {
              this.form.get('name').setValue(this.clientData.name)
            }
            if (this.clientData.address) {
              this.form.get('address').setValue(this.clientData.address)
              this.form.get('phone').setValue(this.clientData.phone)
            }
            this.daoOrder
              .getOrdersByClient(this.clientData.id)
              .subscribe(
                (res) => (this.datasource = new MatTableDataSource(res))
              )
          }
        })
      }
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
    })
  }

  updateClientData(form) {
    this.daoClient.updateDocument(this.userId, form.value).then(() => {
      this.isLoaded = true
      setTimeout(() => {
        this.isLoaded = false
      }, 2000)
    })
  }

  logout() {
    this.auth.logout().then(() => {
      this.router.navigateByUrl('auth/login')
    })
  }
}
