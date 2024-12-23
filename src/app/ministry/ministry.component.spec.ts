import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistryComponent } from './ministry.component';

describe('MinistryComponent', () => {
  let component: MinistryComponent;
  let fixture: ComponentFixture<MinistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinistryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
