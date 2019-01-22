import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { FeedsPageComponent } from './feeds-page/feeds-page.component';
import { FeedSourcePageComponent } from './feed-source-page/feed-source-page.component';

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
    component: FeedsPageComponent
  },
  {
    path: 'feed/:feedId',
    component: FeedsPageComponent
  },
  {
    path: 'source',
    component: FeedSourcePageComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
