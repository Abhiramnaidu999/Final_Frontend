import { TestBed } from '@angular/core/testing';

import { StudentLService } from './student-l.service';

describe('StudentLService', () => {
  let service: StudentLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
