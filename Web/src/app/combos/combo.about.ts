import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AboutService } from '../services/generated/AboutService';
import { About } from '../models/About';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-combo-about',

    imports: [FormsModule],
    template: `
    <select [ngModel]="model" (ngModelChange)="updateData($event)" name="about" class="{{cssClass}}" autofocus >
      @for(about of aboutList; track about.id) {
        <option [value]="about.id">{{about.description}}</option>
      }
    </select>`,

})
export class ComboAboutComponent implements OnInit {
    appErrorMessage: unknown;
    about: About;
    aboutList: About[];

    @Input() cssClass?: string;
    @Input() model: unknown;
    @Output() modelChange: any = new EventEmitter();

    constructor(private _service: AboutService) {
        this._service.on('About-save').subscribe((data) => {
            this.reload(data);
        });
    }

    updateData(event: any) {
        this.model = event;
        this.modelChange.emit(event);
    }

    ngOnInit() {
        this.about = new About();
        this.getAll();
    }

    public getAll(data?: About) {
        this._service.getAll().subscribe(
            result => {
                this.aboutList = result;
                if (data) {
                    this.updateData(data.id);
                }
            },
            error => {
                this.appErrorMessage = error;
            }
        );
    }

    public reload(data?: About) {
        this.getAll(data);
    }
}
