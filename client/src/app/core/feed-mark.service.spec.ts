import { TestBed, inject } from '@angular/core/testing';

import { FeedMarkService } from './feed-mark.service';
import { HttpClientModule } from '@angular/common/http';

describe('FeedMarkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedMarkService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([FeedMarkService], (service: FeedMarkService) => {
    expect(service).toBeTruthy();
  }));
});
