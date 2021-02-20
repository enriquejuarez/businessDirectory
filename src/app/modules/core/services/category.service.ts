import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Categories } from '../../../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesCollection: AngularFirestoreCollection<Categories>;
  categories: Observable<Categories[]>;

  constructor(
    private firestore: AngularFirestore
  ) {
    this.categoriesCollection = this.firestore.collection<Categories>('categories');
   }

  getAllCategories(): any{
    return this.categoriesCollection.valueChanges();
  }

  saveCategory(category: Categories): void{
    this.firestore.collection('categories').doc(String(category.id)).set(category);
  }
}
