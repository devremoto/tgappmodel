import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AboutService } from '../../../services/generated/AboutService';
import { About } from '../../../models/About';
declare var $: any;

@Component({
  selector: 'app-form-about',
  templateUrl: './AboutEdit.component.html'
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
    }

}
