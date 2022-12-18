import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMakepaymentComponent } from './user-makepayment.component';

describe('UserMakepaymentComponent', () => {
  let component: UserMakepaymentComponent;
  let fixture: ComponentFixture<UserMakepaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMakepaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMakepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
