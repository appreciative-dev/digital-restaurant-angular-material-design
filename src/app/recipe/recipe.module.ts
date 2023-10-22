import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '../_bootstrap/material.module'
import { RecipeRoutingModule } from './recipe-routing.module'
import { RecipeListComponent } from './components/recipe-list/recipe-list.component'
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component'
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component'
import { CoreModule } from '../core/core.module'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [RecipeFormComponent, RecipeListComponent, RecipeDetailComponent],
  exports: [],
  imports: [RouterModule, CommonModule, MaterialModule, ReactiveFormsModule, RecipeRoutingModule, CoreModule, TranslateModule],
})
export class RecipeModule {}
