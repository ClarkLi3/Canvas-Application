import { Injectable } from '@angular/core';
import { 
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentSnapshot
} from '@angular/fire/firestore';
import { User } from './User';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CanvasDataService {
  users: Observable<DocumentSnapshot<User>>;
  constructor(
    private fireStore: AngularFirestore
  ) { 
    

  }
  public updateCanvasData(user, canvasData) {
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(
      `users/${user.uid}`
    );

    const data = {
      ...user,
      canvasdata: canvasData
    }
    return userRef.set(data, { merge: true });
  }
  public getCanvasState(user){
    return this.fireStore.doc<User>(`users/${user.uid}`).get();
  }
}
