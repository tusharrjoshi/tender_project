import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTenderbidComponent } from './user-tenderbid.component';

describe('UserTenderbidComponent', () => {
  let component: UserTenderbidComponent;
  let fixture: ComponentFixture<UserTenderbidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTenderbidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTenderbidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
