import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitSpecificationComponent } from './unit-specification.component';

describe('UnitSpecificationComponent', () => {
  let component: UnitSpecificationComponent;
  let fixture: ComponentFixture<UnitSpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitSpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
