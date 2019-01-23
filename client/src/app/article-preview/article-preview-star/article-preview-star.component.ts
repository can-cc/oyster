import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarO } from '@fortawesome/free-regular-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-article-preview-star',
  templateUrl: './article-preview-star.component.html',
  styleUrls: ['./article-preview-star.component.css']
})
export class ArticlePreviewStarComponent implements OnInit {

  faBookmark = faBookmark;

  faStar = faStarO;

  constructor() { }

  ngOnInit() {
  }

}
