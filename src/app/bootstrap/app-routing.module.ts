import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NavbarComponent } from './components/navbar/navbar.component'
import { IndexComponent } from './components/index/index.component'
import { AuthGuard } from '../auth/services/guard.service'

export const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: '', component: IndexComponent },
      {
        path: 'auth',
        loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'employee',
        loadChildren: () => import('../domains/employee/employee.module').then((m) => m.EmployeeModule),
        canActivate: [],
      },
      {
        path: 'admin',
        loadChildren: () => import('../domains/admin/admin.module').then((m) => m.AdminModule),
        canActivate: [],
      },
      {
        path: 'waiter',
        loadChildren: () => import('../domains/waiter/waiter.module').then((m) => m.WaiterModule),
        canActivate: [],
      },
      {
        path: 'client',
        loadChildren: () => import('../domains/client/client.module').then((m) => m.ClientModule),
        canActivate: [],
      },
      {
        path: 'recipe',
        loadChildren: () => import('../domains/recipe/recipe.module').then((m) => m.RecipeModule),
        canActivate: [],
      },
      {
        path: 'delivery',
        loadChildren: () => import('../domains/delivery/delivery.module').then((m) => m.DeliveryModule),
        canActivate: [],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
