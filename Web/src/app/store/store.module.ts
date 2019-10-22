import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReducerService } from './reducer/reducer.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [],
  providers: [ReducerService]
})
export class StoreModule { }
