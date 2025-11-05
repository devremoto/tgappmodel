import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SocialNetworkService } from '../services/generated/SocialNetworkService';
import { SocialNetwork } from '../models/SocialNetwork';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-combo-social-network',

    imports: [FormsModule],
    template: `
    <select [ngModel]="model" (ngModelChange)="updateData($event)" name="socialNetwork" class="{{cssClass}}" autofocus >
      @for(socialNetwork of socialNetworkList; track socialNetwork.id) {
        <option [value]="socialNetwork.id">{{socialNetwork.name}}</option>
      }
    </select>`,

})
export class ComboSocialNetworkComponent implements OnInit {
    appErrorMessage: unknown;
    socialNetwork: SocialNetwork;
    socialNetworkList: SocialNetwork[];

    @Input() cssClass?: string;
    @Input() model: unknown;
    @Output() modelChange: any = new EventEmitter();

    constructor(private _service: SocialNetworkService) {
        this._service.on('SocialNetwork-save').subscribe((data) => {
            this.reload(data);
        });
    }

    updateData(even: any) {
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
