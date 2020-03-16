import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformerDetailComponent } from './transformer-detail.component';

describe('TransformerDetailComponent', () => {
  let component: TransformerDetailComponent;
  let fixture: ComponentFixture<TransformerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
