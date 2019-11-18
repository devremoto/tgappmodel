import { Component, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService } from 'angular2-toaster';
import { SocialNetworkService } from '../../../services/generated/SocialNetworkService';
import { SocialNetwork } from '../../../models/SocialNetwork';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-modal-social-network',
  templateUrl: './SocialNetworkModal.component.html'
})
export class SocialNetworkModalComponent implements OnDestroy{

  @Input() edit: boolean;
  @Input() entity: SocialNetwork;
  subscription = new Subscription();

  constructor(
      private _translate: TranslateService,
      private _toasterService: ToasterService,
      private _service: SocialNetworkService,
      private _activeModal: NgbActiveModal
    ) {
        this.subscription.add(this._service.on('SocialNetwork-save').subscribe(data => {
          this.hideModal();
        }));
    }

  save(socialNetwork: SocialNetwork) {
    this.subscription.add(this._service.save(socialNetwork, this.edit, $('input[type=file]')).subscribe(
      () => {
        const successMsg = this._translate.instant('SOCIAL_NETWORK.FORM.SAVE.SUCCESS');
        this._toasterService.pop('success', this._translate.instant('APP.TOASTER.TITLE.SUCCESS'), successMsg);
      },
      () => {
        const errorMsg = this._translate.instant('SOCIAL_NETWORK.FORM.SAVE.ERROR');
        this._toasterService.pop('error', this._translate.instant('APP.TOASTER.TITLE.ERROR'), errorMsg);
      }));
  }

  hideModal() {
    this._activeModal.dismiss('Cross click');
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

