import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedMarkService {
  constructor(private httpClient: HttpClient) {}

  markFeedFavorite(feedId: string) {
    this.httpClient.post(`/api/feed/${feedId}/favorite`, null).subscribe();
  }
}
