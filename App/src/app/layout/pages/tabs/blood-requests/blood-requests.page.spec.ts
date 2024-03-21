import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BloodRequestsPage } from './blood-requests.page';

describe('BloodRequestsPage', () => {
  let component: BloodRequestsPage;
  let fixture: ComponentFixture<BloodRequestsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BloodRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
