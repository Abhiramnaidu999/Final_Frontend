import { TestBed } from '@angular/core/testing';

import { MinsitryServiceService } from './minsitry-service.service';

describe('MinsitryServiceService', () => {
  let service: MinsitryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinsitryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
