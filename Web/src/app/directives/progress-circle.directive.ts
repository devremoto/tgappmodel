import { Directive, ElementRef, Input, OnInit, AfterViewInit } from '@angular/core';
declare let ProgressBar: any;
declare let $: any;

@Directive({
  selector: '[appProgressCircle]'
})
export class ProgressCircleDirective implements OnInit, AfterViewInit {
  @Input('appProgressCircle') options: any = {
    progressbar: 'circle',
    color: '#fff',
    trailColor: '#fff',
    to: { 'color': '#ffd200', 'width': 3 },
    from: { 'color': '#3498db', 'width': 3 },

    value: 1,
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: false
    },
    step: (state: any, circle: any) => {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      const value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('');
      } else {
        circle.setText(value + '%');
      }
    }
  };
  constructor(private el: ElementRef) {

  }
  ngOnInit() {
    // this.animate();
  }

  ngAfterViewInit() {
    this.animate();
  }


  animate() {
    const options = this.options;
    $(this.el.nativeElement).each((key: any, obj: any) => {
      const bar = new ProgressBar.Circle(obj, options);
      bar.animate(options.value);
    });
  }
}
