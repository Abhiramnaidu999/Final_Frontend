import { TestBed } from '@angular/core/testing';

import { InstituteHService } from './institute-h.service';

describe('InstituteHService', () => {
  let service: InstituteHService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituteHService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
