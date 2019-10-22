import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginModel } from 'src/app/models/LoginModel';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel: LoginModel = new LoginModel();
  constructor(public authService: AuthService) { }
  config = Config;
  ngOnInit() {
  }


}
