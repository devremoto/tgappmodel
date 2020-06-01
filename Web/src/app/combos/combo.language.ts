import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from '../services/generated/LanguageService';
import { Language } from '../models/Language';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-combo-language',
  template: `
    <select [ngModel]="model" (ngModelChange)="updateData($event)" name="language" class="{{cssClass}}" autofocus >
      <option *ngFor="let language of languageList" [value]="language.id">{{language.name}}</option>
    </select>`
})
export class ComboLanguageComponent implements OnInit, OnDestroy {
    appErrorMessage: any;
    language: Language;
    languageList: Language[];

    @Input() cssClass?: string;
    @Input() model: any;
    @Output() modelChange: any = new EventEmitter();
    subscription = new Subscription();

    constructor(private _service: LanguageService) {
        this.subscription.add(this._service.on('Language-save').subscribe((data) => {
            this.reload(data);
        }));
    }

    updateData(event) {
        this.model = event;
        this.modelChange.emit(event);
    }

    ngOnInit() {
        this.language = new Language();
        this.getAll();
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    public getAll(data?: Language) {
        this.subscription.add(this._service.getAll().subscribe(
            result => {
                this.languageList = result;
                if (data) {
                    this.updateData(data.id);
                }
            },
            error => {
                this.appErrorMessage = error;
            }
        ));
    }

    public reload(data?: Language) {
        this.getAll(data);
    }
}
