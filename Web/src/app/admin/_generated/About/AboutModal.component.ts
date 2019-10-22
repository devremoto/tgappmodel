import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService } from 'angular2-toaster';
import { AboutService } from '../../../services/generated/AboutService';
import { About } from '../../../models/About';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-modal-about',
  templateUrl: './AboutModal.component.html'
})
export class AboutModalComponent {

  @Input() edit: boolean;
  @Input() entity: About;

  constructor(
      private _translate: TranslateService,
      private _toasterService: ToasterService,
      private _service: AboutService,
      private _activeModal: NgbActiveModal
    ) {
        this._service.on('About-save').subscribe(data => {
          this.hideModal();
        });
    }

  save(about: About) {
    this._service.save(about, this.edit, $('input[type=file]')).subscribe(
      () => {
        const successMsg = this._translate.instant('ABOUT.FORM.SAVE.SUCCESS');
        this._toasterService.pop('success', this._translate.instant('APP.TOASTER.TITLE.SUCCESS'), successMsg);
      },
      () => {
        const errorMsg = this._translate.instant('ABOUT.FORM.SAVE.ERROR');
        this._toasterService.pop('error', this._translate.instant('APP.TOASTER.TITLE.ERROR'), errorMsg);
      });
  }

  hideModal() {
    this._activeModal.dismiss('Cross click');
  }
}

