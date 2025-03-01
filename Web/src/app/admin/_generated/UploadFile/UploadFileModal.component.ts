import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UploadFileService } from '../../../services/generated/UploadFileService';
import { UploadFile } from '../../../models/UploadFile';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare let $: any;

@Component({
  selector: 'app-modal-upload-file',
  templateUrl: './UploadFileModal.component.html'
})
export class UploadFileModalComponent {

  @Input() edit: boolean;
  @Input() entity: UploadFile;

  constructor(
    private translate: TranslateService,
    private _toasterService: ToastrService,
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
        const successMsg = this.translate.instant('UPLOAD_FILE.FORM.SAVE.SUCCESS');
        this._toasterService.success(successMsg, this.translate.instant('APP.TOASTER.TITLE.SUCCESS'));
      },
      () => {
        const errorMsg = this.translate.instant('UPLOAD_FILE.FORM.SAVE.ERROR');
        this._toasterService.error(errorMsg, this.translate.instant('APP.TOASTER.TITLE.ERROR'));
      });
  }

  hideModal() {
    this._activeModal.dismiss('Cross click');
  }
}

