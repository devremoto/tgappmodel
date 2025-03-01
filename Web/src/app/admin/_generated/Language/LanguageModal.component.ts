import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../../services/generated/LanguageService';
import { Language } from '../../../models/Language';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare let $: any;

@Component({
  selector: 'app-modal-language',
  templateUrl: './LanguageModal.component.html'
})
export class LanguageModalComponent {

  @Input() edit: boolean;
  @Input() entity: Language;

  constructor(
    private translate: TranslateService,
    private _toasterService: ToastrService,
    private _service: LanguageService,
    private _activeModal: NgbActiveModal
  ) {
    this._service.on('Language-save').subscribe(data => {
      this.hideModal();
    });
  }

  save(language: Language) {
    this._service.save(language, this.edit, $('input[type=file]')).subscribe(
      () => {
        const successMsg = this.translate.instant('LANGUAGE.FORM.SAVE.SUCCESS');
        this._toasterService.success(successMsg, this.translate.instant('APP.TOASTER.TITLE.SUCCESS'));
      },
      () => {
        const errorMsg = this.translate.instant('LANGUAGE.FORM.SAVE.ERROR');
        this._toasterService.error(errorMsg, this.translate.instant('APP.TOASTER.TITLE.ERROR'));
      });
  }

  hideModal() {
    this._activeModal.dismiss('Cross click');
  }
}

