import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloModule, Apollo } from 'apollo-angular';

import {
  MatIconRegistry,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatCardModule,
  MatSidenavModule,
  MAT_RIPPLE_GLOBAL_OPTIONS
} from '@angular/material';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatRippleModule} from '@angular/material/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { TrustHtmlPipe } from './pipe/trust-html.pipe';
import { CategoryComponent } from './category/category.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { ArticleAvatarComponent } from './article-avatar/article-avatar.component';

import { environment } from '../environments/environment';

import { WebPushService } from './web-push.service';
import { ColorService } from './color.service';
import { ConfigService } from './config.service';
import { AuthInterceptor } from './auth.interceptor';
import { LoginPageComponent } from './login-page/login-page.component';
import { FeedsPageComponent } from './feeds-page/feeds-page.component';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { FeedSourcePageComponent } from './feed-source-page/feed-source-page.component';
import { FeedSourceCreaterComponent } from './feed-source-page/feed-source-creater/feed-source-creater.component';
import { FeedSourceItemComponent } from './feed-source-page/feed-source-item/feed-source-item.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArticlePreviewInfoAreaComponent } from './article-preview/article-preview-info-area/article-preview-info-area.component';

import { StoreModule } from '@ngrx/store';
import { feedReducer } from './state/feed.reducer';
import { ArticlePreviewStarComponent } from './article-preview/article-preview-star/article-preview-star.component';
import { FeedEffects } from './state/feed.effect';
import { SettingPageComponent } from './setting-page/setting-page.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { PingDialogComponent } from './notification-page/ping-dialog/ping-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedListComponent,
    TrustHtmlPipe,
    CategoryComponent,
    ArticlePreviewComponent,
    ArticleAvatarComponent,
    PingDialogComponent,
    LoginPageComponent,
    FeedsPageComponent,
    FeedSourcePageComponent,
    FeedSourceCreaterComponent,
    FeedSourceItemComponent,
    ArticlePreviewInfoAreaComponent,
    ArticlePreviewStarComponent,
    SettingPageComponent,
    NotificationPageComponent
  ],
  entryComponents: [PingDialogComponent],
  imports: [
    CoreModule.forRoot(),
    StoreModule.forRoot({ feed: feedReducer }),
    EffectsModule.forRoot([FeedEffects]),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    ApolloModule,
    HttpLinkModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatRippleModule,
    InfiniteScrollModule,
    AppRoutingModule,
    FontAwesomeModule,
    ServiceWorkerModule.register('/web-push-service-worker.js')
  ],
  providers: [
    ColorService,
    WebPushService,
    ConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: {}
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
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
  }
}
