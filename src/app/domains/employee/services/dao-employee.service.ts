import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { Observable, of } from 'rxjs'
import { Employee } from './employee.model'
import { AUTH_ROLE } from 'src/app/auth/utils/auth.role'

@Injectable({
  providedIn: 'root',
})
export class DaoEmployeeService {
  readonly COLLECTION_NAME = 'Employees'

  angularFirestoreCollection: AngularFirestoreCollection<Employee>
  employee: Employee = {} as Employee
  employeeOnShift: Employee

  constructor(private angularFirestore: AngularFirestore) {
    this.angularFirestoreCollection = this.angularFirestore.collection(this.COLLECTION_NAME)
  }

  createUserAfterGoogleAuth(user: Employee): Promise<void> {
    this.employee.email = user.email
    this.employee.uid = user.uid
    this.employee.isApproved = false
    this.employee.photoURL = user.photoURL
    this.employee.name = user.displayName
    return this.angularFirestoreCollection.doc(user.uid).set(this.employee)
  }

  updateEmployee(id: string, name: string, role: AUTH_ROLE, phone: string): Promise<void> {
    const data = {
      timestamp: new Date(),
      isApproved: true,
      name: name,
      phone: phone,
      role: role,
    }
    return this.angularFirestoreCollection.doc(id).update(data)
  }

  getEmployees(): Observable<Employee[]> {
    const query = this.angularFirestore.collection(this.COLLECTION_NAME, (val) => val.where('isApproved', '==', true).orderBy('name', 'desc'))
    // return this.daoFirestoreService.getAllByQuery(query)
    return of()
  }

  getEmployeeByUid(uid: string): Observable<Employee[]> {
    const query = this.angularFirestore.collection(this.COLLECTION_NAME, (val) => val.where('isApproved', '==', true).where('uid', '==', uid))
    // return this.daoFirestoreService.getAllByQuery(query)
    return of()
  }

  getEmployeeByEmail(email: string): Observable<Employee> {
    const query = this.angularFirestore.collection(this.COLLECTION_NAME, (val) => val.where('isApproved', '==', true).where('email', '==', email))
    // return this.daoFirestoreService.getAllByQuery(query)
    return of()
  }

  getCandidates(): Observable<Employee[]> {
    const query = this.angularFirestore.collection(this.COLLECTION_NAME, (val) => val.where('isApproved', '==', false))
    // return this.daoFirestoreService.getAllByQuery(query)
    return of()
  }

  getDocument(id: string): Observable<Employee> {
    return this.angularFirestoreCollection.doc(id).valueChanges()
  }

  updateDocument(id: string, data: Employee): Promise<void> {
    return this.angularFirestoreCollection.doc(id).update(data)
  }

  deleteDocument(id): Promise<void> {
    return this.angularFirestore.doc(id).delete()
  }
}
