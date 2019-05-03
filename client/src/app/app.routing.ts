import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  UrlSegment,
  UrlSegmentGroup,
  Route,
  UrlMatchResult
} from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { FeedsPageComponent } from './feeds-page/feeds-page.component';
import { FeedSourcePageComponent } from './feed-source-page/feed-source-page.component';
import { SettingPageComponent } from './setting-page/setting-page.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';

export function feedsPageMatcher(segments: UrlSegment[]): UrlMatchResult {
  if (segments[0].path !== 'feed') {
    return null;
  }
  if (segments.length === 2) {
    return {
      consumed: segments,
      posParams: {
        category: segments[1]
      }
    };
  }
  if (segments.length === 3) {
    return {
      consumed: segments,
      posParams: {
        feedId: segments[2],
        category: segments[1]
      }
    };
  }
  return null;
}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/feed/all'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'feed',
    pathMatch: 'full',
    redirectTo: '/feed/all'
  },
  {
    matcher: feedsPageMatcher,
    component: FeedsPageComponent
  },
  {
    path: 'setting',
    component: SettingPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/setting/source'
      },
      {
        path: 'source',
        component: FeedSourcePageComponent
      },
      {
        path: 'notification',
        component: NotificationPageComponent
      }
    ]
  },
  { path: '**', redirectTo: '/feed/all' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
