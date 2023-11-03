import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { DeliveryRoutingModule } from './delivery-routing.module'
import { DomiciliosListComponent } from './components/domicilios-list/domicilios-list.component'
import { TranslateModule } from '@ngx-translate/core'
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [DomiciliosListComponent],
  imports: [RouterModule, CommonModule, SharedModule, ReactiveFormsModule, DeliveryRoutingModule, TranslateModule],
})
export class DeliveryModule {}
