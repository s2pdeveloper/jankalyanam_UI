import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatebloodComponent } from './donateblood.component';

describe('DonatebloodComponent', () => {
  let component: DonatebloodComponent;
  let fixture: ComponentFixture<DonatebloodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonatebloodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonatebloodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
