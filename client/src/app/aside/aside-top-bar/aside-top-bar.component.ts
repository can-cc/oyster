import { Component, OnInit, Input } from '@angular/core';
import { faSearch, faAngleDown, faCog } from '@fortawesome/free-solid-svg-icons';
import {FormControl} from "@angular/forms";
import {Store} from "@ngrx/store";
import {StoreType} from "../../../typing/feed";
import {CleanFeeds, SetSearchStr} from "../../state/feed.actions";

@Component({
  selector: 'app-aside-top-bar',
  templateUrl: './aside-top-bar.component.html',
  styleUrls: ['./aside-top-bar.component.css']
})
export class AsideTopBarComponent implements OnInit {
  faSearch = faSearch;
  faAngleDown = faAngleDown;
  faCog = faCog;
  isSearching = false;

  searchStrCtrl = new FormControl();

  @Input() selectedCategoryName = '';


  constructor(private store: Store<StoreType>) {}

  ngOnInit() {}

  onSearch() {
    console.log('search str = ', this.searchStrCtrl.value);
    this.store.dispatch(new CleanFeeds());
    this.store.dispatch(new SetSearchStr({searchStr: this.searchStrCtrl.value}));
  }

  toggleSearch() {
    this.isSearching = !this.isSearching;
    if (!this.isSearching) {
      this.searchStrCtrl.setValue('');
      this.onSearch();
    }
  }
}
