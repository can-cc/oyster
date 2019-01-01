import { Component, OnInit, Input } from '@angular/core';
import { Feed } from '../../typing/feed';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarO } from '@fortawesome/free-regular-svg-icons';
import { FeedMarkService } from '../core/feed-mark.service';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css']
})
export class ArticlePreviewComponent implements OnInit {
  @Input() feed: Feed;

  faStar = faStarO;

  constructor(private feedMarkService: FeedMarkService) {}

  ngOnInit() {}

  handleFavoriteIconClick() {
    this.feedMarkService.markFeedFavorite(this.feed.id);
  }
}
