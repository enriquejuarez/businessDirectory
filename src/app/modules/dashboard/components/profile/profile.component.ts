import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../../../core/services/auth.service';
import { User } from './../../../../models/user.model';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    setTimeout(() => {
      let userData = this.authService.getUserData();
      this.profileForm.patchValue(userData);  
    }, 1000);
  }

  private buildForm(): void{
    this.profileForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      displayName: ['', []]
    });
  }

  updateProfile(event: Event): void{
    this.authService.updateProfile(this.profileForm.value);
    this.toastr.success('Operación exitosa!', 'Perfil actualizado');
    
  }

}
