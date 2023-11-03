import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { map } from 'rxjs/operators'
import { Plate } from '../../../bootstrap/models/models'

@Injectable({
  providedIn: 'root',
})
export class DaoExpensesService {
  fsCollectionName = 'Expenses'
  fsCollection: AngularFirestoreCollection<Plate>

  constructor(private afs: AngularFirestore) {
    this.fsCollection = this.afs.collection(this.fsCollectionName, (ref) => ref)
  }

  createDocument(data) {
    return this.fsCollection.add(data)
  }

  getAll() {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.orderBy('timestamp', 'desc'))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  delete(id) {
    return this.afs.doc(this.fsCollectionName + '/' + id).delete()
  }
}
