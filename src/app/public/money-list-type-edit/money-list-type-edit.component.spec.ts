import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyListTypeEditComponent } from './money-list-type-edit.component';

describe('MoneyListTypeEditComponent', () => {
  let component: MoneyListTypeEditComponent;
  let fixture: ComponentFixture<MoneyListTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyListTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyListTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
