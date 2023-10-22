import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '../_bootstrap/material.module'
import { WaiterRoutingModule } from './waiter-routing.module'
import { PlateDetailComponent } from './components/plate-detail/plate-detail.component'
import { ExpensesFormComponent } from './components/expenses-form/expenses-form.component'
import { ExpensesComponent } from './components/expenses/expenses.component'
import { DomiciliosListComponent } from './components/domicilios-list/domicilios-list.component'
import { OrderFormComponent } from './components/order-form/order-form.component'
import { OrderListComponent } from './components/order-list/order-list.component'
import { OrderDetailComponent } from './components/order-detail/order-detail.component'
import { MenudeldiaComponent } from './components/menudeldia/menudeldia.component'
import { CoreModule } from '../core/core.module'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [PlateDetailComponent, ExpensesFormComponent, ExpensesComponent, DomiciliosListComponent, OrderFormComponent, OrderListComponent, OrderDetailComponent, MenudeldiaComponent],
  imports: [RouterModule, CommonModule, MaterialModule, ReactiveFormsModule, WaiterRoutingModule, CoreModule, TranslateModule],
})
export class WaiterModule {}
