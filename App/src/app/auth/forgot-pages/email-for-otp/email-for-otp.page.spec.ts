import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailForOtpPage } from './email-for-otp.page';

describe('EmailForOtpPage', () => {
  let component: EmailForOtpPage;
  let fixture: ComponentFixture<EmailForOtpPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmailForOtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
