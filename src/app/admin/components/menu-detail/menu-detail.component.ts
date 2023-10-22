import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MatTableDataSource } from '@angular/material/table'
import { MessageService } from 'src/app/services/dao-utils/message.service'
import { DaoPlateService } from '../../services/dao-plate.service'

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuDetailComponent implements OnInit {
  itemId: string
  item = {} as any
  datasource = new MatTableDataSource()
  displayedColumns = ['waiter', 'timestamp', 'price']

  isLoading: boolean
  isLoaded: boolean

  plateArray = new Array()
  entradaArray = new Array()
  toppingsList = new Array()
  bebidaArray = new Array()

  constructor(
    private navRouter: Router,
    private daoMenu: DaoPlateService,
    private messageService: MessageService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initServerData()
  }

  initServerData() {
    this.itemId = this.router.snapshot.params['id']
    this.daoMenu.getDocument(this.itemId).subscribe((res: any) => {
      this.item = res
      this.plateArray = res.plates
      this.entradaArray = res.entradas.entradaArray
      this.toppingsList = res.entradas.toppingsList
      this.bebidaArray = res.entradas.bebidaArray
      this.datasource = new MatTableDataSource(res.orders)
      this.isLoaded = true
    })

    /*
    this.isLoading = true
    this.daoHistory.getHistoryById(this.itemId).subscribe( res => {
      this.datasource = new MatTableDataSource(res)
      this.isLoading = false
    }) */
  }

  edit() {
    /*     this.navRouter.navigate(["create", this.itemId]).then( res => {
      this.messageService.setNavbarTitle("Editar receta")
    }) */
  }

  redirect(path, name) {
    // this.navRouter.navigate([path]).then((res) => {
    //   this.messageService.setNavbarTitle(name)
    // })
  }

  redirectToOrder(path, id, name) {
    // this.navRouter.navigate([path, id, "employee"]).then((res) => {
    //   this.messageService.setNavbarTitle(name)
    // })
  }
}
