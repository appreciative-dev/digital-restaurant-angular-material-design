import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { RecipeRoutingModule } from '../recipe/recipe-routing.module'
import { TranslateModule } from '@ngx-translate/core'
import { ClientRoutingModule } from './client-routing.module'
import { TablesComponent } from './components/tables/tables.component'
import { ClientDetailComponent } from './components/client-detail/client-detail.component'
import { ClientListComponent } from './components/client-list/client-list.component'
import { ClientFormComponent } from './components/client-form/client-form.component'
import { ClientOrderDetailComponent } from './components/clientorderdetail/clientorderdetail.component'
import { ClientCheckoutComponent } from './components/clientcheckout/clientcheckout.component'
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [TablesComponent, ClientDetailComponent, ClientListComponent, ClientFormComponent, ClientOrderDetailComponent, ClientCheckoutComponent],
  exports: [],
  imports: [RouterModule, CommonModule, SharedModule, ReactiveFormsModule, ClientRoutingModule, RecipeRoutingModule, TranslateModule],
})
export class ClientModule {}
