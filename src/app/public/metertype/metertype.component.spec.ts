import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetertypeComponent } from './metertype.component';

describe('MetertypeComponent', () => {
  let component: MetertypeComponent;
  let fixture: ComponentFixture<MetertypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetertypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
