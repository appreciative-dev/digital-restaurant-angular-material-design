import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../auth/services/guard.service'
import { MenuFormComponent } from './components/menu-form/menu-form.component'
import { PlateListComponent } from './components/menu-board/menu-board.component'
import { MenuDetailComponent } from './components/menu-detail/menu-detail.component'
import { CashDeskComponent } from './components/cash-desk/cash-desk.component'

const ROUTES: Routes = [
  {
    path: 'menu-board',
    component: PlateListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cash-desk',
    component: CashDeskComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'menu-form',
    component: MenuFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'menu/:id',
    component: MenuDetailComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [],
})
export class AdminRoutingModule {}
