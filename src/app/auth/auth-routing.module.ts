import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ProfileComponent } from "./components/profile/profile.component"
import { LoginComponent } from "./components/login/login.component"
import { AuthGuard } from "./services/guard.service"
import { UsersComponent } from "./components/users/users.component"

const ROUTES: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
  {
    path: "users",
    component: UsersComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [],
})
export class AuthRoutingModule {}
