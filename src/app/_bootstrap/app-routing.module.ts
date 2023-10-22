import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NavbarComponent } from './components/navbar/navbar.component'
import { IndexComponent } from './components/index/index.component'
import { GuardErrorComponent } from './components/guard-error/guard-error.component'
import { AppinfoComponent } from './components/appinfo/appinfo.component'
import { NotfoundComponent } from './components/notfound/notfound.component'

export const ROUTES: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('../auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('../employee/employee.module').then((m) => m.EmployeeModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'waiter',
        loadChildren: () =>
          import('../waiter/waiter.module').then((m) => m.WaiterModule),
      },
      {
        path: 'client',
        loadChildren: () =>
          import('../client/client.module').then((m) => m.ClientModule),
      },
      {
        path: 'recipe',
        loadChildren: () =>
          import('../recipe/recipe.module').then((m) => m.RecipeModule),
      },
      { path: '', component: IndexComponent },
      { path: 'guard-error', component: GuardErrorComponent },
      { path: 'appinfo', component: AppinfoComponent, canActivate: [] },
      { path: '**', component: NotfoundComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
