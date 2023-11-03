import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { map } from 'rxjs/operators'
import { Client } from 'src/app/bootstrap/models/models'

@Injectable({
  providedIn: 'root',
})
export class DaoClientService {
  fsCollectionName = 'Clients'
  fsCollection: AngularFirestoreCollection<Client>
  fsDocument: AngularFirestoreDocument<Client>
  client: Client = {} as Client

  constructor(private afs: AngularFirestore) {
    this.fsCollection = this.afs.collection(this.fsCollectionName, (ref) => ref.orderBy('name', 'asc'))
  }

  createDocument(res) {
    let user = res
    this.client.email = user.email
    this.client.uid = user.uid
    this.client.photoURL = user.photoURL
    this.client.name = user.displayName
    this.client.isApproved = false
    this.client.timestamp = new Date()
    return this.fsCollection.add(this.client)
  }

  createAdminClient(item) {
    return this.fsCollection.add(item)
  }

  getClientByUID(uid) {
    let col = this.afs.collection(this.fsCollectionName, (res) => res.where('uid', '==', uid))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getNewClients() {
    let col = this.afs.collection(this.fsCollectionName, (res) => res.where('isApproved', '==', false))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getClientByName(name) {
    return this.afs.collection(this.fsCollectionName, (res) => res.where('name', '==', name)).valueChanges()
  }

  getAll() {
    return this.fsCollection.snapshotChanges().pipe(
      map((res: any) =>
        res.map((a) => {
          const data = a.payload.doc.data() as Client
          const id = a.payload.doc.id
          return { id, ...data }
        })
      )
    )
  }

  getDocument(id) {
    return this.afs.doc(this.fsCollectionName + '/' + id).valueChanges()
  }

  updateDocument(id, data) {
    return this.fsCollection.doc(id).update(data)
  }

  updateStatus(id) {
    let obj = {
      isApproved: true,
    }
    return this.fsCollection.doc(id).update(obj)
  }

  deleteClient(id) {
    return this.fsCollection.doc(id).delete()
  }
}
