import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appClaim]'
})
export class ClaimDirective {
  @Input('appClaim') name: string;

  constructor(private el: ElementRef) {
    if (this.name === 'nao') {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
