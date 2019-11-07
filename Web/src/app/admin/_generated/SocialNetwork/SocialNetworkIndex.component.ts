import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PagingModel } from '../../../models/PagingModel';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService } from 'angular2-toaster';
import { DialogService } from '../../../components/dialog/dialog.service';
import { SocialNetworkModalComponent } from './SocialNetworkModal.component';
import { SocialNetworkService } from '../../../services/generated/SocialNetworkService';
import { SocialNetwork } from '../../../models/SocialNetwork';

@Component({
  selector: 'app-list-social-network',
  templateUrl: './SocialNetworkIndex.component.html'
})
export class SocialNetworkIndexComponent implements OnInit, OnChanges {
    private _edit = false;
    paging: PagingModel<SocialNetwork>;
    screen = 'SocialNetwork';
    appErrorMessage: any;
    socialNetwork: SocialNetwork;
    socialNetworkList: SocialNetwork[];
    @Input() autoLoad = true;
    private modalRef: NgbModalRef;

    constructor(
      private _service: SocialNetworkService,
      public translate: TranslateService,
      private _modalService: NgbModal,
      private _toasterService: ToasterService,
      private _dialogService: DialogService) {
        this.paging = _service.page;
        this.paging.orderBy = 'Id';
        this.socialNetwork = new SocialNetwork();
    }

    ngOnInit() {
      this.load();
      this._service.on('SocialNetwork-save').subscribe((data) => {
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
      this.modalRef  = this._modalService.open(SocialNetworkModalComponent, options);
      this.modalRef.componentInstance.name = 'socialNetworkModal';
      this.modalRef.componentInstance.edit = this._edit;
      this.modalRef.componentInstance.entity = this.socialNetwork;
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

    public duplicate(entity: SocialNetwork) {
      const objToDup = Object.assign({}, entity);
      delete objToDup.id;
      this.openEdit(objToDup, true);
    }

    public getAll() {
      this._service.getPage(this.paging).subscribe(
      result => {
        this.paging.totalCount = result.totalCount;
        this.socialNetworkList = result.list;
      },
      error => {
        this.appErrorMessage = error;
      });
    }


  public openEdit(entity?: SocialNetwork, edit: boolean = false) {
    this._edit = edit;
    this.socialNetwork = entity || new SocialNetwork();
    this.openModal();
  }

  public async remove(socialNetwork: SocialNetwork, index: number) {
    const msg = this.translate.instant('SOCIAL_NETWORK.GRID.CONFIRM_DELETE');
    this._dialogService.confirm(msg, () => {
        this._service.remove(socialNetwork)
        .subscribe(
            () => {
              this.socialNetworkList.splice(index, 1);
              this.paging.totalCount--;
              if (this.paging.totalCount <= this.paging.size) {
                this.paging.number--;
              }
              this.getAll();
              const successMsg = this.translate.instant('SOCIAL_NETWORK.GRID.REMOVE.SUCCESS');
              this._toasterService.pop('success', this.translate.instant('APP.TOASTER.TITLE.SUCCESS'), successMsg);
            },
            error => {
              const errorMsg = this.translate.instant('SOCIAL_NETWORK.GRID.REMOVE.ERROR');
              this._toasterService.pop('error', this.translate.instant('APP.TOASTER.TITLE.ERROR'), errorMsg);
              this.appErrorMessage = error;
            });
        }, 'warning');
    }
}
