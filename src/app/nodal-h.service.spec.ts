import { TestBed } from '@angular/core/testing';

import { NodalHService } from './nodal-h.service';

describe('NodalHService', () => {
  let service: NodalHService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodalHService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
