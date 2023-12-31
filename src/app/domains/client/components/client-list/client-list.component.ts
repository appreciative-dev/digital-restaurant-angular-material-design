import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormControl } from '@angular/forms'
import { CdkTableDataSourceInput } from '@angular/cdk/table'
import { Observable } from 'rxjs'
import { MessageService } from 'src/app/shared/services/message.service'
import { DaoClientService } from '../../services/dao-client.service'

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent implements OnInit {
  dataSourceObs: Observable<CdkTableDataSourceInput<any>>
  displayedColumns = ['name', 'address']
  searchControl = new FormControl()

  constructor(private dao: DaoClientService, private route: ActivatedRoute, private messageService: MessageService) {}

  ngOnInit() {
    this.initServerData()
    this.initTitle()
  }

  initServerData() {
    this.dataSourceObs = this.dao.getAll()
  }

  initTitle() {
    this.messageService.setToolbarTitle(this.route.snapshot.data['title'])
  }
}
