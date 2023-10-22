import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '../_bootstrap/material.module'
import { EmployeeRoutingModule } from './employee-routing.module'
import { EmployeeFormComponent } from './components/employee-form/employee-form.component'
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component'
import { EmployeeListComponent } from './components/employee-list/employee-list.component'

@NgModule({
  declarations: [EmployeeFormComponent, EmployeeDetailComponent, EmployeeListComponent],
  exports: [],
  imports: [RouterModule, CommonModule, MaterialModule, ReactiveFormsModule, EmployeeRoutingModule],
})
export class EmployeeModule {}
