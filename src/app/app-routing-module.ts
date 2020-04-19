import { RouterModule, Routes } from '@angular/router';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForumComponent } from './forum/forum.component';
import { NgModule } from '@angular/core';
import { HelpComponent } from './help/help.component';
import { ProfileComponent } from './profile/profile.component';
import { SubForumComponent } from './forum/subforum/sub-forum.component';

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
        // children: [{ path: ':threadId' }],
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
