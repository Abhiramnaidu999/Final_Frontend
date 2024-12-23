import { TestBed } from '@angular/core/testing';

import { InstituteRService } from './institute-r.service';

describe('InstituteRService', () => {
  let service: InstituteRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituteRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
