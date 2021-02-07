import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('f') myNgForm;

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
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 2000,
    });
  }
  savePlace(event: Event): void{
    event.preventDefault();
    if (this.form.valid) {
      const place = this.form.value;
      const address = `${place.street},${place.city},${place.country}`;
      place.id = Date.now();
      this.placesService.getGeoData(address)
      .subscribe((result) => {
        console.log(result);
        place.lat = result.results[0].geometry.location.lat;
        place.lng = result.results[0].geometry.location.lng;
        this.placesService.savePlace(this.form.value);
        this.openSnackBar();
        // this.form.reset();
        this.myNgForm.resetForm();
      });
    }
  }

  private buildForm(): void{
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      plan: ['', [Validators.required]],
      distance: ['', [Validators.required]],
      closeness: ['', [Validators.required]],
      active: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });
  }
}

@Component({
  selector: 'app-snack-bar-component-example-snack',
  template: `
    <span class="notification">
      Comercio registrado!!!
    </span>
  `,
  styles: [`
    .notification {
      color: hotpink;
    }
  `],
})
export class NotificationComponent {}
