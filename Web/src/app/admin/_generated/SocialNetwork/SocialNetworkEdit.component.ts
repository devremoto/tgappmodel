import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { SocialNetworkService } from '../../../services/generated/SocialNetworkService';
import { SocialNetwork } from '../../../models/SocialNetwork';
declare var $: any;

@Component({
  selector: 'app-form-social-network',
  templateUrl: './SocialNetworkEdit.component.html'
})
export class SocialNetworkEditComponent implements OnInit {


  constructor(
    private _service: SocialNetworkService,
    public translate: TranslateService,
    private _modalService: NgbModal
  ) {
    }

    @Output()
    saveEvent?: EventEmitter<SocialNetwork> = new EventEmitter();

    @Input()
    socialNetwork: SocialNetwork;

    @Input()
    edit: boolean;

    ngOnInit() {
      this.socialNetwork = this.socialNetwork || new SocialNetwork();
    }

    save(socialNetwork: SocialNetwork) {
      this._service.save(socialNetwork, this.edit, $('input[type=file]'));
    }

    public closeEdit() {
    }

}
