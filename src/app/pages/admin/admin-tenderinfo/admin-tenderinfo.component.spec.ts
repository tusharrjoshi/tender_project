import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTenderinfoComponent } from './admin-tenderinfo.component';

describe('AdminTenderinfoComponent', () => {
  let component: AdminTenderinfoComponent;
  let fixture: ComponentFixture<AdminTenderinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTenderinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTenderinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
