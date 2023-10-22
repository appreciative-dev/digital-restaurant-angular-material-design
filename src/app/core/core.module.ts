import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from '../_bootstrap/material.module'
import { AppButtonComponent } from './components/app-button/app-button.component'
import { MouseOnHoverDirective } from './services/mouse-on-hover.directive'
import { AppDetailToolbarComponent } from './components/app-detail-toolbar/app-detail-toolbar.component'
import { AppTableSearchComponent } from './components/app-table-search/app-table-search.component'

@NgModule({
  declarations: [AppButtonComponent, AppDetailToolbarComponent, AppTableSearchComponent, MouseOnHoverDirective],
  exports: [AppButtonComponent, AppDetailToolbarComponent, AppTableSearchComponent],
  imports: [RouterModule, CommonModule, MaterialModule, ReactiveFormsModule, TranslateModule],
  providers: [],
})
export class CoreModule {}
