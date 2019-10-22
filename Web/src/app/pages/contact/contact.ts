import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap/';
import { TranslateService } from '@ngx-translate/core';
import { BodyOutputType, ToasterService } from 'angular2-toaster';
import { Contact } from '../../models/Contact';
import { SocialNetwork } from '../../models/SocialNetwork';
import { ContactCustomService } from '../../services/custom/Contact';
import { SocialNetworkCustomService } from '../../services/custom/SocialNetwork';

@Component({
  styles: [
    `
      .sebm-google-map-container {
        height: 300px;
        width: 100%;
      }
    `
  ],
  templateUrl: './contact.html',
  providers: [ContactCustomService, SocialNetworkCustomService]
})
export class ContactComponent implements OnInit {
  errorMessage: string;
  name: string;
  zoom = 18;
  socialNetworks: SocialNetwork[];
  @ViewChild('content', null) modalContent: TemplateRef<any>;
  modalRef: NgbModalRef;
  contactForm: FormGroup;
  loading = false;
  contact: Contact;
  coords: Promise<Coordinates> = new Promise<Coordinates>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resp => {
        resolve(resp.coords);
      },
      error => reject(error)
    );
  });
  // -23.5323227,-46.7679107
  /*
  latitude: -23.5305458
longitude: -46.7764102
__proto__: Object
*/
  maps: { latitude: number; longitude: number } = {
    latitude: -23.5323227,
    longitude: -46.7679107
  };

  constructor(
    private _translate: TranslateService,
    private _service: ContactCustomService,
    private _toasterService: ToasterService,
    private _modalService: NgbModal,
    private _socialNetworkService: SocialNetworkCustomService,
    private _formBuilder: FormBuilder
  ) {
    this.load();

    this._translate.onLangChange.subscribe(() => {
      this.load();
    });
  }

  validationMessages: any = {
    email: {
      required: this._translate.instant('CONTACT.FORM.VALIDATE.EMAIL.REQUIRED'),
      pattern: this._translate.instant('CONTACT.FORM.VALIDATE.EMAIL.PATTERN')
    },
    name: {
      required: this._translate.instant('CONTACT.FORM.VALIDATE.NAME.REQUIRED')
    },
    subject: {
      required: this._translate.instant('CONTACT.FORM.VALIDATE.SBJECT.REQUIRED')
    },
    phoneNumber: {
      required: this._translate.instant('CONTACT.FORM.VALIDATE.PHONENUMBER.REQUIRED')
    },
    message: {
      required: this._translate.instant('CONTACT.FORM.VALIDATE.MESSAGE.REQUIRED')
    }
  };

  getPosition(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          resolve(resp.coords);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  load() {
    this.getPosition().then(res => {
      this.maps = res;
      // this.maps = { latitude, longitude };
    });
    this.validationMessages = {
      email: {
        required: this._translate.instant('CONTACT.FORM.VALIDATE.EMAIL.REQUIRED'),
        pattern: this._translate.instant('CONTACT.FORM.VALIDATE.EMAIL.PATTERN')
      },
      name: {
        required: this._translate.instant('CONTACT.FORM.VALIDATE.NAME.REQUIRED')
      },
      subject: {
        required: this._translate.instant('CONTACT.FORM.VALIDATE.SUBJECT.REQUIRED')
      },
      phoneNumber: {
        required: this._translate.instant('CONTACT.FORM.VALIDATE.PHONENUMBER.REQUIRED')
      },
      message: {
        required: this._translate.instant('CONTACT.FORM.VALIDATE.MESSAGE.REQUIRED')
      }
    };
  }

  ngOnInit() {
    this.contact = new Contact();
    this.getSocialNetworks();
    this.buildForm();
  }

  private getSocialNetworks(): void {
    this._socialNetworkService.getAll().subscribe(
      result => {
        this.socialNetworks = result;
      },
      () => {}
    );
  }

  open(content?) {
    this.modalRef = this._modalService.open(content || this.modalContent, { size: 'lg', backdrop: 'static' });
    // modalRef.componentInstance.name = 'contentModal';
  }

  hideModal() {
    this.modalRef.close();
  }

  private buildForm() {
    this.contactForm = this._formBuilder.group({
      message: ['', [, Validators.required]],
      subject: ['', [, Validators.required]],
      name: ['', [, Validators.required]],
      email: ['', [, Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]],
      phoneNumber: ['']
    });
  }

  private validate(): boolean {
    const messages = [];
    if (this.contactForm.invalid) {
      for (const control in this.contactForm.controls) {
        if (control) {
          for (const error in this.contactForm.controls[control].errors) {
            if (error) {
              messages.push(this.validationMessages[control][error]);
            }
          }
        }
      }

      if (messages.length > 0) {
        this._toasterService.pop({
          type: 'error',
          title: 'Error',
          body: messages.join('<br />'),
          bodyOutputType: BodyOutputType.TrustedHtml,
          timeout: 2000
        });
      }
      return false;
    }

    return true;
  }

  public SendEmail() {
    if (this.validate()) {
      const contact = <Contact>this.contactForm.value;
      this.loading = true;
      this._service.sendEmail(contact).subscribe(
        () => {
          this.name = contact.name;
          this.contact = new Contact();
          this.open();
          this.loading = false;
        },
        () => {
          this.errorMessage = 'Problema no envio da mensagem, tente novamente';
          this._toasterService.pop('error', 'Erro', this.errorMessage);
          this.loading = false;
        }
      );
    }
  }
}
