import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent implements OnInit, AfterViewInit {
  isDeleteRecipe: boolean
  isDeleteMenu: boolean
  isDeleteEmployee: boolean
  isDeleteClient: boolean
  isDeleteOrders: boolean
  isDeleteDelivery: boolean
  isDeleteDeliveryRejected: boolean
  isDeleteProduct: boolean
  isDeleteStore: boolean

  openAmount: number
  deliveryAmount: number

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges()
  }

  ngOnInit() {
    this.prepareRelatedView()
    this.checkOpenOrders()
  }

  checkOpenOrders() {
    if (this.data?.orders?.open) {
      this.openAmount = this.data.orders.open
    }
    if (this.data?.orders?.delivery) {
      this.deliveryAmount = this.data.orders.delivery
    }
  }

  prepareRelatedView() {
    switch (this.data.type) {
      case 'delete-recipe':
        this.isDeleteRecipe = true
        break
      case 'delete-menu':
        this.isDeleteMenu = true
        break
      case 'delete-employee':
        this.isDeleteEmployee = true
        break
      case 'delete-client':
        this.isDeleteClient = true
        break
      case 'delete-orders':
        this.isDeleteOrders = true
        break
      case 'delete-delivery-list':
        this.isDeleteDelivery = true
        break
      case 'delete-delivery-list-rejected':
        this.isDeleteDeliveryRejected = true
        break
      case 'delete-product':
        this.isDeleteProduct = true
        break
      case 'delete-store':
        this.isDeleteStore = true
        break
      default:
        break
    }
  }

  confirm() {
    this.dialogRef.close(true)
  }

  close() {
    this.dialogRef.close(false)
  }

  confirmMenu() {
    this.dialogRef.close(true)
  }
}
