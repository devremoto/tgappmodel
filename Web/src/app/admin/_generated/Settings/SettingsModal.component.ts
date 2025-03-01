import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../../../services/generated/SettingsService';
import { Settings } from '../../../models/Settings';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare let $: any;

@Component({
  selector: 'app-modal-settings',
  templateUrl: './SettingsModal.component.html'
})
export class SettingsModalComponent {

  @Input() edit: boolean;
  @Input() entity: Settings;

  constructor(
    private translate: TranslateService,
    private _toasterService: ToastrService,
    private _service: SettingsService,
    private _activeModal: NgbActiveModal
  ) {
    this._service.on('Settings-save').subscribe(data => {
      this.hideModal();
    });
  }

  save(settings: Settings) {
    this._service.save(settings, this.edit, $('input[type=file]')).subscribe(
      () => {
        const successMsg = this.translate.instant('SETTINGS.FORM.SAVE.SUCCESS');
        this._toasterService.success(successMsg, this.translate.instant('APP.TOASTER.TITLE.SUCCESS'));
      },
      () => {
        const errorMsg = this.translate.instant('SETTINGS.FORM.SAVE.ERROR');
        this._toasterService.error(errorMsg, this.translate.instant('APP.TOASTER.TITLE.ERROR'));
      });
  }

  hideModal() {
    this._activeModal.dismiss('Cross click');
  }
}

