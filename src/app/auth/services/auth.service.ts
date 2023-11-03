import { Injectable } from '@angular/core'
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AuthUser, ProviderUserCredential } from './auth.model'
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly COLLECTION_NAME = 'auth'
  angularFirestoreCollection: AngularFirestoreCollection<AuthUser>
  constructor(private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore) {
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

  getAllUsers() {}
}
