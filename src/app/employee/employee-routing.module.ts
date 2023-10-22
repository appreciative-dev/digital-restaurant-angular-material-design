import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { EmployeeListComponent } from "./components/employee-list/employee-list.component"
import { EmployeeFormComponent } from "./components/employee-form/employee-form.component"
import { EmployeeDetailComponent } from "./components/employee-detail/employee-detail.component"
import { AuthGuard } from "../auth/services/guard.service"

const ROUTES: Routes = [
  {
    path: "list",
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "create",
    component: EmployeeFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "detail/:id",
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [],
})
export class EmployeeRoutingModule {}
