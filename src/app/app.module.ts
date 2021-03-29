import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Route} from '@angular/router';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {HeaderComponent} from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {PostListComponent} from './posts/post-list/post-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {PostsService} from './posts/posts.service';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';





@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
