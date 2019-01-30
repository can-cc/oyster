import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { FeedsPageComponent } from './feeds-page/feeds-page.component';
import { FeedSourcePageComponent } from './feed-source-page/feed-source-page.component';
import { SettingPageComponent } from './setting-page/setting-page.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/feed'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'feed',
    redirectTo: '/feed/all'
  },
  {
    path: 'feed/:category',
    component: FeedsPageComponent
  },
  {
    path: 'feed/:category/:feedId',
    component: FeedsPageComponent
  },
  {
    path: 'setting',
    component: SettingPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/feed/source'
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
  { path: '**', redirectTo: '/feed' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
