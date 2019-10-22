import { TestBed, inject } from '@angular/core/testing';

import { ReducerService } from './reducer.service';

describe('ReducerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReducerService]
    });
  });

  it('should be created', inject([ReducerService], (service: ReducerService<any>) => {
    expect(service).toBeTruthy();
  }));
});
