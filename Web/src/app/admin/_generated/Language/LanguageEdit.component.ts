import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../services/generated/LanguageService';
import { Language } from '../../../models/Language';
declare let $: any;

@Component({
  selector: 'app-form-language',
  templateUrl: './LanguageEdit.component.html'
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
