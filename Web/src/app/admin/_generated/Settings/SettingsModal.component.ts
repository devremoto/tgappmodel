import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService } from 'angular2-toaster';
import { SettingsService } from '../../../services/generated/SettingsService';
import { Settings } from '../../../models/Settings';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-modal-settings',
  templateUrl: './SettingsModal.component.html'
})
export class SettingsModalComponent {

  @Input() edit: boolean;
  @Input() entity: Settings;

  constructor(
      private _translate: TranslateService,
      private _toasterService: ToasterService,
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
        const successMsg = this._translate.instant('SETTINGS.FORM.SAVE.SUCCESS');
        this._toasterService.pop('success', this._translate.instant('APP.TOASTER.TITLE.SUCCESS'), successMsg);
      },
      () => {
        const errorMsg = this._translate.instant('SETTINGS.FORM.SAVE.ERROR');
        this._toasterService.pop('error', this._translate.instant('APP.TOASTER.TITLE.ERROR'), errorMsg);
      });
  }

  hideModal() {
    this._activeModal.dismiss('Cross click');
  }
}

