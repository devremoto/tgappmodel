import { NgModule } from '@angular/core';
import { DialogService } from './dialog/dialog.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [DialogService],
  //entryComponents: [DialogComponent],
})
export class ComponentsModule { }
