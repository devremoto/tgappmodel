﻿import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PagingModel } from '../../../models/PagingModel';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../components/dialog/dialog.service';
import { UploadFileModalComponent } from './UploadFileModal.component';
import { UploadFileService } from '../../../services/generated/UploadFileService';
import { UploadFile } from '../../../models/UploadFile';

@Component({
  selector: 'app-list-upload-file',
  templateUrl: './UploadFileIndex.component.html',
})
export class UploadFileIndexComponent implements OnInit, OnChanges {
  private _edit = false;
  paging: PagingModel<UploadFile>;
  screen = 'UploadFile';
  appErrorMessage: any;
  uploadFile: UploadFile;
  uploadFileList: UploadFile[];
  @Input() autoLoad = true;
  private modalRef: NgbModalRef;

  constructor(
    private _service: UploadFileService,
    public translate: TranslateService,
    private _modalService: NgbModal,
    private _toasterService: ToastrService,
    private _dialogService: DialogService) {
    this.paging = _service.page;
    this.paging.orderBy = 'Id';
    this.uploadFile = new UploadFile();
  }

  ngOnInit() {
    this.load();
    this._service.on('UploadFile-save').subscribe((data) => {
      this.pageChanged();
      this.hideModal();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  hideModal() {
    this.modalRef.close();
  }

  private openModal() {
    const options = <NgbModalOptions>{ size: 'lg', backdrop: 'static', windowClass: 'modal-primary' };
    this.modalRef = this._modalService.open(UploadFileModalComponent, options);
    this.modalRef.componentInstance.name = 'uploadFileModal';
    this.modalRef.componentInstance.edit = this._edit;
    this.modalRef.componentInstance.entity = this.uploadFile;
  }

  pageChanged() {
    this.autoLoad = true;
    this.load();
  }

  load() {
    if (!this.autoLoad) {
      return;
    }

    this.getAll();
  }

  public duplicate(entity: UploadFile) {
    const objToDup = Object.assign({}, entity);
    delete objToDup.id;
    this.openEdit(objToDup, true);
  }

  public getAll() {
    this._service.getPage(this.paging).subscribe(
      result => {
        this.paging.totalCount = result.totalCount;
        this.uploadFileList = result.list;
      },
      error => {
        this.appErrorMessage = error;
      });
  }


  public openEdit(entity?: UploadFile, edit = false) {
    this._edit = edit;
    this.uploadFile = entity || new UploadFile();
    this.openModal();
  }

  public async remove(uploadFile: UploadFile, index: number) {
    const msg = this.translate.instant('UPLOAD_FILE.GRID.CONFIRM_DELETE');
    this._dialogService.confirm(msg, () => {
      this._service.remove(uploadFile)
        .subscribe(
          () => {
            this.uploadFileList.splice(index, 1);
            this.paging.totalCount--;
            if (this.paging.totalCount <= this.paging.size) {
              this.paging.number--;
            }
            this.getAll();
            const successMsg = this.translate.instant('UPLOAD_FILE.GRID.REMOVE.SUCCESS');
            this._toasterService.success(successMsg, this.translate.instant('APP.TOASTER.TITLE.SUCCESS'));
          },
          error => {
            const errorMsg = this.translate.instant('UPLOAD_FILE.GRID.REMOVE.ERROR');
            this._toasterService.error(errorMsg, this.translate.instant('APP.TOASTER.TITLE.ERROR'));
            this.appErrorMessage = error;
          });
    }, 'warning');
  }
}
