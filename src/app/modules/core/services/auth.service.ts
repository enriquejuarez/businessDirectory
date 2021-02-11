import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { User } from './../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userState: any;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private route: Router
  ) {
    this.angularFireAuth.authState
      .subscribe((user) => {
        if (user) {
          this.userState = user;
          localStorage.setItem('business', JSON.stringify(this.userState));
          JSON.parse(localStorage.getItem('business'))
        }else{
          localStorage.setItem('business', null);
          JSON.parse(localStorage.getItem('business'))
        }
      })
   }

  login(email: string, password: string): void{
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.setUserData(result.user);
      this.route.navigate(['/places']);
    })
    .catch((error) => {
      console.log('Error', error);
    });
  }

  register(email: string, password: string): void{
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      this.setUserData(result.user);
      this.route.navigate(['/places']);
    })
    .catch((error) => {
      console.log('Error', error);
    });
  }

  isLogged(){
    return this.angularFireAuth.authState;
  }

  setUserData(user){
    const userState: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
  }

  logout(): void{
    this.angularFireAuth.signOut().then(() => {
      this.route.navigate(['/places']);
      localStorage.removeItem('business');
    })
  }
}
