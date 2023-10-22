import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Recipe } from '../../_bootstrap/models/models'

@Injectable({
  providedIn: 'root',
})
export class DaoRecipeService {
  fsCollectionName = 'Recipes'
  fsCollection: AngularFirestoreCollection<Recipe>
  fsDocument: AngularFirestoreDocument<Recipe>

  pageSize = 20

  constructor(private afs: AngularFirestore) {
    this.fsCollection = this.afs.collection(this.fsCollectionName, (ref) => ref.orderBy('name', 'asc'))
  }

  createDocument(data): Promise<any> {
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

  getFirstPage() {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.orderBy('name', 'asc').limit(this.pageSize))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getNextPage(last) {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.orderBy('name', 'asc').startAfter(last['name']).limit(this.pageSize))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getLastPage(last) {
    let col = this.afs.collection(this.fsCollectionName, (ref) => ref.orderBy('name', 'asc').endBefore(last['name']).limitToLast(this.pageSize))
    return col.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return { id: res.payload.doc.id, ...res.payload.doc.data() }
        })
      })
    )
  }

  getDocument(id): Observable<Recipe> {
    return this.afs.doc(this.fsCollectionName + '/' + id).valueChanges()
  }

  updateDocument(id, data) {
    return this.fsCollection.doc(id).update(data)
  }

  deleteDocument(id) {
    return this.fsCollection.doc(id).delete()
  }
}
