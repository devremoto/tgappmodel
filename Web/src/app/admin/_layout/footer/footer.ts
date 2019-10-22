import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './footer.html'
})
export class FooterAdminComponent {
  year = new Date().getFullYear();
}
