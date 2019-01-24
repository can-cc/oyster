import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedMark } from '../../typing/feed';

@Injectable({
  providedIn: 'root'
})
export class FeedMarkService {
  constructor(private httpClient: HttpClient) {}

  markFeedFavorite(feedId: string): Observable<FeedMark> {
    return this.httpClient.post<FeedMark>(`/api/feed/${feedId}/favorite`, null);
  }

  removeFeedMark(feedId: string, markId: string): Observable<void> {
    return this.httpClient.delete<void>(`/api/feed/${feedId}/favorite/${markId}`);
  }
}
