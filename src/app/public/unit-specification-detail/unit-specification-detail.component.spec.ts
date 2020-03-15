import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitSpecificationDetailComponent } from './unit-specification-detail.component';

describe('UnitSpecificationDetailComponent', () => {
  let component: UnitSpecificationDetailComponent;
  let fixture: ComponentFixture<UnitSpecificationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitSpecificationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitSpecificationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
