import { Component, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService } from 'angular2-toaster';
import { ContactService } from '../../../services/generated/ContactService';
import { Contact } from '../../../models/Contact';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-modal-contact',
  templateUrl: './ContactModal.component.html'
})
export class ContactModalComponent implements OnDestroy{

  @Input() edit: boolean;
  @Input() entity: Contact;
  subscription = new Subscription();

  constructor(
      private _translate: TranslateService,
      private _toasterService: ToasterService,
      private _service: ContactService,
      private _activeModal: NgbActiveModal
    ) {
        this.subscription.add(this._service.on('Contact-save').subscribe(data => {
          this.hideModal();
        }));
    }

  save(contact: Contact) {
    this.subscription.add(this._service.save(contact, this.edit, $('input[type=file]')).subscribe(
      () => {
        const successMsg = this._translate.instant('CONTACT.FORM.SAVE.SUCCESS');
        this._toasterService.pop('success', this._translate.instant('APP.TOASTER.TITLE.SUCCESS'), successMsg);
      },
      () => {
        const errorMsg = this._translate.instant('CONTACT.FORM.SAVE.ERROR');
        this._toasterService.pop('error', this._translate.instant('APP.TOASTER.TITLE.ERROR'), errorMsg);
      }));
  }

  hideModal() {
    this._activeModal.dismiss('Cross click');
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

