import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare let window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  ngAfterViewInit(): void {
    this.slider();
  }
  constructor(translate: TranslateService) {
    translate.use(translate.currentLang);
  }

  slider() {
    window.sliderFull();
  }
}
