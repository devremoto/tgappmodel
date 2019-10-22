import { Component, OnInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterContentChecked {
  constructor() {}

  ngOnInit() {
    this.load();
  }

  ngAfterContentChecked(): void {
    this.progress();
  }

  progress() {}

  load() {}
}
