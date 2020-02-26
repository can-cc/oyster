import { Component, OnInit, Input } from '@angular/core';
import { CategoryItemProps } from '../../../typing/feed';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  @Input()
  category: CategoryItemProps;

  constructor() {}

  ngOnInit() {}
}
