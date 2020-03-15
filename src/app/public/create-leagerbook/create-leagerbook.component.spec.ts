import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeagerbookComponent } from './create-leagerbook.component';

describe('CreateLeagerbookComponent', () => {
  let component: CreateLeagerbookComponent;
  let fixture: ComponentFixture<CreateLeagerbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLeagerbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLeagerbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
