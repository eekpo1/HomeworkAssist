import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnnouncementsComponent } from './announcements/announcements.component';
import { ForumComponent } from './forum/forum.component';
import { SubForumComponent } from './forum/subforum/sub-forum.component';
import { ThreadComponent } from './forum/subforum/thread/thread.component';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: AnnouncementsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'forum',
    component: ForumComponent,
    children: [
      {
        path: ':subForum',
        component: SubForumComponent,
        children: [{ path: ':threadId', component: ThreadComponent }],
      },
    ],
  },
  { path: 'help', component: HelpComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
