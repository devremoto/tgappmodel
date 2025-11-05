import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SettingsService } from '../services/generated/SettingsService';
import { Settings } from '../models/Settings';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-combo-settings',

    imports: [FormsModule],
    template: `
    <select [ngModel]="model" (ngModelChange)="updateData($event)" name="settings" class="{{cssClass}}" autofocus >
      @for(settings of settingsList; track settings.id) {
        <option [value]="settings.id">{{settings.id}}</option>
      }
    </select>`,

})
export class ComboSettingsComponent implements OnInit {
    appErrorMessage: unknown;
    settings: Settings;
    settingsList: Settings[];

    @Input() cssClass?: string;
    @Input() model: unknown;
    @Output() modelChange: any = new EventEmitter();

    constructor(private _service: SettingsService) {
        this._service.on('Settings-save').subscribe((data) => {
            this.reload(data);
        });
    }

    updateData(even: any) {
        this.model = event;
        this.modelChange.emit(event);
    }

    ngOnInit() {
        this.settings = new Settings();
        this.getAll();
    }

    public getAll(data?: Settings) {
        this._service.getAll().subscribe(
            result => {
                this.settingsList = result;
                if (data) {
                    this.updateData(data.id);
                }
            },
            error => {
                this.appErrorMessage = error;
            }
        );
    }

    public reload(data?: Settings) {
        this.getAll(data);
    }
}
