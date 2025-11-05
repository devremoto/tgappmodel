import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../../../services/generated/SettingsService';
import { Settings } from '../../../models/Settings';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare let $: Function;

@Component({
  selector: 'app-form-settings',
  templateUrl: './SettingsEdit.component.html',
  standalone: true,
  imports: [TranslateModule, CommonModule, FormsModule]

})
export class SettingsEditComponent implements OnInit {


  constructor(
    private _service: SettingsService,
    public translate: TranslateService,
    private _modalService: NgbModal
  ) {
  }

  @Output()
  saveEvent?: EventEmitter<Settings> = new EventEmitter();

  @Input()
  settings: Settings;

  @Input()
  edit: boolean;

  ngOnInit() {
    this.settings = this.settings || new Settings();
  }

  save(settings: Settings) {
    this._service.save(settings, this.edit, $('input[type=file]'));
  }

  public closeEdit() {
  }

}
