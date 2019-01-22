import { Component, OnInit, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarO } from '@fortawesome/free-regular-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Feed } from '../../typing/feed';
import { FeedMarkService } from '../core/feed-mark.service';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css']
})
export class ArticlePreviewComponent implements OnInit {
  @Input()
  feedId: string;

  feed$: Observable<Feed>;

  faBookmark = faBookmark;

  faStar = faStarO;

  constructor(
    private feedMarkService: FeedMarkService,
    private store: Store<{
      feed: {
        feedMap: { [id: string]: Feed };
      };
    }>
  ) {}

  ngOnInit() {
    this.feed$ = this.store.pipe(map(store => {
      return store.feed.feedMap[this.feedId];
    }));
  }

  handleFavoriteIconClick() {
    this.feedMarkService.markFeedFavorite(this.feedId);
  }
}
