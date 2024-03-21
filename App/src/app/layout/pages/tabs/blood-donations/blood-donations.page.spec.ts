import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BloodDonationsPage } from './blood-donations.page';

describe('BloodDonationsPage', () => {
  let component: BloodDonationsPage;
  let fixture: ComponentFixture<BloodDonationsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BloodDonationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
