import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DomiciliosListComponent } from './components/domicilios-list/domicilios-list.component'

const routes: Routes = [
  {
    path: 'list',
    component: DomiciliosListComponent,
    data: { title: 'RECIPES.PAGE.LIST.TOOLBAR' },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class DeliveryRoutingModule {}
