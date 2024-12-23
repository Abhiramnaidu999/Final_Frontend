import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoareEligibleComponent } from './whoare-eligible.component';

describe('WhoareEligibleComponent', () => {
  let component: WhoareEligibleComponent;
  let fixture: ComponentFixture<WhoareEligibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhoareEligibleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhoareEligibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
