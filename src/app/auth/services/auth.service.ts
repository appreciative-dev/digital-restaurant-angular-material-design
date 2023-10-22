import { Injectable } from '@angular/core'
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AuthUser, ProviderUserCredential } from './auth.model'
import { AUTH_USERS_COLLECTION } from 'src/app/_bootstrap/utils/persistence.config'
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs'
import { DaoFirestoreService } from 'src/app/services/dao-utils/dao-firestore.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly COLLECTION_NAME = AUTH_USERS_COLLECTION
  angularFirestoreCollection: AngularFirestoreCollection<AuthUser>
  constructor(private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore, private daoFirestoreService: DaoFirestoreService) {
    this.angularFirestoreCollection = this.angularFirestore.collection(this.COLLECTION_NAME)
  }

  loginWithGoogle(): Promise<ProviderUserCredential> {
    return this.angularFireAuth.signInWithPopup(new GoogleAuthProvider())
  }

  loginWithFacebook(): Promise<ProviderUserCredential> {
    return this.angularFireAuth.signInWithPopup(new FacebookAuthProvider())
  }

  logout(): Promise<void> {
    return this.angularFireAuth.signOut().catch((error) => console.error(error))
  }

  createUser(user: AuthUser): Promise<DocumentReference> {
    return this.angularFirestoreCollection.add(user)
  }

  getUser(id: string): Observable<AuthUser> {
    return this.angularFirestoreCollection.doc(id).valueChanges()
  }

  getAllUsers() {
    const query = this.angularFirestore.collection(this.COLLECTION_NAME)
    return this.daoFirestoreService.getAllByQuery(this.angularFirestoreCollection)
  }
}
