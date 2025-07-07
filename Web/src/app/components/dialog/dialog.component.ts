import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],

  imports: [TranslateModule]

})
export class DialogComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() callback: Function;
  @Input() windowClass: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  close(result: any) {
    if (result) {
      this.activeModal.close('confirmed');
      this.callback();

    } else {
      this.activeModal.dismiss('not confirmed');
    }
  }


}
