import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterotpComponent } from './registerotp.component';

describe('RegisterotpComponent', () => {
  let component: RegisterotpComponent;
  let fixture: ComponentFixture<RegisterotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterotpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
