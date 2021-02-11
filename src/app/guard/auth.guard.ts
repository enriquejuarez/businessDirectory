import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from './../modules/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loggedIn: boolean = false;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ){
    this.subscription = this.authService.isLogged()
      .subscribe((result) => {
        if (result && result.uid){
          this.loggedIn = true;
        }else{
          this.loggedIn = false;
          this.router.navigate(['/auth/login']);
        }
      },
      (error) => {
        this.loggedIn = false;
        this.router.navigate(['/auth/login']);
        console.log('Error logout: ', error);
      })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('Esta activado: ', this.loggedIn);
    return this.loggedIn;
  }
  
}
