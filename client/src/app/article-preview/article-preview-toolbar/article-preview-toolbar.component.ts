import { Component, OnInit, Input } from '@angular/core';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Feed } from '../../../typing/feed';
import { Store } from '@ngrx/store';
import { MarkFeedFavorite, RemoveFeedMark } from '../../state/feed.actions';


@Component({
  selector: 'app-article-preview-toolbar',
  templateUrl: './article-preview-toolbar.component.html',
  styleUrls: ['./article-preview-toolbar.component.css']
})
export class ArticlePreviewToolbarComponent implements OnInit {
  faEllipsisH = faEllipsisH;

  @Input()
  feed: Feed;

  constructor(
    private store: Store<{
      feed: {
        feedMap: { [id: string]: Feed };
      };
    }>
    ) { }

  ngOnInit() {
  }

  handleMarkFavorite() {
    const isFavorite = this.feed.marks.length > 0;
    if (!isFavorite) {
      this.store.dispatch(new MarkFeedFavorite({ feedId: this.feed.id }));
    } else {
      this.store.dispatch(
        new RemoveFeedMark({ feedId: this.feed.id, markId: this.feed.marks[0].id })
      );
    }
  }
}
