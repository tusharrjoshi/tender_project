import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTenderbidComponent } from './admin-tenderbid.component';

describe('AdminTenderbidComponent', () => {
  let component: AdminTenderbidComponent;
  let fixture: ComponentFixture<AdminTenderbidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTenderbidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTenderbidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
