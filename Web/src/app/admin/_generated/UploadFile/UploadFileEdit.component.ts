import { Component, Input, OnInit, Output, OnDestroy, EventEmitter} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { UploadFileService } from '../../../services/generated/UploadFileService';
import { UploadFile } from '../../../models/UploadFile';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-form-upload-file',
  templateUrl: './UploadFileEdit.component.html'
})
export class UploadFileEditComponent implements OnInit, OnDestroy {


  private subscription = new Subscription();

  constructor(
    private _service: UploadFileService,
    public translate: TranslateService,
    private _modalService: NgbModal
  ) {
    }

    @Output()
    saveEvent?: EventEmitter<UploadFile> = new EventEmitter();

    @Input()
    uploadFile: UploadFile;

    @Input()
    edit: boolean;

    ngOnInit() {
      this.uploadFile = this.uploadFile || new UploadFile();
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    save(uploadFile: UploadFile) {
      this._service.save(uploadFile, this.edit, $('input[type=file]'));
    }

    public closeEdit() {
    }

}
