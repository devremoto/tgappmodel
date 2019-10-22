import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MailingService } from '../services/generated/MailingService';
import { Mailing } from '../models/Mailing';

@Component({
  selector: 'app-combo-mailing',
  template: `
    <select [ngModel]="model" (ngModelChange)="updateData($event)" name="mailing" class="{{cssClass}}" autofocus >
      <option *ngFor="let mailing of mailingList" [value]="mailing.id">{{mailing.id}}</option>
    </select>`
})
export class ComboMailingComponent implements OnInit {
    appErrorMessage: any;
    mailing: Mailing;
    mailingList: Mailing[];

    @Input() cssClass?: string;
    @Input() model: any;
    @Output() modelChange: any = new EventEmitter();

    constructor(private _service: MailingService) {
        this._service.on('Mailing-save').subscribe((data) => {
            this.reload(data);
        });
    }

    updateData(event) {
        this.model = event;
        this.modelChange.emit(event);
    }

    ngOnInit() {
        this.mailing = new Mailing();
        this.getAll();
    }

    public getAll(data?: Mailing) {
        this._service.getAll().subscribe(
            result => {
                this.mailingList = result;
                    if (data) {
                        this.updateData(data.id);
                    }
            },
            error => {
                this.appErrorMessage = error;
            }
        );
    }

    public reload(data?: Mailing) {
        this.getAll(data);
    }
}
