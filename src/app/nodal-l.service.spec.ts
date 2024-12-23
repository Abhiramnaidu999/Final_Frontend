import { TestBed } from '@angular/core/testing';

import { NodalLService } from './nodal-l.service';

describe('NodalLService', () => {
  let service: NodalLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodalLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
