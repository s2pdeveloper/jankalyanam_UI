import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestMylistDetailPage } from './request-mylist-detail.page';

describe('RequestMylistDetailPage', () => {
  let component: RequestMylistDetailPage;
  let fixture: ComponentFixture<RequestMylistDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RequestMylistDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
