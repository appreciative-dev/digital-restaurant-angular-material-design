import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EmployeeListComponent } from './components/employee-list/employee-list.component'
import { EmployeeFormComponent } from './components/employee-form/employee-form.component'
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component'

const ROUTES: Routes = [
  {
    path: 'list',
    component: EmployeeListComponent,
  },
  {
    path: 'create',
    component: EmployeeFormComponent,
  },
  {
    path: 'detail/:id',
    component: EmployeeDetailComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [],
})
export class EmployeeRoutingModule {}
