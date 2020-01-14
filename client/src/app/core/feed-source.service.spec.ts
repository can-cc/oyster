import { TestBed, inject } from '@angular/core/testing';

import { FeedSourceService } from './feed-source.service';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';

describe('FeedSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedSourceService],
      imports: [
        HttpClientModule,
        ApolloModule
      ]
    });
  });

  it('should be created', inject([FeedSourceService], (service: FeedSourceService) => {
    expect(service).toBeTruthy();
  }));
});
