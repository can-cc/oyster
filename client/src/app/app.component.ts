import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(apollo: Apollo) {
    apollo
      .query({
        query: gql`
          {
            feeds {
              title
            }
          }
        `
      })
      .subscribe(console.log);
  }
}
