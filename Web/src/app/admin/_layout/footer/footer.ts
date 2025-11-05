import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './footer.html',

})
export default class FooterAdminComponent {
  year = new Date().getFullYear();
}
