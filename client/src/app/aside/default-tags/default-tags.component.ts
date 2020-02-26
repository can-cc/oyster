import { Component, OnInit } from '@angular/core';
import { faListUl, faCircleNotch, faClock, faBoxes } from '@fortawesome/free-solid-svg-icons';
import { CategoryItemProps } from '../../../typing/feed';

const tags: CategoryItemProps[] = [
  {
    type: 'tag',
    id: '_all',
    name: 'All',
    icon: faBoxes
  },
  {
    type: 'tag',
    id: '_unread',
    name: 'Unread',
    icon: faListUl
  },
  {
    type: 'tag',
    id: '_recently',
    name: 'Recently Read',
    icon: faCircleNotch
  },
  {
    type: 'tag',
    id: '_updated',
    name: 'Updated',
    icon: faClock
  }
];

@Component({
  selector: 'app-default-tags',
  templateUrl: './default-tags.component.html',
  styleUrls: ['./default-tags.component.css']
})
export class DefaultTagsComponent implements OnInit {
  public tags: CategoryItemProps[] = tags;

  static findTagName(id) {
    return tags.find(t => t.id === id);
  }

  constructor() {}

  ngOnInit() {}
}
