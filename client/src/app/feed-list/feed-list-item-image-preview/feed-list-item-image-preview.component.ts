import { Component, OnInit, Input } from '@angular/core';
import { Feed } from '../../../typing/feed';
import { ColorService } from '../../color.service';

@Component({
  selector: 'app-feed-list-item-image-preview',
  templateUrl: './feed-list-item-image-preview.component.html',
  styleUrls: ['./feed-list-item-image-preview.component.css']
})
export class FeedListItemImagePreviewComponent implements OnInit {
  @Input()
  feed: Feed;
  hasImage: boolean;
  imgSrc: string;
  bgColor: string;

  constructor(private colorService: ColorService) {}

  ngOnInit() {
    this.bgColor = this.colorService.getSourceColor(this.feed.source.name);

    this.checkContentImage();
  }

  checkContentImage(): void {
    const div: Element = window.document.createElement('div');
    div.innerHTML = this.feed.content;

    const img: HTMLImageElement = div.querySelector('img');
    if (img) {
      this.hasImage = true;
      this.imgSrc = img.src;
    } else {
      this.hasImage = false;
    }
  }
}
