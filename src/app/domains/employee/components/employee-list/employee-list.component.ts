import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MatTableDataSource } from '@angular/material/table'
import { DaoEmployeeService } from '../../services/dao-employee.service'
import { DaoCambiosService } from '../../../admin/services/dao-cambios.service'
import { AUTH_ROLE } from 'src/app/auth/utils/auth.role'
import { MessageService } from 'src/app/shared/services/message.service'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements OnInit {
  employeeSource
  employeeSourceColumns = ['name', 'role']

  candidateSource
  candidateSourceColumns = ['email', 'add', 'delete']

  cambiosList: Array<any>
  PAGE_ITEMS_SIZE = 10
  firstItem
  lastItem
  isLoadingCambios: boolean

  readonly ROLES = AUTH_ROLE

  constructor(private router: Router, private messageService: MessageService, private dao: DaoEmployeeService, private daoCambios: DaoCambiosService) {}

  ngOnInit() {
    this.initServerData()
  }

  initServerData() {
    this.isLoadingCambios = true
    this.daoCambios.getFirstPage(this.PAGE_ITEMS_SIZE).subscribe((res) => {
      this.cambiosList = res
      this.lastItem = [...res].pop()
      this.isLoadingCambios = false
    })
    this.dao.getEmployees().subscribe((res) => {
      this.employeeSource = new MatTableDataSource(res)
    })
    this.dao.getCandidates().subscribe((res) => {
      this.candidateSource = new MatTableDataSource(res)
    })
  }

  addCandidate(item) {
    let newUser = {
      id: item.id,
      name: item.name,
      type: 'new',
    }
    this.redirect('newemployee', 'Agregar nuevo empleado', newUser)
  }

  deleteCandidate(item) {
    this.dao.deleteDocument(item.id)
  }

  deleteEmployee(item) {
    this.dao.deleteDocument(item.id)
  }

  redirect(path, name, id) {
    this.router.navigate([path, id])
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
