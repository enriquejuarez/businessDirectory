import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';

import { PlacesService } from './../../../core/services/places.service';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.css']
})
export class PlaceFormComponent implements OnInit {

  form: FormGroup;
  @ViewChild('f') myNgForm;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private placesService: PlacesService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    if (this.id !== 'new') {
      this.placesService.getPlace(Number(this.id))
      .subscribe((place) => {
        this.form.patchValue(place[0]);
      });
    }
  }

  openSnackBar(message: string): void {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: message,
      duration: 2000,
    });
  }
  savePlace(event: Event): void{
    event.preventDefault();
    if (!this.form.valid) {
      return;
    }
    const place = this.form.value;
    const address = `${place.street},${place.city},${place.country}`;
    if (this.id === 'new') {
      place.id = Date.now();
    }
    this.placesService.getGeoData(address)
    .subscribe((result) => {
      console.log(result);
      place.lat = result.results[0].geometry.location.lat;
      place.lng = result.results[0].geometry.location.lng;
      this.placesService.savePlace(this.form.value);
      this.openSnackBar(this.id === 'new' ? 'Comercio Registrado!!' : 'Comercio Actualizado!!');
      this.myNgForm.resetForm();
    });
  }

  private buildForm(): void{
    this.form = this.formBuilder.group({
      id: ['', []],
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
  selector: 'app-snack-bar',
  template: `
    <span class="notification">
      {{data}}
    </span>
  `,
  styles: [`
    .notification {
      color: hotpink;
    }
  `],
})
export class NotificationComponent {
  constructor( @Inject(MAT_SNACK_BAR_DATA) public data: any){}
}
