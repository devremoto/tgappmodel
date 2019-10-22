import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PagingModel } from '../../../models/PagingModel';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService } from 'angular2-toaster';
import { DialogService } from '../../../components/dialog/dialog.service';
import { AboutModalComponent } from './AboutModal.component';
import { AboutService } from '../../../services/generated/AboutService';
import { About } from '../../../models/About';

@Component({
  selector: 'app-list-about',
  templateUrl: './AboutIndex.component.html',
})
export class AboutIndexComponent implements OnInit, OnChanges {
    private _edit = false;
    paging: PagingModel<About>;
    screen = 'About';
    appErrorMessage: any;
    about: About;
    aboutList: About[];
    @Input() autoLoad = true;
    private modalRef: NgbModalRef;

    constructor(
      private _service: AboutService,
      public translate: TranslateService,
      private _modalService: NgbModal,
      private _toasterService: ToasterService,
      private _dialogService: DialogService) {
        this.paging = _service.page;
        this.paging.orderBy = 'Id';
        this.about = new About();
    }

    ngOnInit() {
      this.load();
      this._service.on('About-save').subscribe((data) => {
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
      this.modalRef  = this._modalService.open(AboutModalComponent, options);
      this.modalRef.componentInstance.name = 'aboutModal';
      this.modalRef.componentInstance.edit = this._edit;
      this.modalRef.componentInstance.entity = this.about;
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

    public duplicate(entity: About) {
      const objToDup = Object.assign({}, entity);
      delete objToDup.id;
      this.openEdit(objToDup, true);
    }

    public getAll() {
      this._service.getPage(this.paging).subscribe(
      result => {
        this.paging.totalCount = result.totalCount;
        this.aboutList = result.list;
      },
      error => {
        this.appErrorMessage = error;
      });
    }


  public openEdit(entity?: About, edit: boolean = false) {
    this._edit = edit;
    this.about = entity || new About();
    this.openModal();
  }

  public async remove(about: About, index: number) {
    const msg = this.translate.instant('ABOUT.GRID.CONFIRM_DELETE');
    this._dialogService.confirm(msg, () => {
        this._service.remove(about)
        .subscribe(
            () => {
              this.aboutList.splice(index, 1);
              this.paging.totalCount--;
              if (this.paging.totalCount <= this.paging.size) {
                this.paging.number--;
              }
              this.getAll();
              const successMsg = this.translate.instant('ABOUT.GRID.REMOVE.SUCCESS');
              this._toasterService.pop('success', this.translate.instant('APP.TOASTER.TITLE.SUCCESS'), successMsg);
            },
            error => {
              const errorMsg = this.translate.instant('ABOUT.GRID.REMOVE.ERROR');
              this._toasterService.pop('error', this.translate.instant('APP.TOASTER.TITLE.ERROR'), errorMsg);
              this.appErrorMessage = error;
            });
        }, 'warning');
    }
}
