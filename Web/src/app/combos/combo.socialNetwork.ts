import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SocialNetworkService } from '../services/generated/SocialNetworkService';
import { SocialNetwork } from '../models/SocialNetwork';

@Component({
  selector: 'app-combo-social-network',
  template: `
    <select [ngModel]="model" (ngModelChange)="updateData($event)" name="socialNetwork" class="{{cssClass}}" autofocus >
      <option *ngFor="let socialNetwork of socialNetworkList" [value]="socialNetwork.id">{{socialNetwork.name}}</option>
    </select>`
})
export class ComboSocialNetworkComponent implements OnInit {
    appErrorMessage: any;
    socialNetwork: SocialNetwork;
    socialNetworkList: SocialNetwork[];

    @Input() cssClass?: string;
    @Input() model: any;
    @Output() modelChange: any = new EventEmitter();

    constructor(private _service: SocialNetworkService) {
        this._service.on('SocialNetwork-save').subscribe((data) => {
            this.reload(data);
        });
    }

    updateData(event) {
        this.model = event;
        this.modelChange.emit(event);
    }

    ngOnInit() {
        this.socialNetwork = new SocialNetwork();
        this.getAll();
    }

    public getAll(data?: SocialNetwork) {
        this._service.getAll().subscribe(
            result => {
                this.socialNetworkList = result;
                    if (data) {
                        this.updateData(data.id);
                    }
            },
            error => {
                this.appErrorMessage = error;
            }
        );
    }

    public reload(data?: SocialNetwork) {
        this.getAll(data);
    }
}
