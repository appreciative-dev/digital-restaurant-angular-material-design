import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AdminRoutingModule } from './admin-routing.module'
import { MenuFormComponent } from './components/menu-form/menu-form.component'
import { PlateListComponent } from './components/menu-board/menu-board.component'
import { MenuDetailComponent } from './components/menu-detail/menu-detail.component'
import { CashDeskComponent } from './components/cash-desk/cash-desk.component'
import { PriceConfigurationComponent } from './components/price-configuration/price-configuration.component'
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [MenuFormComponent, PlateListComponent, MenuDetailComponent, CashDeskComponent, PriceConfigurationComponent],
  exports: [],
  imports: [RouterModule, FormsModule, CommonModule, SharedModule, ReactiveFormsModule, AdminRoutingModule],
})
export class AdminModule {}
