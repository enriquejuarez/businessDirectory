import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2
  ) { }

  @Input('appHighlight') plan = '';

  ngOnInit(): void {
    if (this.plan === 'premium'){
      // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'gray');
      this.renderer.setStyle(this.elRef.nativeElement, 'font-weight', '800');
    }
  }

}
