import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map, debounceTime } from 'rxjs/operators';
// import 'rxjs/Rx';

import { PlacesService } from './../../../core/services/places.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.css']
})
export class PlaceFormComponent implements OnInit {

  form: FormGroup;
  @ViewChild('f') myNgForm;
  id: string;
  results$: Observable<any>;
  searchField: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private placesService: PlacesService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.buildForm();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    const URL = 'https://maps.google.com/maps/api/geocode/json?components=country:MX';
    this.searchField = new FormControl();
    this.results$ = this.searchField.valueChanges
      .pipe(
        debounceTime(1000),
        map((query) => {
          if (query) {
            return query;
          }
        }),
        switchMap(
          query =>  {
            return this.http.get(`${URL}&address=${query}&key=AIzaSyCiGsoFevMN2J-dXWtD_31AN4UkraR4Hq0`)
          }
        ),
        map((result: any) => {
          console.log(result.results);
          return result.results;
        })
      )
      
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
      category: ['', [Validators.required]],
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
      {{ data }}
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
