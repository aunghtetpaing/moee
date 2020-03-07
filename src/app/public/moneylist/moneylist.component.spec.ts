import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneylistComponent } from './moneylist.component';

describe('MoneylistComponent', () => {
  let component: MoneylistComponent;
  let fixture: ComponentFixture<MoneylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
