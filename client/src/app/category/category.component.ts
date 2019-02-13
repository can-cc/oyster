import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { faDiceSix, faStar, faDotCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { StoreType, FeedSource } from '../../typing/feed';
import { map } from 'rxjs/operators';
import { GetSources } from '../state/feed.actions';
import { Router } from '@angular/router';

interface Category {
  type: string;
  id: string;
  name: string;
  icon: IconDefinition;
  color: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  readonly fixedCategorys: Category[] = [
    { type: 'ALL', id: 'all', name: 'All', icon: faDiceSix, color: '#92a1a9' },
    { type: 'STAR', id: 'favorite', name: 'Favorite', icon: faStar, color: '#fedfbb' }
  ];

  categorys: Category[] = this.fixedCategorys;

  constructor(private store: Store<StoreType>, private router: Router) {
    this.store
      .pipe(
        map((storeValue: StoreType) => {
          return storeValue.feed.feedSources;
        })
      )
      .subscribe((sources: FeedSource[]) => {
        this.categorys = this.fixedCategorys.concat(
          sources.map((source: FeedSource) => {
            return {
              type: 'SOURCE',
              id: source.id,
              name: source.name,
              icon: faDotCircle,
              color: '#92a1a9'
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
