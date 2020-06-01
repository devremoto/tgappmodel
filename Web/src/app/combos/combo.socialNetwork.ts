import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { SocialNetworkService } from '../services/generated/SocialNetworkService';
import { SocialNetwork } from '../models/SocialNetwork';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-combo-social-network',
  template: `
    <select [ngModel]="model" (ngModelChange)="updateData($event)" name="socialNetwork" class="{{cssClass}}" autofocus >
      <option *ngFor="let socialNetwork of socialNetworkList" [value]="socialNetwork.id">{{socialNetwork.name}}</option>
    </select>`
})
export class ComboSocialNetworkComponent implements OnInit, OnDestroy {
    appErrorMessage: any;
    socialNetwork: SocialNetwork;
    socialNetworkList: SocialNetwork[];

    @Input() cssClass?: string;
    @Input() model: any;
    @Output() modelChange: any = new EventEmitter();
    subscription = new Subscription();

    constructor(private _service: SocialNetworkService) {
        this.subscription.add(this._service.on('SocialNetwork-save').subscribe((data) => {
            this.reload(data);
        }));
    }

    updateData(event) {
        this.model = event;
        this.modelChange.emit(event);
    }

    ngOnInit() {
        this.socialNetwork = new SocialNetwork();
        this.getAll();
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    public getAll(data?: SocialNetwork) {
        this.subscription.add(this._service.getAll().subscribe(
            result => {
                this.socialNetworkList = result;
                if (data) {
                    this.updateData(data.id);
                }
            },
            error => {
                this.appErrorMessage = error;
            }
        ));
    }

    public reload(data?: SocialNetwork) {
        this.getAll(data);
    }
}
