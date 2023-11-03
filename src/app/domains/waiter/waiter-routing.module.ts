import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ExpensesComponent } from './components/expenses/expenses.component'
import { DomiciliosListComponent } from './components/domicilios-list/domicilios-list.component'
import { OrderFormComponent } from './components/order-form/order-form.component'
import { OrderListComponent } from './components/order-list/order-list.component'
import { OrderDetailComponent } from './components/order-detail/order-detail.component'
import { MenudeldiaComponent } from './components/menudeldia/menudeldia.component'

const ROUTES: Routes = [
  {
    path: 'expenses',
    component: ExpensesComponent,
    data: { title: 'EXPENSES.PAGE.LIST.TOOLBAR' },
  },
  {
    path: 'delivery',
    component: DomiciliosListComponent,
    data: { title: 'RECIPES.PAGE.LIST.TOOLBAR' },
  },
  {
    path: 'new-order',
    component: OrderFormComponent,
    data: { title: 'RECIPES.PAGE.LIST.TOOLBAR' },
  },
  {
    path: 'orders',
    component: OrderListComponent,
    data: { title: 'RECIPES.PAGE.LIST.TOOLBAR' },
  },
  {
    path: 'orderdetail/:id/:user',
    component: OrderDetailComponent,
    data: { title: 'RECIPES.PAGE.LIST.TOOLBAR' },
  },
  {
    path: 'menu',
    component: MenudeldiaComponent,
    data: { title: 'RECIPES.PAGE.LIST.TOOLBAR' },
  },
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [],
})
export class WaiterRoutingModule {}
