import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {
  feeds: any[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          query getFeeds($limit: Int!, $offset: Int) {
            feeds(limit: $limit, offset: $offset) {
              title
              author
              content
              published
              isRead
            }
          }
        `,
        variables: {
          limit: 20
        }
      })
      .valueChanges.subscribe(({ data }: any) => (this.feeds = data.feeds));
  }
}
