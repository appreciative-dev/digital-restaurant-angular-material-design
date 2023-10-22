import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { Plate } from '../../_bootstrap/models/models'

@Injectable({
  providedIn: 'root',
})
export class DaoPriceService {
  fsCollectionName = 'Prices'
  fsCollection: AngularFirestoreCollection<Plate>
  fsCollectionBarName: AngularFirestoreCollection<Plate>

  constructor(private afs: AngularFirestore) {
    this.fsCollection = this.afs.collection(this.fsCollectionName, (ref) => ref)
  }

  createDiscountPriceDocument(price) {
    return this.fsCollection.doc('discount-price').set(price)
  }

  getDiscountPrice() {
    return this.afs.doc(this.fsCollectionName + '/discount-price').valueChanges()
  }

  createDeliveryPriceDocument(price) {
    return this.fsCollection.doc('delivery-price').set(price)
  }

  getDeliveryPrice() {
    return this.afs.doc(this.fsCollectionName + '/delivery-price').valueChanges()
  }
}
