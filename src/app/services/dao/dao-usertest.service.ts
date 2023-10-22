import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DaoUserTestService {

  fsCollectionName = "Usuarios"
  fsCollection: AngularFirestoreCollection<any>
  fsDocument: AngularFirestoreDocument<any>

  private userTestSub

  constructor(private afs: AngularFirestore) {
    this.fsCollection = this.afs.collection(this.fsCollectionName, ref => ref)
  }

  createDocument(data) {
    return this.fsCollection.add(data)
  }

  getAll() {
    return this.fsCollection.snapshotChanges().pipe(
      map( (res:any) => res.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  getDocument(id) {
    return this.afs.doc(this.fsCollectionName+'/'+id).valueChanges()
  }

  updateDocument(id, data) {
    this.fsCollection.doc(id).update({ data: data })
  }

  delete(id) {
    return this.afs.doc(this.fsCollectionName+'/'+id).delete()
  }

}