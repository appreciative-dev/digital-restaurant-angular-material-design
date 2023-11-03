import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ClientDetailComponent } from './components/client-detail/client-detail.component'
import { ClientListComponent } from './components/client-list/client-list.component'
import { ClientFormComponent } from './components/client-form/client-form.component'
import { ClientOrderDetailComponent } from './components/clientorderdetail/clientorderdetail.component'
import { ClientCheckoutComponent } from './components/clientcheckout/clientcheckout.component'

const ROUTES: Routes = [
  {
    path: '',
    component: ClientListComponent,

    data: { title: 'RECIPES.PAGE.LIST.TOOLBAR' },
  },
  {
    path: 'create',
    component: ClientFormComponent,
    data: { title: 'RECIPES.PAGE.CREATE.TOOLBAR' },
  },
  {
    path: 'edit/:id',
    component: ClientFormComponent,
    data: { title: 'RECIPES.PAGE.EDIT.TOOLBAR' },
  },
  {
    path: 'detail/:id',
    component: ClientDetailComponent,
    data: { title: 'RECIPES.PAGE.DETAIL.TOOLBAR' },
  },
  {
    path: 'order/:id/:time',
    component: ClientOrderDetailComponent,
    data: { title: 'ClientOrderDetailComponent' },
  },
  {
    path: 'checkout',
    component: ClientCheckoutComponent,
    data: { title: 'ClientCheckoutComponent' },
  },
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [],
})
export class ClientRoutingModule {}
