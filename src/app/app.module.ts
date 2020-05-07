import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AnnouncementComponent } from './announcements/announcement/announcement.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { ForumComponent } from './forum/forum.component';
import { SubForumComponent } from './forum/subforum/sub-forum.component';
import { ThreadComponent } from './forum/subforum/thread-list/thread/thread.component';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ThreadListComponent } from './forum/subforum/thread-list/thread-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NewThreadComponent } from './forum/subforum/thread-list/new-thread/new-thread.component';
import { RteComponent } from './forum/subforum/thread-list/new-thread/rte.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

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
    ThreadListComponent,
    NewThreadComponent,
    RteComponent,
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
    HttpClientModule,
    ReactiveFormsModule,
    EditorModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatStepperModule,
    MatInputModule,
    CKEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
