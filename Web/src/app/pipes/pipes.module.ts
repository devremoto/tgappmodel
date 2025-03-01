import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NlbrPipe } from './nlbr.pipe';
import { ArrayProp } from './array-prop.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NlbrPipe, ArrayProp],
  exports: [NlbrPipe, ArrayProp]
})
export class PipesModule { }
