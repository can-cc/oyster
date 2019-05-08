import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarO } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-article-preview-star',
  templateUrl: './article-preview-star.component.html',
  styleUrls: ['./article-preview-star.component.css']
})
export class ArticlePreviewStarComponent implements OnInit {
  @Input()
  isStar: boolean;


  faStar = faStar;
  faStarO = faStarO;

  constructor() {}

  ngOnInit() {}
}
