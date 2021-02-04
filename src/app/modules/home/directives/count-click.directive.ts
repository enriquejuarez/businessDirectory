import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'a[appCountClick]'
})
export class CountClickDirective {

  count = 1;

  constructor() { }

  @HostListener('click', ['$event.target']) onClick(btn): void{
    console.log('a', btn, 'Numero de click', this.count++);
  }

}
