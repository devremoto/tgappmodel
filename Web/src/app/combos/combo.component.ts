import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-combo',
    template: `
	<select [ngModel]="model" (ngModelChange)="updateData($event)"  name="about" class="{{cssClass}}" >
		<option *ngFor="let item of list" value="{{item[value]}}">{{item[description]}}</option>
	</select>`,
})
export class ComboComponent implements OnInit {
    appErrorMessage: any;
    list: ListItem[];
    @Input() modelList: any[];
    @Input() cssClass?: string;
    @Input() model: any;
    @Input() value: string;
    @Input() description: string;

    @Output() modelChange: any = new EventEmitter();

    constructor() {

    }

    updateData(event) {
        this.model = event;
        this.modelChange.emit(event);
    }

    ngOnInit() {
        this.list = [];
        this.modelList.map((obj) => {
            this.list.push({
                value: obj[this.value],
                description: obj[this.description],
                model: obj

            });
        });
    }

}

export class ListItem {
    value: any;
    description: any;
    model: any;
}
