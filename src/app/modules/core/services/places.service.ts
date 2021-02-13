import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Places } from './../../../models/places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private placesCollection: AngularFirestoreCollection<Places>;
  places: Observable<Places[]>;

  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient
  ) {
    this.placesCollection = this.firestore.collection<Places>('places');
  }

  getAllPlaces(): any{
    return this.placesCollection.valueChanges();
  }

  getPlace(id: number): any{
    return this.firestore.collection<Places>('places', ref => ref.where('id', '==', id)).valueChanges();
  }

  savePlace(place: Places): void{
    this.firestore.collection('places').doc(String(place.id)).set(place);
  }

  deletePlace(place: Places): Promise<any>{
    return this.firestore.collection('places').doc(String(place.id)).delete();
  }

  getGeoData(address: string): any{
    return this.http.get(`https://maps.google.com/maps/api/geocode/json?key=AIzaSyCiGsoFevMN2J-dXWtD_31AN4UkraR4Hq0&address=${address}`);
  }
}
