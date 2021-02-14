import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  subscription: Subscription;
  email: string = '';
  menuOptions: string[] = ['Comercios', 'Categorías'];

  constructor(
    private authService: AuthService
  ) {
    this.subscription = this.authService.isLogged()
      .subscribe((result) => {
        if (result && result.uid){
          this.email = result.email;
        }else{
        }
      },
      (error) => {
        this.loggendin = false;
        console.log('Error logout: ', error);
      })
   }

  ngOnInit(): void {
  }

}
