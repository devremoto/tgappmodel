import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

declare let window: null;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

  imports: [TranslateModule, CommonModule]
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.slider();
  }
  constructor(translate: TranslateService) {
    translate.use(translate.currentLang);
  }

  slider() {
    (<any>window).sliderFull();
  }
}
