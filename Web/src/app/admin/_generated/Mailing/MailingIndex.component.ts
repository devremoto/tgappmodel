import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PagingModel } from '../../../models/PagingModel';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService } from 'angular2-toaster';
import { DialogService } from '../../../components/dialog/dialog.service';
import { MailingModalComponent } from './MailingModal.component';
import { MailingService } from '../../../services/generated/MailingService';
import { Mailing } from '../../../models/Mailing';

@Component({
  selector: 'app-list-mailing',
  templateUrl: './MailingIndex.component.html'
})
export class MailingIndexComponent implements OnInit, OnChanges {
    private _edit = false;
    paging: PagingModel<Mailing>;
    screen = 'Mailing';
    appErrorMessage: any;
    mailing: Mailing;
    mailingList: Mailing[];
    @Input() autoLoad = true;
    private modalRef: NgbModalRef;

    constructor(
      private _service: MailingService,
      public translate: TranslateService,
      private _modalService: NgbModal,
      private _toasterService: ToasterService,
      private _dialogService: DialogService) {
        this.paging = _service.page;
        this.paging.orderBy = 'Id';
        this.mailing = new Mailing();
    }

    ngOnInit() {
      this.load();
      this._service.on('Mailing-save').subscribe((data) => {
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
      const options = <NgbModalOptions>{ size: 'lg', backdrop: 'static', windowClass: 'modal-primary'};
      this.modalRef  = this._modalService.open(MailingModalComponent, options);
      this.modalRef.componentInstance.name = 'mailingModal';
      this.modalRef.componentInstance.edit = this._edit;
      this.modalRef.componentInstance.entity = this.mailing;
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

    public duplicate(entity: Mailing) {
      const objToDup = Object.assign({}, entity);
      delete objToDup.id;
      this.openEdit(objToDup, true);
    }

    public getAll() {
      this._service.getPage(this.paging).subscribe(
      result => {
        this.paging.totalCount = result.totalCount;
        this.mailingList = result.list;
      },
      error => {
        this.appErrorMessage = error;
      });
    }


  public openEdit(entity?: Mailing, edit: boolean = false) {
    this._edit = edit;
    this.mailing = entity || new Mailing();
    this.openModal();
  }

  public async remove(mailing: Mailing, index: number) {
    const msg = this.translate.instant('MAILING.GRID.CONFIRM_DELETE');
    this._dialogService.confirm(msg, () => {
        this._service.remove(mailing)
        .subscribe(
            () => {
              this.mailingList.splice(index, 1);
              this.paging.totalCount--;
              if (this.paging.totalCount <= this.paging.size) {
                this.paging.number--;
              }
              this.getAll();
              const successMsg = this.translate.instant('MAILING.GRID.REMOVE.SUCCESS');
              this._toasterService.pop('success', this.translate.instant('APP.TOASTER.TITLE.SUCCESS'), successMsg);
            },
            error => {
              const errorMsg = this.translate.instant('MAILING.GRID.REMOVE.ERROR');
              this._toasterService.pop('error', this.translate.instant('APP.TOASTER.TITLE.ERROR'), errorMsg);
              this.appErrorMessage = error;
            });
        }, 'warning');
    }
}
