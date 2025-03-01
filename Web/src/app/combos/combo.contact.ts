import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactService } from '../services/generated/ContactService';
import { Contact } from '../models/Contact';

@Component({
  selector: 'app-combo-contact',
  template: `
    <select [ngModel]="model" (ngModelChange)="updateData($event)" name="contact" class="{{cssClass}}" autofocus >
      <option *ngFor="let contact of contactList" [value]="contact.id">{{contact.name}}</option>
    </select>`
})
export class ComboContactComponent implements OnInit {
    appErrorMessage: any;
    contact: Contact;
    contactList: Contact[];

    @Input() cssClass?: string;
    @Input() model: any;
    @Output() modelChange: any = new EventEmitter();

    constructor(private _service: ContactService) {
        this._service.on('Contact-save').subscribe((data) => {
            this.reload(data);
        });
    }

    updateData(even:any) {
        this.model = event;
        this.modelChange.emit(event);
    }

    ngOnInit() {
        this.contact = new Contact();
        this.getAll();
    }

    public getAll(data?: Contact) {
        this._service.getAll().subscribe(
            result => {
                this.contactList = result;
                    if (data) {
                        this.updateData(data.id);
                    }
            },
            error => {
                this.appErrorMessage = error;
            }
        );
    }

    public reload(data?: Contact) {
        this.getAll(data);
    }
}
