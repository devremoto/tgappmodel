import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../services/generated/LanguageService';
import { Language } from '../../../models/Language';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadComponent } from '../../../directives/upload/upload.component';
declare let $: Function;

@Component({
  selector: 'app-form-language',
  templateUrl: './LanguageEdit.component.html',
  imports: [TranslateModule, CommonModule, FormsModule, UploadComponent]

})
export class LanguageEditComponent implements OnInit {


  constructor(
    private _service: LanguageService,
    public translate: TranslateService,
    private _modalService: NgbModal
  ) {
  }

  @Output()
  saveEvent?: EventEmitter<Language> = new EventEmitter();

  @Input()
  language: Language;

  @Input()
  edit: boolean;

  ngOnInit() {
    this.language = this.language || new Language();
  }

  save(language: Language) {
    this._service.save(language, this.edit, $('input[type=file]'));
  }

  public closeEdit() {
  }

}
