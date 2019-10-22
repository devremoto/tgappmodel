import { AgmCoreModule, LazyMapsAPILoaderConfigLiteral, LAZY_MAPS_API_CONFIG } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule, Injectable } from '@angular/core';
import { NgbAccordionModule, NgbAlertConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { environment } from '../../environments/environment';

@Injectable()
export class GoogleMapsConfig implements LazyMapsAPILoaderConfigLiteral {
  apiKey: string = environment.MapKey;
}

@NgModule({
  declarations: [],
  providers: [NgbAlertConfig, ToasterService, { provide: LAZY_MAPS_API_CONFIG, useClass: GoogleMapsConfig }],
  imports: [CommonModule, NgbModule, NgbAccordionModule, AgmCoreModule.forRoot(), ToasterModule],
  exports: [CommonModule, NgbModule, AgmCoreModule, ToasterModule]
})
export class LibModule {}
