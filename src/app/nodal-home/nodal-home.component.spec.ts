import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodalHomeComponent } from './nodal-home.component';

describe('NodalHomeComponent', () => {
  let component: NodalHomeComponent;
  let fixture: ComponentFixture<NodalHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodalHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
