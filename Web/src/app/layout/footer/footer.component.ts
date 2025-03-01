import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

import { Config } from '../../config';
import { Mailing } from '../../models/Mailing';
import { SocialNetwork } from '../../models/SocialNetwork';
import { MailingCustomService } from '../../services/custom/Mailing';
import { SocialNetworkCustomService } from '../../services/custom/SocialNetwork';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [SocialNetworkCustomService, MailingCustomService]
})
export class FooterComponent implements OnInit {
  constructor(
    private _socialNetworkService: SocialNetworkCustomService,
    private _sanitizer: DomSanitizer,
    private _mailingService: MailingCustomService,
    private _toasterService: ToastrService,
    private _formBuilder: FormBuilder
  ) { }
  mailingForm: FormGroup;
  public socialNetworks: SocialNetwork[];
  public year: Date;
  public mailing: Mailing;
  public loading = false;
  logo = Config.logoUrl;

  validationMessages: any = {
    email: {
      required: 'Email address is required',
      pattern: 'Email is invalid'
    }
  };

  ngOnInit() {
    this.getSocialNetworks();
    this.year = new Date();
    this.mailing = new Mailing();
    this.buildForm();
  }

  private buildForm() {
    this.mailingForm = this._formBuilder.group({ email: ['', Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')] });
  }

  safeUrl(url: string) {
    return this._sanitizer.bypassSecurityTrustUrl(url);
  }

  private getSocialNetworks(): void {
    this._socialNetworkService.getJson().subscribe(
      result => {
        this.socialNetworks = result;
      },
      error => { }
    );
  }

  private validate(): boolean {
    if (this.mailingForm.invalid) {
      const errors = this.mailingForm.controls['email'].errors;
      (errors as Array<any>).map(error => {
        this._toasterService.error(this.validationMessages['email'][error], 'Erro');
      });
      return false;
    }

    return true;
  }

  signUp(): void {
    if (!this.validate()) {
      return;
    }
    this.loading = true;
    this._mailingService.signUp(this.mailing).subscribe(
      _ => {
        this._toasterService.success(`email registered  ${this.mailing.email}`, 'Success');
        this.loading = false;
      },
      error => {
        this._toasterService.error(error);
        this.loading = false;
      }
    );
  }

  openResume(): void { }
}
