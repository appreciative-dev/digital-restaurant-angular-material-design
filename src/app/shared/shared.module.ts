import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MouseOnHoverDirective } from './services/mouse-on-hover.directive'
import { TimestampPipe } from './utils/date.pipe'
import { MaterialModule } from './design-system/material.module'
import { AppButtonComponent } from './components/app-button/app-button.component'
import { AppDetailToolbarComponent } from './components/app-detail-toolbar/app-detail-toolbar.component'
import { AppTableSearchComponent } from './components/app-table-search/app-table-search.component'
import { TranslateModule } from '@ngx-translate/core'
import { AppConfirmationDialogComponent } from './components/app-confirmation-dialog/app-confirmation-dialog.component'
import { AppInfoComponent } from './components/app-info/app-info.component'
import { AppLoaderComponent } from './components/app-loader/app-loader.component'
import { AppNotFoundComponent } from './components/app-not-found/app-not-found.component'
import { AppAddressComponent } from './components/app-address/app-address.component'

@NgModule({
  declarations: [
    MouseOnHoverDirective,
    TimestampPipe,
    AppButtonComponent,
    AppDetailToolbarComponent,
    AppTableSearchComponent,
    AppConfirmationDialogComponent,
    AppInfoComponent,
    AppLoaderComponent,
    AppNotFoundComponent,
    AppAddressComponent,
  ],
  exports: [
    MaterialModule,
    MouseOnHoverDirective,
    TimestampPipe,
    AppButtonComponent,
    AppDetailToolbarComponent,
    AppTableSearchComponent,
    AppConfirmationDialogComponent,
    AppInfoComponent,
    AppLoaderComponent,
    AppNotFoundComponent,
    AppAddressComponent,
  ],
  imports: [
    MaterialModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class SharedModule {}
