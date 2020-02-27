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
  public feed: Feed;
  public hasImage: boolean;
  public imgSrc: string;
  public bgColor: string;

  constructor(private colorService: ColorService) {}

  ngOnInit() {
    this.bgColor = this.colorService.getSourceColor(this.feed.source.name);
  }

}
