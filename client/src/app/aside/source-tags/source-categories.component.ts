import { Component, OnInit, Input } from '@angular/core';
import { CategoryItemProps } from '../../../typing/feed';
import { faTag } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-source-tags',
  templateUrl: './source-categories.component.html',
  styleUrls: ['./source-categories.component.css']
})
export class SourceCategoriesComponent implements OnInit {
  @Input()
  categories: CategoryItemProps[];

  faTag = faTag

  constructor() {}

  ngOnInit() {}
}
