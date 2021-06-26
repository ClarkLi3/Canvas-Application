import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { User } from './User';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CanvasDataService {

  constructor(
    private fireStore: AngularFirestore
  ) { }
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
}
