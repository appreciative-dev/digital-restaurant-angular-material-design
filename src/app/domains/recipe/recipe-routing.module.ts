import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RecipeListComponent } from './components/recipe-list/recipe-list.component'
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component'
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component'

const ROUTES: Routes = [
  {
    path: '',
    component: RecipeListComponent,
    data: { title: 'RECIPES.PAGE.LIST.TOOLBAR' },
  },
  {
    path: 'create',
    component: RecipeFormComponent,
    data: { title: 'RECIPES.PAGE.CREATE.TOOLBAR' },
  },
  {
    path: ':id/edit',
    component: RecipeFormComponent,
    data: { title: 'RECIPES.PAGE.EDIT.TOOLBAR' },
  },
  {
    path: ':id',
    component: RecipeDetailComponent,
    data: { title: 'RECIPES.PAGE.DETAIL.TOOLBAR' },
  },
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [],
})
export class RecipeRoutingModule {}
