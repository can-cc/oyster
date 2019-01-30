import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { faDiceSix, faStar, faDotCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Feed, StoreType, FeedSource } from '../../typing/feed';
import { map } from 'rxjs/operators';
import { GetSources } from '../state/feed.actions';
import { Router } from '@angular/router';

interface Category {
  type: string;
  id: string;
  name: string;
  icon: IconDefinition;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  readonly fixedCategorys: Category[] = [
    { type: 'ALL', id: 'all', name: 'All', icon: faDiceSix },
    { type: 'STAR', id: 'favorite', name: 'Favorite', icon: faStar }
  ];

  categorys: Category[] = this.fixedCategorys;

  constructor(private store: Store<StoreType>, private router: Router) {
    this.store
      .pipe(
        map((store: StoreType) => {
          return store.feed.feedSources;
        })
      )
      .subscribe((sources: FeedSource[]) => {
        this.categorys = this.fixedCategorys.concat(
          sources.map((source: FeedSource) => {
            return {
              type: 'SOURCE',
              id: source.id,
              name: source.name,
              icon: faDotCircle
            };
          })
        );
      });

    this.store.dispatch(new GetSources());
  }

  ngOnInit() {}

  onCategoryClick(category: Category) {
    this.router.navigate([`/feed/${category.id}/`]);
  }
}
