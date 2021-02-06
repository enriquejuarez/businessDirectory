import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Places } from './../../../models/places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private placesCollection: AngularFirestoreCollection<Places>;
  places: Observable<Places[]>;
  // places: Places[] = [
  //   {
  //     id: 1,
  //     plan: 'free',
  //     distance: 15,
  //     closeness: 5,
  //     active: 1,
  //     name: 'Tortas Forman',
  //     description: 'Fusce condimentum sapien in turpis aliquet bibendum. Fusce tempus laoreet ornare. Duis laoreet urna dui, nec elementum purus accumsan at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur finibus nulla nibh, vel vehicula quam suscipit ut. Ut sit amet tincidunt dolor. Vestibulum at sapien ut diam vehicula viverra. Nulla mauris nisl, commodo ac porttitor sed, sodales a ante. Sed a facilisis arcu. Aenean egestas gravida scelerisque. Vestibulum sodales nec dui fringilla facilisis. Duis laoreet ullamcorper odio, eget auctor sem gravida ac. Nullam tincidunt vel nunc sit amet dignissim. Phasellus tincidunt diam consequat nulla imperdiet, et tempor sem tempus. Suspendisse potenti.'
  //   },
  //   {
  //     id: 2,
  //     plan: 'premium',
  //     distance: 10,
  //     closeness: 5,
  //     active: 0,
  //     name: 'Miscelanea Char',
  //     description: 'Morbi elementum tortor quam, ultrices elementum libero finibus quis. Quisque fermentum ipsum eget mauris pretium gravida. Nulla finibus finibus sem vitae euismod. Nunc accumsan ornare est, ac aliquam justo consequat non. Nullam vehicula sem vel metus ornare, ut hendrerit risus lobortis. Nam venenatis molestie consequat. Etiam placerat, libero sed tempor fermentum, eros libero tempus purus, ac sagittis lectus odio vel nibh. Nulla facilisi. Suspendisse scelerisque dignissim nisl nec malesuada. Ut rhoncus, nisi eu mattis dictum, eros nibh tempus nulla, eget hendrerit arcu ante eget enim. Aliquam pellentesque ultricies nibh, at dapibus orci feugiat nec.'
  //   },
  //   {
  //     id: 3,
  //     plan: 'premium',
  //     distance: 25,
  //     closeness: 8,
  //     active: 1,
  //     name: 'Tacos pepe',
  //     description: 'Nam lobortis porttitor enim eu lacinia. Nunc vitae porta orci, sit amet varius nibh. Integer et elementum metus, sed eleifend quam. Proin vulputate tortor arcu, non iaculis odio suscipit nec. Donec sit amet facilisis est. Aliquam arcu eros, venenatis ac faucibus sed, pulvinar sit amet sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc non mi libero. Maecenas pharetra id sapien ac fermentum. Suspendisse ornare eros ac arcu placerat, a condimentum velit egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris maximus nibh ac malesuada tristique. Mauris semper erat eget massa auctor fermentum. Maecenas mollis fermentum ipsum, ut tempus augue porttitor vitae. Proin massa augue, efficitur id massa ut, feugiat mattis sem.'
  //   },
  //   {
  //     id: 4,
  //     plan: 'free',
  //     distance: 11,
  //     closeness: 2,
  //     active: 1,
  //     name: 'Online Support',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam elit, iaculis sit amet orci a, vulputate tincidunt augue. Vestibulum faucibus nec neque vel sagittis. Mauris eleifend felis id sapien convallis euismod. Morbi sed sollicitudin ipsum. Fusce maximus dui dui, ac interdum leo pellentesque at. Cras faucibus lectus ac accumsan malesuada. Phasellus tincidunt mauris ultricies massa sagittis sollicitudin. Mauris in pulvinar urna. Etiam maximus massa sed magna efficitur consectetur. Cras eu tincidunt velit, vel molestie sem. Sed pretium justo massa, vitae cursus justo sollicitudin eu. Sed dolor dui, elementum in massa in, pellentesque vulputate ante. Proin elit massa, sollicitudin quis nulla in, fringilla consectetur augue. Curabitur ultrices erat ex, sit amet sagittis metus consectetur et. In sed elementum sapien.'
  //   }
  // ];

  constructor(
    private firestore: AngularFirestore
  ) {
    this.placesCollection = this.firestore.collection<Places>('places');
  }

  getAllPlaces(): any{
    return this.placesCollection.valueChanges();
    // return this.places;
  }

  getPlace(id: number): any{
    console.log('id', id);
    // this.placesCollection = this.firestore.collection<Places>('places');
    return this.firestore.collection<Places>('places', ref => ref.where('id', '==', id)).valueChanges();
    // this.places = this.placesCollection.valueChanges({ idField: id});
    // return this.places;
  }

  savePlace(place: Places): void{
    this.firestore.collection('places').doc(String(place.id)).set(place);
  }
}
