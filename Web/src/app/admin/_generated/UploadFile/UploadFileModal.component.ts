import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService } from 'angular2-toaster';
import { UploadFileService } from '../../../services/generated/UploadFileService';
import { UploadFile } from '../../../models/UploadFile';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-modal-upload-file',
  templateUrl: './UploadFileModal.component.html'
})
export class UploadFileModalComponent {

  @Input() edit: boolean;
  @Input() entity: UploadFile;

  constructor(
      private _translate: TranslateService,
      private _toasterService: ToasterService,
      private _service: UploadFileService,
      private _activeModal: NgbActiveModal
    ) {
        this._service.on('UploadFile-save').subscribe(data => {
          this.hideModal();
        });
    }

  save(uploadFile: UploadFile) {
    this._service.save(uploadFile, this.edit, $('input[type=file]')).subscribe(
      () => {
        const successMsg = this._translate.instant('UPLOAD_FILE.FORM.SAVE.SUCCESS');
        this._toasterService.pop('success', this._translate.instant('APP.TOASTER.TITLE.SUCCESS'), successMsg);
      },
      () => {
        const errorMsg = this._translate.instant('UPLOAD_FILE.FORM.SAVE.ERROR');
        this._toasterService.pop('error', this._translate.instant('APP.TOASTER.TITLE.ERROR'), errorMsg);
      });
  }

  hideModal() {
    this._activeModal.dismiss('Cross click');
  }
}

