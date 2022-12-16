import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTenderinfoComponent } from './user-tenderinfo.component';

describe('UserTenderinfoComponent', () => {
  let component: UserTenderinfoComponent;
  let fixture: ComponentFixture<UserTenderinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTenderinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTenderinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
