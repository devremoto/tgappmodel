import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { SettingsService } from '../services/generated/SettingsService';
import { Settings } from '../models/Settings';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-combo-settings',
  template: `
    <select [ngModel]="model" (ngModelChange)="updateData($event)" name="settings" class="{{cssClass}}" autofocus >
      <option *ngFor="let settings of settingsList" [value]="settings.id">{{settings.key}}</option>
    </select>`
})
export class ComboSettingsComponent implements OnInit, OnDestroy {
    appErrorMessage: any;
    settings: Settings;
    settingsList: Settings[];

    @Input() cssClass?: string;
    @Input() model: any;
    @Output() modelChange: any = new EventEmitter();
    subscription = new Subscription();

    constructor(private _service: SettingsService) {
        this.subscription.add(this._service.on('Settings-save').subscribe((data) => {
            this.reload(data);
        }));
    }

    updateData(event) {
        this.model = event;
        this.modelChange.emit(event);
    }

    ngOnInit() {
        this.settings = new Settings();
        this.getAll();
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    public getAll(data?: Settings) {
        this.subscription.add(this._service.getAll().subscribe(
            result => {
                this.settingsList = result;
                if (data) {
                    this.updateData(data.id);
                }
            },
            error => {
                this.appErrorMessage = error;
            }
        ));
    }

    public reload(data?: Settings) {
        this.getAll(data);
    }
}
