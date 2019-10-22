import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageCustomService } from 'src/app/services/custom/Language';
import { Language } from 'src/app/models/Language';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.slider();
  }
  constructor(translate: LanguageCustomService, route: ActivatedRoute) {
    const lang = route.snapshot.queryParams['lang'];
    translate.setLanguage(<Language>{ code: lang });
  }

  ngOnInit() {}

  slider() {
    window.sliderFull();
  }
}
