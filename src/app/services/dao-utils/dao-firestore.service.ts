import { Injectable } from "@angular/core"
import { AngularFirestoreCollection } from "@angular/fire/compat/firestore"
import { map } from "rxjs/operators"
import { Observable } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class DaoFirestoreService {
  constructor() {}

  getAllByQuery(collection: AngularFirestoreCollection): Observable<any> {
    return collection.snapshotChanges().pipe(
      map((value: any) =>
        value.map((value) => ({
          id: value.payload.doc.id,
          ...value.payload.doc.data(),
        }))
      )
    )
  }
}
