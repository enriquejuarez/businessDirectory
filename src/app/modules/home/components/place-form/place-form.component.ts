import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PlacesService } from './../../../core/services/places.service';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.css']
})
export class PlaceFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private placesService: PlacesService,
    private snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  openSnackBar(): void {
    this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 2000,
    });
  }
  savePlace(event: Event): void{
    const place = this.form.value;
    place.id = Date.now();
    event.preventDefault();
    if (this.form.valid) {
      this.placesService.savePlace(this.form.value);
      this.openSnackBar();
      this.form.reset();
      // this.router.navigate(['./places']);
    }
  }

  private buildForm(): void{
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      plan: ['', [Validators.required]],
      distance: ['', [Validators.required]],
      closeness: ['', [Validators.required]],
      active: ['', [Validators.required]]
    });
  }
}

@Component({
  selector: 'app-snack-bar-component-example-snack',
  template: `
    <span class="example-pizza-party">
      Pizza party!!! 🍕
    </span>
  `,
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent {}
