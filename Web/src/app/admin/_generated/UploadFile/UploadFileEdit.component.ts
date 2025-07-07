import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UploadFileService } from '../../../services/generated/UploadFileService';
import { UploadFile } from '../../../models/UploadFile';
import { FormsModule } from '@angular/forms';
import { UploadComponent } from '../../../directives/upload/upload.component';
declare let $: Function;

@Component({
  selector: 'app-form-upload-file',
  templateUrl: './UploadFileEdit.component.html',

  imports: [TranslateModule, FormsModule, UploadComponent]

})
export class UploadFileEditComponent implements OnInit {


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

  save(uploadFile: UploadFile) {
    this._service.save(uploadFile, this.edit, $('input[type=file]'));
  }

  public closeEdit() {
  }

}
