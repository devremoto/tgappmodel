// import { Component } from '@angular/core';

// import { LanguageCustomService } from './services/custom/Language';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   // tslint:disable-next-line: component-selector
//   selector: 'body',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   imports: [RouterOutlet],
// })
// export class AppComponent {
//   title = 'body';
//   constructor(public language: LanguageCustomService) {
//     // , private _reducerService: ReducerService<Contact>) {
//     language.init('/assets/i18n/pages/');
//   }
// }

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageCustomService } from './services/custom/Language';

@Component({
  selector: 'body',
  imports: [RouterOutlet],//, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'body';
  constructor(public language: LanguageCustomService) {
    // , private _reducerService: ReducerService<Contact>) {
    language.init('/assets/i18n/pages/');
  }
}
