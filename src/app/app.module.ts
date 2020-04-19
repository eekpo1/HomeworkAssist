import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent } from './footer/footer.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AnnouncementComponent } from './announcements/announcement/announcement.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForumComponent } from './forum/forum.component';
import { AppRoutingModule } from './app-routing-module';
import { HelpComponent } from './help/help.component';
import { ProfileComponent } from './profile/profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SubForumComponent } from './forum/subforum/sub-forum.component';
import { ThreadComponent } from './forum/subforum/thread/thread.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    FooterComponent,
    AnnouncementsComponent,
    AnnouncementComponent,
    LoginComponent,
    RegisterComponent,
    ForumComponent,
    HelpComponent,
    ProfileComponent,
    SubForumComponent,
    ThreadComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatTreeModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
