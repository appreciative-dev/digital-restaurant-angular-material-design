import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { map } from 'rxjs/operators'
import { Recipe } from '../../_bootstrap/models/models'

@Injectable({
  providedIn: 'root',
})
export class DaoRecipeHistoryService {
  fsCollectionName = 'RecipeHistory'
  fsCollection: AngularFirestoreCollection<Recipe>
  fsDocument: AngularFirestoreDocument<Recipe>

  constructor(private afs: AngularFirestore) {
    this.fsCollection = this.afs.collection(this.fsCollectionName, (ref) => ref.orderBy('name', 'asc'))
  }

  createDocument(data) {
    return this.fsCollection.add(data)
  }

  getAll() {
    return this.fsCollection.snapshotChanges().pipe(
      map((res: any) =>
        res.map((a) => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return { id, ...data }
        })
      )
    )
  }

  getHistoryById(id) {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.where('id', '==', id).orderBy('timestamp', 'asc'))
    return col.snapshotChanges().pipe(
      map((res) => {
        return res.map((res: any) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getDocument(id) {
    return this.afs.doc(this.fsCollectionName + '/' + id).valueChanges()
  }
}
