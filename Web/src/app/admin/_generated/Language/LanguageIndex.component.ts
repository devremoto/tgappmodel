﻿import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PagingModel } from '../../../models/PagingModel';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../components/dialog/dialog.service';
import { LanguageModalComponent } from './LanguageModal.component';
import { LanguageService } from '../../../services/generated/LanguageService';
import { Language } from '../../../models/Language';

@Component({
  selector: 'app-list-language',
  templateUrl: './LanguageIndex.component.html',
})
export class LanguageIndexComponent implements OnInit, OnChanges {
  private _edit = false;
  paging: PagingModel<Language>;
  screen = 'Language';
  appErrorMessage: any;
  language: Language;
  languageList: Language[];
  @Input() autoLoad = true;
  private modalRef: NgbModalRef;

  constructor(
    private _service: LanguageService,
    public translate: TranslateService,
    private _modalService: NgbModal,
    private _toasterService: ToastrService,
    private _dialogService: DialogService) {
    this.paging = _service.page;
    this.paging.orderBy = 'Id';
    this.language = new Language();
  }

  ngOnInit() {
    this.load();
    this._service.on('Language-save').subscribe((data) => {
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
    this.modalRef = this._modalService.open(LanguageModalComponent, options);
    this.modalRef.componentInstance.name = 'languageModal';
    this.modalRef.componentInstance.edit = this._edit;
    this.modalRef.componentInstance.entity = this.language;
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

  public duplicate(entity: Language) {
    const objToDup = Object.assign({}, entity);
    delete objToDup.id;
    this.openEdit(objToDup, true);
  }

  public getAll() {
    this._service.getPage(this.paging).subscribe(
      result => {
        this.paging.totalCount = result.totalCount;
        this.languageList = result.list;
      },
      error => {
        this.appErrorMessage = error;
      });
  }


  public openEdit(entity?: Language, edit = false) {
    this._edit = edit;
    this.language = entity || new Language();
    this.openModal();
  }

  public async remove(language: Language, index: number) {
    const msg = this.translate.instant('LANGUAGE.GRID.CONFIRM_DELETE');
    this._dialogService.confirm(msg, () => {
      this._service.remove(language)
        .subscribe(
          () => {
            this.languageList.splice(index, 1);
            this.paging.totalCount--;
            if (this.paging.totalCount <= this.paging.size) {
              this.paging.number--;
            }
            this.getAll();
            const successMsg = this.translate.instant('LANGUAGE.GRID.REMOVE.SUCCESS');
            this._toasterService.success(successMsg, this.translate.instant('APP.TOASTER.TITLE.SUCCESS'));
          },
          error => {
            const errorMsg = this.translate.instant('LANGUAGE.GRID.REMOVE.ERROR');
            this._toasterService.error(errorMsg, this.translate.instant('APP.TOASTER.TITLE.ERROR'));
            this.appErrorMessage = error;
          });
    }, 'warning');
  }
}
