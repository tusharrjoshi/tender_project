import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTenderapplyComponent } from './user-tenderapply.component';

describe('UserTenderapplyComponent', () => {
  let component: UserTenderapplyComponent;
  let fixture: ComponentFixture<UserTenderapplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTenderapplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTenderapplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
