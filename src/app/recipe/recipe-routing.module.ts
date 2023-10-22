import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../auth/services/guard.service'
import { RecipeListComponent } from './components/recipe-list/recipe-list.component'
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component'
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component'

const ROUTES: Routes = [
  {
    path: '',
    component: RecipeListComponent,
    canActivate: [AuthGuard],
    data: { title: 'RECIPES.PAGE.LIST.TOOLBAR' },
  },
  {
    path: 'create',
    component: RecipeFormComponent,
    canActivate: [AuthGuard],
    data: { title: 'RECIPES.PAGE.CREATE.TOOLBAR' },
  },
  {
    path: ':id/edit',
    component: RecipeFormComponent,
    canActivate: [AuthGuard],
    data: { title: 'RECIPES.PAGE.EDIT.TOOLBAR' },
  },
  {
    path: ':id',
    component: RecipeDetailComponent,
    canActivate: [AuthGuard],
    data: { title: 'RECIPES.PAGE.DETAIL.TOOLBAR' },
  },
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [],
})
export class RecipeRoutingModule {}
