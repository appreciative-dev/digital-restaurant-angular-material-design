import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { EmployeeRoutingModule } from './employee-routing.module'
import { EmployeeFormComponent } from './components/employee-form/employee-form.component'
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component'
import { EmployeeListComponent } from './components/employee-list/employee-list.component'
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [EmployeeFormComponent, EmployeeDetailComponent, EmployeeListComponent],
  imports: [RouterModule, CommonModule, SharedModule, ReactiveFormsModule, EmployeeRoutingModule],
})
export class EmployeeModule {}
