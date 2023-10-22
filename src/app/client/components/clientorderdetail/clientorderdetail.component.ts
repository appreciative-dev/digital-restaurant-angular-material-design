import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { pulseOnEnterAnimation } from 'angular-animations'
import { DaoDeliveryService } from 'src/app/waiter/services/dao-delivery.service'

@Component({
  selector: 'app-clientorderdetail',
  templateUrl: './clientorderdetail.component.html',
  styleUrls: ['./clientorderdetail.component.scss'],
  animations: [pulseOnEnterAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientOrderDetailComponent implements OnInit {
  item
  deliveryTime = '30 minutos'
  hasOrder: boolean
  clientName: string

  constructor(
    private dao: DaoDeliveryService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    let id = this.router.snapshot.params['id']
    let time = this.router.snapshot.params['time']
    if (time !== 'Ahora') this.deliveryTime = time
    this.dao.getDocument(id).subscribe((res: any) => {
      this.item = res
      this.clientName = res.address.name
      this.hasOrder = true
    })
  }
}
