import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodRequestFormComponent } from './blood-request-form.component';

describe('BloodRequestFormComponent', () => {
  let component: BloodRequestFormComponent;
  let fixture: ComponentFixture<BloodRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
