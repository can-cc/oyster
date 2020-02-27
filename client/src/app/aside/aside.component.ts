import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { faDotCircle, faCog } from '@fortawesome/free-solid-svg-icons';
import { StoreType, FeedSource, CategoryItemProps } from '../../typing/feed';
import { map } from 'rxjs/operators';
import { GetSources } from '../state/feed.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { DefaultTagsComponent } from './default-tags/default-tags.component';
import { merge, combineLatest } from 'rxjs';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  categories: CategoryItemProps[] = [];
  selectedCategoryName = '';

  constructor(private store: Store<StoreType>, private route: ActivatedRoute) {
    const sources$ = this.store.pipe(
      map((storeValue: StoreType) => {
        return storeValue.feed.feedSources;
      })
    );

    // sources$.subscribe((sources: FeedSource[]) => {});

    combineLatest(sources$, this.route.params).subscribe(([sources, paramsMap]) => {
      this.categories = sources.map((source: FeedSource) => {
        return {
          type: 'source',
          id: source.id,
          name: source.name,
          color: '#92a1a9'
        };
      });

      const categoryId = paramsMap.category;
      const tag = DefaultTagsComponent.findTagName(categoryId);
      if (tag) {
        this.selectedCategoryName = tag.name;
        return;
      }
      const category = this.categories.find(c => c.id === categoryId, 10);
      if (category) {
        this.selectedCategoryName = category.name;
      }
    });

    this.store.dispatch(new GetSources());
  }

  ngOnInit() {}
}
