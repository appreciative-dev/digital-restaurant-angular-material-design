import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Cambio } from '../../_bootstrap/models/models'

@Injectable({
  providedIn: 'root',
})
export class DaoCambiosService {
  private collectionName = 'Shifts'
  private collectionObs: AngularFirestoreCollection<Cambio>

  constructor(private afs: AngularFirestore) {
    this.collectionObs = this.afs.collection(this.collectionName)
  }

  createDocument(data): Promise<any> {
    return this.collectionObs.add(data)
  }

  getAll(): Observable<any> {
    return this.collectionObs.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return {
            id: res.payload.doc.id,
            ...res.payload.doc.data(),
          }
        })
      })
    )
  }

  getFirstPage(pageSize): Observable<any> {
    const query = this.afs.collection(this.collectionName, (ref) => ref.orderBy('timestamp', 'desc').limit(pageSize))
    return query.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return {
            id: res.payload.doc.id,
            ...res.payload.doc.data(),
          }
        })
      })
    )
  }

  getNextPage(pageSize, item): Observable<any> {
    console.log(item)
    const query = this.afs.collection(this.collectionName, (ref) => ref.orderBy('timestamp', 'desc').startAfter(item['timestamp']).limit(pageSize))
    return query.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return {
            id: res.payload.doc.id,
            ...res.payload.doc.data(),
          }
        })
      })
    )
  }

  getPreviousPage(pageSize, item): Observable<any> {
    console.log(item)
    const query = this.afs.collection(this.collectionName, (ref) => ref.orderBy('timestamp', 'desc').endBefore(item['timestamp']).limitToLast(pageSize))
    return query.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return {
            id: res.payload.doc.id,
            ...res.payload.doc.data(),
          }
        })
      })
    )
  }

  getDocument(id): Observable<any> {
    return this.afs.doc(this.collectionName + '/' + id).valueChanges()
  }

  updateDocument(id, data): Promise<any> {
    return this.collectionObs.doc(id).update(data)
  }

  deleteDocument(id): Promise<any> {
    return this.collectionObs.doc(id).delete()
  }

  getLastCambio() {
    const query = this.afs.collection(this.collectionName, (res) => res.orderBy('timestamp', 'desc').limitToLast(1))
    return query.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return {
            id: res.payload.doc.id,
            ...res.payload.doc.data(),
          }
        })
      })
    )
  }

  getFilterQuery(uid) {
    const query = this.afs.collection(this.collectionName, (res) => res.where('isA', '==', true).where('uid', '==', uid).orderBy('timestamp', 'asc'))
    return query.snapshotChanges().pipe(
      map((res: any) => {
        return res.map((res) => {
          return {
            id: res.payload.doc.id,
            ...res.payload.doc.data(),
          }
        })
      })
    )
  }
}
