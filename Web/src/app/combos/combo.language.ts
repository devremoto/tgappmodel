import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from '../services/generated/LanguageService';
import { Language } from '../models/Language';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-combo-language',

    imports: [FormsModule],
    template: `
    <select [ngModel]="model" (ngModelChange)="updateData($event)" name="language" class="{{cssClass}}" autofocus >
      @for(language of languageList; track language.id) {
        <option [value]="language.id">{{language.name}}</option>
      }
    </select>`,

})
export class ComboLanguageComponent implements OnInit {
    appErrorMessage: unknown;
    language: Language;
    languageList: Language[];

    @Input() cssClass?: string;
    @Input() model: unknown;
    @Output() modelChange: any = new EventEmitter();

    constructor(private _service: LanguageService) {
        this._service.on('Language-save').subscribe((data) => {
            this.reload(data);
        });
    }

    updateData(even: any) {
        this.model = event;
        this.modelChange.emit(event);
    }

    ngOnInit() {
        this.language = new Language();
        this.getAll();
    }

    public getAll(data?: Language) {
        this._service.getAll().subscribe(
            result => {
                this.languageList = result;
                if (data) {
                    this.updateData(data.id);
                }
            },
            error => {
                this.appErrorMessage = error;
            }
        );
    }

    public reload(data?: Language) {
        this.getAll(data);
    }
}
