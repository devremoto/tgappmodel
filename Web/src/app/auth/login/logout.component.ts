import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginModel } from '../../models/LoginModel';
import { Config } from '../../config';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from '../../components/language-selector/language-selector.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, TranslateModule, LanguageSelectorComponent]
})
export class LogoutComponent implements OnInit {
  loginModel: LoginModel = new LoginModel();
  constructor(public authService: AuthService) {
    this.authService.fullLogout();

  }
  config = Config;
  ngOnInit() {
    this.authService.fullLogout();
  }


}
