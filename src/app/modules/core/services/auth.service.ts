import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/auth/angular-fire-auth';
import { AngularFireAuth } from '@angular/fire/auth';
// import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  login(email: string, password: string): void{
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      setTimeout(() => {
        console.log(result);
      }, 500);
      alert('Usuario logeado');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  register(email: string, password: string): void{
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert('Usuario registrado');
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
