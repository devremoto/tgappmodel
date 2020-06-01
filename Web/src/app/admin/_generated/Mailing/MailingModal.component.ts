import { Component, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService } from 'angular2-toaster';
import { MailingService } from '../../../services/generated/MailingService';
import { Mailing } from '../../../models/Mailing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-modal-mailing',
  templateUrl: './MailingModal.component.html'
})
export class MailingModalComponent implements OnDestroy {

  @Input() edit: boolean;
  @Input() entity: Mailing;
  subscription = new Subscription();

  constructor(
      private _translate: TranslateService,
      private _toasterService: ToasterService,
      private _service: MailingService,
      private _activeModal: NgbActiveModal
    ) {
        this.subscription.add(this._service.on('Mailing-save').subscribe(data => {
          this.hideModal();
        }));
    }

  save(mailing: Mailing) {
    this.subscription.add(this._service.save(mailing, this.edit, $('input[type=file]')).subscribe(
      () => {
        const successMsg = this._translate.instant('MAILING.FORM.SAVE.SUCCESS');
        this._toasterService.pop('success', this._translate.instant('APP.TOASTER.TITLE.SUCCESS'), successMsg);
      },
      () => {
        const errorMsg = this._translate.instant('MAILING.FORM.SAVE.ERROR');
        this._toasterService.pop('error', this._translate.instant('APP.TOASTER.TITLE.ERROR'), errorMsg);
      }));
  }

  hideModal() {
    this._activeModal.dismiss('Cross click');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

