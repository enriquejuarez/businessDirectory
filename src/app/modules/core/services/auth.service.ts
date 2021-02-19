import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

import { User } from './../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userState: any;
  private isLoggedIn = false;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private route: Router
  ) {
    this.angularFireAuth.authState
      .subscribe((user) => {
        if (user) {
          this.userState = user;
          localStorage.setItem('business', JSON.stringify(this.userState));
          JSON.parse(localStorage.getItem('business'));
          this.isLoggedIn = true;
          console.log('Entra al método de construcción');
          console.log('1', user);
        }else{
          localStorage.setItem('business', null);
          JSON.parse(localStorage.getItem('business'));
          this.isLoggedIn = false;
        }
      });
   }

  login(email: string, password: string): void{
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.setUserData(result.user);
      this.route.navigate(['/administration']);
    })
    .catch((error) => {
      console.log('Error', error);
    });
  }

  register(email: string, password: string): void{
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      this.setUserData(result.user);
      this.route.navigate(['/administration']);
    })
    .catch((error) => {
      console.log('Error', error);
    });
  }

  updateProfile(user: User): void{
    const currentUser = firebase.auth().currentUser;
    currentUser.updateProfile({
      displayName: user.displayName,
      photoURL: 'https://cdn.pixabay.com/photo/2016/08/18/11/00/man-1602633_960_720.png'
    })
    .then((user) => {
    })
    .catch(() => {
    });
  }

  getUserData(): any{
    return this.userState;
  }

  isLogged(): any{
    return this.angularFireAuth.authState;
  }

  setUserData(user): void{
    const userState: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber
    };
  }

  logout(): void{
    this.angularFireAuth.signOut().then(() => {
      this.route.navigate(['/places']);
      localStorage.removeItem('business');
    });
  }

  getIsLoggedId(): boolean{
    return this.isLoggedIn;
  }
}
