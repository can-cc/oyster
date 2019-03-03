import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ColorService } from '../color.service';
import { Feed } from '../../typing/feed';

@Component({
  selector: 'app-article-avatar',
  templateUrl: './article-avatar.component.html',
  styleUrls: ['./article-avatar.component.css']
})
export class ArticleAvatarComponent implements OnInit {
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
