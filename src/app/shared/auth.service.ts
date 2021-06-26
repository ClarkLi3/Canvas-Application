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
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  user$: Observable<any>;

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.fireStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

  }

  async loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.fireAuth.signInWithPopup(provider);
    localStorage.setItem('user', JSON.stringify(credential.user));
    console.log(credential.user.displayName);
    this.isLoggedIn=true;
    this.updateUserData(credential.user);
  }
  async logOut() {
    await this.fireAuth.signOut();
    this.isLoggedIn = false;
    localStorage.removeItem('user');
  }
  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return userRef.set(data, { merge: true });
  }
}
