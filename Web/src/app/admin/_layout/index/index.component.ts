import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from "../header/header";
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InRoleDirective } from '../../../directives/inRoleDirective';
import { NavMenuAdminGeneratedComponent } from "../navmenu/navmenuGenerated";
import { NgbDropdownModule, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbsComponent } from '../../../directives/breadcrumb.component';
import FooterAdminComponent from "../footer/footer";
import { LanguageCustomService } from '../../../services/custom/Language';
import { NavDropdownDirective, NavDropdownToggleDirective } from '../../../directives/nav-dropdown.directive';
declare let $: Function;
@Component({
    selector: 'app-dashboard',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
    imports: [
        HeaderAdminComponent,
        RouterModule,
        TranslateModule,
        InRoleDirective,
        NavMenuAdminGeneratedComponent,
        NgbDropdownModule,
        NgbNav,
        BreadcrumbsComponent, 
        FooterAdminComponent, 
        NavDropdownToggleDirective, 
        NavDropdownDirective,

    ],

})
export class IndexComponent implements OnInit {
    /**
     *
     */
    constructor(translate: LanguageCustomService) {
        translate.init("/assets/i18n/admin/layout/");
    }
    ngOnInit(): void {
        $('body')
            .removeAttr('class')
            .addClass('app footer-fixed header-fixed sidebar-fixed aside-menu-fixed pace-done aside-menu-hidden');
    }

}
