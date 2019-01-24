import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Feed } from '../../typing/feed';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categorys = [{ type: 'all', name: 'All article' }];

  constructor(
    private store: Store<{
      feed: {
        feedMap: { [id: string]: Feed };
        feedIds: string[];
      };
    }>
  ) {}

  ngOnInit() {}
}
