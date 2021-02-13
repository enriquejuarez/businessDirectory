import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggendin: boolean;
  subscription: Subscription;
  email: string = '';

  constructor(
    private authService: AuthService
  ) {
    this.subscription = this.authService.isLogged()
      .subscribe((result) => {
        if (result && result.uid){
          this.email = result.email;
          this.loggendin = true;
        }else{
          this.loggendin = false;
        }
      },
      (error) => {
        this.loggendin = false;
        console.log('Error logout: ', error);
      })
   }

  ngOnInit(): void {
  }

  logout(): void{
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
