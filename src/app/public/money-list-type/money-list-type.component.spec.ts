import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneylistTypeComponent } from './money-list-type.component';

describe('MoneylistComponent', () => {
  let component: MoneylistTypeComponent;
  let fixture: ComponentFixture<MoneylistTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneylistTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneylistTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
