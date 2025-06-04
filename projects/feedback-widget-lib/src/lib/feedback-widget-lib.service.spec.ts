import { TestBed } from '@angular/core/testing';

import { FeedbackWidgetLibService } from './feedback-widget-lib.service';

describe('FeedbackWidgetLibService', () => {
  let service: FeedbackWidgetLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackWidgetLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
