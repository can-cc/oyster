import { TestBed, inject } from '@angular/core/testing';

import { WebPushService } from './web-push.service';

describe('WebPushService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebPushService]
    });
  });

  it('should be created', inject([WebPushService], (service: WebPushService) => {
    expect(service).toBeTruthy();
  }));
});
