import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  faDiceSix,
  faStar,
  faDotCircle,
  IconDefinition,
  faCog
} from '@fortawesome/free-solid-svg-icons';
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
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  categorys: Category[] = [];

  faCog = faCog;

  constructor(private store: Store<StoreType>, private router: Router) {
    this.store
      .pipe(
        map((storeValue: StoreType) => {
          return storeValue.feed.feedSources;
        })
      )
      .subscribe((sources: FeedSource[]) => {
        this.categorys = [].concat(
          sources.map((source: FeedSource) => {
            return {
              type: 'SOURCE',
              id: source.id,
              name: source.name,
              faviconUrl: this.getSourceUrlFaviconUrl(source.url),
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

  private getSourceUrlFaviconUrl(sourceUrl: string): string {
    return sourceUrl.split('/')[0] + '//' + sourceUrl.split('/')[2] + '/favicon.ico';
  }
}
