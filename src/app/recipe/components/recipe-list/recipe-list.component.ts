import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatSort } from '@angular/material/sort'
import { CdkTableDataSourceInput } from '@angular/cdk/table'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { MessageService } from 'src/app/services/dao-utils/message.service'
import { DaoRecipeService } from '../../services/dao-recipe.service'
import { PLATE_TYPE } from 'src/app/_bootstrap/utils/recipe-constants'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent implements OnInit {
  dataSourceObs: Observable<CdkTableDataSourceInput<any>>
  displayedColumns = ['name', 'type', 'price']
  searchControl = new FormControl()
  PLATE_TYPE = PLATE_TYPE

  @ViewChild(MatSort, { static: true }) sort: MatSort

  constructor(private dao: DaoRecipeService, private route: ActivatedRoute, private messageService: MessageService) {}

  ngOnInit() {
    this.initTitle()
    this.initServerData()
    this.applyFilter()
  }

  initServerData() {
    this.dataSourceObs = this.dao.getAll()
  }

  applyFilter() {
    this.searchControl.valueChanges.subscribe((v) => console.log(v))
  }

  initTitle() {
    this.messageService.setToolbarTitle(this.route.snapshot.data['title'])
  }
}
