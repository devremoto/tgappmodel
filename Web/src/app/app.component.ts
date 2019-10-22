import { Component } from '@angular/core';

import { LanguageCustomService } from './services/custom/Language';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'body';
  constructor(public language: LanguageCustomService) {
    // , private _reducerService: ReducerService<Contact>) {
    language.init('/assets/i18n/pages/');
  }
}
