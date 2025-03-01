import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SocialNetworkService } from '../../../services/generated/SocialNetworkService';
import { SocialNetwork } from '../../../models/SocialNetwork';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare let $: any;

@Component({
  selector: 'app-modal-social-network',
  templateUrl: './SocialNetworkModal.component.html'
})
export class SocialNetworkModalComponent {

  @Input() edit: boolean;
  @Input() entity: SocialNetwork;

  constructor(
    private translate: TranslateService,
    private _toasterService: ToastrService,
    private _service: SocialNetworkService,
    private _activeModal: NgbActiveModal
  ) {
    this._service.on('SocialNetwork-save').subscribe(data => {
      this.hideModal();
    });
  }

  save(socialNetwork: SocialNetwork) {
    this._service.save(socialNetwork, this.edit, $('input[type=file]')).subscribe(
      () => {
        const successMsg = this.translate.instant('SOCIAL_NETWORK.FORM.SAVE.SUCCESS');
        this._toasterService.success(successMsg, this.translate.instant('APP.TOASTER.TITLE.SUCCESS'));
      },
      () => {
        const errorMsg = this.translate.instant('SOCIAL_NETWORK.FORM.SAVE.ERROR');
        this._toasterService.error(errorMsg, this.translate.instant('APP.TOASTER.TITLE.ERROR'));
      });
  }

  hideModal() {
    this._activeModal.dismiss('Cross click');
  }
}

