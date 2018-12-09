import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloModule, Apollo } from 'apollo-angular';

import { MatIconRegistry, MAT_DIALOG_DEFAULT_OPTIONS, MatCardModule } from '@angular/material';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { TrustHtmlPipe } from './pipe/trust-html.pipe';
import { CategoryComponent } from './category/category.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { ArticleAvatarComponent } from './article-avatar/article-avatar.component';

import { environment } from '../environments/environment';
import { PushControlComponent } from './push-control/push-control.component';

import { WebPushService } from './web-push.service';
import { ColorService } from './color.service';
import { ConfigService } from './config.service';
import { AuthInterceptor } from './auth.interceptor';
import { PingDialogComponent } from './push-control/ping-dialog/ping-dialog.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FeedsPageComponent } from './feeds-page/feeds-page.component';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    FeedListComponent,
    TrustHtmlPipe,
    CategoryComponent,
    ArticlePreviewComponent,
    ArticleAvatarComponent,
    PushControlComponent,
    PingDialogComponent,
    LoginPageComponent,
    FeedsPageComponent
  ],
  entryComponents: [PingDialogComponent],
  imports: [
    CoreModule.forRoot(),
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
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    InfiniteScrollModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
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

    iconRegistry.addSvgIcon(
      'track-change',
      sanitizer.bypassSecurityTrustResourceUrl('assets/ic_track_changes.svg')
    );

    iconRegistry.addSvgIcon('send', sanitizer.bypassSecurityTrustResourceUrl('assets/ic_send.svg'));

    iconRegistry.addSvgIcon(
      'notifications',
      sanitizer.bypassSecurityTrustResourceUrl('assets/ic_notifications.svg')
    );
  }
}
