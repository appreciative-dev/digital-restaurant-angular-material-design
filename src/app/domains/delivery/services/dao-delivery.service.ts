import { Injectable } from "@angular/core"
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore"
import { map } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class DaoDeliveryService {
  fsCollectionName = "Delivery"
  fsCollection: AngularFirestoreCollection<any>
  fsCollectionReject: AngularFirestoreCollection<any>

  constructor(private afs: AngularFirestore) {
    this.fsCollection = this.afs.collection(this.fsCollectionName, (ref) => ref)
    this.fsCollectionReject = this.afs.collection(
      this.fsCollectionName,
      (ref) => ref
    )
  }

  createDocument(data) {
    return this.fsCollection.add(data)
  }

  getAll() {
    return this.fsCollection.snapshotChanges().pipe(
      map((res) =>
        res.map((a) => {
          return res.map((res: any) => {
            return { id: res.payload.doc.id, ...res.payload.doc.data() }
          })
        })
      )
    )
  }

  checkDelivery() {
    return this.afs
      .collection(this.fsCollectionName, (res) =>
        res.where("hasWaiter", "==", false)
      )
      .valueChanges()
  }

  getAllOrders() {
    let col = this.afs.collection(this.fsCollectionName, (ref) =>
      ref.where("hasWaiter", "==", false).orderBy("timestamp", "desc")
    )
    return col.snapshotChanges().pipe(
      map((res) => {
        return res.map((res: any) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getAcceptedOrders() {
    let query = this.afs.collection(this.fsCollectionName, (ref) =>
      ref.where("hasWaiter", "==", true).orderBy("timestamp", "desc")
    )
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

  getAcceptedOrdersFirstPage(pageSize) {
    let col = this.afs.collection(this.fsCollectionName, (ref) =>
      ref
        .where("hasWaiter", "==", true)
        .orderBy("timestamp", "desc")
        .limit(pageSize)
    )
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getAcceptedOrdersNextPage(pageSize, item) {
    let col = this.afs.collection(this.fsCollectionName, (ref) =>
      ref
        .where("hasWaiter", "==", true)
        .orderBy("timestamp", "desc")
        .startAfter(item["timestamp"])
        .limit(pageSize)
    )
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getAcceptedOrdersPreviousPage(pageSize, item) {
    let col = this.afs.collection(this.fsCollectionName, (ref) =>
      ref
        .where("hasWaiter", "==", true)
        .orderBy("timestamp", "desc")
        .endBefore(item["timestamp"])
        .limitToLast(pageSize)
    )
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getRejectedOrders() {
    let query = this.afs.collection(this.fsCollectionName, (ref) =>
      ref.where("isRejected", "==", true).orderBy("timestamp", "desc")
    )
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

  getOrders() {
    let col = this.afs.collection(this.fsCollectionName, (ref) =>
      ref.where("isCooked", "==", false).where("comments", "==", true)
    )
    return col.snapshotChanges().pipe(
      map((res) => {
        return res.map((res: any) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getDocument(id) {
    return this.afs.doc(this.fsCollectionName + "/" + id).valueChanges()
  }

  updateDocument(id, waiter, orderId) {
    return this.fsCollection
      .doc(id)
      .update({ hasWaiter: true, waiter: waiter, orderId: orderId })
  }

  rejectDelivery(id, order) {
    return this.fsCollectionReject.doc(id).update(order)
  }

  delete(id) {
    return this.fsCollection.doc(id).delete()
  }
}
