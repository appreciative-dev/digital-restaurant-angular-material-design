import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProfileComponent } from './components/profile/profile.component'
import { LoginComponent } from './components/login/login.component'
import { AuthGuard } from './services/guard.service'
import { UsersComponent } from './components/users/users.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class AuthRoutingModule {}
