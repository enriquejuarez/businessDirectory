import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm(): void{
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      images: [''],
      features: this.formBuilder.array([])
    });
  }

}
