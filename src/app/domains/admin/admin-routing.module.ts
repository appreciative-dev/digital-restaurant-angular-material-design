import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MenuFormComponent } from './components/menu-form/menu-form.component'
import { PlateListComponent } from './components/menu-board/menu-board.component'
import { MenuDetailComponent } from './components/menu-detail/menu-detail.component'
import { CashDeskComponent } from './components/cash-desk/cash-desk.component'

const ROUTES: Routes = [
  {
    path: 'menu-board',
    component: PlateListComponent,
  },
  {
    path: 'cash-desk',
    component: CashDeskComponent,
  },
  {
    path: 'menu-form',
    component: MenuFormComponent,
  },
  {
    path: 'menu/:id',
    component: MenuDetailComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [],
})
export class AdminRoutingModule {}
