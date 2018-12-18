import { TestBed, inject } from '@angular/core/testing';

import { FeedSourceService } from './feed-source.service';

describe('FeedSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedSourceService]
    });
  });

  it('should be created', inject([FeedSourceService], (service: FeedSourceService) => {
    expect(service).toBeTruthy();
  }));
});
