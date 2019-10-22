
import { Injectable } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LanguageCustomService } from '../../services/custom/Language';

@Injectable()
export class DialogService {
  callback: Function;
  modalRef: NgbModalRef;
  constructor(
    private modalService: NgbModal,
    private _languageService: LanguageCustomService
  ) {

  }
  confirm(message: string, callback?: Function, windowClass?: any) {
    this.openModal(message, callback, windowClass || 'primary');
  }

  danger(message: string, callback?: Function, windowClass?: any) {
    this.openModal(message, callback, 'danger');
  }

  warning(message: string, callback?: Function, windowClass?: any) {
    this.openModal(message, callback, 'warning');
  }

  private openModal(message: string, callback?: Function, windowClass?: any) {
    if (!windowClass) {
      windowClass = 'primary';
    }
    this.callback = callback;
    this.modalRef = this.modalService.open(DialogComponent, { backdrop: 'static', windowClass: `modal-${windowClass}` });
    this.modalRef.componentInstance.title = this._languageService.translate.instant('APP.DIALOG.CONFIRM.TITLE');
    this.modalRef.componentInstance.message = message;
    if (callback) {
      this.modalRef.componentInstance.callback = callback;
    }
      this.modalRef.componentInstance.windowClass = windowClass;
  }

}
