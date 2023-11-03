import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { RecipeRoutingModule } from './recipe-routing.module'
import { RecipeListComponent } from './components/recipe-list/recipe-list.component'
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component'
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component'
import { TranslateModule } from '@ngx-translate/core'
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [RecipeFormComponent, RecipeListComponent, RecipeDetailComponent],
  imports: [RouterModule, CommonModule, SharedModule, ReactiveFormsModule, RecipeRoutingModule, TranslateModule],
})
export class RecipeModule {}
