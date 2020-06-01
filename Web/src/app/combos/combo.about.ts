import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AboutService } from '../services/generated/AboutService';
import { About } from '../models/About';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-combo-about',
  template: `
    <select [ngModel]="model" (ngModelChange)="updateData($event)" name="about" class="{{cssClass}}" autofocus >
      <option *ngFor="let about of aboutList" [value]="about.id">{{about.description}}</option>
    </select>`
})
export class ComboAboutComponent implements OnInit, OnDestroy {
    appErrorMessage: any;
    about: About;
    aboutList: About[];

    @Input() cssClass?: string;
    @Input() model: any;
    @Output() modelChange: any = new EventEmitter();
    subscription = new Subscription();

    constructor(private _service: AboutService) {
        this.subscription.add(this._service.on('About-save').subscribe((data) => {
            this.reload(data);
        }));
    }

    updateData(event) {
        this.model = event;
        this.modelChange.emit(event);
    }

    ngOnInit() {
        this.about = new About();
        this.getAll();
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    public getAll(data?: About) {
        this.subscription.add(this._service.getAll().subscribe(
            result => {
                this.aboutList = result;
                if (data) {
                    this.updateData(data.id);
                }
            },
            error => {
                this.appErrorMessage = error;
            }
        ));
    }

    public reload(data?: About) {
        this.getAll(data);
    }
}
