import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../../auth/services/guard.service'
import { DomiciliosListComponent } from './components/domicilios-list/domicilios-list.component'

const routes: Routes = [
  {
    path: 'list',
    component: DomiciliosListComponent,
    canActivate: [AuthGuard],
    data: { title: 'RECIPES.PAGE.LIST.TOOLBAR' },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class DeliveryRoutingModule {}
