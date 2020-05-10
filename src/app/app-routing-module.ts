import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnnouncementsComponent } from './announcements/announcements.component';
import { ForumComponent } from './forum/forum.component';
import { ThreadListComponent } from './forum/subforum/thread-list/thread-list.component';
import { PostComponent } from './forum/subforum/thread-list/thread/post/post.component';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SubForumResolverService } from './forum/subforum/subforum-resolver.service';
import { NewThreadComponent } from './forum/subforum/thread-list/new-thread/new-thread.component';

const routes: Routes = [
  { path: '', component: AnnouncementsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'forum',
    component: ForumComponent,
    children: [
      // {
      //   path: ':subForum',
      //   component: SubForumComponent,
      //   children: [],
      // },
    ],
  },
  { path: 'forum/:id', component: ThreadListComponent },
  {
    path: 'forum/:id/new',
    component: NewThreadComponent,
  },
  {
    path: 'forum/:id/:thread',
    component: PostComponent,
    resolve: { thread: SubForumResolverService },
  },
  { path: 'help', component: HelpComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
