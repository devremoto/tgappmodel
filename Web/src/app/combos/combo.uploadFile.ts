import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { UploadFileService } from '../services/generated/UploadFileService';
import { UploadFile } from '../models/UploadFile';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-combo-upload-file',
  template: `
    <select [ngModel]="model" (ngModelChange)="updateData($event)" name="uploadFile" class="{{cssClass}}" autofocus >
      <option *ngFor="let uploadFile of uploadFileList" [value]="uploadFile.id">{{uploadFile.name}}</option>
    </select>`
})
export class ComboUploadFileComponent implements OnInit, OnDestroy {
    appErrorMessage: any;
    uploadFile: UploadFile;
    uploadFileList: UploadFile[];

    @Input() cssClass?: string;
    @Input() model: any;
    @Output() modelChange: any = new EventEmitter();
    subscription = new Subscription();

    constructor(private _service: UploadFileService) {
        this.subscription.add(this._service.on('UploadFile-save').subscribe((data) => {
            this.reload(data);
        }));
    }

    updateData(event) {
        this.model = event;
        this.modelChange.emit(event);
    }

    ngOnInit() {
        this.uploadFile = new UploadFile();
        this.getAll();
    }

    ngOnDestroy(){
      this.subscription.unsubscribe();
    }

    public getAll(data?: UploadFile) {
        this.subscription.add(this._service.getAll().subscribe(
            result => {
                this.uploadFileList = result;
                    if (data) {
                        this.updateData(data.id);
                    }
            },
            error => {
                this.appErrorMessage = error;
            }
        ));
    }

    public reload(data?: UploadFile) {
        this.getAll(data);
    }
}
