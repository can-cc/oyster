import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppComponent } from './app.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { MatListModule } from '@angular/material/list';
import { TrustHtmlPipe } from './pipe/trust-html.pipe';

@NgModule({
  declarations: [AppComponent, FeedListComponent, TrustHtmlPipe],
  imports: [
    BrowserModule,
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule,
    BrowserAnimationsModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: '/api/v1/graphql' }),
      cache: new InMemoryCache()
    });
  }
}
