import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterOfficeComponent } from './meter-office.component';

describe('MeterOfficeComponent', () => {
  let component: MeterOfficeComponent;
  let fixture: ComponentFixture<MeterOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
