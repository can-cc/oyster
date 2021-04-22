import { Component, OnInit, Input } from '@angular/core';
import { faSearch, faAngleDown, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-aside-top-bar',
  templateUrl: './aside-top-bar.component.html',
  styleUrls: ['./aside-top-bar.component.css']
})
export class AsideTopBarComponent implements OnInit {
  faSearch = faSearch;
  faAngleDown = faAngleDown;
  faCog = faCog;
  @Input() selectedCategoryName = '';

  constructor() {}

  ngOnInit() {}
}
