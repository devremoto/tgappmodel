import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../../services/generated/ContactService';
import { Contact } from '../../../models/Contact';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
declare let $: Function;

@Component({
  selector: 'app-modal-contact',
  templateUrl: './ContactModal.component.html',

  imports: [TranslateModule, CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ContactModalComponent {

  @Input() edit: boolean;
  @Input() entity: Contact;

  constructor(
    private translate: TranslateService,
    private _toasterService: ToastrService,
    private _service: ContactService,
    private _activeModal: NgbActiveModal
  ) {
    this._service.on('Contact-save').subscribe(data => {
      this.hideModal();
    });
  }

  save(contact: Contact) {
    this._service.save(contact, this.edit, $('input[type=file]')).subscribe(
      () => {
        const successMsg = this.translate.instant('CONTACT.FORM.SAVE.SUCCESS');
        this._toasterService.success(successMsg, this.translate.instant('APP.TOASTER.TITLE.SUCCESS'));
      },
      () => {
        const errorMsg = this.translate.instant('CONTACT.FORM.SAVE.ERROR');
        this._toasterService.error(errorMsg, this.translate.instant('APP.TOASTER.TITLE.ERROR'));
      });
  }

  hideModal() {
    this._activeModal.dismiss('Cross click');
  }
}

