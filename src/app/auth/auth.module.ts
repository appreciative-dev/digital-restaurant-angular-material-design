import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '../_bootstrap/material.module'
import { AuthRoutingModule } from './auth-routing.module'
import { LoginComponent } from './components/login/login.component'
import { ProfileComponent } from './components/profile/profile.component'
import { UsersComponent } from './components/users/users.component'

@NgModule({
  declarations: [LoginComponent, ProfileComponent, UsersComponent],
  exports: [],
  imports: [RouterModule, CommonModule, MaterialModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
