import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MatTableDataSource } from '@angular/material/table'
import { DaoRecipeService } from '../../services/dao-recipe.service'
import { DaoRecipeHistoryService } from 'src/app/recipe/services/dao-recipe-history.service'
import { MessageService } from 'src/app/services/dao-utils/message.service'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmationDialogComponent } from 'src/app/_bootstrap/components/confirmation-dialog/confirmation-dialog.component'
import { filter, tap } from 'rxjs'
import { PLATE_TYPE, PROTEIN_CATEGORY } from 'src/app/_bootstrap/utils/recipe-constants'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent implements OnInit {
  itemId: string
  item: any
  datasource = new MatTableDataSource()
  displayedColumns = ['timestamp']

  isLoading: boolean
  isDeleting: boolean

  PLATE_TYPE = PLATE_TYPE
  PROTEIN_CATEGORY = PROTEIN_CATEGORY

  constructor(private dao: DaoRecipeService, private daoHistory: DaoRecipeHistoryService, private router: Router, private messageService: MessageService, private dialog: MatDialog, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initServerData()
    this.initTitle()
  }

  initServerData() {
    this.isLoading = true
    this.itemId = this.route.snapshot.params['id']
    this.dao.getDocument(this.itemId).subscribe((val) => {
      this.item = val
      this.cdr.markForCheck()
    })
    this.daoHistory.getHistoryById(this.itemId).subscribe((res) => {
      this.datasource = new MatTableDataSource(res)
      this.isLoading = false
    })
  }

  delete() {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: 'auto',
        height: 'auto',
        data: {
          title: 'RECIPES.PAGE.DETAIL.DELETE_TITLE',
          autoFocus: false,
          restoreFocus: false,
        },
      })
      .afterClosed()
      .pipe(
        filter((value) => !!value),
        tap(() => (this.isDeleting = true))
      )
      .subscribe(() => this.dao.deleteDocument(this.itemId).then(() => this.router.navigate(['recipe'])))
  }

  initTitle() {
    this.messageService.setToolbarTitle(this.route.snapshot.data['title'])
  }
}
