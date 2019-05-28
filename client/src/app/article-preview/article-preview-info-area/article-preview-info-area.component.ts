import { Component, OnInit, Input } from '@angular/core';
import { faStar as faStarO } from '@fortawesome/free-regular-svg-icons';
import { Feed } from '../../../typing/feed';

@Component({
  selector: 'app-article-preview-info-area',
  templateUrl: './article-preview-info-area.component.html',
  styleUrls: ['./article-preview-info-area.component.css']
})
export class ArticlePreviewInfoAreaComponent implements OnInit {
  private specClickCount = 0;
  public showExtraInfo = false;

  @Input()
  feed: Feed;

  constructor() {}

  ngOnInit() {}

  public openSourceHref() {
    window.open(this.feed.originHref, '_blank');
  }

  public onSpecClick():void {
    this.specClickCount++;
    if (this.specClickCount > 4) {
      this.showExtraInfo = true;
    }
  }


}
