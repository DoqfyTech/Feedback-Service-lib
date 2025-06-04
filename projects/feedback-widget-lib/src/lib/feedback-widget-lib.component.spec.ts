import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackWidgetLibComponent } from './feedback-widget-lib.component';

describe('FeedbackWidgetLibComponent', () => {
  let component: FeedbackWidgetLibComponent;
  let fixture: ComponentFixture<FeedbackWidgetLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackWidgetLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackWidgetLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
