import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonsForRejectionComponent } from './reasons-for-rejection.component';

describe('ReasonsForRejectionComponent', () => {
  let component: ReasonsForRejectionComponent;
  let fixture: ComponentFixture<ReasonsForRejectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReasonsForRejectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReasonsForRejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
