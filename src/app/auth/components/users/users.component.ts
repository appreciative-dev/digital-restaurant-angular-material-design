import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { DaoCambiosService } from '../../../admin/services/dao-cambios.service'
import { MessageService } from 'src/app/services/dao-utils/message.service'
import { BUSINESS_ROLE } from 'src/app/_bootstrap/utils/bootstrap.model'
import { Observable } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { CdkTableDataSourceInput } from '@angular/cdk/table'
import { AuthUser } from '../../services/auth.model'
import * as moment from 'moment'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  candidateSource
  candidateSourceColumns = ['email', 'add', 'delete']

  cambiosList: Array<any>
  PAGE_ITEMS_SIZE = 10
  firstItem
  lastItem
  isLoadingCambios: boolean

  readonly ROLES = BUSINESS_ROLE

  userListObs: Observable<CdkTableDataSourceInput<AuthUser>>
  userSourceColumns = ['name', 'email', 'timestamp', 'action']

  moment = moment

  constructor(private router: Router, private messageService: MessageService, private daoCambios: DaoCambiosService, private authService: AuthService) {}

  ngOnInit() {
    this.initUsers()
  }

  initUsers() {
    this.userListObs = this.authService.getAllUsers()
  }

  initServerData() {
    this.isLoadingCambios = true
    this.daoCambios.getFirstPage(this.PAGE_ITEMS_SIZE).subscribe((res) => {
      this.cambiosList = res
      this.lastItem = [...res].pop()
      this.isLoadingCambios = false
    })
  }

  addCandidate(item) {
    let newUser = {
      id: item.id,
      name: item.name,
      type: 'new',
    }
  }

  block(item) {
    console.log(item)
  }

  nextPage() {
    this.daoCambios.getNextPage(this.PAGE_ITEMS_SIZE, this.lastItem).subscribe((res) => {
      this.cambiosList = res
      this.firstItem = [...res][0]
      this.lastItem = [...res].pop()
    })
  }

  updatePage() {
    this.isLoadingCambios = true
    this.firstItem = undefined
    this.daoCambios.getFirstPage(this.PAGE_ITEMS_SIZE).subscribe((res) => {
      setTimeout(() => {
        this.isLoadingCambios = false
        this.cambiosList = res
        this.lastItem = [...res].pop()
      }, 1000)
    })
  }

  previousPage() {
    this.daoCambios.getPreviousPage(this.PAGE_ITEMS_SIZE, this.firstItem).subscribe((res) => {
      this.cambiosList = res
      this.firstItem = [...res][0]
      this.lastItem = [...res].pop()
    })
  }
}
