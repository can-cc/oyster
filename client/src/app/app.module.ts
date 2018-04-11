import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MatIconRegistry } from '@angular/material';

import { AppComponent } from './app.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TrustHtmlPipe } from './pipe/trust-html.pipe';
import { CategoryComponent } from './category/category.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedListComponent,
    TrustHtmlPipe,
    CategoryComponent,
    ArticlePreviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    apollo.create({
      link: httpLink.create({ uri: '/api/v1/graphql' }),
      cache: new InMemoryCache()
    });

    iconRegistry.addSvgIcon(
      'track-change',
      sanitizer.bypassSecurityTrustResourceUrl('assets/ic_track_changes.svg')
    );
  }
}
