import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTenderbidinfoComponent } from './admin-tenderbidinfo.component';

describe('AdminTenderbidinfoComponent', () => {
  let component: AdminTenderbidinfoComponent;
  let fixture: ComponentFixture<AdminTenderbidinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTenderbidinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTenderbidinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
