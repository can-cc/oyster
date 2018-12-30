import { Component, OnInit, Input } from '@angular/core';
import { Feed } from '../../typing/feed';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css']
})
export class ArticlePreviewComponent implements OnInit {
  @Input() feed: Feed;

  constructor() {}

  ngOnInit() {}
}
