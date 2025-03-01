import { Component } from '@angular/core';

@Component({
    selector: 'app-admin-footer',
    templateUrl: './footer.html',
    standalone: false
})
export class FooterAdminComponent {
  year = new Date().getFullYear();
}
