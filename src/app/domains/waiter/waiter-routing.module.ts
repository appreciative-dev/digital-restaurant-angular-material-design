import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../../auth/services/guard.service'
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
    canActivate: [AuthGuard],
    data: { title: 'EXPENSES.PAGE.LIST.TOOLBAR' },
  },
  {
    path: 'delivery',
    component: DomiciliosListComponent,
    canActivate: [AuthGuard],
    data: { title: 'RECIPES.PAGE.LIST.TOOLBAR' },
  },
  {
    path: 'new-order',
    component: OrderFormComponent,
    canActivate: [AuthGuard],
    data: { title: 'RECIPES.PAGE.LIST.TOOLBAR' },
  },
  {
    path: 'orders',
    component: OrderListComponent,
    canActivate: [AuthGuard],
    data: { title: 'RECIPES.PAGE.LIST.TOOLBAR' },
  },
  {
    path: 'orderdetail/:id/:user',
    component: OrderDetailComponent,
    canActivate: [AuthGuard],
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
