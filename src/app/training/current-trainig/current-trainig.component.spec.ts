import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTrainigComponent } from './current-trainig.component';

describe('CurrentTrainigComponent', () => {
  let component: CurrentTrainigComponent;
  let fixture: ComponentFixture<CurrentTrainigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentTrainigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTrainigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
