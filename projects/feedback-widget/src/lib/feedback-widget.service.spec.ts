import { TestBed } from '@angular/core/testing';

import { FeedbackWidgetService } from './feedback-widget.service';

describe('FeedbackWidgetService', () => {
  let service: FeedbackWidgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackWidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
