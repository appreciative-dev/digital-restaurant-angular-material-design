import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { map } from 'rxjs/operators'
import { PlateOrder } from '../../_bootstrap/models/models'

@Injectable({
  providedIn: 'root',
})
export class DaoPlateOrderService {
  fsCollectionName = 'Orders'
  fsCollection: AngularFirestoreCollection<PlateOrder>
  fsDocument: AngularFirestoreDocument<PlateOrder>

  public orderTemp: PlateOrder = {} as PlateOrder
  public barList = new Array()
  public entradasList = new Array()

  constructor(private afs: AngularFirestore) {
    this.fsCollection = this.afs.collection(this.fsCollectionName, (ref) => ref.orderBy('name', 'asc'))
  }

  createDocument(data) {
    return this.fsCollection.add(data)
  }

  getOpenOrders() {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.where('isDelivered', '==', false).where('isPaid', '==', false).orderBy('timestamp', 'desc'))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return {
            id: res.payload.doc.id,
            ...(res.payload.doc.data() as PlateOrder),
          }
        })
      })
    )
  }

  getOpenOrdersFirstPage() {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.where('isDelivered', '==', false).where('isPaid', '==', false).orderBy('timestamp', 'desc').limit(100))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getOpenOrdersNextPage(pageSize, item) {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.where('isDelivered', '==', false).where('isPaid', '==', false).orderBy('timestamp', 'desc').startAfter(item['timestamp']).limit(pageSize))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getOpenOrdersPreviousPage(pageSize, item) {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.where('isDelivered', '==', false).where('isPaid', '==', false).orderBy('timestamp', 'desc').endBefore(item['timestamp']).limitToLast(pageSize))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getPaidOrdersFirstPage(pageSize) {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.where('isDelivered', '==', true).where('isPaid', '==', true).orderBy('timestamp', 'desc').limit(pageSize))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getPaidOrdersNextPage(pageSize, item) {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.where('isDelivered', '==', true).where('isPaid', '==', true).orderBy('timestamp', 'desc').startAfter(item['timestamp']).limit(pageSize))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getPaidOrdersPreviousPage(pageSize, item) {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.where('isDelivered', '==', true).where('isPaid', '==', true).orderBy('timestamp', 'desc').endBefore(item['timestamp']).limitToLast(pageSize))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getDeliveryOrders() {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.where('isDelivered', '==', true).where('isPaid', '==', false).orderBy('timestamp', 'desc'))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return {
            id: res.payload.doc.id,
            ...(res.payload.doc.data() as PlateOrder),
          }
        })
      })
    )
  }

  getPaidOrders() {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.where('isDelivered', '==', true).where('isPaid', '==', true).orderBy('timestamp', 'desc'))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getArchivedOrders() {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.where('isDelivered', '==', true).where('isPaid', '==', true).where('isArchived', '==', false).orderBy('timestamp', 'desc'))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getRejectedOrders() {
    let query = this.afs.collection(this.fsCollectionName, (ref) => ref.where('isRejected', '==', true).orderBy('timestamp', 'desc'))
    return query.snapshotChanges().pipe(
      map((res) => {
        return res.map((res: any) => {
          return {
            id: res.payload.doc.id,
            ...res.payload.doc.data(),
          }
        })
      })
    )
  }

  getOrdersByWaiter(id) {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.where('waiter.id', '==', id).where('isPaid', '==', true).orderBy('timestamp', 'desc'))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return {
            id: res.payload.doc.id,
            ...(res.payload.doc.data() as PlateOrder),
          }
        })
      })
    )
  }

  getOrdersByClient(id) {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.where('client.id', '==', id).where('type', '==', 'DOMICILIO').orderBy('timestamp', 'desc'))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return {
            id: res.payload.doc.id,
            ...(res.payload.doc.data() as PlateOrder),
          }
        })
      })
    )
  }

  getOrderForKitchen(status) {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.where('isCooked', '==', status).orderBy('timestamp', 'desc'))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getDocument(id) {
    return this.afs.doc(this.fsCollectionName + '/' + id).valueChanges()
  }

  delete(id) {
    return this.afs.doc(this.fsCollectionName + '/' + id).delete()
  }

  updateDocument(id, data) {
    this.fsCollection.doc(id).update({ data: data })
  }

  updateCookedOrder(id, cooker, status) {
    return this.fsCollection.doc(id).update({ isCooked: status, cooker: cooker })
  }

  updateDeliveryOrder(id, waiter) {
    return this.fsCollection.doc(id).update({ isDelivered: true, waiter: waiter })
  }

  updatePaidOrder(id, waiter) {
    return this.fsCollection.doc(id).update({ isPaid: true, isDelivered: true, waiter: waiter })
  }

  updateToArchiveOrder(id) {
    return this.fsCollection.doc(id).update({ isArchived: true })
  }
}
