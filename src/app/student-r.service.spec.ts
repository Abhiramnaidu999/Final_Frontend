import { TestBed } from '@angular/core/testing';

import { StudentRService } from './student-r.service';

describe('StudentRService', () => {
  let service: StudentRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
