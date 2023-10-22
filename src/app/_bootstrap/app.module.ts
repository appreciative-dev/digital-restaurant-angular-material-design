import { LOCALE_ID, NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule, registerLocaleData } from '@angular/common'
import localeDeAt from '@angular/common/locales/es'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MaterialModule } from './material.module'
import { FIREBASE_CONFIG } from './utils/persistence.config'
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NavbarComponent } from './components/navbar/navbar.component'
import { IndexComponent } from './components/index/index.component'
import { GuardErrorComponent } from './components/guard-error/guard-error.component'
import { AppinfoComponent } from './components/appinfo/appinfo.component'
import { NotfoundComponent } from './components/notfound/notfound.component'
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component'
import { AddressComponent } from './components/address/address.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

registerLocaleData(localeDeAt)
const httpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http)

@NgModule({
  declarations: [AppComponent, NavbarComponent, IndexComponent, GuardErrorComponent, AppinfoComponent, NotfoundComponent, ConfirmationDialogComponent, AddressComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
