import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

declare var $: any;
@Directive({
  selector: '[appScrollTop]'
})
export class ScrollTopDirective implements AfterViewInit {
  @Input('appScrollTop') to?: string;
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    $(this.el.nativeElement).click(function() {
      if (this.to) {
        $('#' + this.to).animate({ scrollTop: 0 }, 600);
      } else {
        $('html, body').animate({ scrollTop: 0 }, 600);
      }
      return false;
    });
  }
}
