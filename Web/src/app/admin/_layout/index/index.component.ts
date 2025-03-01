import { Component, OnInit } from '@angular/core';
declare let $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
    ngOnInit(): void {
      $('body')
        .removeAttr('class')
        .addClass('app footer-fixed header-fixed sidebar-fixed aside-menu-fixed pace-done aside-menu-hidden');
    }

}
