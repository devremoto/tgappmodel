import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PagingModel } from '../../../models/PagingModel';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService } from 'angular2-toaster';
import { DialogService } from '../../../components/dialog/dialog.service';
import { SettingsModalComponent } from './SettingsModal.component';
import { SettingsService } from '../../../services/generated/SettingsService';
import { Settings } from '../../../models/Settings';

@Component({
  selector: 'app-list-settings',
  templateUrl: './SettingsIndex.component.html'
})
export class SettingsIndexComponent implements OnInit, OnChanges {
    private _edit = false;
    paging: PagingModel<Settings>;
    screen = 'Settings';
    appErrorMessage: any;
    settings: Settings;
    settingsList: Settings[];
    @Input() autoLoad = true;
    private modalRef: NgbModalRef;

    constructor(
      private _service: SettingsService,
      public translate: TranslateService,
      private _modalService: NgbModal,
      private _toasterService: ToasterService,
      private _dialogService: DialogService) {
        this.paging = _service.page;
        this.paging.orderBy = 'Id';
        this.settings = new Settings();
    }

    ngOnInit() {
      this.load();
      this._service.on('Settings-save').subscribe((data) => {
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
      this.modalRef  = this._modalService.open(SettingsModalComponent, options);
      this.modalRef.componentInstance.name = 'settingsModal';
      this.modalRef.componentInstance.edit = this._edit;
      this.modalRef.componentInstance.entity = this.settings;
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

    public duplicate(entity: Settings) {
      const objToDup = Object.assign({}, entity);
      delete objToDup.id;
      this.openEdit(objToDup, true);
    }

    public getAll() {
      this._service.getPage(this.paging).subscribe(
      result => {
        this.paging.totalCount = result.totalCount;
        this.settingsList = result.list;
      },
      error => {
        this.appErrorMessage = error;
      });
    }


  public openEdit(entity?: Settings, edit: boolean = false) {
    this._edit = edit;
    this.settings = entity || new Settings();
    this.openModal();
  }

  public async remove(settings: Settings, index: number) {
    const msg = this.translate.instant('SETTINGS.GRID.CONFIRM_DELETE');
    this._dialogService.confirm(msg, () => {
        this._service.remove(settings)
        .subscribe(
            () => {
              this.settingsList.splice(index, 1);
              this.paging.totalCount--;
              if (this.paging.totalCount <= this.paging.size) {
                this.paging.number--;
              }
              this.getAll();
              const successMsg = this.translate.instant('SETTINGS.GRID.REMOVE.SUCCESS');
              this._toasterService.pop('success', this.translate.instant('APP.TOASTER.TITLE.SUCCESS'), successMsg);
            },
            error => {
              const errorMsg = this.translate.instant('SETTINGS.GRID.REMOVE.ERROR');
              this._toasterService.pop('error', this.translate.instant('APP.TOASTER.TITLE.ERROR'), errorMsg);
              this.appErrorMessage = error;
            });
        }, 'warning');
    }
}
