import { Component, OnInit, Input } from '@angular/core';
import { faStar as faStarO } from '@fortawesome/free-regular-svg-icons';
import { Feed } from '../../../typing/feed';

@Component({
  selector: 'app-article-preview-info-area',
  templateUrl: './article-preview-info-area.component.html',
  styleUrls: ['./article-preview-info-area.component.css']
})
export class ArticlePreviewInfoAreaComponent implements OnInit {
  @Input()
  feed: Feed;

  constructor() {}

  ngOnInit() {}
}
