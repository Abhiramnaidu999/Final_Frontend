import { TestBed } from '@angular/core/testing';

import { InstituteSService } from './institute-s.service';

describe('InstituteSService', () => {
  let service: InstituteSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituteSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
