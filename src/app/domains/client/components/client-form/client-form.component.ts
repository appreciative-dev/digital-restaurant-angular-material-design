import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Client } from 'src/app/bootstrap/models/models'
import { MessageService } from 'src/app/shared/services/message.service'
import { DaoClientService } from '../../services/dao-client.service'

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFormComponent implements OnInit {
  form: FormGroup
  client: Client
  clientId: string
  isEditForm: boolean
  isAdmin: boolean

  constructor(private dao: DaoClientService, private messageService: MessageService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.clientId = this.route.snapshot.params['id']
    if (this.route.snapshot.routeConfig.path.includes('edit')) {
      this.initEditForm()
    }
    this.initForm()
    this.initClientSub()
    this.prepareFormType()
    this.getEmployeeInfo()
    this.initTitle()
  }

  initEditForm() {
    this.isEditForm = true
    this.dao.getDocument(this.clientId).subscribe((value) => {
      this.form.patchValue(value, { onlySelf: true })
    })
  }

  initClientSub() {
    this.messageService.clientDataObs.subscribe((res) => {
      if (res) {
        this.form.patchValue(res, { onlySelf: true })
        this.messageService.clientDataSub.next(null)
      }
    })
  }

  prepareFormType() {
    if (this.clientId !== 'new') {
      this.isEditForm = true
      this.dao.getDocument(this.clientId).subscribe((res: any) => {
        this.client = res
        this.form.patchValue(res, { onlySelf: true })
      })
    }
  }

  initForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    })
  }

  updateClient(form) {
    // this.dao.updateDocument(this.clientId, form.value).then(() => {
    //   this.isLoaded = true
    //   setTimeout(() => {
    //     this.isLoaded = false
    //   }, 2000)
    // })
  }

  save(form) {
    const item = form.value
    if (this.isAdmin) {
      item.isApproved = true
    }
    this.dao.createAdminClient(item).then((value) => this.router.navigate(['/client/detail', value.id]))
  }

  getEmployeeInfo() {
    // this.messageService.userDataObs.subscribe((res) => {
    //   if (res) {
    //     if (res.role == AUTH_ROLE.ADMIN) this.isAdmin = true
    //   }
    // })
  }

  initTitle() {
    this.messageService.setToolbarTitle(this.route.snapshot.data['title'])
  }
}
