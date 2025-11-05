import { Component, OnInit, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { UploadFileService } from '../services/generated/UploadFileService';
import { UploadFile } from '../models/UploadFile';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-combo-upload-file',

    imports: [FormsModule],
    template: `
    <select [ngModel]="model" (ngModelChange)="updateData($event)" name="uploadFile" class="{{cssClass}}" autofocus >
      @for(uploadFile of uploadFileList; track uploadFile.id) {
        <option [value]="uploadFile.id">{{uploadFile.name}}</option>
      }
    </select>`,

})
export class ComboUploadFileComponent implements OnInit {
    appErrorMessage: unknown;
    uploadFile: UploadFile;
    uploadFileList: UploadFile[];

    @Input() cssClass?: string;
    @Input() model: unknown;
    @Output() modelChange: any = new EventEmitter();

    constructor(private _service: UploadFileService) {
        this._service.on('UploadFile-save').subscribe((data) => {
            this.reload(data);
        });
    }

    updateData(even: any) {
        this.model = event;
        this.modelChange.emit(event);
    }

    ngOnInit() {
        this.uploadFile = new UploadFile();
        this.getAll();
    }

    public getAll(data?: UploadFile) {
        this._service.getAll().subscribe(
            result => {
                this.uploadFileList = result;
                if (data) {
                    this.updateData(data.id);
                }
            },
            error => {
                this.appErrorMessage = error;
            }
        );
    }

    public reload(data?: UploadFile) {
        this.getAll(data);
    }
}
