import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MessageService } from 'src/app/services/dao-utils/message.service'

@Component({
  selector: 'app-plate-detail',
  templateUrl: './plate-detail.component.html',
  styleUrls: ['./plate-detail.component.scss'],
})
export class PlateDetailComponent implements OnInit {
  dialogId: string
  plate
  order

  isDeliverDetails: boolean
  hasActionButtons: boolean
  hasRedirectButton: boolean
  isDeleteOrder: boolean
  isRejectedOrder: boolean

  plateDetail = 'Incluye: Entrada del día. Acompañamientos del día. Bebida y postre del día.'

  hasDeleteAuth: boolean

  isEntradaGrid: boolean
  entradaName: string

  constructor(public dialogRef: MatDialogRef<PlateDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private messageService: MessageService) {}

  ngOnInit() {
    if (this.data.deliveryInfo) {
      this.isDeliverDetails = true
      this.order = this.data.deliveryInfo
      if (this.data.isRejected) this.isRejectedOrder = true
      else this.hasActionButtons = true
      if (this.data.showRedirect == true) {
        this.hasRedirectButton = true
        this.hasActionButtons = false
      }
    } else if (this.data.plateDetail) {
      this.plate = this.data.plate
    } else if (this.data.entradaDetail) {
      this.isEntradaGrid = true
      this.entradaName = this.data.plate.name
    }
    this.getWaiterInfo()
  }

  getWaiterInfo() {
    // this.messageService.userDataObs.subscribe((res) => {
    //   if (res) {
    //     if (res.role == BUSINESS_ROLE.ADMIN) this.hasDeleteAuth = true
    //   }
    // })
  }

  confirm() {
    this.dialogRef.close(true)
  }

  close() {
    this.dialogRef.close(false)
  }

  showConfirmaion() {
    this.isDeleteOrder = true
  }

  hideConfirmaion() {
    this.isDeleteOrder = false
  }

  cancelOrder() {
    this.dialogRef.close('delete')
  }

  addPlate() {
    this.dialogRef.close('add')
  }

  removeFromMenu() {
    this.dialogRef.close('remove')
  }

  redirectToDeliveryDetail() {
    this.dialogRef.close('redirect')
  }
}
