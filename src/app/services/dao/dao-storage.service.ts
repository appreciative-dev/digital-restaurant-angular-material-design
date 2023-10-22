import { Injectable } from "@angular/core"
import { AngularFireStorage } from "@angular/fire/compat/storage"

@Injectable({
  providedIn: "root",
})
export class FirebaseStorageService {
  constructor(private storage: AngularFireStorage) {}

  public saveFile(name: string, file: any) {
    return this.storage.upload(name, file)
  }

  public getFileLink(name: string) {
    return this.storage.ref(name)
  }
}
