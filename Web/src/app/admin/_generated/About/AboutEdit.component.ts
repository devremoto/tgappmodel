import { Component, Input, OnInit, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AboutService } from '../../../services/generated/AboutService';
import { About } from '../../../models/About';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare let $: Function;

@Component({
  selector: 'app-form-about',

  imports: [TranslateModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './AboutEdit.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AboutEditComponent implements OnInit {


  constructor(
    private _service: AboutService,
    public translate: TranslateService,
    private _modalService: NgbModal
  ) {
  }

  @Output()
  saveEvent?: EventEmitter<About> = new EventEmitter();

  @Input()
  about: About;

  @Input()
  edit: boolean;

  ngOnInit() {
    this.about = this.about || new About();
  }

  save(about: About) {
    this._service.save(about, this.edit, $('input[type=file]'));
  }

  public closeEdit() {
    console.log('closeEdit')
  }

}
