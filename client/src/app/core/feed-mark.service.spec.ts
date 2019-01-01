import { TestBed, inject } from '@angular/core/testing';

import { FeedMarkService } from './feed-mark.service';

describe('FeedMarkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedMarkService]
    });
  });

  it('should be created', inject([FeedMarkService], (service: FeedMarkService) => {
    expect(service).toBeTruthy();
  }));
});
