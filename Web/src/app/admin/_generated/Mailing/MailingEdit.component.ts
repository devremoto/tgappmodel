import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MailingService } from '../../../services/generated/MailingService';
import { Mailing } from '../../../models/Mailing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare let $: Function;

@Component({
  selector: 'app-form-mailing',
  templateUrl: './MailingEdit.component.html',
  imports: [TranslateModule, CommonModule, FormsModule]

})
export class MailingEditComponent implements OnInit {


  constructor(
    private _service: MailingService,
    public translate: TranslateService,
    private _modalService: NgbModal
  ) {
  }

  @Output()
  saveEvent?: EventEmitter<Mailing> = new EventEmitter();

  @Input()
  mailing: Mailing;

  @Input()
  edit: boolean;

  ngOnInit() {
    this.mailing = this.mailing || new Mailing();
  }

  save(mailing: Mailing) {
    this._service.save(mailing, this.edit, $('input[type=file]'));
  }

  public closeEdit() {
  }

}
