import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { fadeInLeftOnEnterAnimation, fadeOutRightOnLeaveAnimation } from 'angular-animations'
import { DaoPriceService } from '../../services/dao-price.service'

@Component({
  selector: 'app-price-configuration',
  templateUrl: './price-configuration.component.html',
  styleUrls: ['./price-configuration.component.scss'],
  animations: [fadeInLeftOnEnterAnimation(), fadeOutRightOnLeaveAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceConfigurationComponent implements OnInit {
  hasDiscount: boolean
  discountAmount: number
  hasDelivery: boolean
  deliveryAmount: number

  isLoaded: boolean
  isUpdated: boolean

  constructor(public dialogRef: MatDialogRef<PriceConfigurationComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private dao: DaoPriceService) {}

  ngOnInit() {
    this.initServerData()
  }

  initServerData() {
    this.dao.getDiscountPrice().subscribe((res: any) => {
      this.discountAmount = res?.amount
      this.hasDiscount = res?.isActive
      this.dao.getDeliveryPrice().subscribe((res: any) => {
        this.deliveryAmount = res?.amount
        this.hasDelivery = res?.isActive
        this.isLoaded = true
      })
    })
  }

  updateDiscount(ev) {
    if (ev == true) this.hasDiscount = true
    else this.hasDiscount = false
  }

  updateDelivery(ev) {
    if (ev == true) this.hasDelivery = true
    else this.hasDelivery = false
  }

  confirm() {
    this.dao
      .createDiscountPriceDocument({
        isActive: this.hasDiscount,
        amount: this.discountAmount,
      })
      .then(() => {
        this.dao
          .createDeliveryPriceDocument({
            isActive: this.hasDelivery,
            amount: this.deliveryAmount,
          })
          .then(() => {
            this.isUpdated = true
            setTimeout(() => {
              this.isUpdated = false
            }, 2000)
          })
      })
  }

  close() {
    this.dialogRef.close(false)
  }
}
