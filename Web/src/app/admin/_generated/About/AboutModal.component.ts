import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AboutService } from '../../../services/generated/AboutService';
import { About } from '../../../models/About';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare let $: any;

@Component({
  selector: 'app-modal-about',
  templateUrl: './AboutModal.component.html'
})
export class AboutModalComponent {

  @Input() edit: boolean;
  @Input() entity: About;

  constructor(
    private translate: TranslateService,
    private _toasterService: ToastrService,
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
        const successMsg = this.translate.instant('ABOUT.FORM.SAVE.SUCCESS');
        this._toasterService.success(successMsg, this.translate.instant('APP.TOASTER.TITLE.SUCCESS'));
      },
      () => {
        const errorMsg = this.translate.instant('ABOUT.FORM.SAVE.ERROR');
        this._toasterService.error(errorMsg, this.translate.instant('APP.TOASTER.TITLE.ERROR'));
      });
  }

  hideModal() {
    this._activeModal.dismiss('Cross click');
  }
}

