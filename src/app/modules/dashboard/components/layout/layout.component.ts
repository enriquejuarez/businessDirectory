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
  email = '';
  menuOptions = [
    {
      name: 'Comercios',
      link: 'places'
    },
    {
      name: 'Categorías',
      link: 'categories'
    }
  ];

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
        console.log('Error logout: ', error);
      });
   }

  ngOnInit(): void {
  }

}
