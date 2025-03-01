import { Component, ElementRef, Input, OnInit } from '@angular/core';

import { BreadcrumbsService } from './breadcrumbs.service';
import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-breadcrumbs]',
  template: `
    <ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs | async" let-last="last">
      <li class="breadcrumb-item" *ngIf="breadcrumb.label.title && (breadcrumb.url.slice(-1) === '/' || last)" [ngClass]="{ active: last }">
        <a *ngIf="!last" [routerLink]="breadcrumb.url">{{ breadcrumb.label.title | translate }}</a>
        <span *ngIf="last" [routerLink]="breadcrumb.url">{{ breadcrumb.label.title | translate }}</span>
      </li>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class BreadcrumbsComponent implements OnInit {
  @Input() fixed: boolean;
  public breadcrumbs: Observable<any[]> = {} as Observable<any[]>;

  constructor(public service: BreadcrumbsService, public el: ElementRef) { }

  public ngOnInit(): void {
    this.isFixed(this.fixed);
    this.breadcrumbs = this.service.breadcrumbs;
  }

  isFixed(fixed: boolean): void {
    if (this.fixed) {
      document?.querySelector('body')?.classList.add('breadcrumb-fixed');
    }
  }
}
