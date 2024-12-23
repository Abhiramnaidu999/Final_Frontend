import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipsOfferedComponent } from './scholarships-offered.component';

describe('ScholarshipsOfferedComponent', () => {
  let component: ScholarshipsOfferedComponent;
  let fixture: ComponentFixture<ScholarshipsOfferedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarshipsOfferedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarshipsOfferedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
