import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddtenderComponent } from './admin-addtender.component';

describe('AdminAddtenderComponent', () => {
  let component: AdminAddtenderComponent;
  let fixture: ComponentFixture<AdminAddtenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddtenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddtenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
