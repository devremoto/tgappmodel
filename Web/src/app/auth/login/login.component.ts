import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginModel } from '../../models/LoginModel';
import { Config } from '../../config';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from '../../components/language-selector/language-selector.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, TranslateModule, LanguageSelectorComponent]
})
export class LoginComponent implements OnInit {
  loginModel: LoginModel = new LoginModel();
  constructor(public authService: AuthService) { }
  config = Config;
  ngOnInit() {
  }


}
