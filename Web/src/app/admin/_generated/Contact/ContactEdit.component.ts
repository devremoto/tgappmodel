import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ContactService } from '../../../services/generated/ContactService';
import { Contact } from '../../../models/Contact';
declare let $: any;

@Component({
  selector: 'app-form-contact',
  templateUrl: './ContactEdit.component.html'
})
export class ContactEditComponent implements OnInit {


  constructor(
    private _service: ContactService,
    public translate: TranslateService,
    private _modalService: NgbModal
  ) {
  }

  @Output()
  saveEvent?: EventEmitter<Contact> = new EventEmitter();

  @Input()
  contact: Contact;

  @Input()
  edit: boolean;

  ngOnInit() {
    this.contact = this.contact || new Contact();
  }

  save(contact: Contact) {
    this._service.save(contact, this.edit, $('input[type=file]'));
  }

  public closeEdit() {
    console.log('closeEdit')
  }

}
