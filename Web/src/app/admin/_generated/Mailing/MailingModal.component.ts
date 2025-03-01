import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MailingService } from '../../../services/generated/MailingService';
import { Mailing } from '../../../models/Mailing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare let $: any;

@Component({
  selector: 'app-modal-mailing',
  templateUrl: './MailingModal.component.html'
})
export class MailingModalComponent {

  @Input() edit: boolean;
  @Input() entity: Mailing;

  constructor(
    private translate: TranslateService,
    private _toasterService: ToastrService,
    private _service: MailingService,
    private _activeModal: NgbActiveModal
  ) {
    this._service.on('Mailing-save').subscribe(data => {
      this.hideModal();
    });
  }

  save(mailing: Mailing) {
    this._service.save(mailing, this.edit, $('input[type=file]')).subscribe(
      () => {
        const successMsg = this.translate.instant('MAILING.FORM.SAVE.SUCCESS');
        this._toasterService.success(successMsg, this.translate.instant('APP.TOASTER.TITLE.SUCCESS'));
      },
      () => {
        const errorMsg = this.translate.instant('MAILING.FORM.SAVE.ERROR');
        this._toasterService.error(errorMsg, this.translate.instant('APP.TOASTER.TITLE.ERROR'));
      });
  }

  hideModal() {
    this._activeModal.dismiss('Cross click');
  }
}

